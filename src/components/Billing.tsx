
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Billing = ({ user }) => {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [isNewBill, setIsNewBill] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Empty bill template
  const emptyBill = {
    patientName: "",
    patientId: "",
    items: [
      { description: "Consultation", amount: 150 }
    ],
    total: 150,
    paid: 0,
    status: "pending"
  };
  
  useEffect(() => {
    // In a real app, fetch from your API
    fetchMockBills();
  }, []);
  
  const fetchMockBills = () => {
    setTimeout(() => {
      const mockBills = [
        { 
          id: "B001", 
          patientName: "James Wilson", 
          patientId: "P1001", 
          items: [
            { description: "Cardiology Consultation", amount: 250 },
            { description: "ECG", amount: 150 },
            { description: "Blood Test", amount: 120 },
            { description: "Room Charges (3 days)", amount: 900 }
          ],
          total: 1420,
          paid: 1420,
          status: "paid",
          date: "2023-04-01"
        },
        { 
          id: "B002", 
          patientName: "Sarah Johnson", 
          patientId: "P1002", 
          items: [
            { description: "Pulmonology Consultation", amount: 200 },
            { description: "Chest X-Ray", amount: 180 },
            { description: "Breathing Treatment", amount: 90 },
            { description: "Room Charges (2 days)", amount: 600 }
          ],
          total: 1070,
          paid: 500,
          status: "partial",
          date: "2023-04-02"
        },
        { 
          id: "B003", 
          patientName: "Robert Brown", 
          patientId: "P1003", 
          items: [
            { description: "Endocrinology Consultation", amount: 230 },
            { description: "Blood Glucose Test", amount: 80 },
            { description: "Insulin Administration", amount: 60 },
            { description: "Room Charges (1 day)", amount: 300 }
          ],
          total: 670,
          paid: 0,
          status: "pending",
          date: "2023-04-03"
        },
        { 
          id: "B004", 
          patientName: "Emily Davis", 
          patientId: "P1004", 
          items: [
            { description: "Surgery Consultation", amount: 300 },
            { description: "Appendectomy", amount: 2500 },
            { description: "Anesthesia", amount: 800 },
            { description: "Room Charges (3 days)", amount: 900 },
            { description: "Medications", amount: 250 }
          ],
          total: 4750,
          paid: 4750,
          status: "paid",
          date: "2023-04-04"
        },
        { 
          id: "B005", 
          patientName: "Michael Thompson", 
          patientId: "P1005", 
          items: [
            { description: "Neurology Consultation", amount: 280 },
            { description: "MRI Scan", amount: 1200 },
            { description: "EEG", amount: 350 },
            { description: "Room Charges (2 days)", amount: 600 },
            { description: "Medications", amount: 180 }
          ],
          total: 2610,
          paid: 0,
          status: "pending",
          date: "2023-04-05"
        }
      ];
      setBills(mockBills);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddBill = () => {
    setCurrentBill({ ...emptyBill });
    setIsNewBill(true);
    setDialogOpen(true);
  };
  
  const handleUpdateBill = (bill) => {
    setCurrentBill({ ...bill });
    setIsNewBill(false);
    setDialogOpen(true);
  };
  
  const handleViewDetails = (bill) => {
    setViewDetails(bill);
    setDetailsDialogOpen(true);
  };
  
  const handleUpdatePayment = (billId, amount) => {
    // In a real app, call your API
    setBills(prevBills => 
      prevBills.map(bill => {
        if (bill.id === billId) {
          const newPaid = bill.paid + amount;
          return { 
            ...bill, 
            paid: newPaid,
            status: newPaid >= bill.total ? "paid" : "partial"
          };
        }
        return bill;
      })
    );
    
    toast({
      title: "Payment Updated",
      description: `Payment of $${amount} has been recorded.`
    });
  };
  
  const handleSaveBill = () => {
    if (isNewBill) {
      // Calculate total from items
      const total = currentBill.items.reduce((sum, item) => sum + Number(item.amount), 0);
      
      // In a real app, call your API to create
      const newBill = {
        ...currentBill,
        id: `B${Math.floor(100 + Math.random() * 900)}`,
        total: total,
        date: new Date().toISOString().split('T')[0]
      };
      
      setBills(prev => [newBill, ...prev]);
      
      toast({
        title: "Bill Created",
        description: "New bill has been created successfully."
      });
    } else {
      // In a real app, call your API to update
      setBills(prevBills => 
        prevBills.map(bill => 
          bill.id === currentBill.id 
            ? { ...currentBill } 
            : bill
        )
      );
      
      toast({
        title: "Bill Updated",
        description: "Bill has been updated successfully."
      });
    }
    
    setDialogOpen(false);
  };
  
  // Filter bills based on search term
  const filteredBills = bills.filter(bill => 
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Determine if user can manage bills
  const canManageBills = ["admin", "receptionist"].includes(user.role);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading billing data...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${bills.reduce((sum, bill) => sum + bill.paid, 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">From all bills</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${bills.reduce((sum, bill) => sum + (bill.total - bill.paid), 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Yet to be collected</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bills.filter(bill => bill.status !== "paid").length}
            </div>
            <p className="text-xs text-gray-500">Bills awaiting payment</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search bills..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        {canManageBills && (
          <Button onClick={handleAddBill}>
            Create New Bill
          </Button>
        )}
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No bills found
                </TableCell>
              </TableRow>
            ) : (
              filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.patientName}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>${bill.total.toLocaleString()}</TableCell>
                  <TableCell>${bill.paid.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        bill.status === "paid" ? "default" :
                        bill.status === "partial" ? "secondary" : 
                        "outline"
                      }
                    >
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(bill)}
                      >
                        Details
                      </Button>
                      
                      {canManageBills && bill.status !== "paid" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleUpdateBill(bill)}
                        >
                          Update
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
      
      {/* Create/Edit Bill Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isNewBill ? "Create New Bill" : "Update Bill"}
            </DialogTitle>
          </DialogHeader>
          
          {currentBill && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Patient Name</label>
                  <Input 
                    value={currentBill.patientName}
                    onChange={(e) => setCurrentBill({...currentBill, patientName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Patient ID</label>
                  <Input 
                    value={currentBill.patientId}
                    onChange={(e) => setCurrentBill({...currentBill, patientId: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Bill Items</label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setCurrentBill({
                        ...currentBill,
                        items: [...currentBill.items, { description: "", amount: 0 }]
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {currentBill.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input 
                        className="flex-1"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...currentBill.items];
                          newItems[index].description = e.target.value;
                          setCurrentBill({...currentBill, items: newItems});
                        }}
                      />
                      
                      <Input 
                        className="w-24"
                        type="number"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => {
                          const newItems = [...currentBill.items];
                          newItems[index].amount = Number(e.target.value);
                          setCurrentBill({...currentBill, items: newItems});
                        }}
                      />
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          const newItems = currentBill.items.filter((_, i) => i !== index);
                          setCurrentBill({...currentBill, items: newItems});
                        }}
                        disabled={currentBill.items.length === 1}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {!isNewBill && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Paid Amount</label>
                    <Input 
                      type="number"
                      value={currentBill.paid}
                      onChange={(e) => setCurrentBill({...currentBill, paid: Number(e.target.value)})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <Select 
                      value={currentBill.status}
                      onValueChange={(value) => setCurrentBill({...currentBill, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="partial">Partially Paid</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-muted rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-bold">
                    ${currentBill.items.reduce((sum, item) => sum + Number(item.amount), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={handleSaveBill}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bill Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bill Details</DialogTitle>
          </DialogHeader>
          
          {viewDetails && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Bill ID</p>
                  <p className="font-medium">{viewDetails.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{viewDetails.date}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{viewDetails.patientName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="font-medium">{viewDetails.patientId}</p>
                </div>
              </div>
              
              <h3 className="font-medium mb-2">Bill Items</h3>
              <div className="border rounded-md mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewDetails.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="bg-muted p-4 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold">${viewDetails.total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Paid Amount:</span>
                  <span className="font-bold">${viewDetails.paid.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span className="font-bold">${(viewDetails.total - viewDetails.paid).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <Badge 
                    variant={
                      viewDetails.status === "paid" ? "default" :
                      viewDetails.status === "partial" ? "secondary" : 
                      "outline"
                    }
                  >
                    {viewDetails.status.charAt(0).toUpperCase() + viewDetails.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              {viewDetails.status !== "paid" && canManageBills && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Record Payment</h3>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleUpdatePayment(viewDetails.id, 100);
                        setDetailsDialogOpen(false);
                      }}
                    >
                      Pay $100
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleUpdatePayment(viewDetails.id, 500);
                        setDetailsDialogOpen(false);
                      }}
                    >
                      Pay $500
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        handleUpdatePayment(viewDetails.id, viewDetails.total - viewDetails.paid);
                        setDetailsDialogOpen(false);
                      }}
                    >
                      Pay Full (${(viewDetails.total - viewDetails.paid).toLocaleString()})
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
