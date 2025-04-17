
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { REQUEST_STATUSES } from "@/types/request";

// Include "All" option
const STATUSES = ["All", ...REQUEST_STATUSES];

// Mock data - in a real app, you'd fetch these from your backend
const DEPARTMENTS = [
  "All",
  "Engineering",
  "DevOps",
  "Sales",
  "Marketing",
  "IT Support",
  "Product",
  "QA"
];

const PRIORITIES = ["All", "High", "Medium", "Low"];

// Mock salespeople - in a real app, you'd fetch these from your backend
const SALES_PEOPLE = [
  "All",
  "Alex Johnson",
  "Sarah Miller",
  "David Chen",
  "Maria Garcia"
];

export const AdminFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 mr-2 text-gray-500" />
        <h2 className="font-medium">Filter Requests</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Filter */}
        <div>
          <Label htmlFor="search" className="mb-1 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="search"
              placeholder="Search by ID, tool, requestor..."
              className="pl-9"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Label htmlFor="status-filter" className="mb-1 block">
            Status
          </Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
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

        {/* Department Filter */}
        <div>
          <Label htmlFor="department-filter" className="mb-1 block">
            Department
          </Label>
          <Select
            value={filters.department}
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger id="department-filter">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority Filter */}
        <div>
          <Label htmlFor="priority-filter" className="mb-1 block">
            Priority
          </Label>
          <Select
            value={filters.priority}
            onValueChange={(value) => handleFilterChange("priority", value)}
          >
            <SelectTrigger id="priority-filter">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITIES.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Assigned To Filter */}
        <div>
          <Label htmlFor="assigned-filter" className="mb-1 block">
            Assigned To
          </Label>
          <Select
            value={filters.assignedTo}
            onValueChange={(value) => handleFilterChange("assignedTo", value)}
          >
            <SelectTrigger id="assigned-filter">
              <SelectValue placeholder="Filter by salesperson" />
            </SelectTrigger>
            <SelectContent>
              {SALES_PEOPLE.map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
