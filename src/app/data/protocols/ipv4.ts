import { Protocol } from "../../types/protocol";

export const IPV4: Protocol = {
    id: "ipv4",
    name: "IPv4",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Internet Protocol version 4 for packet routing and addressing",
    fullDescription: "IPv4 (Internet Protocol version 4) is the fourth version of the Internet Protocol (IP). It is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 uses 32-bit addresses which limits the address space to 4,294,967,296 (2^32) addresses.",
    port: "N/A (Network layer protocol)",
    advantages: [
      "Simple and well-established",
      "Wide compatibility",
      "Efficient header structure",
      "Mature routing protocols",
      "Extensive tooling support",
      "Lower processing overhead"
    ],
    disadvantages: [
      "Limited address space",
      "Address exhaustion",
      "No built-in security",
      "Complex NAT requirements",
      "Fragmentation issues",
      "Limited QoS support"
    ],
    useCases: [
      "Internet communication",
      "Local area networks",
      "Wide area networks",
      "Private networks",
      "Legacy system support",
      "Simple network setups",
      "Embedded systems",
      "IoT devices (with NAT)",
      "Enterprise networks",
      "Data center networking",
      "Cloud infrastructure",
      "VPN connections"
    ],
    examples: [
      {
        title: "IPv4 Header Structure",
        code: `IPv4 Header (20 bytes minimum):
┌───────┬─────┬─────────┬─────────────────┐
│Version│ IHL │   ToS   │  Total Length   │
│ (4b)  │(4b) │  (8b)   │     (16b)       │
├───────────────┬─────────┼─────────────────┤
│Identification │  Flags  │Fragment Offset  │
│    (16b)      │  (3b)   │     (13b)       │
├───────────────┼─────────┼─────────────────┤
│      TTL      │Protocol │Header Checksum  │
│     (8b)      │  (8b)   │     (16b)       │
├───────────────┴─────────┼─────────────────┤
│    Source IP Address    │                 │
│         (32b)           │                 │
├─────────────────────────┼─────────────────┤
│  Destination IP Address │                 │
│         (32b)           │                 │
└─────────────────────────┴─────────────────┘`,
        explanation: "IPv4 packet header structure showing all fields and their sizes."
      },
      {
        title: "IPv4 Address Classes and Subnetting",
        code: `# Address Classes (Historical)
Class A: 1.0.0.0   to 126.0.0.0   (/8)  - 16M hosts
Class B: 128.0.0.0 to 191.255.0.0 (/16) - 64K hosts  
Class C: 192.0.0.0 to 223.255.255.0 (/24) - 254 hosts

# Modern CIDR Notation
192.168.1.0/24    = 192.168.1.0 - 192.168.1.255
10.0.0.0/8        = 10.0.0.0 - 10.255.255.255
172.16.0.0/12     = 172.16.0.0 - 172.31.255.255

# Subnetting Example
Network: 192.168.1.0/24
Subnet 1: 192.168.1.0/26   (192.168.1.1-62)
Subnet 2: 192.168.1.64/26  (192.168.1.65-126)
Subnet 3: 192.168.1.128/26 (192.168.1.129-190)
Subnet 4: 192.168.1.192/26 (192.168.1.193-254)`,
        explanation: "IPv4 addressing schemes, classes, and subnetting examples."
      }
    ],
    relatedProtocols: ["tcp", "udp", "icmp", "arp", "dhcp"],
    resources: [
      {
        title: "RFC 791 - Internet Protocol",
        url: "https://tools.ietf.org/html/rfc791",
        type: "RFC"
      },
      {
        title: "IPv4 Address Calculator",
        url: "https://www.subnet-calculator.com/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "IP spoofing attacks",
      "Network scanning",
      "Access control lists",
      "Firewall rules",
      "VPN tunneling",
      "IPSec for security"
    ]
};
