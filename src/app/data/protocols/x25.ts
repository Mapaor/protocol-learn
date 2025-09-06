import { Protocol } from "../../types/protocol";

export const X25: Protocol = {
  id: "x25",
  name: "X.25",
  category: "Network",
  difficulty: "Advanced",
  shortDescription: "Legacy packet-switched WAN protocol used before modern IP networks.",
  fullDescription:
    "X.25 is an ITU-T standard protocol suite for packet-switched networks, developed in the 1970s. It provided reliable, connection-oriented communication over public data networks (PDNs). X.25 was widely used by banks, airlines, and government systems before being largely replaced by Frame Relay, ATM, and IP-based networks.",
  port: "Operates at network layer (no TCP/UDP)",
  versions: ["ITU-T X.25 (1976, updated multiple times)"],
  advantages: [
    "Highly reliable packet switching",
    "Global deployment during 1980s–1990s",
    "Connection-oriented service with error correction"
  ],
  disadvantages: [
    "High latency compared to IP",
    "Obsolete in modern Internet",
    "Low throughput (64 kbps typical)"
  ],
  useCases: [
    "Legacy banking terminals",
    "Point-of-sale (POS) systems",
    "Airline reservation systems",
    "Military/government communications (historical)"
  ],
  relatedProtocols: ["clnp", "frame-relay", "atm", "tcp"],
  resources: [
    {
      title: "ITU-T X.25 Standard",
      url: "https://www.itu.int/rec/T-REC-X.25",
      type: "Standard"
    }
  ],
  securityConsiderations: [
    "No built-in encryption or authentication",
    "Obsolete and vulnerable compared to IPsec/TLS",
    "Still may exist in legacy critical systems"
  ],
  examples: [
    {
      title: "Legacy Banking Terminal Communication",
      explanation: "A bank branch terminal communicates with the central server over an X.25 public data network.",
      code: `// X.25 is a protocol, not directly programmable in modern languages.
// Example: configuring an X.25 connection on a legacy router
interface Serial0/0
 encapsulation x25
 x25 address 123456789
 x25 map ip 192.0.2.1 123456789 broadcast
`
    }
  ]
};
