import { Protocol } from "../../types/protocol";

export const STOMP: Protocol = {
    id: "stomp",
    name: "STOMP",
    category: "Messaging",
    difficulty: "Intermediate",
    shortDescription: "Simple Text Oriented Messaging Protocol for message broker communication",
    fullDescription: "STOMP (Simple Text Oriented Messaging Protocol) is a simple interoperable protocol designed for asynchronous message passing between clients via a message broker. It provides an interoperable wire format that allows STOMP clients to talk with any message broker supporting the protocol.",
    port: "61613 (default), 61614 (SSL)",
    versions: ["STOMP 1.0", "STOMP 1.1", "STOMP 1.2"],
    advantages: [
      "Simple text-based protocol",
      "Language agnostic",
      "Firewall friendly",
      "Easy to implement",
      "Human readable",
      "WebSocket compatible"
    ],
    disadvantages: [
      "Limited message types",
      "No built-in security",
      "Performance overhead",
      "Limited routing capabilities",
      "No compression support",
      "Basic error handling"
    ],
    useCases: [
      "Web-based messaging",
      "Real-time notifications",
      "Chat applications",
      "Live updates",
      "Browser-to-server messaging",
      "IoT communication",
      "Microservices messaging",
      "Event broadcasting",
      "Gaming applications",
      "Financial data feeds",
      "Social media updates",
      "Collaborative applications"
    ],
    examples: [
      {
        title: "STOMP Connection and Messaging",
        code: `# Connect to broker
CONNECT
accept-version:1.2
host:localhost
login:guest
passcode:guest

^@

# Server response
CONNECTED
version:1.2
session:session-xyz

^@

# Subscribe to destination
SUBSCRIBE
id:sub-1
destination:/queue/test
ack:auto

^@

# Send message
SEND
destination:/queue/test
content-type:text/plain

Hello, STOMP!^@

# Receive message
MESSAGE
subscription:sub-1
message-id:msg-123
destination:/queue/test
content-type:text/plain

Hello, STOMP!^@`,
        explanation: "STOMP protocol frames for connection, subscription, and messaging."
      },
      {
        title: "STOMP over WebSocket (JavaScript)",
        code: `// Using stompjs library
import { Client } from '@stomp/stompjs';

const client = new Client({
    brokerURL: 'ws://localhost:61614/stomp',
    connectHeaders: {
        login: 'guest',
        passcode: 'guest'
    },
    debug: function (str) {
        console.log('STOMP: ' + str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

// Connection callback
client.onConnect = function (frame) {
    console.log('Connected: ' + frame);
    
    // Subscribe to destination
    client.subscribe('/queue/test', function (message) {
        console.log('Received: ' + message.body);
    });
    
    // Send message
    client.publish({
        destination: '/queue/test',
        body: 'Hello from JavaScript client!'
    });
};

// Error callback
client.onStompError = function (frame) {
    console.log('Broker error: ' + frame.headers['message']);
    console.log('Details: ' + frame.body);
};

// Activate connection
client.activate();`,
        explanation: "STOMP client implementation using JavaScript and WebSockets."
      }
    ],
    relatedProtocols: ["websockets", "tcp", "jms"],
    resources: [
      {
        title: "STOMP Protocol Specification",
        url: "https://stomp.github.io/stomp-specification-1.2.html",
        type: "Specification"
      },
      {
        title: "Apache ActiveMQ STOMP",
        url: "https://activemq.apache.org/stomp",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Authentication credentials",
      "TLS/SSL encryption",
      "Access control",
      "Input validation",
      "Rate limiting",
      "Connection limits"
    ]
};
