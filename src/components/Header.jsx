import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { signOut } from "aws-amplify/auth";
import { HiMenu } from "react-icons/hi";
export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const name = user?.firstName || "Guest";

  const handleLogout = async () => {
    await signOut({ global: true });

    setUser(null);

    navigate("/signin", { replace: true });
  };

  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-indigo-600 text-white shadow-sm"
        : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:bg-neutral-900/70 dark:border-neutral-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center justify-start gap-3 cursor-pointer select-none">
          <div>
            <button onClick={onMenuClick} aria-label="Open menu">
              <HiMenu />
            </button>
          </div>
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-start gap-2"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-lg shadow">
              C
            </div>
            <div className="text-base font-semibold text-gray-800 dark:text-gray-100">
              Customer Portal
            </div>
          </div>
        </div>

        <div className="hidden sm:inline">
          <nav className="flex items-center gap-4">
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
            <NavLink to="/beneficiary" className={linkClasses} end>
              Beneficiaries
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-200 font-medium">
            <span className="text-xs">Hello,</span>
            {name}
            <div>Account</div>
          </span>

          <button
            onClick={handleLogout}
            className="hidden sm:inline rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
