import { Protocol } from "../../types/protocol";

export const IPV6: Protocol = {
    id: "ipv6",
    name: "IPv6",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Internet Protocol version 6 with expanded address space and improved features",
    fullDescription: "IPv6 (Internet Protocol version 6) is the successor to IPv4. It uses 128-bit addresses, allowing for 340 undecillion unique addresses. IPv6 includes improvements in routing, network auto-configuration, and built-in security features.",
    port: "N/A (Network layer protocol)",
    advantages: [
      "Massive address space (2^128)",
      "Built-in security (IPSec)",
      "Auto-configuration capabilities",
      "Improved routing efficiency",
      "Better QoS support",
      "No NAT requirement",
      "Simplified header structure",
      "Mobile IP support"
    ],
    disadvantages: [
      "Complex transition from IPv4",
      "Larger address overhead",
      "Learning curve for administrators",
      "Limited legacy support",
      "Dual-stack complexity",
      "Firewall rule complexity"
    ],
    useCases: [
      "Modern internet infrastructure",
      "IoT device connectivity",
      "Mobile networks",
      "Cloud computing",
      "Data centers",
      "Enterprise networks",
      "Service provider networks",
      "Government networks",
      "Academic institutions",
      "Large-scale deployments",
      "Future-proof networking",
      "Global connectivity"
    ],
    examples: [
      {
        title: "IPv6 Address Formats",
        code: `# Full IPv6 Address
2001:0db8:85a3:0000:0000:8a2e:0370:7334

# Compressed (leading zeros omitted)
2001:db8:85a3:0:0:8a2e:370:7334

# Double colon compression (consecutive zeros)
2001:db8:85a3::8a2e:370:7334

# Loopback
::1

# Unspecified
::

# Link-local
fe80::1

# Multicast
ff02::1 (all nodes)
ff02::2 (all routers)`,
        explanation: "IPv6 address representation and common address types."
      },
      {
        title: "IPv6 Header Structure",
        code: `IPv6 Header (40 bytes fixed):
┌─────────┬─────────┬───────────────────────┐
│ Version │ Traffic │      Flow Label       │
│  (4b)   │Class(8b)│        (20b)          │
├─────────┴─────────┼───────┬───────────────┤
│   Payload Length  │Next   │   Hop Limit   │
│       (16b)       │Header │     (8b)      │
├───────────────────┤ (8b)  ├───────────────┤
│                   │       │               │
│   Source Address  │       │               │
│      (128b)       │       │               │
│                   │       │               │
├───────────────────┴───────┼───────────────┤
│                           │               │
│  Destination Address      │               │
│        (128b)             │               │
│                           │               │
└───────────────────────────┴───────────────┘`,
        explanation: "IPv6 packet header structure with fixed 40-byte size."
      }
    ],
    relatedProtocols: ["ipv4", "icmpv6", "dhcpv6", "tcp", "udp"],
    resources: [
      {
        title: "RFC 8200 - IPv6 Specification",
        url: "https://tools.ietf.org/html/rfc8200",
        type: "RFC"
      },
      {
        title: "IPv6 Deployment Guide",
        url: "https://www.cisco.com/c/en/us/solutions/ipv6/overview.html",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Built-in IPSec support",
      "Privacy extensions",
      "Firewall configuration",
      "Network scanning prevention",
      "Secure neighbor discovery",
      "Address validation"
    ]
};
