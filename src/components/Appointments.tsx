
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Appointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [isNewAppointment, setIsNewAppointment] = useState(false);
  const [date, setDate] = useState(new Date());
  const { toast } = useToast();
  
  // Empty appointment template
  const emptyAppointment = {
    patientName: "",
    patientId: "",
    doctorName: "",
    doctorId: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    reason: "",
    status: "scheduled"
  };
  
  useEffect(() => {
    // In a real app, fetch from your API
    fetchMockAppointments();
  }, []);
  
  const fetchMockAppointments = () => {
    setTimeout(() => {
      const mockAppointments = [
        { id: "A001", patientName: "James Wilson", patientId: "P1001", doctorName: "Dr. Smith", doctorId: "S001", date: "2023-04-07", time: "09:00", reason: "Follow-up", status: "scheduled" },
        { id: "A002", patientName: "Sarah Johnson", patientId: "P1002", doctorName: "Dr. Martinez", doctorId: "S002", date: "2023-04-07", time: "10:30", reason: "Checkup", status: "scheduled" },
        { id: "A003", patientName: "Robert Brown", patientId: "P1003", doctorName: "Dr. Chen", doctorId: "S003", date: "2023-04-07", time: "13:15", reason: "Lab Results", status: "scheduled" },
        { id: "A004", patientName: "Emily Davis", patientId: "P1004", doctorName: "Dr. Wilson", doctorId: "S004", date: "2023-04-08", time: "11:00", reason: "Post-Surgery", status: "scheduled" },
        { id: "A005", patientName: "Michael Thompson", patientId: "P1005", doctorName: "Dr. Lee", doctorId: "S005", date: "2023-04-08", time: "14:45", reason: "New Patient", status: "scheduled" },
        { id: "A006", patientName: "Karen White", patientId: "P1006", doctorName: "Dr. Smith", doctorId: "S001", date: "2023-04-09", time: "09:30", reason: "Follow-up", status: "scheduled" },
        { id: "A007", patientName: "Thomas Miller", patientId: "P1007", doctorName: "Dr. Martinez", doctorId: "S002", date: "2023-04-09", time: "11:15", reason: "Consultation", status: "scheduled" },
        { id: "A008", patientName: "Lisa Garcia", patientId: "P1008", doctorName: "Dr. Lee", doctorId: "S005", date: "2023-04-06", time: "10:00", reason: "Headache", status: "completed" },
        { id: "A009", patientName: "Daniel Clark", patientId: "P1009", doctorName: "Dr. Wilson", doctorId: "S004", date: "2023-04-06", time: "13:30", reason: "Pain Management", status: "completed" },
        { id: "A010", patientName: "Jennifer Lewis", patientId: "P1010", doctorName: "Dr. Smith", doctorId: "S001", date: "2023-04-05", time: "15:00", reason: "Allergic Reaction", status: "completed" }
      ];
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
  };
  
  const handleAddAppointment = () => {
    setCurrentAppointment({ 
      ...emptyAppointment,
      date: format(date, "yyyy-MM-dd") 
    });
    setIsNewAppointment(true);
    setDialogOpen(true);
  };
  
  const handleEditAppointment = (appointment) => {
    setCurrentAppointment({ ...appointment });
    setIsNewAppointment(false);
    setDialogOpen(true);
  };
  
  const handleUpdateStatus = (appointmentId, newStatus) => {
    // In a real app, call your API
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: newStatus } 
          : appointment
      )
    );
    
    toast({
      title: "Appointment Updated",
      description: `Appointment status changed to ${newStatus}.`
    });
  };
  
  const handleSaveAppointment = () => {
    if (isNewAppointment) {
      // In a real app, call your API to create
      const newAppointment = {
        ...currentAppointment,
        id: `A${Math.floor(100 + Math.random() * 900)}`
      };
      
      setAppointments(prev => [newAppointment, ...prev]);
      
      toast({
        title: "Appointment Added",
        description: "New appointment has been scheduled."
      });
    } else {
      // In a real app, call your API to update
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment.id === currentAppointment.id 
            ? { ...currentAppointment } 
            : appointment
        )
      );
      
      toast({
        title: "Appointment Updated",
        description: "Appointment has been updated."
      });
    }
    
    setDialogOpen(false);
  };
  
  // Filter appointments based on search and selected date
  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by date
    const appointmentDate = appointment.date;
    const selectedDate = format(date, "yyyy-MM-dd");
    
    if (appointmentDate !== selectedDate) {
      return false;
    }
    
    // Then filter by search term
    return (
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Determine if user can create/edit appointments
  const canManageAppointments = ["admin", "receptionist", "doctor"].includes(user.role);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading appointments...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-auto"
          />
        </div>
        
        {canManageAppointments && (
          <Button onClick={handleAddAppointment}>
            Add New Appointment
          </Button>
        )}
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No appointments for this date
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        appointment.status === "completed" ? "secondary" :
                        appointment.status === "cancelled" ? "destructive" : 
                        "default"
                      }
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {canManageAppointments && appointment.status === "scheduled" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditAppointment(appointment)}
                          >
                            Edit
                          </Button>
                          
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleUpdateStatus(appointment.id, "completed")}
                          >
                            Complete
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleUpdateStatus(appointment.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {appointment.status !== "scheduled" && (
                        <span className="text-sm text-gray-500 italic">No actions available</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add/Edit Appointment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isNewAppointment ? "Add New Appointment" : "Edit Appointment"}
            </DialogTitle>
          </DialogHeader>
          
          {currentAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Patient</label>
                <Input 
                  className="col-span-3" 
                  value={currentAppointment.patientName}
                  onChange={(e) => setCurrentAppointment({...currentAppointment, patientName: e.target.value})}
                  placeholder="Patient name"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Patient ID</label>
                <Input 
                  className="col-span-3" 
                  value={currentAppointment.patientId}
                  onChange={(e) => setCurrentAppointment({...currentAppointment, patientId: e.target.value})}
                  placeholder="Patient ID"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Doctor</label>
                <Input 
                  className="col-span-3" 
                  value={currentAppointment.doctorName}
                  onChange={(e) => setCurrentAppointment({...currentAppointment, doctorName: e.target.value})}
                  placeholder="Doctor name"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Doctor ID</label>
                <Input 
                  className="col-span-3" 
                  value={currentAppointment.doctorId}
                  onChange={(e) => setCurrentAppointment({...currentAppointment, doctorId: e.target.value})}
                  placeholder="Doctor ID"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Date</label>
                <Input 
                  className="col-span-3" 
                  type="date"
                  value={currentAppointment.date}
                  onChange={(e) => setCurrentAppointment({...currentAppointment, date: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Time</label>
                <Input 
                  className="col-span-3" 
                  type="time"
                  value={currentAppointment.time}
                  onChange={(e) => setCurrentAppointment({...currentAppointment, time: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Reason</label>
                <Input 
                  className="col-span-3" 
                  value={currentAppointment.reason}
                  onChange={(e) => setCurrentAppointment({...currentAppointment, reason: e.target.value})}
                  placeholder="Appointment reason"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Status</label>
                <Select 
                  value={currentAppointment.status}
                  onValueChange={(value) => setCurrentAppointment({...currentAppointment, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={handleSaveAppointment}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
