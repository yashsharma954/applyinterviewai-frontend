// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
        location.pathname === path
          ? "bg-amber/10 text-amber"
          : "text-slate hover:text-offwhite"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="border-b border-white/5 bg-ink-light/50 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center">
            <span className="text-ink font-display font-bold text-xs">A</span>
          </div>
          <span className="font-display font-semibold text-offwhite">ApplyAI</span>
        </div>

        <div className="flex items-center gap-1">
          {navLink("/dashboard", "Dashboard")}
          {navLink("/resume", "Resume")}
          {navLink("/preferences", "Preferences")}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate hidden sm:block">{user?.fullName}</span>
          <button
            onClick={logout}
            className="text-sm px-3 py-1.5 rounded-lg border border-white/10 text-slate hover:text-offwhite hover:border-white/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;