import type { FC, ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Settings,
  HelpCircle,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  onToggle?: () => void;
};

const NavItem: FC<{
  label: string;
  active?: boolean;
  icon: ReactNode;
  collapsed: boolean;
}> = ({ label, active, icon, collapsed }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
        active ? "bg-gray-100 font-semibold" : ""
      }`}
      title={collapsed ? label : undefined}
    >
      <div className="w-5 h-5 shrink-0 text-gray-700">{icon}</div>
      {!collapsed && <span className="truncate">{label}</span>}
    </div>
  );
};

export const Sidebar: FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const width = collapsed ? "w-20" : "w-64";

  return (
    <aside
      className={`${width} fixed top-16 bottom-0 left-0 border-r bg-white z-40 flex flex-col`}
    >
      <div className="px-3 py-4 text-xs text-gray-500">
        {!collapsed ? "GENERAL" : ""}
      </div>
      <div className="px-2 space-y-1">
        <NavItem
          collapsed={collapsed}
          label="Dashboard"
          icon={<LayoutDashboard />}
        />

        <div className={`rounded-lg ${collapsed ? "" : "bg-gray-50"}`}>
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-700" />
              {!collapsed && (
                <span className="font-medium">User Management</span>
              )}
            </div>
            {!collapsed && <ChevronDown className="w-4 h-4 text-gray-600" />}
          </div>
          <div className={`pl-3 pr-2 ${collapsed ? "hidden" : "block"}`}>
            <NavItem
              collapsed={false}
              label="Riders"
              active
              icon={<UserCircle2 />}
            />
            <NavItem collapsed={false} label="Drivers" icon={<UserCircle2 />} />
          </div>
        </div>

        <NavItem collapsed={collapsed} label="Settings" icon={<Settings />} />
        <NavItem collapsed={collapsed} label="Help" icon={<HelpCircle />} />
      </div>

      <div className="mt-auto p-3">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50"
        >
          {collapsed ? (
            <>
              <ChevronsRight className="w-4 h-4" />
              {!collapsed && <span>Expand</span>}
            </>
          ) : (
            <>
              <ChevronsLeft className="w-4 h-4" />
              {!collapsed && <span>Collapse</span>}
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
