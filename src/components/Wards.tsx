
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

const Wards = ({ user }) => {
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("wards");
  const [selectedWard, setSelectedWard] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentBed, setCurrentBed] = useState(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, fetch from your API
    fetchMockData();
  }, []);
  
  const fetchMockData = () => {
    setTimeout(() => {
      const mockWards = [
        { id: "W01", name: "Cardiology Ward", totalBeds: 20, occupiedBeds: 15, availableBeds: 5 },
        { id: "W02", name: "Orthopedics Ward", totalBeds: 15, occupiedBeds: 10, availableBeds: 5 },
        { id: "W03", name: "Pediatrics Ward", totalBeds: 25, occupiedBeds: 18, availableBeds: 7 },
        { id: "W04", name: "Neurology Ward", totalBeds: 15, occupiedBeds: 12, availableBeds: 3 },
        { id: "W05", name: "General Medicine", totalBeds: 30, occupiedBeds: 25, availableBeds: 5 },
        { id: "W06", name: "Surgery Ward", totalBeds: 20, occupiedBeds: 16, availableBeds: 4 },
        { id: "W07", name: "Oncology Ward", totalBeds: 18, occupiedBeds: 14, availableBeds: 4 },
        { id: "W08", name: "Maternity Ward", totalBeds: 15, occupiedBeds: 9, availableBeds: 6 }
      ];
      
      const mockBeds = [
        { id: "B101", bedNumber: "C-101", ward: "W01", wardName: "Cardiology Ward", status: "occupied", patient: "James Wilson", admissionDate: "2023-04-01" },
        { id: "B102", bedNumber: "C-102", ward: "W01", wardName: "Cardiology Ward", status: "occupied", patient: "Mary Johnson", admissionDate: "2023-04-02" },
        { id: "B103", bedNumber: "C-103", ward: "W01", wardName: "Cardiology Ward", status: "vacant", patient: null, admissionDate: null },
        { id: "B104", bedNumber: "C-104", ward: "W01", wardName: "Cardiology Ward", status: "occupied", patient: "Robert Davis", admissionDate: "2023-04-03" },
        { id: "B105", bedNumber: "C-105", ward: "W01", wardName: "Cardiology Ward", status: "vacant", patient: null, admissionDate: null },
        { id: "B201", bedNumber: "O-201", ward: "W02", wardName: "Orthopedics Ward", status: "occupied", patient: "Sarah Brown", admissionDate: "2023-04-01" },
        { id: "B202", bedNumber: "O-202", ward: "W02", wardName: "Orthopedics Ward", status: "occupied", patient: "Karen White", admissionDate: "2023-04-05" },
        { id: "B203", bedNumber: "O-203", ward: "W02", wardName: "Orthopedics Ward", status: "vacant", patient: null, admissionDate: null },
        { id: "B301", bedNumber: "P-301", ward: "W03", wardName: "Pediatrics Ward", status: "occupied", patient: "Tommy Smith", admissionDate: "2023-04-02" },
        { id: "B302", bedNumber: "P-302", ward: "W03", wardName: "Pediatrics Ward", status: "vacant", patient: null, admissionDate: null },
        { id: "B401", bedNumber: "N-401", ward: "W04", wardName: "Neurology Ward", status: "occupied", patient: "Michael Thompson", admissionDate: "2023-04-05" },
        { id: "B402", bedNumber: "N-402", ward: "W04", wardName: "Neurology Ward", status: "occupied", patient: "Lisa Garcia", admissionDate: "2023-04-03" }
      ];
      
      setWards(mockWards);
      setBeds(mockBeds);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleViewWardBeds = (ward) => {
    setSelectedWard(ward);
    setActiveTab("beds");
  };
  
  const handleAssignBed = (bed) => {
    setCurrentBed(bed);
    setDialogOpen(true);
  };
  
  const handleSaveBedAssignment = (patientName) => {
    // In a real app, call your API
    setBeds(prevBeds => 
      prevBeds.map(bed => 
        bed.id === currentBed.id 
          ? { 
              ...bed, 
              status: "occupied", 
              patient: patientName, 
              admissionDate: new Date().toISOString().split('T')[0] 
            } 
          : bed
      )
    );
    
    // Update the ward count
    setWards(prevWards => 
      prevWards.map(ward => 
        ward.id === currentBed.ward 
          ? { 
              ...ward, 
              occupiedBeds: ward.occupiedBeds + 1, 
              availableBeds: ward.availableBeds - 1 
            } 
          : ward
      )
    );
    
    setDialogOpen(false);
    
    toast({
      title: "Bed Assigned",
      description: `Bed ${currentBed.bedNumber} assigned to ${patientName}.`
    });
  };
  
  const handleVacateBed = (bedId, wardId) => {
    // In a real app, call your API
    setBeds(prevBeds => 
      prevBeds.map(bed => 
        bed.id === bedId 
          ? { ...bed, status: "vacant", patient: null, admissionDate: null } 
          : bed
      )
    );
    
    // Update the ward count
    setWards(prevWards => 
      prevWards.map(ward => 
        ward.id === wardId 
          ? { 
              ...ward, 
              occupiedBeds: ward.occupiedBeds - 1, 
              availableBeds: ward.availableBeds + 1 
            } 
          : ward
      )
    );
    
    toast({
      title: "Bed Vacated",
      description: "The bed has been marked as vacant."
    });
  };
  
  // Filter based on search term
  const filteredWards = wards.filter(ward => 
    ward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBeds = beds.filter(bed => {
    if (selectedWard && bed.ward !== selectedWard.id) {
      return false;
    }
    
    return (
      bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase())) ||
      bed.wardName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Determine if user can manage beds
  const canManageBeds = ["admin", "nurse"].includes(user.role);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading ward data...</p>
      </div>
    );
  }
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="wards">Wards Overview</TabsTrigger>
          <TabsTrigger value="beds">Beds</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mb-6">
        <Input
          placeholder={activeTab === "wards" ? "Search wards..." : "Search beds..."}
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-md"
        />
      </div>
      
      <TabsContent value="wards" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWards.map(ward => (
            <Card key={ward.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{ward.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Occupancy</span>
                    <span className="text-sm">{ward.occupiedBeds}/{ward.totalBeds}</span>
                  </div>
                  <Progress value={(ward.occupiedBeds / ward.totalBeds) * 100} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Available Beds</p>
                    <p className="text-2xl font-semibold">{ward.availableBeds}</p>
                  </div>
                  
                  <Button variant="outline" onClick={() => handleViewWardBeds(ward)}>
                    View Beds
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="beds" className="mt-0">
        <div className="border rounded-md">
          {selectedWard && (
            <div className="bg-muted p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{selectedWard.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedWard.availableBeds} of {selectedWard.totalBeds} beds available
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedWard(null)}>
                View All Beds
              </Button>
            </div>
          )}
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bed Number</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No beds found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBeds.map((bed) => (
                  <TableRow key={bed.id}>
                    <TableCell>{bed.bedNumber}</TableCell>
                    <TableCell>{bed.wardName}</TableCell>
                    <TableCell>
                      <Badge variant={bed.status === "occupied" ? "default" : "outline"}>
                        {bed.status === "occupied" ? "Occupied" : "Vacant"}
                      </Badge>
                    </TableCell>
                    <TableCell>{bed.patient || "—"}</TableCell>
                    <TableCell>{bed.admissionDate || "—"}</TableCell>
                    <TableCell>
                      {canManageBeds && (
                        <div className="flex space-x-2">
                          {bed.status === "vacant" ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleAssignBed(bed)}
                            >
                              Assign
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleVacateBed(bed.id, bed.ward)}
                            >
                              Vacate
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      
      {/* Assign Bed Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Bed</DialogTitle>
          </DialogHeader>
          
          {currentBed && (
            <div className="py-4">
              <p className="mb-4">
                Assigning bed <strong>{currentBed.bedNumber}</strong> in {currentBed.wardName}
              </p>
              
              <BedAssignmentForm 
                onSave={handleSaveBedAssignment} 
                onCancel={() => setDialogOpen(false)} 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const BedAssignmentForm = ({ onSave, onCancel }) => {
  const [patientName, setPatientName] = useState("");
  const [patients, setPatients] = useState([
    { id: "P1001", name: "James Wilson" },
    { id: "P1002", name: "Sarah Johnson" },
    { id: "P1003", name: "Robert Brown" },
    { id: "P1004", name: "Emily Davis" },
    { id: "P1005", name: "Michael Thompson" }
  ]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(patientName);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Select Patient
        </label>
        <select 
          className="w-full p-2 border rounded-md" 
          value={patientName} 
          onChange={(e) => setPatientName(e.target.value)}
          required
        >
          <option value="">-- Select a patient --</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.name}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!patientName}>
          Assign Bed
        </Button>
      </div>
    </form>
  );
};

export default Wards;
