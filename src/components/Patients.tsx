
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
import { useToast } from "@/components/ui/use-toast";

const Patients = ({ user }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isNewPatient, setIsNewPatient] = useState(false);
  const { toast } = useToast();
  
  // Mock data for new patients
  const emptyPatient = {
    name: "",
    age: "",
    gender: "",
    condition: "",
    assignedDoctor: "",
    ward: "",
    bed: "",
    status: "active"
  };
  
  useEffect(() => {
    // In a real app, fetch from your API
    fetchMockPatients();
  }, []);
  
  const fetchMockPatients = () => {
    setTimeout(() => {
      const mockPatients = [
        { id: "P1001", name: "James Wilson", age: 45, gender: "Male", condition: "Cardiac Arrhythmia", assignedDoctor: "Dr. Smith", ward: "Cardiology", bed: "C-101", admissionDate: "2023-04-01", status: "active" },
        { id: "P1002", name: "Sarah Johnson", age: 32, gender: "Female", condition: "Pneumonia", assignedDoctor: "Dr. Martinez", ward: "Pulmonology", bed: "P-205", admissionDate: "2023-04-02", status: "active" },
        { id: "P1003", name: "Robert Brown", age: 56, gender: "Male", condition: "Diabetes", assignedDoctor: "Dr. Chen", ward: "Endocrinology", bed: "E-103", admissionDate: "2023-04-03", status: "active" },
        { id: "P1004", name: "Emily Davis", age: 28, gender: "Female", condition: "Appendicitis", assignedDoctor: "Dr. Wilson", ward: "Surgery", bed: "S-301", admissionDate: "2023-04-04", status: "discharged", dischargeDate: "2023-04-06" },
        { id: "P1005", name: "Michael Thompson", age: 64, gender: "Male", condition: "Stroke", assignedDoctor: "Dr. Lee", ward: "Neurology", bed: "N-107", admissionDate: "2023-04-05", status: "active" },
        { id: "P1006", name: "Karen White", age: 52, gender: "Female", condition: "Fracture", assignedDoctor: "Dr. Jones", ward: "Orthopedics", bed: "O-203", admissionDate: "2023-04-05", status: "active" },
        { id: "P1007", name: "Thomas Miller", age: 71, gender: "Male", condition: "Pneumonia", assignedDoctor: "Dr. Martinez", ward: "Pulmonology", bed: "P-207", admissionDate: "2023-04-04", status: "active" },
        { id: "P1008", name: "Lisa Garcia", age: 39, gender: "Female", condition: "Migraine", assignedDoctor: "Dr. Lee", ward: "Neurology", bed: "N-109", admissionDate: "2023-04-03", status: "discharged", dischargeDate: "2023-04-05" },
        { id: "P1009", name: "Daniel Clark", age: 48, gender: "Male", condition: "Kidney Stones", assignedDoctor: "Dr. Wilson", ward: "Urology", bed: "U-102", admissionDate: "2023-04-02", status: "active" },
        { id: "P1010", name: "Jennifer Lewis", age: 35, gender: "Female", condition: "Allergic Reaction", assignedDoctor: "Dr. Smith", ward: "Immunology", bed: "I-104", admissionDate: "2023-04-06", status: "active" }
      ];
      setPatients(mockPatients);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddPatient = () => {
    setCurrentPatient({ ...emptyPatient });
    setIsNewPatient(true);
    setDialogOpen(true);
  };
  
  const handleEditPatient = (patient) => {
    setCurrentPatient({ ...patient });
    setIsNewPatient(false);
    setDialogOpen(true);
  };
  
  const handleViewPatient = (patient) => {
    // For viewing details, could go to a separate page or modal
    toast({
      title: "Patient Details",
      description: `Viewing details for ${patient.name}`
    });
  };
  
  const handleDischargePatient = (patientId) => {
    // In a real app, call your API
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === patientId 
          ? { ...patient, status: "discharged", dischargeDate: new Date().toISOString().split('T')[0] } 
          : patient
      )
    );
    
    toast({
      title: "Patient Discharged",
      description: "The patient has been discharged successfully."
    });
  };
  
  const handleSavePatient = () => {
    if (isNewPatient) {
      // In a real app, call your API to create
      const newPatient = {
        ...currentPatient,
        id: `P${Math.floor(1000 + Math.random() * 9000)}`,
        admissionDate: new Date().toISOString().split('T')[0]
      };
      
      setPatients(prev => [newPatient, ...prev]);
      
      toast({
        title: "Patient Added",
        description: "New patient has been added successfully."
      });
    } else {
      // In a real app, call your API to update
      setPatients(prevPatients => 
        prevPatients.map(patient => 
          patient.id === currentPatient.id 
            ? { ...currentPatient } 
            : patient
        )
      );
      
      toast({
        title: "Patient Updated",
        description: "Patient information has been updated."
      });
    }
    
    setDialogOpen(false);
  };
  
  const filteredPatients = patients.filter((patient) => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Determine which actions are allowed based on user role
  const canAddPatient = ["admin", "receptionist"].includes(user.role);
  const canEditPatient = ["admin", "doctor"].includes(user.role);
  const canDischargePatient = ["admin", "doctor", "nurse"].includes(user.role);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading patients...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        {canAddPatient && (
          <Button onClick={handleAddPatient}>
            Add New Patient
          </Button>
        )}
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Ward/Bed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.assignedDoctor}</TableCell>
                  <TableCell>{`${patient.ward} / ${patient.bed}`}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                      {patient.status === "active" ? "Active" : "Discharged"}
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
                      
                      {canEditPatient && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditPatient(patient)}
                        >
                          Edit
                        </Button>
                      )}
                      
                      {canDischargePatient && patient.status === "active" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDischargePatient(patient.id)}
                        >
                          Discharge
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add/Edit Patient Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isNewPatient ? "Add New Patient" : "Edit Patient"}
            </DialogTitle>
          </DialogHeader>
          
          {currentPatient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Name</label>
                <Input 
                  className="col-span-3" 
                  value={currentPatient.name}
                  onChange={(e) => setCurrentPatient({...currentPatient, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Age</label>
                <Input 
                  className="col-span-3" 
                  type="number"
                  value={currentPatient.age}
                  onChange={(e) => setCurrentPatient({...currentPatient, age: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Gender</label>
                <Select 
                  value={currentPatient.gender}
                  onValueChange={(value) => setCurrentPatient({...currentPatient, gender: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Condition</label>
                <Input 
                  className="col-span-3" 
                  value={currentPatient.condition}
                  onChange={(e) => setCurrentPatient({...currentPatient, condition: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Doctor</label>
                <Input 
                  className="col-span-3" 
                  value={currentPatient.assignedDoctor}
                  onChange={(e) => setCurrentPatient({...currentPatient, assignedDoctor: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Ward</label>
                <Input 
                  className="col-span-3" 
                  value={currentPatient.ward}
                  onChange={(e) => setCurrentPatient({...currentPatient, ward: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Bed</label>
                <Input 
                  className="col-span-3" 
                  value={currentPatient.bed}
                  onChange={(e) => setCurrentPatient({...currentPatient, bed: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={handleSavePatient}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Patients;
