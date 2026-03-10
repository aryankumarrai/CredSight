import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, Lock, AlertCircle } from "lucide-react";
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

export default function Ingestion() {
  const [isRedacting, setIsRedacting] = useState(true);
  const [selectedDocType, setSelectedDocType] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const allowedDocumentTypes = [
    "ALM (Asset-Liability Management)",
    "Shareholding Pattern",
    "Borrowing Profile",
    "Annual Reports (P&L, Cashflow, Balance Sheet)",
    "Portfolio Cuts/Performance Data",
  ];

  const files = [
    { name: "GST Filings", type: "processed" },
    { name: "ITR 2022-23", type: "processed" },
    { name: "Bank Statements", type: "processed" },
    { name: "Annual Report", type: "vlm-processing" },
  ];

  const handleAddDocument = () => {
    if (selectedDocType && uploadedDocs.length < 5 && !uploadedDocs.includes(selectedDocType)) {
      setUploadedDocs([...uploadedDocs, selectedDocType]);
      setSelectedDocType("");
    }
  };

  const handleRemoveDocument = (docType: string) => {
    setUploadedDocs(uploadedDocs.filter(doc => doc !== docType));
  };

  const remainingSlots = 5 - uploadedDocs.length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ingestion & Security</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Upload required financial documents securely with automatic PII redaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="md:col-span-1 lg:col-span-2 card-simple">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Document Upload
              </CardTitle>
              <CardDescription>Add required documents (up to 5)</CardDescription>
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

              {/* Remaining Slots */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {uploadedDocs.length}/5 Documents
                </Badge>
                <span>{remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} remaining</span>
              </div>

              {/* Uploaded Documents */}
              {uploadedDocs.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-semibold">Uploaded Documents</h4>
                  {uploadedDocs.map((docType) => (
                    <div
                      key={docType}
                      className="flex items-center justify-between p-3 rounded border border-green-500/30 bg-green-500/5"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{docType}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveDocument(docType)}
                        className="text-xs text-muted-foreground hover:text-destructive"
                        data-testid={`button-remove-${docType}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {remainingSlots === 0 && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600 text-sm">All slots filled</AlertTitle>
                  <AlertDescription className="text-xs">
                    You have uploaded all required documents. Ready to proceed.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
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
                    <span className={isRedacting ? "text-muted-foreground" : "text-emerald-400"}>{isRedacting ? "████" : "Aarav"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PAN:</span>
                    <span className={isRedacting ? "text-muted-foreground" : "text-emerald-400"}>{isRedacting ? "██████" : "ABCD1234F"}</span>
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
