import { Protocol } from "../../types/protocol";

export const CLNP: Protocol = {
  id: "clnp",
  name: "Connectionless Network Protocol (CLNP)",
  category: "Network",
  difficulty: "Advanced",
  shortDescription: "OSI network-layer protocol similar to IP.",
  fullDescription:
    "The Connectionless Network Protocol (CLNP) is part of the OSI protocol suite and provides a connectionless datagram service at the network layer, similar to the Internet Protocol (IP). CLNP uses NSAP (Network Service Access Point) addresses instead of IP addresses and was once used in ISO/OSI-based networks and ATM backbones. It is largely obsolete today but still referenced in some telecom and aerospace environments.",
  port: "OSI Network Layer (no TCP/UDP)",
  versions: ["ISO/IEC 8473-1"],
  advantages: [
    "Supports variable-length addresses (NSAP)",
    "Provides datagram-based delivery like IP",
    "Part of full OSI stack integration"
  ],
  disadvantages: [
    "Obsolete in modern networks",
    "Complex addressing compared to IP",
    "Largely replaced by IPv4/IPv6"
  ],
  useCases: [
    "Historical telecom networks",
    "ATM backbones (legacy)",
    "Aerospace/military OSI implementations"
  ],
  relatedProtocols: ["ip", "isis"],
  resources: [
    {
      title: "ISO/IEC 8473-1 - CLNP",
      url: "https://www.iso.org/standard/31499.html",
      type: "Standard"
    }
  ],
  securityConsiderations: [
    "No built-in authentication or encryption",
    "Obsolete protocol with minimal support",
    "Not recommended for new deployments"
  ],
  examples: [
    {
      title: "CLNP Packet Example",
      explanation: "A sample hexadecimal dump of a CLNP packet header.",
      code: `47 01 00 1C 00 00 00 00 49 00 00 00 00 00 00 00`
    }
  ]
};
