import { signOut } from "aws-amplify/auth";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const linkClasses = ({ isActive }) =>
    `mb-2  text-sm font-medium transition-all duration-150 ${
      isActive
        ? " text-secondary shadow-sm "
        : "text-black  hover:text-primary "
    }`;

  const handleLogout = async () => {
    await signOut({ global: true });
    setUser(null);
    navigate("/signin");
  };
  return (
    <div
      className={`
        fixed top-[65px] bottom-0 left-0 w-[250px] bg-gray-100 z-50
          shadow-lg shadow-indigo-500/30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 " : "-translate-x-full "}
      `}
    >
      <div className="absolute left-[211px] top-4 cursor">
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
          </svg>
        </button>
      </div>
      <div className="absolute left-1 top-6 ml-[20px]">
        <ul>
          {/* <li>
            <NavLink to="/">Home</NavLink>
          </li>*/}
          <li>
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/beneficiary" className={linkClasses}>
              Beneficiaries
            </NavLink>
          </li>
          <li>
          <NavLink to="/beneficiary/last_will" className={linkClasses} end>
              Will
            </NavLink>
            </li>
        </ul>
      </div>
      <div className="absolute bottom-4 left-4 sm:hidden ">
        <button
          onClick={handleLogout}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
