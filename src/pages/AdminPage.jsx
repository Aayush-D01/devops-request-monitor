
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "@/services/requestService";
import { RequestDetailsDialog } from "@/components/RequestDetailsDialog";
import { AdminFilters } from "@/components/AdminFilters";
import { AssignSalespersonDialog } from "@/components/AssignSalespersonDialog";
import { REQUEST_STATUSES } from "@/types/request";
import { AdminNav } from "@/components/AdminNav";
import { AdminStats } from "@/components/admin/AdminStats";
import { RequestsTable } from "@/components/admin/RequestsTable";

const AdminPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    department: "All",
    priority: "All",
    assignedTo: "All",
  });

  // Fetch all requests
  const { data: requests, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  // Apply filters
  const filteredRequests = requests?.filter((request) => {
    // Search filter
    const matchesSearch = filters.search
      ? request.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.tool.toLowerCase().includes(filters.search.toLowerCase()) ||
        request.requestor.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    // Status filter
    const matchesStatus = filters.status !== "All" 
      ? request.currentStatus === filters.status 
      : true;
      
    // Department filter
    const matchesDepartment = filters.department !== "All"
      ? request.department === filters.department
      : true;
      
    // Priority filter
    const matchesPriority = filters.priority !== "All"
      ? request.priority === filters.priority
      : true;
      
    // Assigned to filter
    const matchesAssignedTo = filters.assignedTo !== "All"
      ? request.assignedTo === filters.assignedTo
      : true;

    return matchesSearch && matchesStatus && matchesDepartment && matchesPriority && matchesAssignedTo;
  });

  const handleAssign = (request) => {
    setSelectedRequest(request);
    setIsAssignOpen(true);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  return (
    <div>
      <AdminNav />
      
      <div className="container py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">License Requests Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Manage and assign license requests to your sales team
          </p>
          
          {/* Stats Cards */}
          <AdminStats requests={requests} />
        </div>

        {/* Filters */}
        <AdminFilters filters={filters} setFilters={setFilters} />

        {/* Requests Table */}
        {isLoading ? (
          <div className="text-center p-8">Loading requests...</div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500">Error loading requests. Please try again.</p>
          </div>
        ) : (
          <RequestsTable 
            requests={filteredRequests}
            onViewDetails={handleViewDetails}
            onAssign={handleAssign}
          />
        )}

        {/* Dialogs */}
        <RequestDetailsDialog
          request={selectedRequest}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
        <AssignSalespersonDialog
          request={selectedRequest}
          open={isAssignOpen}
          onOpenChange={setIsAssignOpen}
        />
      </div>
    </div>
  );
};

export default AdminPage;
