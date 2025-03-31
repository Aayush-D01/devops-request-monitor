
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "@/services/requestService";
import { RequestCard } from "@/components/RequestCard";
import { RequestDetailsDialog } from "@/components/RequestDetailsDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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

const RequestsPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const filteredRequests = requests?.filter((request) => {
    const matchesSearch = searchQuery
      ? request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.requestor.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus = statusFilter !== "All" 
      ? request.currentStatus === statusFilter 
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">DevOps License Requests</h1>
        <p className="text-gray-600">
          Track and manage purchase requests for DevOps tools and licenses
        </p>
      </div>

      {/* Filters */}
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

      {/* Request Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-md" />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-red-500">Error loading requests. Please try again.</p>
        </div>
      ) : filteredRequests?.length === 0 ? (
        <div className="p-8 text-center border rounded-md bg-gray-50">
          <p className="text-gray-500">No requests found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests?.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onClick={handleRequestClick}
            />
          ))}
        </div>
      )}

      <RequestDetailsDialog
        request={selectedRequest}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  );
};

export default RequestsPage;
