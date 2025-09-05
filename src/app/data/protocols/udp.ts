import { Protocol } from "../../types/protocol";

export const UDP: Protocol = {
    id: "udp",
    name: "UDP",
    category: "Transport",
    difficulty: "Intermediate",
    shortDescription: "User Datagram Protocol for fast, connectionless data transmission",
    fullDescription: "UDP (User Datagram Protocol) is one of the core members of the Internet protocol suite. It provides a simple, connectionless communication model with minimal protocol mechanisms. UDP provides checksums for data integrity and port numbers for addressing different functions at the source and destination of the datagram.",
    port: "Various (application-specific)",
    advantages: [
      "Low latency",
      "Minimal overhead",
      "No connection setup",
      "Multicast and broadcast support",
      "Simple implementation",
      "Suitable for real-time applications"
    ],
    disadvantages: [
      "No delivery guarantee",
      "No error recovery",
      "No flow control",
      "No congestion control",
      "Packets can be lost or duplicated",
      "No ordering guarantee"
    ],
    useCases: [
      "Real-time gaming",
      "Video streaming",
      "Voice over IP (VoIP)",
      "DNS queries",
      "DHCP operations",
      "Network Time Protocol (NTP)",
      "Simple Network Management Protocol (SNMP)",
      "Live broadcasting",
      "IoT communications",
      "Multicast applications",
      "Network discovery protocols",
      "Time-sensitive applications"
    ],
    examples: [
      {
        title: "UDP Socket Programming (Python)",
        code: `import socket

# UDP Server
server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind(('localhost', 12345))

while True:
    data, addr = server_socket.recvfrom(1024)
    print(f"Received from {addr}: {data.decode()}")
    server_socket.sendto(b"Message received", addr)

# UDP Client
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client_socket.sendto(b"Hello Server", ('localhost', 12345))
response, addr = client_socket.recvfrom(1024)
print(f"Server response: {response.decode()}")`,
        explanation: "Basic UDP client-server communication example in Python."
      },
      {
        title: "UDP Packet Structure",
        code: `UDP Header (8 bytes):
┌─────────────────┬─────────────────┐
│  Source Port    │ Destination Port│
│    (16 bits)    │    (16 bits)    │
├─────────────────┼─────────────────┤
│     Length      │    Checksum     │
│    (16 bits)    │    (16 bits)    │
└─────────────────┴─────────────────┘
│           Data Payload            │
└───────────────────────────────────┘

Example:
Source Port: 53 (DNS)
Dest Port: 12345
Length: 20 bytes
Checksum: 0x1234
Data: DNS query...`,
        explanation: "UDP packet header structure and example packet breakdown."
      }
    ],
    relatedProtocols: ["tcp", "ipv4", "dns", "dhcp"],
    resources: [
      {
        title: "RFC 768 - UDP Protocol",
        url: "https://tools.ietf.org/html/rfc768",
        type: "RFC"
      },
      {
        title: "UDP vs TCP Comparison",
        url: "https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "UDP flood attacks",
      "No built-in authentication",
      "Application-level security needed",
      "Rate limiting",
      "Firewall configurations"
    ]
};
