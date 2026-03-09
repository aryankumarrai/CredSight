import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, Lock } from "lucide-react";
import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Ingestion() {
  const [isRedacting, setIsRedacting] = useState(true);

  const files = [
    { name: "GST Filings", type: "processed" },
    { name: "ITR 2022-23", type: "processed" },
    { name: "Bank Statements", type: "processed" },
    { name: "Annual Report", type: "vlm-processing" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ingestion & Security</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Process financial documents securely with automatic PII redaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="md:col-span-1 lg:col-span-2 card-simple">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> File Ingestion
              </CardTitle>
              <CardDescription>Upload financial documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-card-border hover:border-primary rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors mb-6">
                <UploadCloud className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-bold mb-1 text-sm sm:text-base">Drag Files Here</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">PDF, CSV, ZIP</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold mb-3">Uploaded Files</h4>
                {files.map((file) => (
                  <div key={file.name} className="flex items-center justify-between p-3 rounded border border-card-border hover-simple">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    {file.type === "vlm-processing" ? (
                      <Badge className="bg-primary/20 text-primary text-xs">VLM: Active</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs"><CheckCircle2 className="w-3 h-3 mr-1" /> Done</Badge>
                    )}
                  </div>
                ))}
              </div>
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
