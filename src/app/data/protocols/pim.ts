import { Protocol } from "../../types/protocol";

export const PIM: Protocol = {
  id: "pim",
  name: "Protocol Independent Multicast (PIM)",
  category: "Multimedia",
  difficulty: "Advanced",
  shortDescription: "Routing protocol for efficiently forwarding multicast traffic.",
  fullDescription:
    "Protocol Independent Multicast (PIM) is a family of multicast routing protocols used to route IP multicast traffic within a domain. It is 'protocol independent' because it does not rely on a specific unicast routing protocol; instead, it uses the information from the unicast routing table to build multicast distribution trees. PIM enables efficient delivery of data streams (such as video or audio) to multiple receivers simultaneously.",
  port: "N/A (IP protocol number 103)",
  versions: [
    "PIM Dense Mode (PIM-DM)",
    "PIM Sparse Mode (PIM-SM)",
    "PIM Source-Specific Multicast (PIM-SSM)",
    "PIM Bidirectional (PIM-BIDIR)"
  ],
  advantages: [
    "Efficient use of bandwidth for multicast traffic",
    "Independent of unicast routing protocols",
    "Supports multiple multicast distribution models",
    "Scales across large networks",
    "Essential for IPTV, conferencing, and streaming"
  ],
  disadvantages: [
    "Complex configuration and troubleshooting",
    "Sparse mode requires Rendezvous Points (RPs)",
    "Security vulnerabilities (multicast abuse, RP hijacking)",
    "Not widely deployed compared to unicast routing"
  ],
  useCases: [
    "IPTV distribution",
    "Live video/audio streaming",
    "Financial data feeds",
    "Online gaming with group communication",
    "Large-scale conferencing systems",
    "Military and research multicast applications"
  ],
  examples: [
    {
      title: "Cisco IOS PIM Configuration (Sparse Mode)",
      code: `router(config)# ip multicast-routing
router(config)# interface GigabitEthernet0/0
router(config-if)# ip pim sparse-mode
router(config-if)# exit
router(config)# ip pim rp-address 192.168.1.1`,
      explanation: "Basic configuration of PIM Sparse Mode with a Rendezvous Point on Cisco IOS."
    }
  ],
  diagrams: [
    {
      src: "/pim_multicast_tree.png",
      alt: "PIM multicast distribution tree",
      caption: "Multicast distribution trees built by PIM for efficient data delivery"
    }
  ],
  relatedProtocols: ["igmp", "mld", "ip", "udp"],
  resources: [
    {
      title: "RFC 7761 - Protocol Independent Multicast Sparse Mode",
      url: "https://datatracker.ietf.org/doc/html/rfc7761",
      type: "RFC"
    },
    {
      title: "Cisco Multicast Documentation",
      url: "https://www.cisco.com/c/en/us/support/docs/ip/ip-multicast/9356-48.html",
      type: "Guide"
    }
  ],
  securityConsiderations: [
    "Multicast traffic amplification attacks",
    "Rendezvous Point (RP) security risks",
    "Unauthorized join/leave requests",
    "Potential DoS against multicast routers",
    "Need for access control on multicast groups"
  ]
};
