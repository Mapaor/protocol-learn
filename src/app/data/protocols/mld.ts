import { Protocol } from "../../types/protocol";

export const MLD: Protocol = {
  id: "mld",
  name: "Multicast Listener Discovery (MLD)",
  category: "Network",
  difficulty: "Intermediate",
  shortDescription: "Protocol for managing IPv6 multicast group memberships.",
  fullDescription:
    "Multicast Listener Discovery (MLD) is the IPv6 equivalent of IGMP for IPv4. It allows IPv6 routers to discover which multicast groups have listeners on a given link. MLD is part of ICMPv6 and supports efficient delivery of multicast traffic, including support for source-specific multicast with MLDv2.",
  port: "ICMPv6 (types 130, 131, 132, 143)",
  versions: ["MLDv1 (RFC 2710)", "MLDv2 (RFC 3810)"],
  advantages: [
    "Efficient multicast membership management in IPv6",
    "Integrated with ICMPv6",
    "Supports source-specific multicast (SSM)"
  ],
  disadvantages: [
    "Only for IPv6 networks",
    "Can be abused in flooding/reflection attacks",
    "Complex in large-scale multicast deployments"
  ],
  useCases: [
    "IPv6 multicast streaming (IPTV, video)",
    "Service discovery with multicast",
    "Multicast-based IoT communication",
    "High-performance distributed applications"
  ],
  relatedProtocols: ["igmp", "pim", "ipv6", "icmpv6"],
  resources: [
    {
      title: "RFC 3810 - MLDv2",
      url: "https://datatracker.ietf.org/doc/html/rfc3810",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "Vulnerable to multicast flooding attacks",
    "Should be rate-limited and filtered at borders",
    "No authentication by default"
  ],
  examples: [
    {
      title: "MLD Query Example",
      explanation: "An IPv6 router sends an MLD Query message to discover multicast listeners on the local network.",
      code: `ICMPv6 Type: 130 (MLD Query)
Destination: ff02::1 (all nodes multicast address)`
    }
  ]
};
