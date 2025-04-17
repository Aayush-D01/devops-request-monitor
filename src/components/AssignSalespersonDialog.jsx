
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { assignRequestToSalesperson } from "@/services/requestService";

// Mock salespeople - in a real app, you'd fetch these from your backend
const SALES_PEOPLE = [
  "Alex Johnson",
  "Sarah Miller",
  "David Chen",
  "Maria Garcia"
];

export const AssignSalespersonDialog = ({
  request,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssign = async () => {
    if (!selectedSalesperson) {
      toast({
        title: "Error",
        description: "Please select a salesperson",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, this would update the database
      await assignRequestToSalesperson(request.id, selectedSalesperson);
      
      toast({
        title: "Request assigned",
        description: `Request ${request.id} has been assigned to ${selectedSalesperson}`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col space-y-1.5">
            <DialogTitle>Assign Request to Salesperson</DialogTitle>
            <DialogDescription>
              {request.id} - {request.tool}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Current Status</p>
              <div className="mt-1">
                <StatusBadge status={request.currentStatus} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{request.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Requestor</p>
              <p className="font-medium">{request.requestor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Assignment</p>
              <p className="font-medium">
                {request.assignedTo || <span className="text-amber-600">Unassigned</span>}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="salesperson">Select Salesperson</Label>
            <Select 
              value={selectedSalesperson} 
              onValueChange={setSelectedSalesperson}
            >
              <SelectTrigger id="salesperson" className="mt-1">
                <SelectValue placeholder="Choose a salesperson" />
              </SelectTrigger>
              <SelectContent>
                {SALES_PEOPLE.map((person) => (
                  <SelectItem key={person} value={person}>
                    {person}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign} 
            disabled={!selectedSalesperson || isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
