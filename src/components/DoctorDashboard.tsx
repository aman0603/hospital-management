
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const DoctorDashboard = ({ user }) => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("patients");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [currentNotes, setCurrentNotes] = useState("");
  const [currentPatientId, setCurrentPatientId] = useState("");
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, fetch from your API with the doctor's ID
    fetchMockData();
  }, []);
  
  const fetchMockData = () => {
    setTimeout(() => {
      const mockPatients = [
        { id: "P1001", name: "James Wilson", age: 45, gender: "Male", condition: "Cardiac Arrhythmia", admissionDate: "2023-04-01", status: "stable", notes: "Patient responding well to treatment. Continue with current medications." },
        { id: "P1002", name: "Sarah Johnson", age: 32, gender: "Female", condition: "Pneumonia", admissionDate: "2023-04-02", status: "improving", notes: "Fever reduced. Oxygen saturation improving." },
        { id: "P1011", name: "Thomas Baker", age: 58, gender: "Male", condition: "Hypertension", admissionDate: "2023-04-03", status: "stable", notes: "Blood pressure under control with medication." },
        { id: "P1015", name: "Emma Lewis", age: 41, gender: "Female", condition: "Diabetes Type 2", admissionDate: "2023-04-04", status: "stable", notes: "Blood sugar levels stabilizing with the current regimen." },
        { id: "P1022", name: "William Moore", age: 62, gender: "Male", condition: "COPD", admissionDate: "2023-04-05", status: "critical", notes: "Requires continuous oxygen support. Monitor closely." },
      ];
      
      const mockAppointments = [
        { id: "A001", patientName: "James Wilson", patientId: "P1001", date: "2023-04-07", time: "09:00", reason: "Follow-up", status: "scheduled" },
        { id: "A006", patientName: "Karen White", patientId: "P1006", date: "2023-04-09", time: "09:30", reason: "Follow-up", status: "scheduled" },
        { id: "A011", patientName: "David Miller", patientId: "P1025", date: "2023-04-07", time: "11:15", reason: "Initial Consultation", status: "scheduled" },
        { id: "A015", patientName: "Susan Taylor", patientId: "P1031", date: "2023-04-08", time: "14:00", reason: "Test Results", status: "scheduled" },
        { id: "A017", patientName: "George Wilson", patientId: "P1036", date: "2023-04-09", time: "15:30", reason: "Medication Review", status: "scheduled" },
      ];
      
      setPatients(mockPatients);
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleViewPatient = (patient) => {
    setCurrentPatient(patient);
    setDialogOpen(true);
  };
  
  const handleAddNotes = (patientId, existingNotes) => {
    setCurrentNotes(existingNotes || "");
    setCurrentPatientId(patientId);
    setNotesDialogOpen(true);
  };
  
  const handleSaveNotes = () => {
    // In a real app, call your API
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === currentPatientId 
          ? { ...patient, notes: currentNotes } 
          : patient
      )
    );
    
    setNotesDialogOpen(false);
    
    toast({
      title: "Notes Updated",
      description: "Patient notes have been updated successfully."
    });
  };
  
  const handleUpdateStatus = (patientId, newStatus) => {
    // In a real app, call your API
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === patientId 
          ? { ...patient, status: newStatus } 
          : patient
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Patient status changed to ${newStatus}.`
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading doctor dashboard...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assigned Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-gray-500">Currently under your care</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(apt => apt.date === "2023-04-07").length}
            </div>
            <p className="text-xs text-gray-500">Scheduled for today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.filter(p => p.status === "critical").length}
            </div>
            <p className="text-xs text-gray-500">Requiring immediate attention</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <TabsContent value="patients" className="mt-0">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No patients assigned
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{`${patient.age} / ${patient.gender}`}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>{patient.admissionDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          patient.status === "critical" ? "destructive" :
                          patient.status === "stable" ? "default" : 
                          "secondary"
                        }
                      >
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewPatient(patient)}
                        >
                          View
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAddNotes(patient.id, patient.notes)}
                        >
                          Notes
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      
      <TabsContent value="appointments" className="mt-0">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No appointments scheduled
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.id}</TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      
      {/* Patient Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          
          {currentPatient && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="font-medium">{currentPatient.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{currentPatient.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{currentPatient.age}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{currentPatient.gender}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-medium">{currentPatient.condition}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Admission Date</p>
                  <p className="font-medium">{currentPatient.admissionDate}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex mt-1">
                    <Badge 
                      variant={
                        currentPatient.status === "critical" ? "destructive" :
                        currentPatient.status === "stable" ? "default" : 
                        "secondary"
                      }
                    >
                      {currentPatient.status.charAt(0).toUpperCase() + currentPatient.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Medical Notes</p>
                <div className="p-3 bg-muted rounded-md">
                  {currentPatient.notes || "No notes available."}
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Update Status</p>
                <div className="flex space-x-2">
                  <Button 
                    variant={currentPatient.status === "stable" ? "default" : "outline"}
                    onClick={() => {
                      handleUpdateStatus(currentPatient.id, "stable");
                      setDialogOpen(false);
                    }}
                  >
                    Stable
                  </Button>
                  
                  <Button 
                    variant={currentPatient.status === "improving" ? "secondary" : "outline"}
                    onClick={() => {
                      handleUpdateStatus(currentPatient.id, "improving");
                      setDialogOpen(false);
                    }}
                  >
                    Improving
                  </Button>
                  
                  <Button 
                    variant={currentPatient.status === "critical" ? "destructive" : "outline"}
                    onClick={() => {
                      handleUpdateStatus(currentPatient.id, "critical");
                      setDialogOpen(false);
                    }}
                  >
                    Critical
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDialogOpen(false);
                    handleAddNotes(currentPatient.id, currentPatient.notes);
                  }}
                >
                  Update Notes
                </Button>
                
                <Button onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Patient Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Update Patient Notes</DialogTitle>
            <DialogDescription>
              Record observations, treatments, and recommendations
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea 
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              placeholder="Enter patient notes here..."
              className="min-h-[200px]"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorDashboard;
