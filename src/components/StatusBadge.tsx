
import { cn } from "@/lib/utils";
import { RequestStatus } from "@/types/request";

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "Request Submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Assigned":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Quotation Sent":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "Awaiting Requestor":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Quotation Approved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Awaiting PO":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Purchase Order Sent":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "Fulfilment":
        return "bg-lime-100 text-lime-800 border-lime-200";
      case "Invoice Raised":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "Awaiting Payment":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Payment Received":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full border",
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
};
