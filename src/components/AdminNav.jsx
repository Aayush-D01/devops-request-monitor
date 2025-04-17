
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, LayoutDashboard } from "lucide-react";

export const AdminNav = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container max-w-7xl flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold text-gray-900 flex items-center">
            <ClipboardList className="h-6 w-6 mr-2 text-primary" />
            License Manager
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Customer View
            </Link>
            <Link to="/admin" className="text-gray-900 font-medium">
              Admin Dashboard
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              Customer View
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
