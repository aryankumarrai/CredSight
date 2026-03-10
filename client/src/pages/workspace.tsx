import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, Scale, TrendingUp, AlertTriangle, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Workspace() {
  const [observation, setObservation] = useState("Factory found operating at 40% capacity");

  const riskScore = 72;

  const feedItems = [
    { source: "News", title: "New RBI regulations impacting sector", tag: "Sector Risk", color: "text-amber-500" },
    { source: "e-Courts", title: "Vendor dispute filed at District Court, Pune", tag: "Legal Risk", color: "text-red-500" },
    { source: "Market Sentiment", title: "Positive sentiment for manufacturing sector amid recovery", tag: "Market Signal", color: "text-emerald-500" },
    { source: "Promoter", title: "Cross-holding analysis clear", tag: "Clean", color: "text-emerald-500" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Credit Manager Workspace</h1>
          <p className="text-sm sm:text-base text-muted-foreground">AI-assisted credit officer workspace with live external intelligence.</p>
        </div>

        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-600">AI Triangulation Active</AlertTitle>
          <AlertDescription className="text-xs">
            Cross-referencing Primary Officer Observations with Secondary Market Sentiment and External Intelligence Feeds
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="card-simple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Officer Observations
                </CardTitle>
                <CardDescription>Credit officer notes (primary due diligence)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  className="min-h-[100px] resize-none"
                  placeholder="Enter observations..."
                />
                <Button className="w-full">Sync to Risk Model</Button>
              </CardContent>
            </Card>

            <Card className="card-simple">
              <CardHeader>
                <CardTitle className="text-base">Dynamic AI Risk Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Current Risk Score</p>
                    <p className="text-4xl font-bold">{riskScore}</p>
                    <p className="text-xs text-primary mt-1">AI adjusting +2% based on capacity note</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{riskScore}%</div>
                    <div className="text-xs text-muted-foreground">High Risk</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="card-simple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="w-4 h-4" /> External Feed
                </CardTitle>
                <CardDescription>Live intelligence crawling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {feedItems.map((item, i) => (
                  <div key={i} className="p-3 rounded border border-card-border hover-simple">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="text-xs">{item.source}</Badge>
                    </div>
                    <p className="text-sm font-medium mb-2">{item.title}</p>
                    <Badge className={`text-xs ${item.color} bg-transparent border`}>{item.tag}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
