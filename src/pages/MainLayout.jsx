import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function MainLayout ({children}){
    const [isOpen, setIsOpen]=useState(false);
        return(
         
           <div className="min-h-screen bg-white-50 white:bg-neutral-950">
      <Header onMenuClick={() => setIsOpen((prev) => !prev)} />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div
        className={`mx-auto max-w-full p-6 
        ${isOpen ? "ml-[200px]" : "ml-0"}`}
      >
            {children}
            </div>
            </div>
            
        );
} 