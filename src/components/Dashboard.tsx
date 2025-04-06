
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  Bed, 
  Receipt, 
  LogOut,
  User,
  BarChart
} from "lucide-react";
import Analytics from "@/components/Analytics";
import Patients from "@/components/Patients";
import Staff from "@/components/Staff";
import Appointments from "@/components/Appointments";
import Wards from "@/components/Wards";
import Billing from "@/components/Billing";
import DoctorDashboard from "@/components/DoctorDashboard";
import UserProfile from "@/components/UserProfile";

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Analytics user={user} />;
      case "patients":
        return <Patients user={user} />;
      case "staff":
        return <Staff user={user} />;
      case "appointments":
        return <Appointments user={user} />;
      case "wards":
        return <Wards user={user} />;
      case "billing":
        return <Billing user={user} />;
      case "doctor":
        return <DoctorDashboard user={user} />;
      case "profile":
        return <UserProfile user={user} />;
      default:
        return <Analytics user={user} />;
    }
  };
  
  // Define which menu items each role can see
  const getMenuItems = () => {
    const items = [];
    
    // All users can see the dashboard and profile
    items.push(
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
      { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> }
    );
    
    // Role-specific items
    if (user.role === "admin") {
      items.push(
        { id: "patients", label: "Patients", icon: <UserPlus className="h-5 w-5" /> },
        { id: "staff", label: "Staff", icon: <Users className="h-5 w-5" /> },
        { id: "appointments", label: "Appointments", icon: <Calendar className="h-5 w-5" /> },
        { id: "wards", label: "Wards & Beds", icon: <Bed className="h-5 w-5" /> },
        { id: "billing", label: "Billing", icon: <Receipt className="h-5 w-5" /> }
      );
    } else if (user.role === "doctor") {
      items.push(
        { id: "doctor", label: "My Patients", icon: <UserPlus className="h-5 w-5" /> },
        { id: "appointments", label: "Appointments", icon: <Calendar className="h-5 w-5" /> }
      );
    } else if (user.role === "nurse") {
      items.push(
        { id: "patients", label: "Patients", icon: <UserPlus className="h-5 w-5" /> },
        { id: "wards", label: "Wards & Beds", icon: <Bed className="h-5 w-5" /> }
      );
    } else if (user.role === "receptionist") {
      items.push(
        { id: "patients", label: "Patients", icon: <UserPlus className="h-5 w-5" /> },
        { id: "appointments", label: "Appointments", icon: <Calendar className="h-5 w-5" /> },
        { id: "wards", label: "Bed Availability", icon: <Bed className="h-5 w-5" /> },
        { id: "billing", label: "Billing", icon: <Receipt className="h-5 w-5" /> }
      );
    }
    
    return items;
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-blue-600">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-700">
              <h1 className="text-lg font-semibold text-white">Health Nexus</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {getMenuItems().map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      activeTab === item.id 
                        ? "bg-blue-700 text-white hover:bg-blue-800" 
                        : "text-blue-100 hover:bg-blue-700"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Button>
                ))}
                
                <div className="pt-4 mt-6 border-t border-blue-700">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-blue-100 hover:bg-blue-700"
                    onClick={onLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-3">Log out</span>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid h-full grid-cols-5 mx-auto">
          {getMenuItems().slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span className="text-xs text-gray-500">{item.label}</span>
            </button>
          ))}
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs text-gray-500">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between pb-5 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "patients" && "Patients"}
                  {activeTab === "staff" && "Staff Management"}
                  {activeTab === "appointments" && "Appointments"}
                  {activeTab === "wards" && "Wards & Beds"}
                  {activeTab === "billing" && "Billing"}
                  {activeTab === "doctor" && "My Patients"}
                  {activeTab === "profile" && "My Profile"}
                </h1>
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{user.name}</span>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{renderContent()}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
