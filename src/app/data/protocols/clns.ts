import { Protocol } from "../../types/protocol";

export const CLNS: Protocol = {
  id: "clns",
  name: "CLNS (Connectionless Network Service)",
  category: "Network",
  difficulty: "Advanced",
  shortDescription: "OSI network layer protocol for connectionless packet delivery.",
  fullDescription:
    "Connectionless Network Service (CLNS) is part of the OSI protocol suite, providing a network layer service similar to IP. It operates in a connectionless manner, meaning packets (called CLNP PDUs) are routed independently without establishing a session. CLNS was widely used in DECnet Phase V, IS-IS routing, and early telecommunications networks, though it has largely been replaced by IP in most environments.",
  port: "N/A (OSI Layer 3 protocol, Protocol ID 0x81 for CLNP)",
  versions: ["ISO/IEC 8473-1 (CLNP)"],
  advantages: [
    "Part of the OSI reference model",
    "Provides connectionless datagram service",
    "Supported variable-length addresses (up to 20 bytes)",
    "Integrated with IS-IS routing protocol",
    "Flexible addressing scheme"
  ],
  disadvantages: [
    "Largely obsolete (replaced by IP)",
    "Complex OSI stack not widely adopted",
    "Limited vendor and application support",
    "Interoperability issues with IP networks"
  ],
  useCases: [
    "OSI protocol deployments in telecoms",
    "Legacy DECnet Phase V systems",
    "Integrated IS-IS routing (uses CLNS transport)",
    "X.25 replacement in some networks",
    "Historical research and testing"
  ],
  examples: [
    {
      title: "CLNS Packet Structure (Simplified)",
      code: `+------------------+
| Network Header   |  <-- Contains OSI NSAP addresses
+------------------+
| User Data (PDU)  |
+------------------+`,
      explanation: "Simplified CLNP packet format showing header and payload."
    }
  ],
  diagrams: [
    {
      src: "/clns_osi_model.png",
      alt: "CLNS in OSI model",
      caption: "CLNS as the OSI equivalent of IP at the network layer"
    }
  ],
  relatedProtocols: ["clnp", "isis", "x25", "ip"],
  resources: [
    {
      title: "ISO/IEC 8473-1: Connectionless Network Protocol (CLNP)",
      url: "https://www.iso.org/standard/66897.html",
      type: "Standard"
    },
    {
      title: "IS-IS and CLNS Relationship",
      url: "https://networklessons.com/isis/isis-clns",
      type: "Guide"
    }
  ],
  securityConsiderations: [
    "Limited security features (no encryption or authentication)",
    "Obsolete protocol with minimal modern security support",
    "Vulnerable to spoofing and replay attacks",
    "Interoperability risks in mixed environments"
  ]
};
