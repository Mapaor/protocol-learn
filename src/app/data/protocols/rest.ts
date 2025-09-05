import { Protocol } from "../../types/protocol";

export const REST: Protocol = {
    id: "rest",
    name: "REST API",
    category: "APIs",
    difficulty: "Beginner",
    shortDescription: "Representational State Transfer for web APIs",
    fullDescription: "REST is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other. REST-compliant systems are characterized by being stateless and having a client-server architecture.",
    port: "80 / 443",
    advantages: [
      "Simple and intuitive",
      "Stateless architecture",
      "Cacheable responses",
      "Platform independent",
      "HTTP method semantics"
    ],
    disadvantages: [
      "Over-fetching/under-fetching data",
      "Multiple round trips needed",
      "No built-in real-time support",
      "Limited querying capabilities",
      "Versioning challenges"
    ],
    useCases: [
      "Web and mobile APIs",
      "Microservices communication",
      "Third-party integrations",
      "CRUD operations",
      "Public API offerings",
      "Enterprise system integration",
      "Mobile backend services",
      "IoT data collection",
      "Content management systems",
      "E-commerce platforms",
      "Social media APIs",
      "Payment processing APIs",
      "Analytics and reporting APIs",
      "Real-time dashboard data",
      "Multi-tenant applications"
    ],
    examples: [
      {
        title: "REST API Examples",
        code: `# GET - Retrieve data
GET /api/users/123
GET /api/users?page=1&limit=10

# POST - Create new resource
POST /api/users
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com"
}

# PUT - Update entire resource
PUT /api/users/123
Content-Type: application/json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}

# PATCH - Partial update
PATCH /api/users/123
Content-Type: application/json
{
  "email": "newemail@example.com"
}

# DELETE - Remove resource
DELETE /api/users/123`,
        explanation: "Standard REST API operations using HTTP methods for different actions on resources."
      }
    ],
    diagrams: [
      {
        src: "/rest-api.png",
        alt: "REST API architecture",
        caption: "RESTful API request-response cycle and resource-based URLs"
      }
    ],
    relatedProtocols: ["http", "https", "json", "xml"],
    resources: [
      {
        title: "REST API Design Best Practices",
        url: "https://restfulapi.net/",
        type: "Documentation"
      },
      {
        title: "Postman API Testing Tool",
        url: "https://www.postman.com/",
        type: "Tool"
      }
    ]
  }