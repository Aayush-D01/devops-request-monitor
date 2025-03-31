
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DevOpsRequest } from "@/types/request";
import { StatusBadge } from "./StatusBadge";
import { RequestProgress } from "./RequestProgress";
import { Separator } from "@/components/ui/separator";

interface RequestDetailsDialogProps {
  request: DevOpsRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RequestDetailsDialog = ({
  request,
  open,
  onOpenChange,
}: RequestDetailsDialogProps) => {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{request.tool} License Request</DialogTitle>
              <DialogDescription className="mt-1">
                {request.id} · Requested by {request.requestor}
              </DialogDescription>
            </div>
            <StatusBadge status={request.currentStatus} />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Request Details</h3>
              <div className="mt-2 grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">Department</div>
                <div>{request.department}</div>
                
                <div className="text-gray-500">Licenses</div>
                <div>{request.license}</div>
                
                <div className="text-gray-500">Estimated Cost</div>
                <div>${request.estimatedCost.toLocaleString()}</div>
                
                <div className="text-gray-500">Priority</div>
                <div>{request.priority}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Additional Information</h3>
              <p className="mt-2 text-sm text-gray-700">
                This license request is for the {request.department} team to facilitate their ongoing
                DevOps operations. The {request.tool} licenses will be distributed among team members
                to improve collaboration and workflow efficiency.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">Request Progress</h3>
            <RequestProgress request={request} />
          </div>
        </div>

        <Separator className="my-2" />
        
        <div className="text-xs text-gray-500 flex justify-between">
          <span>Created: {request.timestamps["Request Submitted"]?.toLocaleDateString()}</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
