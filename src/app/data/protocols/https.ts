import { Protocol } from "../../types/protocol";

export const HTTPS: Protocol = {
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
  }