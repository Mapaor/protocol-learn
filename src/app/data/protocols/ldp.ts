import { Protocol } from "../../types/protocol";

export const LDP: Protocol = {
  id: "ldp",
  name: "Label Distribution Protocol (LDP)",
  category: "Network",
  difficulty: "Advanced",
  shortDescription: "Protocol for distributing labels in MPLS networks.",
  fullDescription:
    "Label Distribution Protocol (LDP) is a protocol used in MPLS (Multiprotocol Label Switching) networks to establish label-switched paths (LSPs) by mapping network layer routing information to data link layer labels. Routers use LDP to advertise and distribute labels to their peers, enabling efficient packet forwarding based on labels rather than IP lookups. It typically runs over TCP/UDP port 646.",
  port: "TCP/UDP 646",
  versions: ["RFC 5036 (LDP specification)"],
  advantages: [
    "Enables MPLS forwarding without manual label configuration",
    "Interoperable between different vendors",
    "Supports unicast and multicast LSPs",
    "Efficient path setup in MPLS networks"
  ],
  disadvantages: [
    "Less traffic engineering control than RSVP-TE",
    "Not as flexible as segment routing",
    "Adds complexity to routing infrastructure",
    "Relies on IGP reachability"
  ],
  useCases: [
    "Establishing MPLS Label Switched Paths",
    "Service provider MPLS backbones",
    "VPN and traffic engineering in MPLS environments"
  ],
  examples: [
    {
      title: "LDP Hello Example",
      code: `LDP Hello Message:
- Message Type: Hello
- Transport Address: 192.168.1.1
- Hold Time: 15 seconds`,
      explanation: "Routers use Hello messages to discover LDP peers before establishing TCP sessions."
    }
  ],
  relatedProtocols: ["mpls", "rsvp", "isis", "ospf"],
  resources: [
    {
      title: "RFC 5036 - LDP Specification",
      url: "https://datatracker.ietf.org/doc/html/rfc5036",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "Vulnerable to spoofed LDP messages without authentication",
    "Can be targeted in DoS attacks on MPLS networks",
    "Should be protected with TCP MD5 or TLS extensions"
  ]
};
