import React from "react";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function NavBar({ currentView, onViewChange }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600">QuizMaster</h1>
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentView === "dashboard"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </button>
            {user.role === "admin" && (
              <button
                onClick={() => setCurrentView("admin")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "admin"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Admin
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </div>
          <button className="p-2 text-gray-400 hover:text-red-500">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
