import { Outlet, useSearchParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-white-50 white:bg-neutral-950">
      <Header onMenuClick={() => setIsOpen((prev) => !prev)} />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div
        className={` max-w-full p-6 
        ${isOpen ? "ml-[260px]" : "ml-0"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
