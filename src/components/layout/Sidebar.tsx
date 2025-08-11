import type { FC } from "react";
import { useState } from "react";
import {
  Users,
  Settings,
  HelpCircle,
  PanelRightClose,
  School,
  ScrollText,
  ChartNoAxesCombined,
  Trophy,
  House,
  ChevronDown,
} from "lucide-react";
import type { NavItemType, SidebarProps } from "../../types/NavTypes";
import { NavChildItem, NavItem } from "../nav/NavItem";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { apiFetch } from "../../lib/api";

export const Sidebar: FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string>("Dashboard");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const width = collapsed ? "w-20" : "w-64";

  const navItems: NavItemType[] = [
    { name: "Dashboard", icon: <House />, path: "/" },
    {
      name: "User Management",
      icon: <Users />,
      children: [
        { name: "Riders", path: "/drivers" },
        { name: "Drivers", path: "/drivers" },
      ],
    },
    {
      name: "Admin Management",
      icon: <School />,
      children: [
        { name: "Admin", path: "/admins" },
        { name: "Support", path: "/support" },
      ],
    },
    { name: "Pricing & Tariff", icon: <ScrollText />, path: "/pricing-tariff" },
    { name: "Financials", icon: <ChartNoAxesCombined />, path: "/financials" },
    {
      name: "Support & Disputes",
      icon: <Users />,
      path: "/support-disputes",
    },
    {
      name: "Loyality & Rewards",
      icon: <Trophy />,
      path: "/loyality-rewards",
    },
  ];

  const ToolItems: NavItemType[] = [
    { name: "Account & Settings", icon: <Settings />, path: "/settings" },
    { name: "Help", icon: <HelpCircle />, path: "/help" },
  ];

  const handleItemClick = (item: NavItemType) => {
    if (item.children) {
      // Toggle expanded state for items with children
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(item.name)) {
          newSet.delete(item.name);
        } else {
          newSet.add(item.name);
        }
        return newSet;
      });
    } else if (item.path) {
      navigate(item.path);
    }

    // Set selected item for all items (with or without children)
    setSelectedItem(item.name);
  };

  const handleChildClick = (childName: string, childPath: string) => {
    setSelectedItem(childName);
    if (childPath) navigate(childPath);
  };

  const handleLogout = async () => {
    try {
      if (user?._id) {
        await apiFetch("/api/v1/auth/logout", {
          method: "POST",
          body: JSON.stringify({ userId: user._id }),
        });
      }
    } catch (_) {
      // ignore API error during logout
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  const renderNavItems = (items: NavItemType[]) => {
    return items.map((item) => {
      const isExpanded = expandedItems.has(item.name);
      const hasChildren = item.children && item.children.length > 0;
      const isActive = selectedItem === item.name;

      // Check if any child is selected to highlight parent
      const isParentActive =
        hasChildren &&
        item.children?.some((child) => selectedItem === child.name);

      return (
        <div key={item.name}>
          <NavItem
            item={item}
            active={isActive}
            collapsed={collapsed}
            isExpanded={isExpanded}
            onToggle={() => handleItemClick(item)}
            hasChildren={hasChildren}
            isParentActive={isParentActive}
          />

          {/* Render children if expanded */}
          {hasChildren && isExpanded && !collapsed && item.children && (
            <div className="space-y-1">
              {item.children.map((child) => {
                const isChildActive = selectedItem === child.name;

                return (
                  <NavChildItem
                    key={child.name}
                    name={child.name}
                    path={child.path}
                    active={isChildActive}
                    collapsed={collapsed}
                    onClick={() => handleChildClick(child.name, child.path)}
                  />
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <aside
      className={`${width} fixed top-16 bottom-0 left-0 bg-white z-40 flex flex-col border-r border-gray-200`}
    >
      {collapsed ? (
        <div className="p-3">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <PanelRightClose className="w-5 h-5" />
          </button>
        </div>
      ) : null}

      <div className={`px-3 text-gray-500 ${collapsed ? "py-0" : "py-4"}`}>
        {!collapsed ? "GENERAL" : ""}
      </div>

      <div className="px-2 space-y-4 flex-1 ">{renderNavItems(navItems)}</div>
      <div
        className={`px-3  text-gray-500 mt-5 ${collapsed ? "py-0" : "py-3"}`}
      >
        {!collapsed ? "TOOLS" : ""}
      </div>
      <div className="px-2 space-y-2 flex-1 ">{renderNavItems(ToolItems)}</div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between px-2 flex-1">
          <div className="flex items-center justify-center gap-3 relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="User avatar"
                className="w-9 h-9 rounded-full"
              />
            </button>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold">
                {user?.fullName || ""}
              </div>
              <div className="text-xs text-gray-500">{user?.role || ""}</div>
            </div>
          </div>

          <div
            className="flex items-center justify-center cursor-pointer hover:text-gray-700"
            onClick={() => setProfileOpen((v) => !v)}
          >
            <ChevronDown />
          </div>
        </div>
        {profileOpen && (
          <div className=" bg-white border border-gray-200 rounded-md shadow-md  w-full">
            <button
              className="w-full text-left px-4 py-2 text-danger hover:bg-gray-50"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
