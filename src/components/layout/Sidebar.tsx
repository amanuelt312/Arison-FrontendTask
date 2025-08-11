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
} from "lucide-react";
import type { NavItemType, SidebarProps } from "../../types/NavTypes";
import { NavChildItem, NavItem } from "../nav/NavItem";

export const Sidebar: FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string>("Dashboard");

  const width = collapsed ? "w-20" : "w-64";

  const navItems: NavItemType[] = [
    { name: "Dashboard", icon: <House />, path: "/dashboard" },
    {
      name: "User Management",
      icon: <Users />,
      children: [
        { name: "Riders", path: "/riders" },
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
    }

    // Set selected item for all items (with or without children)
    setSelectedItem(item.name);
  };

  const handleChildClick = (childName: string, childPath: string) => {
    setSelectedItem(childName);
    console.log(childPath);
    // You can add navigation logic here
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
      <div className="px-2 space-y-2 flex-1 overflow-y-auto">
        {renderNavItems(ToolItems)}
      </div>
    </aside>
  );
};

export default Sidebar;
