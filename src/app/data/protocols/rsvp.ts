import { Protocol } from "../../types/protocol";

export const RSVP: Protocol = {
    id: "rsvp",
    name: "Resource Reservation Protocol (RSVP)",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Protocol for reserving resources across an IP network.",
    fullDescription:
        "RSVP (Resource Reservation Protocol) is a signaling protocol designed to reserve resources across a network for data flows. It is often used for Quality of Service (QoS), enabling applications to request specific bandwidth or latency guarantees. In MPLS, RSVP-TE is used for traffic engineering to establish Label Switched Paths with defined constraints.",
    port: "IP Protocol 46 (RSVP, not TCP/UDP)",
    versions: ["RFC 2205 (original RSVP)", "RFC 3209 (RSVP-TE for MPLS)"],
    advantages: [
        "Supports QoS by reserving bandwidth for flows",
        "Works with both unicast and multicast traffic",
        "RSVP-TE enhances MPLS with traffic engineering",
        "Provides granular flow-level control"
    ],
    disadvantages: [
        "Complex and state-heavy protocol",
        "Scalability issues in large networks",
        "Rarely deployed in the modern Internet (replaced by DiffServ, Segment Routing)"
    ],
    useCases: [
        "Traffic engineering in MPLS backbones (RSVP-TE)",
        "Guaranteed bandwidth applications (VoIP, video streaming)",
        "Multicast applications requiring QoS"
    ],
    relatedProtocols: ["ldp", "mpls", "ospf", "isis"],
    resources: [
        {
            title: "RFC 2205 - RSVP Specification",
            url: "https://datatracker.ietf.org/doc/html/rfc2205",
            type: "RFC"
        }
    ],
    securityConsiderations: [
        "Susceptible to state exhaustion attacks",
        "Authentication extensions should be used to prevent spoofing",
        "Should be rate-limited to prevent flooding"
    ],
    examples: [
        {
            title: "Basic RSVP reservation request (PATH message)",
            code: `
RSVP PATH Message:
- Sent from sender to receiver to initiate resource reservation.
- Contains sender's IP, flow specification, and session information.

Example (conceptual):
Sender ----PATH----> Router(s) ----PATH----> Receiver
`,
            explanation: "A PATH message is sent from the sender to the receiver to initiate a resource reservation along the path."
        },
        {
            title: "RSVP reservation confirmation (RESV message)",
            code: `
RSVP RESV Message:
- Sent from receiver back to sender to confirm reservation.
- Routers along the path allocate resources as requested.

Example (conceptual):
Receiver ----RESV----> Router(s) ----RESV----> Sender
`,
            explanation: "A RESV message is sent from the receiver back to the sender to confirm the reservation and allocate resources."
        }
    ]
};
