
import { cn } from "@/lib/utils";
import { CheckIcon, Clock } from "lucide-react";
import { format } from "date-fns";

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

export const RequestProgress = ({ request, className }) => {
  const currentStatusIndex = STATUSES.findIndex(status => status === request.currentStatus);

  return (
    <div className={cn("space-y-4", className)}>
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
  );
};
