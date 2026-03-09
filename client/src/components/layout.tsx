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
      <header className="border-b border-card-border" style={{ backgroundColor: "#181915" }}>
        <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/logo.png" alt="CredSight" className="h-10 sm:h-12 md:h-14 w-auto" />
          </Link>
          
          <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = location === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-foreground hover:text-primary-foreground"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "var(--nav-hover)" }
                      : {}
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "var(--nav-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "";
                    }
                  }}
                  data-testid={`nav-link-${item.title.toLowerCase()}`}
                >
                  <item.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
