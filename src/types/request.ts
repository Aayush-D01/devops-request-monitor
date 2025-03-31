
export type RequestStatus = 
  | "Request Submitted"
  | "In Review"
  | "Assigned"
  | "Quotation Sent"
  | "Awaiting Requestor"
  | "Quotation Approved"
  | "Awaiting PO"
  | "Purchase Order Sent"
  | "Fulfilment"
  | "Invoice Raised"
  | "Awaiting Payment"
  | "Payment Received"
  | "Closed";

export type PriorityLevel = "Low" | "Medium" | "High";

export interface DevOpsRequest {
  id: string;
  tool: string;
  requestor: string;
  department: string;
  license: number;
  estimatedCost: number;
  currentStatus: RequestStatus;
  timestamps: Record<RequestStatus, Date | null>;
  priority: PriorityLevel;
}
