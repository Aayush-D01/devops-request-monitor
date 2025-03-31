
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";

const STATUSES = [
  "All",
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

export const RequestFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      <div>
        <Label htmlFor="search" className="sr-only">
          Search requests
        </Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            id="search"
            placeholder="Search by ID, tool, or requestor..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="status-filter" className="sr-only">
          Filter by status
        </Label>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger id="status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
