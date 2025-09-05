import { Protocol } from "../../types/protocol";

export const TLS: Protocol = {
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
  }