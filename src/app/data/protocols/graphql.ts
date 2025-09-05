import { Protocol } from "../../types/protocol";

export const GRAPHQL: Protocol =   {
    id: "graphql",
    name: "GraphQL",
    category: "APIs",
    difficulty: "Intermediate",
    shortDescription: "Query language and runtime for APIs",
    fullDescription: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more.",
    port: "Typically 4000 / 80 / 443",
    advantages: [
      "Single endpoint for all data",
      "Strong type system",
      "Real-time subscriptions",
      "Efficient data fetching",
      "Self-documenting",
      "Version-free evolution"
    ],
    disadvantages: [
      "Learning curve",
      "Complex caching",
      "Query complexity analysis needed",
      "Over-fetching potential",
      "File upload complications"
    ],
    useCases: [
      "Modern web applications",
      "Mobile app backends",
      "Microservices aggregation",
      "Real-time applications",
      "Developer APIs",
      "Content management systems",
      "E-commerce platforms",
      "Social media platforms",
      "Data analytics dashboards",
      "Multi-platform applications",
      "Third-party integrations"
    ],
    examples: [
      {
        title: "GraphQL Query",
        code: `query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    posts {
      id
      title
      content
      createdAt
      comments {
        id
        content
        author {
          name
        }
      }
    }
  }
}

# Variables
{
  "id": "123"
}`,
        explanation: "GraphQL query requesting specific fields from related entities, showing the nested nature of GraphQL queries."
      },
      {
        title: "GraphQL Mutation",
        code: `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    author {
      id
      name
    }
    createdAt
  }
}

# Variables
{
  "input": {
    "title": "My New Post",
    "content": "This is the content of my post",
    "authorId": "456"
  }
}`,
        explanation: "GraphQL mutation for creating data, showing input types and return fields selection."
      }
    ],
    relatedProtocols: ["http", "websockets", "json"],
    resources: [
      {
        title: "GraphQL Official Site",
        url: "https://graphql.org/",
        type: "Documentation"
      },
      {
        title: "Apollo GraphQL Platform",
        url: "https://www.apollographql.com/",
        type: "Platform"
      }
    ]
  }