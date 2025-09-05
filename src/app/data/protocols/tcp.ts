import { Protocol } from "../../types/protocol";

export const TCP: Protocol = {
    id: "tcp",
    name: "TCP",
    category: "Transport",
    difficulty: "Intermediate",
    shortDescription: "Transmission Control Protocol for reliable data transmission",
    fullDescription: "TCP (Transmission Control Protocol) is one of the main protocols of the Internet protocol suite. It provides reliable, ordered, and error-checked delivery of a stream of octets between applications running on hosts communicating via an IP network.",
    advantages: [
      "Reliable data delivery",
      "Error detection and correction",
      "Flow control",
      "Congestion control",
      "Ordered data delivery",
      "Connection-oriented"
    ],
    disadvantages: [
      "Higher overhead",
      "Slower than UDP",
      "Complex implementation",
      "Head-of-line blocking",
      "Connection establishment delay"
    ],
    useCases: [
      "Web browsing (HTTP/HTTPS)",
      "Email transmission",
      "File transfers",
      "Remote access (SSH)",
      "Database connections",
      "API communications",
      "Streaming protocols",
      "Application protocols",
      "Secure communications",
      "Enterprise applications",
      "E-commerce transactions",
      "Real-time applications"
    ],
    examples: [
      {
        title: "TCP Three-Way Handshake",
        code: `Client -> Server: SYN (seq=100)
Server -> Client: SYN-ACK (seq=200, ack=101)
Client -> Server: ACK (seq=101, ack=201)

# Connection established
# Data transmission
# Connection termination

Client -> Server: FIN (seq=300)
Server -> Client: ACK (ack=301)
Server -> Client: FIN (seq=400)
Client -> Server: ACK (ack=401)`,
        explanation: "TCP connection establishment, data transfer, and termination process."
      }
    ],
    diagrams: [
      {
        src: "/tcp.gif",
        alt: "TCP communication flow",
        caption: "TCP three-way handshake and data transmission process"
      }
    ],
    relatedProtocols: ["ip", "udp", "http"],
    resources: [
      {
        title: "RFC 793 - TCP Protocol",
        url: "https://tools.ietf.org/html/rfc793",
        type: "RFC"
      },
      {
        title: "TCP/IP Illustrated",
        url: "https://www.pearson.com/us/higher-education/program/Stevens-TCP-IP-Illustrated-Volume-1-The-Protocols-2nd-Edition/PGM248418.html",
        type: "Documentation"
      }
    ]
  }