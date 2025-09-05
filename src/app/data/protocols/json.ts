import { Protocol } from "../../types/protocol";

export const JSON: Protocol = {
    id: "json",
    name: "JSON",
    category: "Data",
    difficulty: "Beginner",
    shortDescription: "JavaScript Object Notation for data interchange",
    fullDescription: "JSON (JavaScript Object Notation) is a lightweight, text-based, language-independent data interchange format. It was derived from JavaScript, but many modern programming languages include code to generate and parse JSON-format data.",
    advantages: [
      "Human-readable format",
      "Lightweight and compact",
      "Language independent",
      "Native JavaScript support",
      "Simple parsing",
      "Wide browser support"
    ],
    disadvantages: [
      "No comments support",
      "Limited data types",
      "No date/time format",
      "No schema validation (without extensions)",
      "Security risks with eval()"
    ],
    useCases: [
      "REST API responses",
      "Configuration files",
      "Data storage",
      "AJAX communications",
      "NoSQL databases",
      "Web service APIs",
      "Mobile app data exchange",
      "Real-time data streams",
      "Log file formats",
      "Cache storage",
      "Message queues",
      "Microservices communication"
    ],
    examples: [
      {
        title: "JSON Data Structure",
        code: `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "coding", "gaming"],
  "spouse": null,
  "children": [
    {
      "name": "Jane",
      "age": 5
    },
    {
      "name": "Bob",
      "age": 3
    }
  ]
}`,
        explanation: "Example JSON object showing various data types including objects, arrays, strings, numbers, booleans, and null."
      },
      {
        title: "JSON API Response",
        code: `{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "username": "johndoe",
        "email": "john@example.com",
        "createdAt": "2023-01-15T10:30:00Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150
  }
}`,
        explanation: "Typical JSON structure for API responses including data, metadata, and pagination information."
      }
    ],
    relatedProtocols: ["rest", "http", "ajax"],
    resources: [
      {
        title: "JSON.org Official Site",
        url: "https://www.json.org/",
        type: "Documentation"
      },
      {
        title: "JSONLint Validator",
        url: "https://jsonlint.com/",
        type: "Tool"
      }
    ]
  }