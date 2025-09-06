import { Protocol } from "../../types/protocol";

export const FRAMERELAY: Protocol = {
    id: "framerelay",
    name: "Frame Relay",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Packet-switched WAN protocol using virtual circuits.",
    fullDescription:
        "Frame Relay is a WAN protocol designed for efficient transmission of variable-length packets over virtual circuits. It became popular in the 1990s for connecting LANs across metro and wide area networks. Frame Relay is connection-oriented but lightweight compared to X.25, providing higher throughput and lower latency. It has mostly been replaced by MPLS and IP-based WANs.",
    port: "Layer 2 (no TCP/UDP)",
    versions: ["ITU-T Q.922, Q.933"],
    advantages: [
        "Efficient packet-switched WAN transport",
        "Lower overhead than X.25",
        "Supports multiple virtual circuits on a single physical link",
        "Simple configuration for WAN connections"
    ],
    disadvantages: [
        "Obsolete technology",
        "Limited QoS guarantees",
        "Dependent on service provider infrastructure",
        "Mostly replaced by MPLS/IP VPNs"
    ],
    useCases: [
        "Connecting branch offices via WAN",
        "Legacy enterprise networks",
        "Legacy ISP backbones",
        "Low-cost leased line alternatives (historical)"
    ],
    relatedProtocols: ["x25", "atm", "mpls", "ip"],
    resources: [
        {
            title: "ITU-T Frame Relay Recommendations",
            url: "https://www.itu.int/rec/T-REC-Q",
            type: "Standard"
        }
    ],
    securityConsiderations: [
        "No encryption by default",
        "Traffic could be intercepted by provider if unprotected",
        "Legacy deployments require additional security measures"
    ],
    examples: [
        {
            title: "Frame Relay PVC Configuration (Cisco IOS)",
            explanation: "Basic configuration of a Frame Relay Permanent Virtual Circuit (PVC) on a Cisco router.",
            code: `
interface Serial0/0
 encapsulation frame-relay
 frame-relay interface-dlci 100
 ip address 192.168.1.1 255.255.255.0
`
        },
                {
                    title: "Frame Relay Topology Example",
                    explanation: "A typical hub-and-spoke Frame Relay WAN topology connecting branch offices to a central site.",
                    code: `
        [Central Site]
             |
          [Frame Relay Cloud]
           /       |       \
        [Branch1][Branch2][Branch3]
        `
                }
    ]
};
