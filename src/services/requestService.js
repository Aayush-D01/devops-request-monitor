
// Generate a random timestamp within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000);
  return date;
};

// Generate random mock data
export const generateMockRequests = (count = 10) => {
  const tools = [
    "Jira", "GitLab", "Azure DevOps", "Salesforce CRM", "HubSpot",
    "Docker Enterprise", "Jenkins Pro", "GitHub Enterprise", "Kubernetes", "Terraform Cloud",
  ];

  const statuses = [
    "Request Submitted", "In Review", "Assigned", "Quotation Sent", "Awaiting Requestor",
    "Quotation Approved", "Awaiting PO", "Purchase Order Sent", "Fulfilment",
    "Invoice Raised", "Awaiting Payment", "Payment Received", "Closed",
  ];

  const departments = [
    "Engineering", "DevOps", "Sales", "Marketing", "IT Support", "Product", "QA",
  ];

  const priorities = ["Low", "Medium", "High"];
  
  const salespeople = [
    null, // For unassigned requests
    "Alex Johnson", 
    "Sarah Miller", 
    "David Chen", 
    "Maria Garcia"
  ];

  return Array.from({ length: count }, (_, i) => {
    // Randomly select a status with more probability for earlier stages
    const statusIndex = Math.floor(Math.random() * Math.random() * statuses.length);
    const currentStatus = statuses[statusIndex];
    
    // Generate timestamps up to the current status
    const timestamps = {
      "Request Submitted": getRandomDate(),
      "In Review": statusIndex >= 1 ? getRandomDate() : null,
      "Assigned": statusIndex >= 2 ? getRandomDate() : null,
      "Quotation Sent": statusIndex >= 3 ? getRandomDate() : null,
      "Awaiting Requestor": statusIndex >= 4 ? getRandomDate() : null,
      "Quotation Approved": statusIndex >= 5 ? getRandomDate() : null,
      "Awaiting PO": statusIndex >= 6 ? getRandomDate() : null,
      "Purchase Order Sent": statusIndex >= 7 ? getRandomDate() : null,
      "Fulfilment": statusIndex >= 8 ? getRandomDate() : null,
      "Invoice Raised": statusIndex >= 9 ? getRandomDate() : null,
      "Awaiting Payment": statusIndex >= 10 ? getRandomDate() : null,
      "Payment Received": statusIndex >= 11 ? getRandomDate() : null,
      "Closed": statusIndex >= 12 ? getRandomDate() : null,
    };

    // Only assign if status is past "In Review"
    const assignedTo = statusIndex >= 2 
      ? salespeople[Math.floor(Math.random() * salespeople.length)]
      : null;

    return {
      id: `REQ-${1000 + i}`,
      tool: tools[Math.floor(Math.random() * tools.length)],
      requestor: `user${i + 1}@company.com`,
      department: departments[Math.floor(Math.random() * departments.length)],
      license: Math.floor(Math.random() * 50) + 1,
      estimatedCost: Math.floor(Math.random() * 10000) + 500,
      currentStatus,
      timestamps,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignedTo,
    };
  });
};

// Simulate fetching requests
export const fetchRequests = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateMockRequests(12);
};

// Simulate assigning a request to a salesperson
export const assignRequestToSalesperson = async (requestId, salesperson) => {
  console.log(`Assigning request ${requestId} to ${salesperson}`);
  // In a real app, this would make an API call
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  // In a real app, this would return the updated request
  return {
    success: true,
    message: `Request ${requestId} assigned to ${salesperson}`,
  };
};

// Simulate updating a request status
export const updateRequestStatus = async (requestId, newStatus) => {
  console.log(`Updating request ${requestId} to status: ${newStatus}`);
  // In a real app, this would make an API call
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  // In a real app, this would return the updated request
  return {
    success: true,
    message: `Request ${requestId} status updated to ${newStatus}`,
  };
};
