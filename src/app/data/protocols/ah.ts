import { Protocol } from "../../types/protocol";

export const AH: Protocol = {
  id: "ah",
  name: "Authentication Header (AH)",
  category: "Security",
  difficulty: "Advanced",
  shortDescription: "Provides integrity and authentication for IP packets in IPsec.",
  fullDescription:
    "AH is part of the IPsec suite and provides integrity, authentication, and anti-replay protection for IP packets. Unlike ESP, AH does not provide encryption. It ensures that the payload and headers have not been tampered with during transit, making it suitable for scenarios where confidentiality is not required but authenticity and integrity are critical.",
  port: "N/A (IP protocol number 51)",
  versions: ["RFC 4302 (IPsec AH)"],
  advantages: [
    "Ensures packet integrity and authentication",
    "Protects against replay attacks",
    "Lightweight compared to ESP when encryption is not needed",
    "Widely supported for IPsec VPNs"
  ],
  disadvantages: [
    "Does not provide confidentiality",
    "Cannot traverse NAT easily",
    "Requires key management infrastructure"
  ],
  useCases: [
    "Integrity protection for IP traffic",
    "VPNs where encryption is not required",
    "Secure communication over untrusted networks"
  ],
  examples: [
    {
      title: "AH Example (Linux strongSwan)",
      code: `# Establish IPsec connection with AH
sudo ipsec up myvpn-ah
sudo ipsec status`,
      explanation: "Demonstrates using AH to authenticate IP packets in an IPsec connection."
    }
  ],
  relatedProtocols: ["ipsec", "esp", "ike", "pki", "tcp"],
  resources: [
    {
      title: "RFC 4302 - IP Authentication Header",
      url: "https://datatracker.ietf.org/doc/html/rfc4302",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "Requires secure key distribution",
    "Does not protect payload confidentiality",
    "Compatibility with NAT may be limited"
  ]
};
