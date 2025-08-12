import type { FC } from "react";
import { useEffect, useState } from "react";
import { Bell, PanelRightOpen, Mail } from "lucide-react";
import { SearchInput } from "../ui/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { apiFetch } from "../../lib/api";
import { useDrivers } from "../../hooks/useDrivers";
import { resolveMediaUrl, PLACEHOLDER_IMAGE } from "../../config/images";
import Loading from "../ui/Loading";

type NavbarProps = {
  onToggleSidebar: () => void;
  collapsed: boolean;
};

export const Navbar: FC<NavbarProps> = ({ onToggleSidebar, collapsed }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(searchQuery.trim()), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

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

  const searchEnabled = debounced.length > 0;
  const searchResult = useDrivers({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
    serviceLevelId: undefined,
    search: searchEnabled ? debounced : undefined,
  });
  const users = searchResult.data?.users || [];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white z-50">
      <div className="h-full px-4 flex items-center gap-4 relative">
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

        <div className="hidden md:flex items-center gap-2 w-full max-w-xl mx-auto relative">
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          {searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-auto">
              {searchResult.isLoading ? (
                <div className="p-3">
                  <Loading title="Searching…" size="sm" />
                </div>
              ) : users.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">No results</div>
              ) : (
                users.map((u) => {
                  const avatar = resolveMediaUrl((u as any).profilePicture);
                  return (
                    <button
                      key={u._id}
                      className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        navigate(`/drivers/${u._id}`);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={avatar || PLACEHOLDER_IMAGE}
                        alt="avatar"
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {u.fullName || "-"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {u.mobileNumber || "-"}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
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
        <div className="flex items-center justify-end gap-3 shrink-0 relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onBlur={() => setMenuOpen(false)}
            className="cursor-pointer"
          >
            <img
              src={resolveMediaUrl(user?.profilePicture) || PLACEHOLDER_IMAGE}
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>
          <div
            className="hidden sm:block leading-tight cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="text-sm font-semibold">{user?.fullName || ""}</div>
            <div className="text-xs text-gray-500">{user?.role || ""}</div>
          </div>

          {menuOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-md shadow-md py-2 w-40">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => navigate("/user-management")}
              >
                Dashboard
              </button>
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
      </div>
    </header>
  );
};

export default Navbar;
