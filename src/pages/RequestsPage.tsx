
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "@/services/requestService";
import { RequestCard } from "@/components/RequestCard";
import { RequestDetailsDialog } from "@/components/RequestDetailsDialog";
import { RequestFilters } from "@/components/RequestFilters";
import { DevOpsRequest, RequestStatus } from "@/types/request";
import { Skeleton } from "@/components/ui/skeleton";

const RequestsPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<DevOpsRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "All">("All");

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  const handleRequestClick = (request: DevOpsRequest) => {
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

      <RequestFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

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
