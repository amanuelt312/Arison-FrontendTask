import type { FC, ReactNode } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type AppLayoutProps = { children: ReactNode };

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256; // px

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed((v) => !v)}
      />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <main
        className="p-6"
        style={{ marginLeft: sidebarWidth, paddingTop: 64 }}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
