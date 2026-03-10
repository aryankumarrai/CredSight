import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Onboarding from "./pages/onboarding";
import Ingestion from "./pages/ingestion";
import Workspace from "./pages/workspace";
import Output from "./pages/output";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/onboarding" />
      </Route>
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/ingestion" component={Ingestion} />
      <Route path="/workspace" component={Workspace} />
      <Route path="/output" component={Output} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
