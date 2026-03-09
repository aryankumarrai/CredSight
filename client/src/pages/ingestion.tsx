import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UploadCloud, 
  FileText, 
  FileJson, 
  CheckCircle2, 
  ShieldAlert, 
  EyeOff, 
  AlertOctagon,
  Sparkles,
  Lock
} from "lucide-react";
import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Ingestion() {
  const [isRedacting, setIsRedacting] = useState(true);

  const files = [
    { name: "FY23_GST_Filings.zip", type: "archive", status: "processed", icon: FileJson },
    { name: "ITR_Acknowledgment_22-23.pdf", type: "pdf", status: "processed", icon: FileText },
    { name: "HDFC_Bank_Statement_6M.csv", type: "csv", status: "processed", icon: FileText },
    { name: "Audited_Annual_Report_Scanned.pdf", type: "pdf", status: "vlm-processing", icon: FileText },
  ];

  return (
    <AppLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold font-display text-gradient mb-2">Ingestion & Security Dashboard</h1>
          <p className="text-muted-foreground">The Data Ingestor: Securely process unstructured and semi-structured financial documents.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Drag & Drop Zone */}
          <Card className="lg:col-span-2 glass-panel border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <UploadCloud className="w-5 h-5 text-primary" />
                Multi-Format Ingestion Zone
              </CardTitle>
              <CardDescription>Upload GST filings, ITRs, Bank Statements, and Scanned PDFs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors duration-300 rounded-xl bg-black/20 p-10 flex flex-col items-center justify-center text-center cursor-pointer hover-elevate mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Drag & Drop Files Here</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Support for PDF, CSV, ZIP, JSON. Our engine automatically classifies and extracts context.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">Processed Documents</h4>
                {files.map((file, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    key={file.name} 
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-white/5">
                        <file.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {file.status === "vlm-processing" ? (
                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 py-1 px-3 shadow-[0_0_15px_rgba(99,102,241,0.15)] flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          VLM Vision Parsing: Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-none flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Extracted
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Security & Alerts */}
          <div className="space-y-6">
            <Card className="glass-panel relative overflow-hidden border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0"></div>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldAlert className="w-5 h-5 text-indigo-400" />
                  Enterprise Security Shield
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 mb-6">
                  <div className="space-y-1">
                    <Label className="text-base font-semibold text-white">Auto-Redact PII</Label>
                    <p className="text-xs text-muted-foreground">Sanitize before AI processing</p>
                  </div>
                  <Switch 
                    checked={isRedacting} 
                    onCheckedChange={setIsRedacting}
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>

                <div className="relative rounded-lg border border-white/10 bg-white/[0.01] p-4 font-mono text-[10px] leading-relaxed text-muted-foreground h-[140px] overflow-hidden">
                  <div className="absolute top-2 right-2 p-1.5 rounded bg-black/50 border border-white/5 backdrop-blur-sm flex items-center gap-1">
                    {isRedacting ? <Lock className="w-3 h-3 text-indigo-400" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                    <span className="text-[9px] uppercase tracking-widest text-white">{isRedacting ? "Protected" : "Exposed"}</span>
                  </div>
                  
                  <div className="space-y-2 opacity-80">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white">Account Holder:</span>
                      <span className={isRedacting ? "bg-black text-black px-1 select-none" : "text-emerald-400"}>
                        {isRedacting ? "████████████" : "Aarav Sharma"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white">PAN Number:</span>
                      <span className={isRedacting ? "bg-black text-black px-1 select-none" : "text-emerald-400"}>
                        {isRedacting ? "██████████" : "ABCDE1234F"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white">Account No:</span>
                      <span className={isRedacting ? "bg-black text-black px-1 select-none" : "text-emerald-400"}>
                        {isRedacting ? "██████████████" : "00129485736291"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">IFSC Code:</span>
                      <span className="text-muted-foreground">HDFC0001234</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Alert className="border-red-500/30 bg-red-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <AlertOctagon className="h-5 w-5 text-red-400" />
                <AlertTitle className="text-red-400 font-semibold tracking-wide uppercase text-xs mb-1">
                  Indian Context Discrepancy Alert
                </AlertTitle>
                <AlertDescription className="text-red-200/90 text-sm mt-2">
                  <span className="font-bold text-white">Alert:</span> 15% discrepancy detected between <strong>GSTR-2A</strong> (Input Tax Credit) and <strong>GSTR-3B</strong> (Sales Liability). Requires manual review.
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
