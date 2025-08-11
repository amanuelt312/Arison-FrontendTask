import { ChevronDown, ChevronRight } from "lucide-react";
import type { FC } from "react";
import type { NavItemType } from "../../types/NavTypes";

export const NavItem: FC<{
  item: NavItemType;
  active?: boolean;
  collapsed: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  hasChildren?: boolean;
  isParentActive?: boolean;
}> = ({
  item,
  active,
  collapsed,
  isExpanded,
  onToggle,
  hasChildren,
  isParentActive,
}) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        collapsed ? "pl-4" : "px-3"
      } py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
        active || isParentActive ? "bg-blue-100 text-blue-700 " : ""
      }`}
      title={collapsed ? item.name : undefined}
      onClick={onToggle}
    >
      {item.icon && (
        <div className="w-5 h-5 shrink-0 text-gray-700">{item.icon}</div>
      )}
      {!collapsed && (
        <>
          <span
            className={`truncate flex-1 ${
              active || isParentActive
                ? "text-primary font-semibold "
                : "text-gray-400 text-sm"
            }`}
          >
            {item.name}
          </span>
          {hasChildren && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const NavChildItem: FC<{
  name: string;
  path: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}> = ({ name, path, active, collapsed, onClick }) => {
  return (
    <div className="relative">
      {/* Vertical branch line */}
      <div className="absolute left-6 top-0 w-px h-full bg-gray-400" />

      {/* Horizontal branch line */}
      <div className="absolute left-6 top-1/2 w-2 h-px bg-gray-400 transform -translate-y-1/2" />

      <div
        className={`ml-8 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-lg ${
          active ? " text-blue-700 font-semibold" : ""
        }`}
        onClick={onClick}
      >
        {!collapsed && <span className="text-sm">{name}</span>}
      </div>
    </div>
  );
};
