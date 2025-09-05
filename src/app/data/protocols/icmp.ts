import { Protocol } from "../../types/protocol";

export const ICMP: Protocol = {
    id: "icmp",
    name: "ICMP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Internet Control Message Protocol for error reporting and network diagnostics",
    fullDescription: "ICMP (Internet Control Message Protocol) is a supporting protocol in the IPv4 suite used for error reporting, network diagnostics, and operational information. It's an integral part of the IP protocol and provides feedback about network conditions and routing problems.",
    port: "N/A (Network layer protocol)",
    advantages: [
      "Essential network diagnostics",
      "Error reporting mechanism",
      "Path MTU discovery",
      "Network troubleshooting",
      "Routing feedback",
      "Simple implementation"
    ],
    disadvantages: [
      "Security vulnerabilities",
      "Potential for abuse",
      "Often blocked by firewalls",
      "Limited error information",
      "Can be spoofed",
      "No authentication"
    ],
    useCases: [
      "Network diagnostics (ping)",
      "Path discovery (traceroute)",
      "Error reporting",
      "MTU discovery",
      "Router communication",
      "Network monitoring",
      "Connectivity testing",
      "Performance measurement",
      "Route optimization",
      "Network troubleshooting",
      "Quality of service",
      "Load balancing feedback"
    ],
    examples: [
      {
        title: "ICMP Message Types",
        code: `# ICMP Error Messages
Type 3  - Destination Unreachable
  Code 0: Network Unreachable
  Code 1: Host Unreachable  
  Code 2: Protocol Unreachable
  Code 3: Port Unreachable
  Code 4: Fragmentation needed but DF set

Type 4  - Source Quench (deprecated)
Type 5  - Redirect Message
Type 11 - Time Exceeded
  Code 0: TTL expired in transit
  Code 1: Fragment reassembly time exceeded
Type 12 - Parameter Problem

# ICMP Informational Messages  
Type 0  - Echo Reply (ping response)
Type 8  - Echo Request (ping)
Type 13 - Timestamp Request
Type 14 - Timestamp Reply

# Example ping output
$ ping google.com
PING google.com (172.217.14.206): 56 data bytes
64 bytes from 172.217.14.206: icmp_seq=0 time=15.123 ms
64 bytes from 172.217.14.206: icmp_seq=1 time=14.567 ms
64 bytes from 172.217.14.206: icmp_seq=2 time=15.234 ms`,
        explanation: "ICMP message types and typical ping command output."
      },
      {
        title: "Traceroute Using ICMP",
        code: `# Traceroute to google.com
$ traceroute google.com
traceroute to google.com (172.217.14.206), 30 hops max, 60 byte packets
 1  router.local (192.168.1.1)  1.234 ms  1.123 ms  1.098 ms
 2  10.0.0.1 (10.0.0.1)  12.456 ms  12.234 ms  12.567 ms
 3  isp-gateway.net (203.0.113.1)  25.123 ms  24.987 ms  25.345 ms
 4  backbone1.isp.net (203.0.113.10)  28.765 ms  29.123 ms  28.456 ms
 5  google-peer.net (172.217.1.1)  30.234 ms  29.876 ms  30.123 ms
 6  google.com (172.217.14.206)  31.456 ms  31.234 ms  31.567 ms

# How traceroute works:
# 1. Send packet with TTL=1, router responds with ICMP Time Exceeded
# 2. Send packet with TTL=2, next router responds with Time Exceeded
# 3. Continue until destination responds with Echo Reply or Port Unreachable

# ICMP packet structure (simplified)
IP Header (20 bytes) + ICMP Header (8 bytes) + Data
ICMP Header:
- Type (1 byte)
- Code (1 byte)  
- Checksum (2 bytes)
- Rest of Header (4 bytes) - varies by type`,
        explanation: "Traceroute functionality using ICMP Time Exceeded messages."
      }
    ],
    relatedProtocols: ["ipv4", "icmpv6", "tcp", "udp"],
    resources: [
      {
        title: "RFC 792 - ICMP Specification",
        url: "https://tools.ietf.org/html/rfc792",
        type: "RFC"
      },
      {
        title: "ICMP Security Considerations",
        url: "https://tools.ietf.org/html/rfc4443",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "ICMP filtering",
      "Rate limiting",
      "Ping flood protection",
      "Information disclosure",
      "ICMP tunneling prevention",
      "Source validation"
    ]
};
