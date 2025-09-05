import { Protocol } from "../../types/protocol";

export const FTPS: Protocol = {
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
  }