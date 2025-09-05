import { Protocol } from '../types/protocol';

export const PROTOCOLS: Protocol[] = [
  {
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
  },
  {
    id: "https",
    name: "HTTPS",
    category: "Web",
    difficulty: "Intermediate",
    shortDescription: "HTTP over TLS/SSL for secure web communication",
    fullDescription: "HTTPS (HTTP Secure) is an extension of HTTP that uses TLS or SSL protocols to encrypt communication between client and server. It provides confidentiality, integrity, and authentication.",
    port: "443",
    versions: ["HTTPS over TLS 1.2", "HTTPS over TLS 1.3"],
    advantages: [
      "Encrypted communication",
      "Data integrity verification",
      "Server authentication",
      "SEO benefits",
      "Browser security indicators"
    ],
    disadvantages: [
      "Additional computational overhead",
      "Certificate management complexity",
      "Slightly slower than HTTP",
      "Cost of SSL certificates (though free options exist)"
    ],
    useCases: [
      "Secure web browsing",
      "Online banking",
      "E-commerce",
      "Login pages",
      "API endpoints with sensitive data",
      "Payment processing",
      "Healthcare applications (HIPAA compliance)",
      "Financial services",
      "Government websites",
      "Social media platforms",
      "Cloud services authentication",
      "VPN web interfaces",
      "Enterprise applications"
    ],
    examples: [
      {
        title: "HTTPS Handshake Process",
        code: `1. Client Hello (supported cipher suites)
2. Server Hello (chosen cipher suite)
3. Certificate exchange
4. Key exchange
5. Encrypted communication begins`,
        explanation: "The TLS handshake process that establishes a secure connection between client and server."
      }
    ],
    diagrams: [
      {
        src: "/https.gif",
        alt: "HTTPS connection process",
        caption: "HTTPS connection establishment with TLS handshake"
      },
      {
        src: "/https_ssl.jpg",
        alt: "SSL/TLS encryption layers",
        caption: "How SSL/TLS provides security layers over HTTP"
      }
    ],
    relatedProtocols: ["http", "tls", "ssl"],
    resources: [
      {
        title: "RFC 8446 - TLS 1.3",
        url: "https://tools.ietf.org/html/rfc8446",
        type: "RFC"
      },
      {
        title: "Let's Encrypt - Free SSL Certificates",
        url: "https://letsencrypt.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Certificate validation is crucial",
      "Weak cipher suites should be avoided",
      "HSTS headers recommended",
      "Regular certificate renewal required"
    ]
  },
  {
    id: "ftp",
    name: "FTP",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "File Transfer Protocol for exchanging files over networks",
    fullDescription: "FTP is a standard network protocol used for transferring files between a client and server. It uses separate control and data connections, making it efficient for large file transfers.",
    port: "20 (data), 21 (control)",
    versions: ["FTP", "FTPS", "SFTP"],
    advantages: [
      "Efficient for large file transfers",
      "Resume interrupted transfers",
      "Directory listing capabilities",
      "Multiple transfer modes",
      "Widely supported"
    ],
    disadvantages: [
      "Not secure by default",
      "Complex firewall configuration",
      "Passive/Active mode complications",
      "Plain text authentication",
      "Separate data connection required"
    ],
    useCases: [
      "Website deployment",
      "Backup operations",
      "Large file distribution",
      "Legacy system integration",
      "Bulk data transfer",
      "Content management systems",
      "Media file uploads",
      "Log file collection",
      "Software distribution",
      "Database backups",
      "Server maintenance",
      "Configuration file sync"
    ],
    examples: [
      {
        title: "FTP Session Example",
        code: `220 Welcome to FTP server
USER anonymous
331 Please specify the password
PASS guest@example.com
230 Login successful
PWD
257 "/" is current directory
LIST
150 Opening data connection
226 Transfer complete
QUIT
221 Goodbye`,
        explanation: "A typical FTP session showing login, directory listing, and logout commands."
      }
    ],
    diagrams: [
      {
        src: "/ftp.gif",
        alt: "FTP protocol communication",
        caption: "FTP control and data channel communication flow"
      }
    ],
    relatedProtocols: ["sftp", "ftps", "scp"],
    commonCommands: [
      {
        command: "ftp",
        description: "Connect to FTP server",
        example: "ftp ftp.example.com"
      },
      {
        command: "put",
        description: "Upload file to server",
        example: "put localfile.txt remotefile.txt"
      },
      {
        command: "get",
        description: "Download file from server",
        example: "get remotefile.txt localfile.txt"
      }
    ],
    resources: [
      {
        title: "RFC 959 - File Transfer Protocol",
        url: "https://tools.ietf.org/html/rfc959",
        type: "RFC"
      },
      {
        title: "FileZilla FTP Client",
        url: "https://filezilla-project.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Credentials transmitted in plain text",
      "Data not encrypted",
      "Use FTPS or SFTP for security",
      "Firewall configuration challenges"
    ],
    modernAlternatives: ["SFTP", "FTPS", "SCP", "HTTPS file upload"]
  },
  {
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
  },
  {
    id: "sftp",
    name: "SFTP",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "SSH File Transfer Protocol for secure file transfers",
    fullDescription: "SFTP (SSH File Transfer Protocol) is a network protocol that provides file access, file transfer, and file management over any reliable data stream. It was designed as an extension of the Secure Shell protocol (SSH) version 2.0 to provide secure file transfer capability.",
    port: "22",
    versions: ["SFTP v3", "SFTP v4", "SFTP v5", "SFTP v6"],
    advantages: [
      "Encrypted file transfers",
      "Authentication through SSH",
      "Single connection for control and data",
      "Resume interrupted transfers",
      "Directory operations support",
      "File permission management"
    ],
    disadvantages: [
      "SSH overhead affects performance",
      "More complex setup than FTP",
      "Limited server software options",
      "Requires SSH knowledge"
    ],
    useCases: [
      "Secure file transfers",
      "Automated backup systems",
      "Remote server management",
      "Secure data exchange",
      "DevOps deployments",
      "Log file collection",
      "Configuration management",
      "Secure document sharing",
      "Enterprise file transfers",
      "Compliance-required transfers"
    ],
    examples: [
      {
        title: "SFTP Connection Example",
        code: `sftp user@example.com
Connected to example.com.
sftp> pwd
Remote working directory: /home/user
sftp> ls
Documents    Downloads    Pictures
sftp> put localfile.txt
Uploading localfile.txt to /home/user/localfile.txt
localfile.txt                    100%  1024   1.0KB/s   00:01
sftp> get remotefile.txt
Fetching /home/user/remotefile.txt to remotefile.txt
remotefile.txt                   100%  2048   2.0KB/s   00:01
sftp> quit`,
        explanation: "A typical SFTP session showing connection, directory listing, file upload and download operations."
      }
    ],
    relatedProtocols: ["ssh", "ftp", "scp"],
    commonCommands: [
      {
        command: "sftp",
        description: "Connect to SFTP server",
        example: "sftp user@server.com"
      },
      {
        command: "put",
        description: "Upload file to server",
        example: "put localfile.txt /remote/path/"
      },
      {
        command: "get",
        description: "Download file from server",
        example: "get /remote/file.txt localfile.txt"
      }
    ],
    resources: [
      {
        title: "RFC 4253 - SSH Transport Layer Protocol",
        url: "https://tools.ietf.org/html/rfc4253",
        type: "RFC"
      },
      {
        title: "WinSCP SFTP Client",
        url: "https://winscp.net/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Uses SSH encryption",
      "Key-based authentication recommended",
      "Host key verification important",
      "Regular security updates needed"
    ]
  },
  {
    id: "ftps",
    name: "FTPS",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "FTP over SSL/TLS for secure file transfers",
    fullDescription: "FTPS (FTP Secure or FTP over SSL/TLS) is an extension to the File Transfer Protocol (FTP) that adds support for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) cryptographic protocols.",
    port: "990 (implicit), 21 (explicit)",
    versions: ["Explicit FTPS", "Implicit FTPS"],
    advantages: [
      "Backward compatible with FTP",
      "Strong encryption with TLS/SSL",
      "Certificate-based authentication",
      "Firewall-friendly explicit mode",
      "Industry standard compliance"
    ],
    disadvantages: [
      "Complex firewall configuration",
      "Certificate management overhead",
      "Two connection types can confuse",
      "Not as secure as SFTP"
    ],
    useCases: [
      "Enterprise file transfers",
      "EDI (Electronic Data Interchange)",
      "Secure backup operations",
      "B2B file exchanges",
      "Compliance-required transfers",
      "Legacy system integration",
      "Automated file processing",
      "Secure media distribution"
    ],
    examples: [
      {
        title: "FTPS Connection Types",
        code: `# Explicit FTPS (FTPES)
AUTH TLS
220 Ready for TLS handshake
234 AUTH TLS successful

# Implicit FTPS
# Direct SSL connection on port 990
# No AUTH command needed`,
        explanation: "Difference between explicit FTPS (starts as FTP, upgrades to TLS) and implicit FTPS (SSL from connection start)."
      }
    ],
    relatedProtocols: ["ftp", "sftp", "tls", "ssl"],
    resources: [
      {
        title: "RFC 4217 - FTP over TLS",
        url: "https://tools.ietf.org/html/rfc4217",
        type: "RFC"
      },
      {
        title: "FileZilla Pro FTPS Support",
        url: "https://filezillapro.com/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Certificate validation required",
      "Use explicit FTPS when possible",
      "Disable weak cipher suites",
      "Regular certificate updates"
    ]
  },
  {
    id: "scp",
    name: "SCP",
    category: "Files",
    difficulty: "Beginner",
    shortDescription: "Secure Copy Protocol for simple secure file transfers",
    fullDescription: "SCP (Secure Copy Protocol) is a means of securely transferring computer files between a local host and a remote host or between two remote hosts. It is based on the Secure Shell (SSH) protocol.",
    port: "22",
    advantages: [
      "Simple command-line interface",
      "Uses SSH encryption",
      "Lightweight and fast",
      "Preserves file permissions",
      "Recursive directory copying"
    ],
    disadvantages: [
      "No resume capability",
      "Limited to file copying",
      "No directory listing",
      "Less flexible than SFTP",
      "Deprecated in OpenSSH"
    ],
    useCases: [
      "Quick file transfers",
      "Script automation",
      "Server deployment",
      "Configuration file copying",
      "Log file retrieval",
      "Backup single files",
      "DevOps operations",
      "System administration"
    ],
    examples: [
      {
        title: "SCP Command Examples",
        code: `# Copy file to remote server
scp localfile.txt user@server.com:/remote/path/

# Copy file from remote server
scp user@server.com:/remote/file.txt ./local/

# Copy directory recursively
scp -r /local/directory/ user@server.com:/remote/

# Copy with specific SSH key
scp -i ~/.ssh/mykey.pem file.txt user@server.com:~/

# Copy between two remote servers
scp user1@server1.com:file.txt user2@server2.com:~/`,
        explanation: "Common SCP commands for various file transfer scenarios."
      }
    ],
    relatedProtocols: ["ssh", "sftp", "rsync"],
    commonCommands: [
      {
        command: "scp",
        description: "Secure copy files",
        example: "scp file.txt user@host:/path/"
      },
      {
        command: "scp -r",
        description: "Recursive copy directories",
        example: "scp -r directory/ user@host:/path/"
      },
      {
        command: "scp -P",
        description: "Specify SSH port",
        example: "scp -P 2222 file.txt user@host:/"
      }
    ],
    resources: [
      {
        title: "OpenSSH Manual Pages",
        url: "https://man.openbsd.org/scp",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Uses SSH encryption",
      "Host key verification",
      "Consider using SFTP instead",
      "Key-based authentication recommended"
    ]
  },
  {
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
  },
  {
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
  },
  {
    id: "xml",
    name: "XML",
    category: "Data",
    difficulty: "Intermediate",
    shortDescription: "Extensible Markup Language for structured data",
    fullDescription: "XML (Extensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable. It is designed to store and transport data with focus on what data is.",
    advantages: [
      "Self-documenting format",
      "Schema validation (XSD)",
      "Namespace support",
      "Extensible structure",
      "Platform independent",
      "Industry standard"
    ],
    disadvantages: [
      "Verbose syntax",
      "Larger file sizes",
      "Complex parsing",
      "No native data types",
      "Processing overhead"
    ],
    useCases: [
      "Web services (SOAP)",
      "Configuration files",
      "Document storage",
      "Data exchange between systems",
      "RSS/Atom feeds",
      "Enterprise applications",
      "Legacy system integration",
      "Scientific data formats",
      "Publishing industry",
      "Banking and finance",
      "Healthcare data (HL7)",
      "Government data exchange"
    ],
    examples: [
      {
        title: "XML Document Structure",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <genre>Classic Literature</genre>
    <price currency="USD">12.99</price>
    <published>1925</published>
    <available>true</available>
  </book>
  <book id="2">
    <title>To Kill a Mockingbird</title>
    <author>Harper Lee</author>
    <genre>Fiction</genre>
    <price currency="USD">14.99</price>
    <published>1960</published>
    <available>false</available>
  </book>
</catalog>`,
        explanation: "XML document showing hierarchical structure with elements, attributes, and text content."
      },
      {
        title: "XML with Namespace",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:web="http://example.com/webservice">
  <soap:Header>
    <web:Authentication>
      <web:Username>user123</web:Username>
      <web:Password>pass456</web:Password>
    </web:Authentication>
  </soap:Header>
  <soap:Body>
    <web:GetUserRequest>
      <web:UserId>12345</web:UserId>
    </web:GetUserRequest>
  </soap:Body>
</soap:Envelope>`,
        explanation: "SOAP XML message showing namespace usage and typical web service structure."
      }
    ],
    relatedProtocols: ["soap", "http", "xhtml"],
    resources: [
      {
        title: "W3C XML Specification",
        url: "https://www.w3.org/XML/",
        type: "Specification"
      },
      {
        title: "XML Schema (XSD) Tutorial",
        url: "https://www.w3schools.com/xml/schema_intro.asp",
        type: "Tutorial"
      }
    ]
  },
  {
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
  },
  {
    id: "ajax",
    name: "AJAX",
    category: "Web",
    difficulty: "Beginner",
    shortDescription: "Asynchronous JavaScript and XML for dynamic web content",
    fullDescription: "AJAX (Asynchronous JavaScript and XML) is a set of web development techniques that allows web applications to send and retrieve data from a server asynchronously without interfering with the display and behavior of the existing page.",
    advantages: [
      "Asynchronous data loading",
      "Improved user experience",
      "Reduced server load",
      "Dynamic content updates",
      "No page refresh required",
      "Better responsiveness"
    ],
    disadvantages: [
      "Browser compatibility issues",
      "SEO challenges",
      "Complex error handling",
      "Security considerations",
      "Debugging difficulties"
    ],
    useCases: [
      "Dynamic form validation",
      "Auto-complete features",
      "Live search results",
      "Real-time updates",
      "Single-page applications",
      "Progressive loading",
      "Chat applications",
      "Social media feeds",
      "E-commerce cart updates",
      "Dashboard widgets",
      "Interactive maps",
      "Content filtering"
    ],
    examples: [
      {
        title: "XMLHttpRequest Example",
        code: `// Traditional XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();`,
        explanation: "Classic AJAX implementation using XMLHttpRequest to fetch data asynchronously."
      },
      {
        title: "Modern Fetch API",
        code: `// Modern Fetch API
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    updateUI(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Async/await syntax
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error('Error:', error);
  }
}`,
        explanation: "Modern AJAX using the Fetch API with Promise-based and async/await patterns."
      }
    ],
    relatedProtocols: ["http", "json", "xml"],
    resources: [
      {
        title: "MDN AJAX Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX",
        type: "Documentation"
      },
      {
        title: "Fetch API Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
        type: "Documentation"
      }
    ]
  },
  {
    id: "ssh",
    name: "SSH",
    category: "Security",
    difficulty: "Intermediate",
    shortDescription: "Secure Shell for encrypted remote access and file transfers",
    fullDescription: "SSH (Secure Shell) is a cryptographic network protocol for operating network services securely over an unsecured network. It provides a secure channel over an unsecured network by using a client-server architecture.",
    port: "22",
    versions: ["SSH-1", "SSH-2"],
    advantages: [
      "Strong encryption",
      "Authentication methods",
      "Port forwarding capabilities",
      "Secure file transfers",
      "Cross-platform support",
      "Key-based authentication"
    ],
    disadvantages: [
      "Initial setup complexity",
      "Key management overhead",
      "Potential for misconfigurations",
      "Performance overhead"
    ],
    useCases: [
      "Remote server administration",
      "Secure file transfers",
      "Port forwarding/tunneling",
      "Remote command execution",
      "Git repository access",
      "Database connections",
      "DevOps automation",
      "System monitoring",
      "Backup operations",
      "Network troubleshooting",
      "Secure shell access",
      "Container management"
    ],
    examples: [
      {
        title: "SSH Connection Commands",
        code: `# Basic SSH connection
ssh username@hostname

# SSH with specific port
ssh -p 2222 username@hostname

# SSH with private key
ssh -i ~/.ssh/private_key username@hostname

# SSH with port forwarding
ssh -L 8080:localhost:80 username@hostname

# SSH with X11 forwarding
ssh -X username@hostname

# SSH command execution
ssh username@hostname 'ls -la /home'`,
        explanation: "Common SSH commands for various connection scenarios and operations."
      },
      {
        title: "SSH Key Generation",
        code: `# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Generate ED25519 key (recommended)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id username@hostname

# Manual key copy
cat ~/.ssh/id_rsa.pub | ssh username@hostname 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'`,
        explanation: "SSH key generation and deployment for secure authentication."
      }
    ],
    relatedProtocols: ["sftp", "scp", "tls"],
    commonCommands: [
      {
        command: "ssh",
        description: "Connect to remote server",
        example: "ssh user@example.com"
      },
      {
        command: "ssh-keygen",
        description: "Generate SSH key pair",
        example: "ssh-keygen -t ed25519"
      },
      {
        command: "ssh-copy-id",
        description: "Copy public key to server",
        example: "ssh-copy-id user@example.com"
      }
    ],
    resources: [
      {
        title: "RFC 4251 - SSH Protocol Architecture",
        url: "https://tools.ietf.org/html/rfc4251",
        type: "RFC"
      },
      {
        title: "OpenSSH Documentation",
        url: "https://www.openssh.com/manual.html",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Use strong key algorithms",
      "Disable password authentication",
      "Regular key rotation",
      "Restrict user access",
      "Monitor access logs"
    ]
  },
  {
    id: "tls",
    name: "TLS",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Transport Layer Security for encrypted communications",
    fullDescription: "TLS (Transport Layer Security) is a cryptographic protocol designed to provide communications security over a computer network. It is the successor to SSL and provides privacy and data integrity between two communicating applications.",
    port: "443 (HTTPS), varies",
    versions: ["TLS 1.0", "TLS 1.1", "TLS 1.2", "TLS 1.3"],
    advantages: [
      "Strong encryption algorithms",
      "Forward secrecy",
      "Certificate-based authentication",
      "Integrity protection",
      "Wide industry adoption",
      "Performance improvements in 1.3"
    ],
    disadvantages: [
      "Certificate management complexity",
      "Performance overhead",
      "Configuration complexity",
      "Vulnerability to misconfigurations"
    ],
    useCases: [
      "HTTPS web connections",
      "Email encryption (SMTPS, IMAPS)",
      "VPN connections",
      "API security",
      "Database connections",
      "Messaging applications",
      "IoT device communication",
      "File transfer security",
      "Remote access protocols",
      "Payment processing",
      "Healthcare data transmission",
      "Banking applications"
    ],
    examples: [
      {
        title: "TLS Handshake Process",
        code: `1. Client Hello
   - Supported TLS versions
   - Cipher suites
   - Random number

2. Server Hello
   - Chosen TLS version
   - Selected cipher suite
   - Server random number

3. Certificate Exchange
   - Server certificate
   - Certificate chain

4. Key Exchange
   - Key exchange parameters
   - Digital signatures

5. Finished Messages
   - Handshake verification
   - Switch to encrypted communication`,
        explanation: "The TLS handshake process establishing a secure encrypted connection."
      },
      {
        title: "TLS Configuration Example",
        code: `# Modern TLS configuration (nginx)
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;

# HSTS header
add_header Strict-Transport-Security "max-age=63072000" always;

# Certificate configuration
ssl_certificate /path/to/certificate.pem;
ssl_certificate_key /path/to/private-key.pem;`,
        explanation: "Modern TLS configuration example showing security best practices."
      }
    ],
    relatedProtocols: ["https", "ssl", "tcp"],
    resources: [
      {
        title: "RFC 8446 - TLS 1.3",
        url: "https://tools.ietf.org/html/rfc8446",
        type: "RFC"
      },
      {
        title: "Mozilla SSL Configuration Generator",
        url: "https://ssl-config.mozilla.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use TLS 1.2 or higher",
      "Disable weak cipher suites",
      "Implement certificate pinning",
      "Regular certificate rotation",
      "Monitor for vulnerabilities"
    ]
  },
  {
    id: "smtp",
    name: "SMTP",
    category: "Email",
    difficulty: "Intermediate",
    shortDescription: "Simple Mail Transfer Protocol for sending emails",
    fullDescription: "SMTP (Simple Mail Transfer Protocol) is an Internet standard communication protocol for electronic mail transmission. Mail servers and other message transfer agents use SMTP to send and receive mail messages.",
    port: "25, 587 (submission), 465 (SMTPS)",
    versions: ["SMTP", "ESMTP"],
    advantages: [
      "Reliable email delivery",
      "Standardized protocol",
      "Authentication support",
      "Encryption capabilities",
      "Wide compatibility",
      "Store-and-forward mechanism"
    ],
    disadvantages: [
      "No built-in encryption (basic SMTP)",
      "Spam vulnerabilities",
      "Complex configuration",
      "Authentication required for modern use"
    ],
    useCases: [
      "Email sending",
      "Automated notifications",
      "Newsletter delivery",
      "System alerts",
      "Application emails",
      "Bulk email campaigns",
      "Transactional emails",
      "Password reset emails",
      "E-commerce confirmations",
      "Marketing communications",
      "System monitoring alerts",
      "User registration confirmations"
    ],
    examples: [
      {
        title: "SMTP Session Example",
        code: `220 mail.example.com ESMTP Postfix
EHLO client.example.com
250-mail.example.com Hello client.example.com
250-SIZE 10240000
250-AUTH PLAIN LOGIN
250 STARTTLS
STARTTLS
220 Ready to start TLS
AUTH LOGIN
334 VXNlcm5hbWU6
dGVzdEBleGFtcGxlLmNvbQ==
334 UGFzc3dvcmQ6
cGFzc3dvcmQ=
235 Authentication successful
MAIL FROM:<sender@example.com>
250 Ok
RCPT TO:<recipient@example.com>
250 Ok
DATA
354 End data with <CR><LF>.<CR><LF>
Subject: Test Email
From: sender@example.com
To: recipient@example.com

This is a test email.
.
250 Message accepted
QUIT
221 Bye`,
        explanation: "Complete SMTP session showing authentication, TLS, and email sending."
      }
    ],
    diagrams: [
      {
        src: "/smtp.gif",
        alt: "SMTP email flow",
        caption: "SMTP email transmission process from sender to recipient"
      },
      {
        src: "/smtp.jpg",
        alt: "SMTP protocol overview",
        caption: "SMTP protocol components and email delivery flow"
      }
    ],
    relatedProtocols: ["imap", "pop3", "tls"],
    commonCommands: [
      {
        command: "telnet",
        description: "Test SMTP connection",
        example: "telnet mail.example.com 25"
      },
      {
        command: "openssl",
        description: "Test SMTP with TLS",
        example: "openssl s_client -connect mail.example.com:465"
      }
    ],
    resources: [
      {
        title: "RFC 5321 - SMTP Protocol",
        url: "https://tools.ietf.org/html/rfc5321",
        type: "RFC"
      },
      {
        title: "Postfix Mail Server",
        url: "http://www.postfix.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use TLS encryption",
      "Implement authentication",
      "Configure SPF/DKIM/DMARC",
      "Rate limiting",
      "Spam filtering"
    ]
  },
  {
    id: "imap",
    name: "IMAP",
    category: "Email",
    difficulty: "Intermediate",
    shortDescription: "Internet Message Access Protocol for email retrieval and management",
    fullDescription: "IMAP (Internet Message Access Protocol) is an Internet standard protocol used by email clients to retrieve email messages from a mail server over a TCP/IP connection. IMAP allows multiple clients to access the same mailbox.",
    port: "143, 993 (IMAPS)",
    versions: ["IMAP4", "IMAP4rev1"],
    advantages: [
      "Multi-device synchronization",
      "Server-side email storage",
      "Folder management",
      "Selective downloading",
      "Search capabilities",
      "Shared mailboxes support"
    ],
    disadvantages: [
      "Requires constant connection",
      "Higher bandwidth usage",
      "Server storage dependency",
      "More complex than POP3"
    ],
    useCases: [
      "Multi-device email access",
      "Corporate email systems",
      "Shared mailboxes",
      "Email synchronization",
      "Server-side email management",
      "Large mailbox handling",
      "Collaborative email workflows",
      "Email archiving",
      "Mobile email applications",
      "Webmail interfaces",
      "Email backup solutions",
      "Team email management"
    ],
    examples: [
      {
        title: "IMAP Session Example",
        code: `* OK IMAP4rev1 Service Ready
A001 LOGIN username password
A001 OK LOGIN completed
A002 SELECT INBOX
* 172 EXISTS
* 1 RECENT
* OK [UNSEEN 12] Message 12 is first unseen
* FLAGS (\\Answered \\Flagged \\Deleted \\Seen \\Draft)
A002 OK [READ-WRITE] SELECT completed
A003 FETCH 12 (FLAGS BODY[HEADER.FIELDS (FROM TO SUBJECT DATE)])
* 12 FETCH (FLAGS (\\Seen) BODY[HEADER.FIELDS (FROM TO SUBJECT DATE)] {117}
From: sender@example.com
To: user@example.com
Subject: Important Message
Date: Mon, 7 Feb 2023 09:55:06 +0000
)
A003 OK FETCH completed
A004 LOGOUT
* BYE IMAP4rev1 Server logging out
A004 OK LOGOUT completed`,
        explanation: "IMAP session showing login, mailbox selection, and message retrieval."
      }
    ],
    diagrams: [
      {
        src: "/imap.jpg",
        alt: "IMAP protocol overview",
        caption: "IMAP email synchronization across multiple devices"
      },
      {
        src: "/imap-vs-pop3.jpg",
        alt: "IMAP vs POP3 comparison",
        caption: "Comparison between IMAP and POP3 email protocols"
      }
    ],
    relatedProtocols: ["smtp", "pop3", "tls"],
    commonCommands: [
      {
        command: "telnet",
        description: "Test IMAP connection",
        example: "telnet mail.example.com 143"
      },
      {
        command: "openssl",
        description: "Test IMAPS connection",
        example: "openssl s_client -connect mail.example.com:993"
      }
    ],
    resources: [
      {
        title: "RFC 3501 - IMAP4rev1",
        url: "https://tools.ietf.org/html/rfc3501",
        type: "RFC"
      },
      {
        title: "Dovecot IMAP Server",
        url: "https://www.dovecot.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use IMAPS (TLS encryption)",
      "Strong authentication",
      "Access control policies",
      "Regular security updates"
    ]
  },
  {
    id: "pop3",
    name: "POP3",
    category: "Email",
    difficulty: "Beginner",
    shortDescription: "Post Office Protocol for downloading emails to local devices",
    fullDescription: "POP3 (Post Office Protocol version 3) is an application-layer Internet standard protocol used by email clients to retrieve email from a mail server. POP3 downloads emails to the local device and typically removes them from the server.",
    port: "110, 995 (POP3S)",
    versions: ["POP3"],
    advantages: [
      "Simple protocol",
      "Works offline",
      "Minimal server storage",
      "Fast email download",
      "Low bandwidth for sync",
      "Good for single device access"
    ],
    disadvantages: [
      "No multi-device sync",
      "Limited server-side features",
      "Email loss risk",
      "No folder support",
      "Difficult to back up"
    ],
    useCases: [
      "Single device email access",
      "Offline email reading",
      "Low storage servers",
      "Simple email setups",
      "Bandwidth-limited connections",
      "Legacy email systems",
      "Personal email accounts",
      "Backup email retrieval",
      "Email archiving",
      "Simple mail clients",
      "Resource-constrained environments",
      "Temporary email access"
    ],
    examples: [
      {
        title: "POP3 Session Example",
        code: `+OK POP3 server ready
USER username
+OK
PASS password
+OK Logged in
STAT
+OK 2 320
LIST
+OK 2 messages:
1 120
2 200
.
RETR 1
+OK 120 octets
From: sender@example.com
To: user@example.com
Subject: Test Message

This is a test message.
.
DELE 1
+OK Marked to be deleted
QUIT
+OK Logging out`,
        explanation: "POP3 session showing authentication, message listing, retrieval, and deletion."
      }
    ],
    diagrams: [
      {
        src: "/pop3.jpg",
        alt: "POP3 protocol overview",
        caption: "POP3 email download and local storage process"
      }
    ],
    relatedProtocols: ["smtp", "imap", "tls"],
    commonCommands: [
      {
        command: "telnet",
        description: "Test POP3 connection",
        example: "telnet mail.example.com 110"
      },
      {
        command: "openssl",
        description: "Test POP3S connection",
        example: "openssl s_client -connect mail.example.com:995"
      }
    ],
    resources: [
      {
        title: "RFC 1939 - POP3 Protocol",
        url: "https://tools.ietf.org/html/rfc1939",
        type: "RFC"
      },
      {
        title: "Thunderbird Email Client",
        url: "https://www.thunderbird.net/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use POP3S (TLS encryption)",
      "Secure password authentication",
      "Regular client updates",
      "Local email security"
    ]
  },
  {
    id: "dns",
    name: "DNS",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Domain Name System for translating domain names to IP addresses",
    fullDescription: "DNS (Domain Name System) is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates human-readable domain names to IP addresses.",
    port: "53",
    versions: ["DNS", "DNS over HTTPS", "DNS over TLS"],
    advantages: [
      "Human-readable names",
      "Hierarchical structure",
      "Distributed system",
      "Caching capabilities",
      "Load balancing support",
      "Fault tolerance"
    ],
    disadvantages: [
      "Single point of failure",
      "Cache poisoning vulnerabilities",
      "Privacy concerns",
      "Propagation delays",
      "Complex configuration"
    ],
    useCases: [
      "Web browsing",
      "Email routing",
      "Service discovery",
      "Content delivery networks",
      "Load balancing",
      "Network troubleshooting",
      "Domain management",
      "Subdomain routing",
      "API endpoint resolution",
      "Microservices discovery",
      "Geographic routing",
      "Failover mechanisms"
    ],
    examples: [
      {
        title: "DNS Query Example",
        code: `# DNS query using dig
dig example.com

;; ANSWER SECTION:
example.com.    300    IN    A    93.184.216.34

# DNS query for specific record type
dig MX example.com
dig AAAA example.com
dig NS example.com

# Reverse DNS lookup
dig -x 93.184.216.34`,
        explanation: "DNS queries using dig command for various record types and reverse lookups."
      },
      {
        title: "DNS Record Types",
        code: `# Common DNS record types
A       example.com.        93.184.216.34
AAAA    example.com.        2606:2800:220:1:248:1893:25c8:1946
CNAME   www.example.com.    example.com.
MX      example.com.        10 mail.example.com.
NS      example.com.        ns1.example.com.
TXT     example.com.        "v=spf1 include:_spf.example.com ~all"
PTR     34.216.184.93.in-addr.arpa.    example.com.`,
        explanation: "Various DNS record types and their purposes in domain name resolution."
      }
    ],
    diagrams: [
      {
        src: "/dns.png",
        alt: "DNS resolution process",
        caption: "DNS query resolution process from client to authoritative server"
      }
    ],
    relatedProtocols: ["http", "tcp", "udp"],
    commonCommands: [
      {
        command: "dig",
        description: "DNS lookup tool",
        example: "dig example.com"
      },
      {
        command: "nslookup",
        description: "DNS query tool",
        example: "nslookup example.com"
      },
      {
        command: "host",
        description: "DNS lookup utility",
        example: "host example.com"
      }
    ],
    resources: [
      {
        title: "RFC 1035 - DNS Implementation",
        url: "https://tools.ietf.org/html/rfc1035",
        type: "RFC"
      },
      {
        title: "BIND DNS Server",
        url: "https://www.isc.org/bind/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "DNSSEC implementation",
      "DNS over HTTPS/TLS",
      "Cache poisoning protection",
      "Rate limiting",
      "Access control"
    ]
  },
  {
    id: "dhcp",
    name: "DHCP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Dynamic Host Configuration Protocol for automatic IP address assignment",
    fullDescription: "DHCP (Dynamic Host Configuration Protocol) is a network management protocol used on Internet Protocol networks for automatically assigning IP addresses and other communication parameters to devices connected to the network.",
    port: "67 (server), 68 (client)",
    versions: ["DHCPv4", "DHCPv6"],
    advantages: [
      "Automatic IP configuration",
      "Centralized management",
      "Efficient IP usage",
      "Reduced configuration errors",
      "Easy network changes",
      "Scalability"
    ],
    disadvantages: [
      "Single point of failure",
      "Security vulnerabilities",
      "Network dependency",
      "IP conflicts possible",
      "Limited control for clients"
    ],
    useCases: [
      "Automatic IP assignment",
      "Network configuration",
      "Guest networks",
      "Large network management",
      "Dynamic environments",
      "Mobile device support",
      "ISP customer networks",
      "Corporate networks",
      "Home networks",
      "Public Wi-Fi",
      "IoT device configuration",
      "Network bootstrapping"
    ],
    examples: [
      {
        title: "DHCP Process (DORA)",
        code: `1. DISCOVER
   Client: "I need an IP address"
   Broadcast: 255.255.255.255

2. OFFER
   Server: "Here's an available IP: 192.168.1.100"
   Lease time: 24 hours

3. REQUEST
   Client: "I accept 192.168.1.100"
   
4. ACKNOWLEDGE
   Server: "IP assigned successfully"
   Additional options: DNS, Gateway, etc.`,
        explanation: "The DHCP DORA process for automatic IP address assignment."
      },
      {
        title: "DHCP Configuration Example",
        code: `# DHCP server configuration (dhcpd.conf)
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option domain-name-servers 8.8.8.8, 8.8.4.4;
    option domain-name "example.com";
    option routers 192.168.1.1;
    option broadcast-address 192.168.1.255;
    default-lease-time 86400;
    max-lease-time 172800;
}

# Static reservation
host server {
    hardware ethernet 00:50:56:c0:00:08;
    fixed-address 192.168.1.50;
}`,
        explanation: "DHCP server configuration with IP range, options, and static reservations."
      }
    ],
    diagrams: [
      {
        src: "/dhcp.png",
        alt: "DHCP process flow",
        caption: "DHCP DORA process for automatic network configuration"
      },
      {
        src: "/dhcp_security.jpg",
        alt: "DHCP security considerations",
        caption: "DHCP security threats and mitigation strategies"
      }
    ],
    relatedProtocols: ["dns", "arp", "udp"],
    resources: [
      {
        title: "RFC 2131 - DHCP Protocol",
        url: "https://tools.ietf.org/html/rfc2131",
        type: "RFC"
      },
      {
        title: "ISC DHCP Server",
        url: "https://www.isc.org/dhcp/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "DHCP snooping",
      "Rogue server prevention",
      "MAC address filtering",
      "DHCP reservations",
      "Network segmentation"
    ]
  },
  {
    id: "tcp",
    name: "TCP",
    category: "Transport",
    difficulty: "Intermediate",
    shortDescription: "Transmission Control Protocol for reliable data transmission",
    fullDescription: "TCP (Transmission Control Protocol) is one of the main protocols of the Internet protocol suite. It provides reliable, ordered, and error-checked delivery of a stream of octets between applications running on hosts communicating via an IP network.",
    advantages: [
      "Reliable data delivery",
      "Error detection and correction",
      "Flow control",
      "Congestion control",
      "Ordered data delivery",
      "Connection-oriented"
    ],
    disadvantages: [
      "Higher overhead",
      "Slower than UDP",
      "Complex implementation",
      "Head-of-line blocking",
      "Connection establishment delay"
    ],
    useCases: [
      "Web browsing (HTTP/HTTPS)",
      "Email transmission",
      "File transfers",
      "Remote access (SSH)",
      "Database connections",
      "API communications",
      "Streaming protocols",
      "Application protocols",
      "Secure communications",
      "Enterprise applications",
      "E-commerce transactions",
      "Real-time applications"
    ],
    examples: [
      {
        title: "TCP Three-Way Handshake",
        code: `Client -> Server: SYN (seq=100)
Server -> Client: SYN-ACK (seq=200, ack=101)
Client -> Server: ACK (seq=101, ack=201)

# Connection established
# Data transmission
# Connection termination

Client -> Server: FIN (seq=300)
Server -> Client: ACK (ack=301)
Server -> Client: FIN (seq=400)
Client -> Server: ACK (ack=401)`,
        explanation: "TCP connection establishment, data transfer, and termination process."
      }
    ],
    diagrams: [
      {
        src: "/tcp.gif",
        alt: "TCP communication flow",
        caption: "TCP three-way handshake and data transmission process"
      }
    ],
    relatedProtocols: ["ip", "udp", "http"],
    resources: [
      {
        title: "RFC 793 - TCP Protocol",
        url: "https://tools.ietf.org/html/rfc793",
        type: "RFC"
      },
      {
        title: "TCP/IP Illustrated",
        url: "https://www.pearson.com/us/higher-education/program/Stevens-TCP-IP-Illustrated-Volume-1-The-Protocols-2nd-Edition/PGM248418.html",
        type: "Documentation"
      }
    ]
  },
  {
    id: "mqtt",
    name: "MQTT",
    category: "Real Time",
    difficulty: "Intermediate",
    shortDescription: "Message Queuing Telemetry Transport for IoT and lightweight messaging",
    fullDescription: "MQTT (Message Queuing Telemetry Transport) is a lightweight, publish-subscribe, machine to machine network protocol for message queue/message queuing service. It is designed for connections with remote locations that have devices with resource constraints or limited network bandwidth.",
    port: "1883, 8883 (MQTTS)",
    versions: ["MQTT 3.1", "MQTT 3.1.1", "MQTT 5.0"],
    advantages: [
      "Lightweight protocol",
      "Low bandwidth usage",
      "Quality of Service levels",
      "Persistent connections",
      "Last Will and Testament",
      "Retained messages"
    ],
    disadvantages: [
      "No built-in security",
      "Limited message format",
      "Broker dependency",
      "Scalability challenges",
      "No message ordering guarantee"
    ],
    useCases: [
      "IoT device communication",
      "Sensor data collection",
      "Home automation",
      "Industrial monitoring",
      "Mobile applications",
      "Real-time messaging",
      "Telemetry data",
      "Remote monitoring",
      "Smart city applications",
      "Connected vehicles",
      "Healthcare devices",
      "Energy management"
    ],
    examples: [
      {
        title: "MQTT Publish/Subscribe",
        code: `# Publisher
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("broker.hivemq.com", 1883, 60)
client.publish("sensor/temperature", "25.6")

# Subscriber
def on_message(client, userdata, message):
    print(f"Received: {message.payload.decode()}")
    
client = mqtt.Client()
client.on_message = on_message
client.connect("broker.hivemq.com", 1883, 60)
client.subscribe("sensor/temperature")
client.loop_forever()`,
        explanation: "MQTT publisher and subscriber example showing basic message exchange."
      },
      {
        title: "MQTT Quality of Service",
        code: `# QoS 0 - At most once (fire and forget)
client.publish("topic/qos0", "message", qos=0)

# QoS 1 - At least once (acknowledged delivery)
client.publish("topic/qos1", "message", qos=1)

# QoS 2 - Exactly once (assured delivery)
client.publish("topic/qos2", "message", qos=2)

# Retained message
client.publish("status/device1", "online", retain=True)`,
        explanation: "MQTT Quality of Service levels and retained message examples."
      }
    ],
    diagrams: [
      {
        src: "/mqtt.jpg",
        alt: "MQTT architecture",
        caption: "MQTT publish-subscribe architecture with broker and clients"
      }
    ],
    relatedProtocols: ["tcp", "websockets", "tls"],
    resources: [
      {
        title: "MQTT Specification",
        url: "https://mqtt.org/mqtt-specification/",
        type: "Specification"
      },
      {
        title: "Eclipse Mosquitto Broker",
        url: "https://mosquitto.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use MQTTS (TLS encryption)",
      "Authentication mechanisms",
      "Access control lists",
      "Topic-based permissions",
      "Secure broker configuration"
    ]
  },
  
];

export const getProtocolById = (id: string): Protocol | undefined => {
  return PROTOCOLS.find(protocol => protocol.id === id);
};

export const getProtocolsByCategory = (category: string): Protocol[] => {
  if (category === "All") return PROTOCOLS;
  return PROTOCOLS.filter(protocol => protocol.category === category);
};

export const searchProtocols = (query: string): Protocol[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return PROTOCOLS;
  
  return PROTOCOLS.filter(protocol => 
    protocol.name.toLowerCase().includes(searchTerm) ||
    protocol.shortDescription.toLowerCase().includes(searchTerm) ||
    protocol.category.toLowerCase().includes(searchTerm) ||
    protocol.useCases.some(useCase => useCase.toLowerCase().includes(searchTerm))
  );
};