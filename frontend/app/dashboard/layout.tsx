'use client';

import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shared Header / Navbar */}
      <header className="bg-white shadow px-3 py-3 sm:px-4 sm:py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Dashboard</h1>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              <LogOut size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden xs:inline sm:inline">Logout</span>
              <span className="xs:hidden sm:hidden">Exit</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

