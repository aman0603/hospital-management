
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Staff = ({ user }) => {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [isNewStaff, setIsNewStaff] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // Empty staff template for new staff
  const emptyStaff = {
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    joinDate: new Date().toISOString().split('T')[0],
    status: "active"
  };
  
  useEffect(() => {
    // In a real app, fetch this data from your backend API
    fetchMockStaff();
  }, []);
  
  const fetchMockStaff = () => {
    setTimeout(() => {
      const mockStaff = [
        { id: "S001", name: "Dr. John Smith", email: "jsmith@hospital.com", role: "doctor", department: "Cardiology", phone: "555-111-2222", joinDate: "2020-01-15", status: "active" },
        { id: "S002", name: "Dr. Maria Martinez", email: "mmartinez@hospital.com", role: "doctor", department: "Pulmonology", phone: "555-222-3333", joinDate: "2019-05-20", status: "active" },
        { id: "S003", name: "Dr. David Chen", email: "dchen@hospital.com", role: "doctor", department: "Endocrinology", phone: "555-333-4444", joinDate: "2018-09-10", status: "active" },
        { id: "S004", name: "Dr. Sarah Wilson", email: "swilson@hospital.com", role: "doctor", department: "Surgery", phone: "555-444-5555", joinDate: "2021-03-05", status: "active" },
        { id: "S005", name: "Dr. Michael Lee", email: "mlee@hospital.com", role: "doctor", department: "Neurology", phone: "555-555-6666", joinDate: "2017-11-12", status: "active" },
        { id: "S006", name: "Nurse Emma Johnson", email: "ejohnson@hospital.com", role: "nurse", department: "Cardiology", phone: "555-666-7777", joinDate: "2019-08-14", status: "active" },
        { id: "S007", name: "Nurse Robert Davis", email: "rdavis@hospital.com", role: "nurse", department: "Pulmonology", phone: "555-777-8888", joinDate: "2020-07-22", status: "active" },
        { id: "S008", name: "Nurse Lisa Brown", email: "lbrown@hospital.com", role: "nurse", department: "Endocrinology", phone: "555-888-9999", joinDate: "2018-04-17", status: "leave" },
        { id: "S009", name: "Nurse Thomas White", email: "twhite@hospital.com", role: "nurse", department: "Surgery", phone: "555-999-0000", joinDate: "2021-01-30", status: "active" },
        { id: "S010", name: "Nurse Angela Garcia", email: "agarcia@hospital.com", role: "nurse", department: "Neurology", phone: "555-000-1111", joinDate: "2019-11-05", status: "active" },
        { id: "S011", name: "Receptionist James Miller", email: "jmiller@hospital.com", role: "receptionist", department: "Front Desk", phone: "555-111-3333", joinDate: "2020-02-10", status: "active" },
        { id: "S012", name: "Receptionist Patricia Clark", email: "pclark@hospital.com", role: "receptionist", department: "Front Desk", phone: "555-222-4444", joinDate: "2019-06-15", status: "active" },
        { id: "S013", name: "Admin Laura Jones", email: "ljones@hospital.com", role: "admin", department: "Administration", phone: "555-333-5555", joinDate: "2017-05-08", status: "active" },
        { id: "S014", name: "Admin Kevin Anderson", email: "kanderson@hospital.com", role: "admin", department: "Administration", phone: "555-444-6666", joinDate: "2018-01-20", status: "active" }
      ];
      setStaff(mockStaff);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddStaff = () => {
    setCurrentStaff({ ...emptyStaff });
    setIsNewStaff(true);
    setDialogOpen(true);
  };
  
  const handleEditStaff = (staffMember) => {
    setCurrentStaff({ ...staffMember });
    setIsNewStaff(false);
    setDialogOpen(true);
  };
  
  const handleToggleStatus = (staffId) => {
    // In a real app, call your API to update
    setStaff(prevStaff => 
      prevStaff.map(member => 
        member.id === staffId 
          ? { ...member, status: member.status === "active" ? "leave" : "active" } 
          : member
      )
    );
    
    toast({
      title: "Status Updated",
      description: "Staff member status has been updated."
    });
  };
  
  const handleSaveStaff = () => {
    if (isNewStaff) {
      // In a real app, call your API to create
      const newStaff = {
        ...currentStaff,
        id: `S${Math.floor(100 + Math.random() * 900)}`
      };
      
      setStaff(prev => [newStaff, ...prev]);
      
      toast({
        title: "Staff Added",
        description: "New staff member has been added successfully."
      });
    } else {
      // In a real app, call your API to update
      setStaff(prevStaff => 
        prevStaff.map(member => 
          member.id === currentStaff.id 
            ? { ...currentStaff } 
            : member
        )
      );
      
      toast({
        title: "Staff Updated",
        description: "Staff member information has been updated."
      });
    }
    
    setDialogOpen(false);
  };
  
  const filteredStaff = staff.filter((member) => {
    // First filter by tab
    if (activeTab !== "all" && member.role !== activeTab) {
      return false;
    }
    
    // Then filter by search term
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Check if user is admin (only admins can manage staff)
  const isAdmin = user.role === "admin";
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading staff data...</p>
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-md">
        <p className="text-lg text-gray-500">Access Restricted</p>
        <p className="text-sm text-gray-400">Only administrators can access staff management.</p>
      </div>
    );
  }
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="doctor">Doctors</TabsTrigger>
          <TabsTrigger value="nurse">Nurses</TabsTrigger>
          <TabsTrigger value="receptionist">Receptionists</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search staff..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Button onClick={handleAddStaff}>
          Add New Staff
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No staff members found
                </TableCell>
              </TableRow>
            ) : (
              filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell className="capitalize">{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status === "active" ? "Active" : "On Leave"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditStaff(member)}
                      >
                        Edit
                      </Button>
                      
                      <Button 
                        variant={member.status === "active" ? "outline" : "default"} 
                        size="sm" 
                        onClick={() => handleToggleStatus(member.id)}
                      >
                        {member.status === "active" ? "Set Leave" : "Set Active"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add/Edit Staff Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isNewStaff ? "Add New Staff Member" : "Edit Staff Member"}
            </DialogTitle>
          </DialogHeader>
          
          {currentStaff && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Name</label>
                <Input 
                  className="col-span-3" 
                  value={currentStaff.name}
                  onChange={(e) => setCurrentStaff({...currentStaff, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Email</label>
                <Input 
                  className="col-span-3" 
                  type="email"
                  value={currentStaff.email}
                  onChange={(e) => setCurrentStaff({...currentStaff, email: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Role</label>
                <Select 
                  value={currentStaff.role}
                  onValueChange={(value) => setCurrentStaff({...currentStaff, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Department</label>
                <Input 
                  className="col-span-3" 
                  value={currentStaff.department}
                  onChange={(e) => setCurrentStaff({...currentStaff, department: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Phone</label>
                <Input 
                  className="col-span-3" 
                  value={currentStaff.phone}
                  onChange={(e) => setCurrentStaff({...currentStaff, phone: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Join Date</label>
                <Input 
                  className="col-span-3" 
                  type="date"
                  value={currentStaff.joinDate}
                  onChange={(e) => setCurrentStaff({...currentStaff, joinDate: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Status</label>
                <Select 
                  value={currentStaff.status}
                  onValueChange={(value) => setCurrentStaff({...currentStaff, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={handleSaveStaff}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Staff;
