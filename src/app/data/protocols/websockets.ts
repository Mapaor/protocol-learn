import { Protocol } from "../../types/protocol";

export const WEBSOCKETS: Protocol = {
    id: "websockets",
    name: "WebSockets",
    category: "Real Time",
    difficulty: "Intermediate",
    shortDescription: "Full-duplex communication protocol for real-time web applications",
    fullDescription: "WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection. It enables interaction between a web browser (or other client application) and a web server with lower overhead than HTTP polling.",
    port: "80 / 443",
    versions: ["RFC 6455"],
    advantages: [
      "Full-duplex communication",
      "Low latency",
      "Less overhead than HTTP polling",
      "Real-time data exchange",
      "Works through firewalls",
      "Browser support"
    ],
    disadvantages: [
      "Stateful connections",
      "Complex error handling",
      "Scaling challenges",
      "No automatic reconnection",
      "Proxy complications"
    ],
    useCases: [
      "Real-time chat applications",
      "Live gaming",
      "Collaborative editing",
      "Live sports updates",
      "Trading platforms",
      "IoT dashboards",
      "Live streaming chat",
      "Real-time notifications",
      "Multiplayer games",
      "Live data visualization",
      "Video conferencing",
      "Social media feeds"
    ],
    examples: [
      {
        title: "WebSocket Client Example",
        code: `// JavaScript WebSocket client
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(event) {
    console.log('Connected to WebSocket server');
    socket.send('Hello Server!');
};

socket.onmessage = function(event) {
    console.log('Received:', event.data);
};

socket.onclose = function(event) {
    console.log('Connection closed');
};

socket.onerror = function(error) {
    console.log('WebSocket error:', error);
};`,
        explanation: "Basic WebSocket client implementation showing connection lifecycle and message handling."
      },
      {
        title: "WebSocket Handshake",
        code: `GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`,
        explanation: "WebSocket handshake process upgrading from HTTP to WebSocket protocol."
      }
    ],
    relatedProtocols: ["http", "tcp", "sse"],
    resources: [
      {
        title: "RFC 6455 - WebSocket Protocol",
        url: "https://tools.ietf.org/html/rfc6455",
        type: "RFC"
      },
      {
        title: "Socket.IO Library",
        url: "https://socket.io/",
        type: "Library"
      }
    ],
    securityConsiderations: [
      "Use WSS for secure connections",
      "Validate all incoming messages",
      "Implement rate limiting",
      "CSRF protection needed"
    ]
  }