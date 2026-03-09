import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Database, LayoutDashboard, FileText, ShieldCheck } from "lucide-react";
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
    { title: "Ingestion", url: "/ingestion", icon: Database },
    { title: "Workspace", url: "/workspace", icon: LayoutDashboard },
    { title: "Output", url: "/output", icon: FileText },
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={style}>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <Sidebar variant="sidebar" className="border-r border-card-border">
          <SidebarHeader className="p-4 border-b border-card-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">CrediLens</span>
                <span className="text-[10px] text-muted-foreground">AI Engine</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs text-muted-foreground mb-3">Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {navItems.map((item) => {
                    const isActive = location === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={isActive}
                          className={`h-10 px-3 rounded transition-colors ${isActive ? "bg-primary/20 text-primary" : "hover-simple"}`}
                        >
                          <Link href={item.url} className="flex items-center w-full">
                            <item.icon className="w-4 h-4 mr-2" />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          <div className="flex-1 p-8 w-full max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
