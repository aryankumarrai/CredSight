import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Database, LayoutDashboard, FileText } from "lucide-react";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { title: "Ingestion", url: "/ingestion", icon: Database },
    { title: "Workspace", url: "/workspace", icon: LayoutDashboard },
    { title: "Output", url: "/output", icon: FileText },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <header className="border-b border-card-border bg-card">
        <div className="px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="CredSight" className="h-8 w-auto" />
          </Link>
          
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                  data-testid={`nav-link-${item.title.toLowerCase()}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
