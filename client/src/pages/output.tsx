import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShieldAlert, Briefcase, Wallet, Building, FileSignature, Scale } from "lucide-react";

export default function Output() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const csData = [
    { name: "Character", icon: ShieldAlert, score: "Low", color: "text-red-500" },
    { name: "Capacity", icon: Briefcase, score: "Moderate", color: "text-amber-500" },
    { name: "Capital", icon: Wallet, score: "Strong", color: "text-emerald-500" },
    { name: "Collateral", icon: Building, score: "Strong", color: "text-emerald-500" },
    { name: "Conditions", icon: FileSignature, score: "Poor", color: "text-red-500" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <Badge variant="outline" className="mb-3">Recommendation Engine</Badge>
          <h1 className="text-3xl font-bold mb-2">Credit Appraisal Output</h1>
          <p className="text-muted-foreground">Final ML-based recommendation with explainability.</p>
        </div>

        <Card className="card-simple border-red-500/30 bg-red-500/5">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">FINAL DECISION</p>
              <h2 className="text-4xl font-bold mb-4">
                RECOMMENDATION: <span className="text-red-500">REJECT</span>
              </h2>
              <div className="flex justify-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Suggested Limit</p>
                  <p className="text-xl font-bold text-muted-foreground line-through">₹5.00 Cr</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Interest Rate</p>
                  <p className="text-xl font-bold text-muted-foreground">N/A</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">Five Cs Assessment</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {csData.map((item) => (
              <Card key={item.name} className="card-simple hover-simple">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <item.icon className={`w-5 h-5 mb-2 ${item.color}`} />
                  <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                  <Badge variant="outline" className="text-xs">{item.score}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="card-simple">
          <CardHeader>
            <CardTitle className="text-base">AI Explainability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              Rejected due to{" "}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button className="font-bold text-red-500 hover:text-red-400 border-b border-red-500 hover-dim">
                    high litigation risk
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Scale className="w-4 h-4" /> Court Document
                    </DialogTitle>
                  </DialogHeader>
                  <div className="bg-white text-black p-6 rounded text-sm space-y-3 max-h-[400px] overflow-y-auto">
                    <h3 className="font-bold text-center">District Court of Pune - Civil Suit 8991/2023</h3>
                    <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                      <p className="font-bold">Plaintiff:</p>
                      <p>Vendor Supplies Pvt Ltd vs Demo Company Ltd</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-2 bg-yellow-50">
                      <p className="font-bold text-red-600">Claim: ₹2.4 Crores outstanding payment</p>
                      <p className="text-sm">14 months default period</p>
                    </div>
                    <p className="text-xs text-gray-600">Status: Pending Hearing | Extracted: e-Courts Portal API</p>
                  </div>
                </DialogContent>
              </Dialog>
              {" "}found in secondary research, despite strong GST flows.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
