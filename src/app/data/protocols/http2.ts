import { Protocol } from "../../types/protocol";

export const HTTP2: Protocol = {
    id: "http2",
    name: "HTTP/2",
    category: "Web",
    difficulty: "Advanced",
    shortDescription: "HTTP/2 protocol for improved web performance and efficiency",
    fullDescription: "HTTP/2 is a major revision of the HTTP network protocol. It introduces several improvements over HTTP/1.1 including multiplexing, server push, header compression, and binary framing to reduce latency and improve performance for modern web applications.",
    port: "80 (HTTP), 443 (HTTPS)",
    advantages: [
      "Multiplexing support",
      "Server push capability",
      "Header compression (HPACK)",
      "Binary framing",
      "Stream prioritization",
      "Reduced latency"
    ],
    disadvantages: [
      "Increased complexity",
      "CPU overhead",
      "Single connection dependency",
      "Head-of-line blocking at TCP level",
      "Limited browser support (older)",
      "Debugging complexity"
    ],
    useCases: [
      "Modern web applications",
      "High-performance websites",
      "Mobile applications",
      "API services",
      "Content delivery networks",
      "Real-time applications",
      "Progressive web apps",
      "E-commerce platforms",
      "Media streaming",
      "Single-page applications",
      "Microservices communication",
      "Cloud-native applications"
    ],
    examples: [
      {
        title: "HTTP/2 vs HTTP/1.1 Comparison",
        code: `# HTTP/1.1 Request
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0...
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate

# HTTP/2 Request (conceptual - actually binary)
:method: GET
:path: /index.html
:scheme: https
:authority: example.com
user-agent: Mozilla/5.0...
accept: text/html,application/xhtml+xml

# HTTP/2 Features:
- Binary framing layer
- Multiplexed streams
- Header compression with HPACK
- Server push
- Stream prioritization
- Flow control`,
        explanation: "Comparison between HTTP/1.1 and HTTP/2 request formats and features."
      },
      {
        title: "HTTP/2 Server Implementation (Node.js)",
        code: `const http2 = require('http2');
const fs = require('fs');

// Create HTTP/2 server
const server = http2.createSecureServer({
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('certificate.pem')
});

server.on('stream', (stream, headers) => {
    const path = headers[':path'];
    const method = headers[':method'];
    
    console.log(\`\${method} \${path}\`);
    
    if (path === '/') {
        // Server push example
        stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
            if (!err) {
                pushStream.respond({ ':status': 200, 'content-type': 'text/css' });
                pushStream.end('body { font-family: Arial; }');
            }
        });
        
        // Main response
        stream.respond({
            'content-type': 'text/html',
            ':status': 200
        });
        stream.end('<html><head><link rel="stylesheet" href="/style.css"></head><body><h1>HTTP/2 Server</h1></body></html>');
    } else {
        stream.respond({ ':status': 404 });
        stream.end('Not Found');
    }
});

server.listen(8443, () => {
    console.log('HTTP/2 server listening on port 8443');
});`,
        explanation: "HTTP/2 server implementation with server push functionality."
      }
    ],
    relatedProtocols: ["http", "https", "tcp", "tls", "spdy"],
    resources: [
      {
        title: "RFC 7540 - HTTP/2 Specification",
        url: "https://tools.ietf.org/html/rfc7540",
        type: "RFC"
      },
      {
        title: "HTTP/2 Performance Testing",
        url: "https://tools.keycdn.com/http2-test",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "TLS requirement (browsers)",
      "ALPN negotiation",
      "Certificate validation",
      "HPACK compression attacks",
      "Stream management",
      "Flow control security"
    ]
};
