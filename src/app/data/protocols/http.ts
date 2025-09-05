import { Protocol } from "../../types/protocol";

export const HTTP: Protocol = {
    id: "http",
    name: "HTTP",
    category: "Web",
    difficulty: "Beginner",
    shortDescription: "The foundation protocol of the World Wide Web",
    fullDescription: "HTTP (Hypertext Transfer Protocol) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes.",
    port: "80",
    versions: ["HTTP/1.0", "HTTP/1.1", "HTTP/2", "HTTP/3"],
    advantages: [
      "Simple and human-readable",
      "Stateless - each request is independent",
      "Platform independent",
      "Widely supported",
      "Extensible through headers"
    ],
    disadvantages: [
      "Not secure by default",
      "Stateless nature requires cookies for session management",
      "Text-based protocol can be inefficient",
      "Head-of-line blocking in HTTP/1.x"
    ],
    useCases: [
      "Web browsing",
      "RESTful APIs",
      "Web services",
      "Content delivery",
      "AJAX requests",
      "Single-page applications (SPAs)",
      "Progressive web apps (PWAs)",
      "API gateways",
      "Microservices communication",
      "IoT device communication",
      "Mobile app backends",
      "Static file serving",
      "Load balancer health checks"
    ],
    examples: [
      {
        title: "Simple GET Request",
        code: `GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html`,
        explanation: "A basic HTTP GET request to retrieve a web page. The request includes the method (GET), path (/index.html), protocol version, and headers."
      },
      {
        title: "POST Request with Data",
        code: `POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 45

{"name": "John Doe", "email": "john@example.com"}`,
        explanation: "A POST request sending JSON data to create a new user. Note the Content-Type and Content-Length headers."
      }
    ],
    diagrams: [
      {
        src: "/http.gif",
        alt: "HTTP request-response cycle",
        caption: "The basic HTTP request-response cycle between client and server"
      }
    ],
    relatedProtocols: ["https", "tcp", "rest"],
    commonCommands: [
      {
        command: "curl",
        description: "Make HTTP requests from command line",
        example: "curl -X GET https://api.example.com/users"
      },
      {
        command: "wget",
        description: "Download files using HTTP",
        example: "wget https://example.com/file.zip"
      }
    ],
    resources: [
      {
        title: "RFC 7231 - HTTP/1.1 Semantics",
        url: "https://tools.ietf.org/html/rfc7231",
        type: "RFC"
      },
      {
        title: "MDN HTTP Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "No encryption by default",
      "Vulnerable to man-in-the-middle attacks",
      "Headers and data transmitted in plain text"
    ],
    modernAlternatives: ["HTTPS", "HTTP/2", "HTTP/3", "gRPC"]
  }