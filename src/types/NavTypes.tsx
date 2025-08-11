import type { ReactNode } from "react";

export type NavItemType = {
  name: string;
  icon?: ReactNode;
  path?: string;
  children?: { name: string; path: string }[];
};

export type SidebarProps = {
  collapsed: boolean;
  onToggle?: () => void;
};
