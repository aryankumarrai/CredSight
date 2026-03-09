import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Database, 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  Activity,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { title: "Ingestion & Security", url: "/ingestion", icon: Database },
    { title: "Digital Workspace", url: "/workspace", icon: LayoutDashboard },
    { title: "CAM Output", url: "/output", icon: FileText },
  ];

  const style = {
    "--sidebar-width": "17rem",
    "--sidebar-width-icon": "4rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <Sidebar variant="sidebar" className="border-r border-white/5">
          <SidebarHeader className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight tracking-tight text-white">Credi<span className="text-primary">Lens</span></span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">AI Assessment Engine</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-6">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground/70 mb-4">
                Evaluation Workflow
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {navItems.map((item) => {
                    const isActive = location === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive}
                          className={`
                            h-11 px-4 transition-all duration-300 rounded-xl
                            ${isActive 
                              ? "bg-primary/10 text-primary hover:bg-primary/15" 
                              : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            }
                          `}
                        >
                          <Link href={item.url} className="flex items-center w-full">
                            <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-primary" : "text-muted-foreground/70"}`} />
                            <span className="font-medium text-sm">{item.title}</span>
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary/50" />}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <div className="mt-auto absolute bottom-6 left-6 right-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">Bank-Grade Security</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  End-to-end encryption active. All PII data is auto-redacted before external processing.
                </p>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="flex-1 p-6 lg:p-10 z-10 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
