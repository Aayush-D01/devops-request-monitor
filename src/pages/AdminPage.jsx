
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRequests } from "@/services/requestService";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { RequestDetailsDialog } from "@/components/RequestDetailsDialog";
import { AdminFilters } from "@/components/AdminFilters";
import { AssignSalespersonDialog } from "@/components/AssignSalespersonDialog";
import { REQUEST_STATUSES } from "@/types/request";
import { AdminNav } from "@/components/AdminNav";
import { 
  ClipboardList, 
  UserPlus, 
  Calendar, 
  DollarSign, 
  Filter
} from "lucide-react";

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

  // Calculate statistics
  const statusCounts = REQUEST_STATUSES.reduce((acc, status) => {
    acc[status] = requests?.filter(req => req.currentStatus === status).length || 0;
    return acc;
  }, {});

  const totalRequests = requests?.length || 0;
  const pendingRequests = requests?.filter(req => 
    ["Request Submitted", "In Review", "Assigned"].includes(req.currentStatus)
  ).length || 0;
  
  const totalEstimatedValue = requests?.reduce((sum, req) => sum + req.estimatedCost, 0) || 0;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-2xl font-bold">{totalRequests}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">{pendingRequests}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Est. Total Value</p>
                <p className="text-2xl font-bold">${totalEstimatedValue.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unassigned</p>
                <p className="text-2xl font-bold">
                  {requests?.filter(req => !req.assignedTo).length || 0}
                </p>
              </div>
            </div>
          </div>
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
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tool</TableHead>
                  <TableHead>Requestor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Est. Cost</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      No requests found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests?.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.tool}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {request.requestor}
                      </TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        <StatusBadge status={request.currentStatus} />
                      </TableCell>
                      <TableCell>
                        <span className={
                          request.priority === "High" 
                            ? "text-red-600" 
                            : request.priority === "Medium" 
                              ? "text-amber-600" 
                              : "text-green-600"
                        }>{request.priority}</span>
                      </TableCell>
                      <TableCell>${request.estimatedCost.toLocaleString()}</TableCell>
                      <TableCell>
                        {request.assignedTo || (
                          <span className="text-amber-600">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleAssign(request)}
                          >
                            Assign
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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
