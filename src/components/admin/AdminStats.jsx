
import { ClipboardList, Calendar, DollarSign, UserPlus } from "lucide-react";

export const AdminStats = ({ requests }) => {
  // Calculate statistics
  const totalRequests = requests?.length || 0;
  const pendingRequests = requests?.filter(req => 
    ["Request Submitted", "In Review", "Assigned"].includes(req.currentStatus)
  ).length || 0;
  
  const totalEstimatedValue = requests?.reduce((sum, req) => sum + req.estimatedCost, 0) || 0;
  
  const unassignedRequests = requests?.filter(req => !req.assignedTo).length || 0;

  return (
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
          <p className="text-2xl font-bold">{unassignedRequests}</p>
        </div>
      </div>
    </div>
  );
};
