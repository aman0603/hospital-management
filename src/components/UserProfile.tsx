
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    department: user.department,
    role: user.role,
    phone: "555-123-4567", // Mock data
    address: "123 Medical Center Dr",
    emergencyContact: "Jane Doe (555-987-6543)"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would be an API call to update the user profile
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>
          View and update your profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            {isEditing ? (
              <Input 
                name="name" 
                value={profile.name} 
                onChange={handleInputChange} 
              />
            ) : (
              <p className="p-2 border rounded-md">{profile.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="p-2 border rounded-md bg-gray-50">{profile.email}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <p className="p-2 border rounded-md bg-gray-50 capitalize">{profile.role}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Department</label>
            <p className="p-2 border rounded-md bg-gray-50">{profile.department}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            {isEditing ? (
              <Input 
                name="phone" 
                value={profile.phone} 
                onChange={handleInputChange} 
              />
            ) : (
              <p className="p-2 border rounded-md">{profile.phone}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            {isEditing ? (
              <Input 
                name="address" 
                value={profile.address} 
                onChange={handleInputChange} 
              />
            ) : (
              <p className="p-2 border rounded-md">{profile.address}</p>
            )}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
            {isEditing ? (
              <Input 
                name="emergencyContact" 
                value={profile.emergencyContact} 
                onChange={handleInputChange} 
              />
            ) : (
              <p className="p-2 border rounded-md">{profile.emergencyContact}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
