
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "./StatusBadge";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Status array for progress display
const STATUSES = [
  "Request Submitted",
  "In Review",
  "Assigned",
  "Quotation Sent",
  "Awaiting Requestor",
  "Quotation Approved",
  "Awaiting PO",
  "Purchase Order Sent",
  "Fulfilment",
  "Invoice Raised",
  "Awaiting Payment", 
  "Payment Received",
  "Closed"
];

export const RequestDetailsDialog = ({
  request,
  open,
  onOpenChange,
}) => {
  if (!request) return null;

  const currentStatusIndex = STATUSES.findIndex(status => status === request.currentStatus);

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
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-8">
                  {STATUSES.map((status, index) => {
                    const isComplete = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    const timestamp = request.timestamps[status];
                    
                    return (
                      <div key={status} className="relative flex items-start">
                        <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white z-10">
                          {isComplete ? (
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-gray-300" />
                          )}
                        </div>
                        <div className="ml-4 min-w-0 flex-1">
                          <div className="flex justify-between">
                            <p
                              className={cn(
                                "text-sm font-medium",
                                isComplete ? "text-gray-900" : "text-gray-500"
                              )}
                            >
                              {status}
                            </p>
                            {timestamp && (
                              <div className="ml-1 flex items-center text-xs text-gray-500">
                                <Clock className="mr-1 h-3 w-3" />
                                {format(new Date(timestamp), "MMM d, yyyy")}
                              </div>
                            )}
                          </div>
                          {isCurrent && (
                            <p className="text-xs text-gray-500 mt-0.5">Current status</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
