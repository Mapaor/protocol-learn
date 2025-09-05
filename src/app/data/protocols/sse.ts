import { Protocol } from "../../types/protocol";

export const SSE: Protocol = {
    id: "sse",
    name: "SSE",
    category: "Real Time",
    difficulty: "Intermediate",
    shortDescription: "Server-Sent Events for real-time server-to-client communication",
    fullDescription: "SSE (Server-Sent Events) is a standard allowing a web page to get updates from a server automatically. It provides a simple way to stream data from server to client over a single HTTP connection, making it ideal for real-time applications.",
    port: "80 (HTTP), 443 (HTTPS)",
    advantages: [
      "Simple implementation",
      "Automatic reconnection",
      "Built-in browser support",
      "Efficient for server-to-client updates",
      "Low latency",
      "Works through firewalls and proxies"
    ],
    disadvantages: [
      "Unidirectional communication only",
      "Limited to text data",
      "Connection limits in browsers",
      "No binary data support",
      "Server resource consumption",
      "No message acknowledgment"
    ],
    useCases: [
      "Live notifications",
      "Real-time dashboards",
      "Live chat applications",
      "Stock price updates",
      "Social media feeds",
      "Live sports scores",
      "System monitoring",
      "News updates",
      "Progress indicators",
      "Live comments",
      "Real-time analytics",
      "Event streaming"
    ],
    examples: [
      {
        title: "SSE Client Implementation",
        code: `// JavaScript client
const eventSource = new EventSource('/events');

// Listen to default messages
eventSource.onmessage = function(event) {
    console.log('Received:', event.data);
    const data = JSON.parse(event.data);
    updateUI(data);
};

// Listen to custom event types
eventSource.addEventListener('notification', function(event) {
    console.log('Notification:', event.data);
    showNotification(event.data);
});

// Handle connection events
eventSource.onopen = function(event) {
    console.log('SSE connection opened');
};

eventSource.onerror = function(event) {
    console.log('SSE connection error');
};

// Close connection
// eventSource.close();`,
        explanation: "JavaScript client implementation for receiving server-sent events."
      },
      {
        title: "SSE Server Implementation (Node.js)",
        code: `const express = require('express');
const app = express();

app.get('/events', (req, res) => {
    // Set SSE headers
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });

    // Send initial connection message
    res.write('data: Connected to SSE\\n\\n');

    // Send periodic updates
    const interval = setInterval(() => {
        const data = {
            timestamp: new Date().toISOString(),
            value: Math.random()
        };
        
        res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
    }, 1000);

    // Send custom event
    res.write('event: notification\\n');
    res.write('data: Welcome to our service\\n\\n');

    // Clean up on client disconnect
    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

app.listen(3000);`,
        explanation: "Node.js server implementation for sending server-sent events."
      }
    ],
    relatedProtocols: ["http", "websockets", "tcp"],
    resources: [
      {
        title: "Server-Sent Events Specification",
        url: "https://html.spec.whatwg.org/multipage/server-sent-events.html",
        type: "Specification"
      },
      {
        title: "MDN SSE Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "CORS configuration",
      "Authentication tokens",
      "Rate limiting",
      "Input validation",
      "Connection monitoring",
      "Resource management"
    ]
};
