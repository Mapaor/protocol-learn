import { Protocol } from "../../types/protocol";

export const SPDY: Protocol = {
    id: "spdy",
    name: "SPDY",
    category: "Web",
    difficulty: "Advanced",
    shortDescription: "SPDY protocol for improved web performance (predecessor to HTTP/2)",
    fullDescription: "SPDY (pronounced 'speedy') was an experimental protocol developed by Google to reduce web page load latency and improve security. It served as the foundation for HTTP/2 and introduced concepts like multiplexing, server push, and header compression. SPDY is now deprecated in favor of HTTP/2.",
    port: "443 (HTTPS)",
    versions: ["SPDY/2", "SPDY/3", "SPDY/3.1"],
    advantages: [
      "Multiplexed streams",
      "Request prioritization",
      "Header compression",
      "Server push",
      "Reduced latency",
      "Always encrypted"
    ],
    disadvantages: [
      "Deprecated protocol",
      "Limited browser support",
      "Superseded by HTTP/2",
      "Complex implementation",
      "Google-specific",
      "No longer maintained"
    ],
    useCases: [
      "Legacy web applications",
      "Historical implementations",
      "Protocol research",
      "Performance benchmarking",
      "Educational purposes",
      "Migration planning"
    ],
    examples: [
      {
        title: "SPDY vs HTTP/1.1 Comparison",
        code: `# HTTP/1.1 Multiple Requests (sequential)
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive

GET /style.css HTTP/1.1
Host: example.com
Connection: keep-alive

GET /script.js HTTP/1.1
Host: example.com
Connection: keep-alive

# SPDY Multiplexed Requests (parallel)
Stream 1: GET /index.html
Stream 3: GET /style.css  
Stream 5: GET /script.js

# SPDY Features:
- All streams multiplexed over single connection
- Binary framing layer
- Header compression (DEFLATE)
- Server push capability
- Request prioritization
- Always over TLS/SSL`,
        explanation: "Comparison showing SPDY's multiplexing advantages over HTTP/1.1."
      },
      {
        title: "SPDY Server Configuration (Nginx)",
        code: `# nginx.conf (historical - no longer supported)
server {
    listen 443 ssl spdy;
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SPDY settings
    spdy_headers_comp 6;
    spdy_keepalive_timeout 300;
    spdy_recv_timeout 4;
    
    # Enable SPDY push
    location / {
        spdy_push /css/style.css;
        spdy_push /js/script.js;
        try_files $uri $uri/ =404;
    }
    
    # Add SPDY header for debugging
    add_header X-Protocol $spdy always;
}

# Note: SPDY support was removed from major browsers
# Chrome: Removed in 2016
# Firefox: Removed in 2016  
# Use HTTP/2 instead`,
        explanation: "Historical SPDY server configuration (now deprecated)."
      }
    ],
    relatedProtocols: ["http2", "https", "tls"],
    resources: [
      {
        title: "SPDY Protocol Draft",
        url: "https://tools.ietf.org/html/draft-mbelshe-httpbis-spdy-00",
        type: "Specification"
      },
      {
        title: "Chrome SPDY Documentation",
        url: "https://www.chromium.org/spdy/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "TLS requirement",
      "Certificate validation",
      "Protocol downgrade attacks",
      "Header compression vulnerabilities",
      "Stream multiplexing security",
      "Legacy vulnerability exposure"
    ]
};
