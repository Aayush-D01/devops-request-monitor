
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

export const RequestsTable = ({ 
  requests, 
  onViewDetails, 
  onAssign 
}) => {
  return (
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
          {requests?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                No requests found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            requests?.map((request) => (
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
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(request)}>
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => onAssign(request)}
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
  );
};
