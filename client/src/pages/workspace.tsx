import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, Scale, TrendingUp, AlertTriangle, Zap, MessageSquare } from "lucide-react";
import { RiskGauge } from "@/components/risk-gauge";
import { Button } from "@/components/ui/button";

export default function Workspace() {
  const [observation, setObservation] = useState("Factory found operating at 40% capacity");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 800);
  };

  return (
    <AppLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-gradient mb-2">Digital Credit Manager Workspace</h1>
            <p className="text-muted-foreground">The Research Agent: Active collaboration between human officer and AI intelligence.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Agent Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Workspace Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-panel border-white/5 h-full flex flex-col">
              <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Primary Due Diligence
                </CardTitle>
                <CardDescription>Enter credit officer observations to update the dynamic risk model.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                    Credit Officer Observations
                    <Badge variant="outline" className="bg-primary/5 text-primary/80 border-primary/20 text-[10px]">Human Input</Badge>
                  </label>
                  <Textarea 
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    className="min-h-[120px] bg-black/40 border-white/10 text-base resize-none focus-visible:ring-primary/50"
                    placeholder="Enter on-ground observations..."
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleUpdate} 
                      disabled={isUpdating}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:-translate-y-0.5"
                    >
                      {isUpdating ? "Recalculating..." : "Sync to Risk Model"}
                    </Button>
                  </div>
                </div>

                <div className="mt-auto p-6 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px]" />
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-5 h-5 text-amber-400" />
                        <h3 className="text-lg font-bold text-white">Dynamic AI Risk Engine</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The AI continuously recalculates the baseline risk score by fusing your primary observations with external metadata and ingestion documents.
                      </p>
                    </div>
                    <div className="w-[200px] shrink-0">
                      <RiskGauge score={72} trend="up" trendValue={2} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: External Feed */}
          <div className="space-y-6">
            <Card className="glass-panel border-white/5 h-full">
              <CardHeader className="border-b border-white/5 bg-white/[0.01]">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5 text-indigo-400" />
                  External Intelligence Feed
                </CardTitle>
                <CardDescription>Live web crawling & metadata</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {/* News Item */}
                  <div className="p-5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-indigo-400 border-indigo-400/30 bg-indigo-400/5">News Crawler</Badge>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <h4 className="text-sm font-medium text-white mb-2 leading-snug">
                      New RBI regulations impacting sector: Tighter liquidity norms expected for mid-tier manufacturers.
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-amber-400/80 bg-amber-400/10 px-2 py-1 rounded w-fit">
                      <TrendingUp className="w-3 h-3" />
                      <span>Sector Headwind Detected</span>
                    </div>
                  </div>

                  {/* Litigation Item */}
                  <div className="p-5 hover:bg-white/[0.02] transition-colors bg-red-500/[0.02]">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-red-400 border-red-400/30 bg-red-400/5 flex items-center gap-1">
                        <Scale className="w-3 h-3" /> e-Courts Tracker
                      </Badge>
                      <span className="text-xs text-muted-foreground">Live Pull</span>
                    </div>
                    <h4 className="text-sm font-medium text-white mb-2 leading-snug">
                      Active Litigation Found: Vendor dispute filed at District Court, Pune.
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-red-400/80 bg-red-400/10 px-2 py-1 rounded w-fit">
                      <AlertTriangle className="w-3 h-3" />
                      <span>High Legal Risk</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 p-2 bg-black/40 rounded border border-white/5 font-mono">
                      Case ID: MH-PN-2023-8991<br/>Status: Pending Hearing
                    </p>
                  </div>
                  
                  {/* Promoter Item */}
                  <div className="p-5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/5">Promoter Check</Badge>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <h4 className="text-sm font-medium text-white mb-1 leading-snug">
                      Cross-holding analysis clear. No shell company directors found.
                    </h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
