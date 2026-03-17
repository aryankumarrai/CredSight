import { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, Lock, AlertCircle, X, File, Users, Eye, ThumbsDown, Settings, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface UploadedFile {
  docType: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  reviewedByHuman?: boolean;
}

interface DocumentReview {
  fileName: string;
  docType: string;
  status: "pending" | "reviewed" | "classified";
}

interface SchemaMapping {
  raw: string;
  mapped: string;
}

export default function Ingestion() {
  const [isRedacting, setIsRedacting] = useState(true);
  const [selectedDocType, setSelectedDocType] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [enableHumanReview, setEnableHumanReview] = useState(true);
  const [reviewedDocs, setReviewedDocs] = useState<Set<number>>(new Set());
  const [deniedDocs, setDeniedDocs] = useState<Set<number>>(new Set());
  const [schemaMappings, setSchemaMappings] = useState<SchemaMapping[]>([
    { raw: "Raw_Profit_2023", mapped: "EBITDA_Current_Year" },
    { raw: "Raw_Revenue_2023", mapped: "Revenue_Current_Year" },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedDocumentTypes = [
    "ALM (Asset-Liability Management)",
    "Shareholding Pattern",
    "Borrowing Profile",
    "Annual Reports (P&L, Cashflow, Balance Sheet)",
    "Portfolio Cuts/Performance Data",
  ];

  const handleAddDocument = () => {
    if (selectedDocType && uploadedDocs.filter(d => d.docType === selectedDocType).length === 0) {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !selectedDocType) return;

    Array.from(files).forEach((file) => {
      const newDoc: UploadedFile = {
        docType: selectedDocType,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date(),
      };
      setUploadedDocs([...uploadedDocs, newDoc]);
    });
    setSelectedDocType("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (selectedDocType && e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedDocs(uploadedDocs.filter((_, i) => i !== index));
    setReviewedDocs(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const handleMarkReviewed = (index: number) => {
    setReviewedDocs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
    // Remove from denied when approved
    setDeniedDocs(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const handleDenyDocument = (index: number) => {
    setDeniedDocs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
    // Remove from reviewed when denied
    setReviewedDocs(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const uniqueDocTypes = new Set(uploadedDocs.map(d => d.docType));
  const remainingSlots = 5 - uniqueDocTypes.size;
  const pendingReviewCount = uploadedDocs.length - reviewedDocs.size - deniedDocs.size;
  const approvedCount = reviewedDocs.size;
  const deniedCount = deniedDocs.size;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ingestion & Security</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Upload required financial documents securely with automatic PII redaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="md:col-span-1 lg:col-span-2 card-simple">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" /> Document Upload
                </CardTitle>
                <CardDescription>Add required documents (up to 5)</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Configure Schema</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" /> Dynamic Schema Mapping
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Map raw AI extracted data to your bank's standard schema:</p>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {schemaMappings.map((mapping, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded border border-card-border">
                          <div className="flex-1">
                            <p className="text-sm font-mono text-muted-foreground">{mapping.raw}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <div className="flex-1">
                            <Select defaultValue={mapping.mapped}>
                              <SelectTrigger className="text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="EBITDA_Current_Year">EBITDA_Current_Year</SelectItem>
                                <SelectItem value="Revenue_Current_Year">Revenue_Current_Year</SelectItem>
                                <SelectItem value="Net_Profit">Net_Profit</SelectItem>
                                <SelectItem value="Total_Assets">Total_Assets</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full">Save Schema Configuration</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Document Type Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Document Type</label>
                <div className="flex gap-2">
                  <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger className="flex-1" data-testid="select-doc-type">
                      <SelectValue placeholder="Choose document type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedDocumentTypes.map((docType) => (
                        <SelectItem
                          key={docType}
                          value={docType}
                          disabled={uploadedDocs.includes(docType)}
                        >
                          {docType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleAddDocument}
                    disabled={!selectedDocType || remainingSlots === 0}
                    data-testid="button-add-doc"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Drag & Drop Upload Area */}
              {selectedDocType && (
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? "border-primary bg-primary/10"
                      : "border-card-border hover:border-primary"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="drop-zone"
                >
                  <UploadCloud className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <h4 className="font-semibold mb-1 text-sm sm:text-base">Drag files here or click to upload</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">PDF, DOC, DOCX, XLSX</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleInputChange}
                    className="hidden"
                    data-testid="file-input"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                </div>
              )}

              {/* Remaining Slots */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {uniqueDocTypes.size}/5 Document Types
                </Badge>
                <span>{remainingSlots} type{remainingSlots !== 1 ? "s" : ""} remaining</span>
              </div>

              {/* Uploaded Files */}
              {uploadedDocs.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Uploaded Files ({uploadedDocs.length})</h4>
                    {enableHumanReview && (pendingReviewCount > 0 || deniedCount > 0) && (
                      <div className="flex gap-2">
                        {deniedCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {deniedCount} denied
                          </Badge>
                        )}
                        {pendingReviewCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {pendingReviewCount} pending
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {uploadedDocs.map((file, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded border transition-colors ${
                          deniedDocs.has(index)
                            ? "border-red-500/30 bg-red-500/5"
                            : reviewedDocs.has(index)
                            ? "border-blue-500/30 bg-blue-500/5"
                            : "border-green-500/30 bg-green-500/5"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                            deniedDocs.has(index) 
                              ? "text-red-600" 
                              : reviewedDocs.has(index) 
                              ? "text-blue-600" 
                              : "text-green-600"
                          }`} />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{file.fileName}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                              <span>{file.docType} • {formatFileSize(file.fileSize)}</span>
                              <Badge variant="secondary" className="text-xs h-fit bg-primary/10 text-primary border-primary/30">
                                Detected: {file.docType.split("(")[0].trim()}
                              </Badge>
                              {deniedDocs.has(index) && (
                                <Badge variant="destructive" className="text-xs h-fit">Denied</Badge>
                              )}
                              {reviewedDocs.has(index) && (
                                <Badge variant="default" className="text-xs h-fit">Approved</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          {enableHumanReview && (
                            <>
                              <button
                                onClick={() => handleMarkReviewed(index)}
                                className={`p-1 rounded transition-colors ${
                                  reviewedDocs.has(index)
                                    ? "text-blue-600 bg-blue-500/10"
                                    : "text-muted-foreground hover:text-blue-600"
                                }`}
                                title={reviewedDocs.has(index) ? "Mark as unapproved" : "Approve document"}
                                data-testid={`button-approve-file-${index}`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDenyDocument(index)}
                                className={`p-1 rounded transition-colors ${
                                  deniedDocs.has(index)
                                    ? "text-red-600 bg-red-500/10"
                                    : "text-muted-foreground hover:text-red-600"
                                }`}
                                title={deniedDocs.has(index) ? "Mark as undecided" : "Deny document"}
                                data-testid={`button-deny-file-${index}`}
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="p-1 text-muted-foreground hover:text-destructive"
                            data-testid={`button-remove-file-${index}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {remainingSlots === 0 && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600 text-sm">All document types added</AlertTitle>
                  <AlertDescription className="text-xs">
                    You have uploaded all 5 required document types. Ready to proceed to workspace.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="card-simple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="w-4 h-4" /> Human-in-the-Loop
                </CardTitle>
                <CardDescription className="text-xs">Review & classify documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-2 p-3 rounded bg-card border border-card-border">
                  <div>
                    <p className="font-semibold text-sm">Enable Review</p>
                    <p className="text-xs text-muted-foreground">Manual classification</p>
                  </div>
                  <Switch checked={enableHumanReview} onCheckedChange={setEnableHumanReview} data-testid="toggle-human-review" />
                </div>

                {enableHumanReview && (
                  <div className="rounded border border-blue-500/30 bg-blue-500/5 p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Uploaded:</span>
                      <span className="font-semibold">{uploadedDocs.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Approved:</span>
                      <span className="font-semibold text-blue-600">{approvedCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Denied:</span>
                      <span className="font-semibold text-red-600">{deniedCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending Review:</span>
                      <span className="font-semibold text-orange-600">{pendingReviewCount}</span>
                    </div>
                    {pendingReviewCount === 0 && uploadedDocs.length > 0 && (
                      <div className="text-xs text-blue-600 font-medium pt-2 border-t border-blue-500/20">
                        ✓ All documents reviewed
                      </div>
                    )}
                  </div>
                )}

                <Alert className={`text-xs ${enableHumanReview ? "border-blue-500/50 bg-blue-500/10" : "border-gray-500/50 bg-gray-500/10"}`}>
                  <AlertTitle className={`text-sm font-semibold mb-1 ${enableHumanReview ? "text-blue-600" : "text-muted-foreground"}`}>
                    {enableHumanReview ? "Review Active" : "Review Disabled"}
                  </AlertTitle>
                  <AlertDescription>
                    {enableHumanReview
                      ? "Click the eye icon on each file to mark it as reviewed and classified."
                      : "Enable human-in-the-loop review to manually classify uploaded documents."}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="card-simple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldAlert className="w-4 h-4" /> Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4 p-3 rounded bg-card border border-card-border">
                  <div>
                    <p className="font-semibold text-sm">Auto-Redact PII</p>
                    <p className="text-xs text-muted-foreground">Sanitize data</p>
                  </div>
                  <Switch checked={isRedacting} onCheckedChange={setIsRedacting} />
                </div>

                <div className="rounded border border-card-border p-3 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Account:</span>
                    <span className={isRedacting ? "text-muted-foreground" : "text-emerald-400"}>{isRedacting ? "███████████████" : "Vivriti Capital"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PAN:</span>
                    <span className={isRedacting ? "text-muted-foreground" : "text-emerald-400"}>{isRedacting ? "██████████" : "AABCV1234F"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertTitle className="text-red-500 text-sm font-bold mb-1">Alert</AlertTitle>
              <AlertDescription className="text-xs">
                15% discrepancy between GSTR-2A and GSTR-3B. Manual review needed.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
