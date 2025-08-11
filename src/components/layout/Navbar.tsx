import type { FC } from "react";
import { useState } from "react";
import { Bell, PanelRightOpen, Mail } from "lucide-react";
import { SearchInput } from "../ui/SearchInput";
import { Link } from "react-router-dom";

type NavbarProps = {
  onToggleSidebar: () => void;
  collapsed: boolean;
};

export const Navbar: FC<NavbarProps> = ({ onToggleSidebar, collapsed }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white z-50">
      <div className="h-full px-4 flex items-center gap-4">
        <div className="flex justify-between w-56">
          <Link to={"/"}>
            <div className="font-bold text-xl text-primary">VoomGo</div>
          </Link>
          <button
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {!collapsed && <PanelRightOpen className="w-5 h-5" />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 w-full max-w-xl mx-auto">
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex md:hidden w-full"></div>
        <div className="flex items-center gap-2">
          <div className="relative bg-gray-100 rounded-full ">
            <button className="ml-auto p-2 rounded-lg hover:bg-gray-100">
              <Mail className="w-5 h-5" />
            </button>
            <span className="absolute -top-1 -right-1 bg-danger text-white text-xs  rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="relative bg-gray-100 rounded-full ">
            <button className="ml-auto p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <span className="absolute -top-1 -right-1 bg-danger text-white text-xs  rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div>
        </div>
        <div className="h-[60%] w-px bg-gray-300"></div>
        <div className="flex items-center justify-end gap-3 shrink-0">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="User avatar"
            className="w-9 h-9 rounded-full"
          />
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-semibold">Mensur M.</div>
            <div className="text-xs text-gray-500">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
