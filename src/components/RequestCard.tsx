
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DevOpsRequest } from "@/types/request";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

interface RequestCardProps {
  request: DevOpsRequest;
  onClick: (request: DevOpsRequest) => void;
  className?: string;
}

export const RequestCard = ({ request, onClick, className }: RequestCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-amber-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{request.tool}</CardTitle>
            <CardDescription className="truncate max-w-xs">
              {request.id} · {request.department}
            </CardDescription>
          </div>
          <StatusBadge status={request.currentStatus} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div className="text-gray-500">Requestor</div>
          <div className="truncate">{request.requestor}</div>
          
          <div className="text-gray-500">Licenses</div>
          <div>{request.license}</div>
          
          <div className="text-gray-500">Est. Cost</div>
          <div>${request.estimatedCost.toLocaleString()}</div>
          
          <div className="text-gray-500">Priority</div>
          <div className={getPriorityColor(request.priority)}>{request.priority}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full" onClick={() => onClick(request)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
