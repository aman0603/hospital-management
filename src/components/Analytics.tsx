
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  Users, 
  Bed, 
  Calendar, 
  UserPlus, 
  UserMinus, 
  Activity 
} from "lucide-react";

const Analytics = ({ user }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch this data from your API
    fetchMockAnalyticsData();
  }, []);
  
  const fetchMockAnalyticsData = () => {
    setTimeout(() => {
      setAnalyticsData({
        totalCurrentPatients: 124,
        totalAllTimePatients: 3567,
        availableBeds: 42,
        totalBeds: 150,
        todayAppointments: 28,
        patientFlow: [
          { month: "Jan", admissions: 89, discharges: 76 },
          { month: "Feb", admissions: 75, discharges: 68 },
          { month: "Mar", admissions: 82, discharges: 79 },
          { month: "Apr", admissions: 91, discharges: 83 },
          { month: "May", admissions: 103, discharges: 95 },
          { month: "Jun", admissions: 94, discharges: 88 },
          { month: "Jul", admissions: 85, discharges: 77 },
          { month: "Aug", admissions: 79, discharges: 74 },
          { month: "Sep", admissions: 88, discharges: 82 },
          { month: "Oct", admissions: 96, discharges: 89 },
          { month: "Nov", admissions: 110, discharges: 105 },
          { month: "Dec", admissions: 98, discharges: 91 }
        ],
        departmentLoad: [
          { department: "Cardiology", patients: 32 },
          { department: "Orthopedics", patients: 19 },
          { department: "Neurology", patients: 15 },
          { department: "Pediatrics", patients: 24 },
          { department: "General", patients: 34 }
        ],
        recentPatients: [
          { id: "P1001", name: "James Wilson", age: 45, condition: "Cardiac Arrhythmia", doctor: "Dr. Smith", admissionDate: "2023-04-01" },
          { id: "P1002", name: "Sarah Johnson", age: 32, condition: "Pneumonia", doctor: "Dr. Martinez", admissionDate: "2023-04-02" },
          { id: "P1003", name: "Robert Brown", age: 56, condition: "Diabetes", doctor: "Dr. Chen", admissionDate: "2023-04-03" },
          { id: "P1004", name: "Emily Davis", age: 28, condition: "Appendicitis", doctor: "Dr. Wilson", admissionDate: "2023-04-04" },
          { id: "P1005", name: "Michael Thompson", age: 64, condition: "Stroke", doctor: "Dr. Lee", admissionDate: "2023-04-05" }
        ],
        upcomingAppointments: [
          { id: "A2001", patient: "Karen White", doctor: "Dr. Smith", time: "09:00 AM", date: "2023-04-07" },
          { id: "A2002", patient: "Thomas Miller", doctor: "Dr. Chen", time: "11:30 AM", date: "2023-04-07" },
          { id: "A2003", patient: "Lisa Garcia", doctor: "Dr. Martinez", time: "02:15 PM", date: "2023-04-07" },
          { id: "A2004", patient: "Daniel Clark", doctor: "Dr. Wilson", time: "04:30 PM", date: "2023-04-07" },
          { id: "A2005", patient: "Jennifer Lewis", doctor: "Dr. Lee", time: "10:45 AM", date: "2023-04-08" }
        ]
      });
      setIsLoading(false);
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading analytics data...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalCurrentPatients}</div>
            <p className="text-xs text-gray-500">All-time: {analyticsData.totalAllTimePatients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            <Bed className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.availableBeds}</div>
            <p className="text-xs text-gray-500">Out of {analyticsData.totalBeds} total beds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.todayAppointments}</div>
            <p className="text-xs text-gray-500">Scheduled for today</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Patient Flow (Year-to-Date)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.patientFlow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="admissions" stroke="#4CAF50" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="discharges" stroke="#F44336" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department Load</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.departmentLoad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#1976D2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Patients & Upcoming Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">{patient.name}</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>{patient.age} years</span>
                      <span>•</span>
                      <span>{patient.condition}</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-gray-500">{patient.doctor}</p>
                    <p>{patient.admissionDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments (48h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">{appointment.patient}</h3>
                    <p className="text-sm text-gray-500">{appointment.doctor}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-gray-500">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
