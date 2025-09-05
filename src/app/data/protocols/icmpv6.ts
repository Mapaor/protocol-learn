import { Protocol } from "../../types/protocol";

export const ICMPV6: Protocol = {
    id: "icmpv6",
    name: "ICMPv6",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Internet Control Message Protocol for IPv6 networks",
    fullDescription: "ICMPv6 (Internet Control Message Protocol for IPv6) is an integral part of IPv6 and must be fully implemented by every IPv6 node. It provides error reporting, diagnostic functions, and multicast listener discovery. ICMPv6 combines the functionality of ICMPv4, IGMP, and ARP.",
    port: "N/A (Network layer protocol)",
    advantages: [
      "Integrated with IPv6",
      "Enhanced error reporting",
      "Neighbor discovery",
      "Path MTU discovery",
      "Multicast support",
      "Auto-configuration support"
    ],
    disadvantages: [
      "Security vulnerabilities",
      "Potential for abuse",
      "Network overhead",
      "Complexity",
      "Firewall challenges",
      "Debugging complexity"
    ],
    useCases: [
      "IPv6 error reporting",
      "Network diagnostics",
      "Neighbor discovery",
      "Router discovery",
      "Path MTU discovery",
      "Duplicate address detection",
      "Multicast listener discovery",
      "Network troubleshooting",
      "Auto-configuration",
      "Mobile IPv6",
      "Quality of service",
      "Network monitoring"
    ],
    examples: [
      {
        title: "ICMPv6 Message Types",
        code: `# ICMPv6 Error Messages
1   - Destination Unreachable
2   - Packet Too Big  
3   - Time Exceeded
4   - Parameter Problem

# ICMPv6 Informational Messages
128 - Echo Request (ping)
129 - Echo Reply (pong)

# Neighbor Discovery Messages
133 - Router Solicitation
134 - Router Advertisement  
135 - Neighbor Solicitation
136 - Neighbor Advertisement
137 - Redirect

# Multicast Listener Discovery
130 - Multicast Listener Query
131 - Multicast Listener Report
132 - Multicast Listener Done

# Example ping6 output
$ ping6 ipv6.google.com
PING ipv6.google.com(2607:f8b0:4004:c1b::65): 56 data bytes
64 bytes from 2607:f8b0:4004:c1b::65: icmp_seq=1 time=15.2 ms
64 bytes from 2607:f8b0:4004:c1b::65: icmp_seq=2 time=14.8 ms`,
        explanation: "ICMPv6 message types and ping6 example output."
      },
      {
        title: "Neighbor Discovery Process",
        code: `# Neighbor Solicitation (finding MAC of neighbor)
IPv6: 2001:db8::1 -> ff02::1:ff00:2
ICMPv6: Neighbor Solicitation
Target: 2001:db8::2
Option: Source Link-layer Address (MAC)

# Neighbor Advertisement (response)
IPv6: 2001:db8::2 -> 2001:db8::1  
ICMPv6: Neighbor Advertisement
Target: 2001:db8::2
Flags: Solicited, Override
Option: Target Link-layer Address (MAC)

# Router Discovery
# Router Solicitation (from host)
IPv6: :: -> ff02::2
ICMPv6: Router Solicitation

# Router Advertisement (from router)
IPv6: fe80::1 -> ff02::1
ICMPv6: Router Advertisement
Flags: Managed, Other
Prefix: 2001:db8::/64
Option: Source Link-layer Address`,
        explanation: "ICMPv6 neighbor discovery and router discovery processes."
      }
    ],
    relatedProtocols: ["ipv6", "icmp", "ndp"],
    resources: [
      {
        title: "RFC 4443 - ICMPv6 Specification",
        url: "https://tools.ietf.org/html/rfc4443",
        type: "RFC"
      },
      {
        title: "RFC 4861 - Neighbor Discovery",
        url: "https://tools.ietf.org/html/rfc4861",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "ICMPv6 filtering",
      "Rate limiting",
      "Neighbor discovery security",
      "Router advertisement validation",
      "Redirect message validation",
      "Source address validation"
    ]
};
