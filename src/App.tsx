import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Supplies from "@/pages/Supplies";
import Firewood from "@/pages/Firewood";
import HowWeWork from "@/pages/HowWeWork";
import Construction from "@/pages/Construction";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/supplies" component={Supplies} />
        <Route path="/firewood" component={Firewood} />
        <Route path="/how-we-work" component={HowWeWork} />
        <Route path="/construction" component={Construction} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
