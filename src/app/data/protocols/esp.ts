import { Protocol } from "../../types/protocol";

export const ESP: Protocol = {
  id: "esp",
  name: "Encapsulating Security Payload (ESP)",
  category: "Security",
  difficulty: "Advanced",
  shortDescription: "Provides confidentiality, integrity, and authentication in IPsec.",
  fullDescription:
    "ESP is a component of the IPsec suite that provides encryption, authentication, and integrity for IP packets. It ensures secure communication over untrusted networks by encapsulating the original IP payload and adding cryptographic protections. ESP can operate in transport or tunnel mode, making it suitable for VPNs and secure site-to-site connections.",
  port: "N/A (IP protocol number 50)",
  versions: ["RFC 4303 (IPsec ESP)"],
  advantages: [
    "Provides encryption for confidentiality",
    "Supports authentication and integrity checks",
    "Flexible transport and tunnel modes",
    "Widely supported for VPNs and secure communications"
  ],
  disadvantages: [
    "Requires key management infrastructure",
    "Adds processing overhead",
    "Compatibility issues with some NAT devices",
    "Does not provide non-repudiation"
  ],
  useCases: [
    "IPsec VPNs (site-to-site or remote access)",
    "Secure communication over the Internet",
    "Protection of sensitive IP traffic",
    "Encrypted tunnels between networks"
  ],
  examples: [
    {
      title: "ESP Configuration Example (Linux)",
      code: `# Using strongSwan for IPsec ESP
sudo ipsec up myvpn
sudo ipsec status`,
      explanation: "Shows initiating an IPsec connection using ESP for encrypted communication."
    }
  ],
  relatedProtocols: ["ipsec", "ah", "ike", "tls", "pki"],
  resources: [
    {
      title: "RFC 4303 - IP Encapsulating Security Payload (ESP)",
      url: "https://datatracker.ietf.org/doc/html/rfc4303",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "Proper key management is critical",
    "Ensure correct mode (transport/tunnel) for use case",
    "Potential NAT traversal issues"
  ]
};
