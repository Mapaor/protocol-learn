import { Protocol } from "../../types/protocol";

export const NDP: Protocol = {
    id: "ndp",
    name: "NDP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Neighbor Discovery Protocol for IPv6 address resolution and configuration",
    fullDescription: "NDP (Neighbor Discovery Protocol) is a protocol in the IPv6 suite used for address autoconfiguration of nodes, discovery of other nodes on the link, determining link-layer addresses, duplicate address detection, finding routers, and maintaining reachability information.",
    port: "N/A (Network layer protocol)",
    advantages: [
      "Stateless autoconfiguration",
      "Duplicate address detection",
      "Router discovery",
      "Secure neighbor detection",
      "Path MTU discovery",
      "Redirect functionality"
    ],
    disadvantages: [
      "IPv6 only",
      "Security vulnerabilities",
      "Cache poisoning risks",
      "Complexity",
      "Implementation variations",
      "Debugging challenges"
    ],
    useCases: [
      "IPv6 address configuration",
      "Neighbor reachability",
      "Router discovery",
      "Link-layer address resolution",
      "Duplicate address detection",
      "Network autoconfiguration",
      "Mobile IPv6",
      "Data center networking",
      "ISP networks",
      "Enterprise IPv6 deployment",
      "IoT device configuration",
      "Campus networks"
    ],
    examples: [
      {
        title: "NDP Message Types",
        code: `# ICMPv6 NDP Message Types

# Router Solicitation (Type 133)
# Sent by hosts to discover routers
Router Solicitation:
- Type: 133
- Code: 0
- Target Address: Unspecified (::)
- Options: Source Link-Layer Address

# Router Advertisement (Type 134)  
# Sent by routers in response to RS or periodically
Router Advertisement:
- Type: 134
- Code: 0
- Hop Limit: 64
- Flags: M(anaged), O(ther), Router Lifetime
- Reachable Time: 30000ms
- Retrans Timer: 1000ms
- Options: Source LL Address, MTU, Prefix Information

# Neighbor Solicitation (Type 135)
# IPv6 equivalent of ARP request
Neighbor Solicitation:
- Type: 135
- Code: 0
- Target Address: IPv6 address being resolved
- Options: Source Link-Layer Address

# Neighbor Advertisement (Type 136)
# Response to NS, or unsolicited announcement
Neighbor Advertisement:
- Type: 136
- Code: 0
- Flags: R(outer), S(olicited), O(verride)
- Target Address: IPv6 address of sender
- Options: Target Link-Layer Address

# Redirect (Type 137)
# Informs about better first hop for destination
Redirect:
- Type: 137
- Code: 0
- Target Address: Better next-hop address
- Destination Address: Original destination
- Options: Target LL Address, Redirected Header

# NDP Options Format
Option Format:
- Type (1 byte)
- Length (1 byte, in units of 8 bytes)
- Data (variable length)

Common Options:
- Type 1: Source Link-Layer Address
- Type 2: Target Link-Layer Address  
- Type 3: Prefix Information
- Type 4: Redirected Header
- Type 5: MTU`,
        explanation: "NDP message types and their structure for IPv6 neighbor discovery."
      },
      {
        title: "IPv6 Address Autoconfiguration",
        code: `# Stateless Address Autoconfiguration (SLAAC) Process

# Step 1: Link-Local Address Formation
# Interface generates link-local address
Link-Local = FE80::/64 + Interface Identifier (EUI-64)
Example: FE80::2E0:4CFF:FE68:12AB

# Step 2: Duplicate Address Detection (DAD)
# Send NS for tentative address
Neighbor Solicitation:
- Source: :: (unspecified)
- Destination: Solicited-Node Multicast (FF02::1:FF68:12AB)
- Target: FE80::2E0:4CFF:FE68:12AB (tentative address)

# If no NA received, address is unique

# Step 3: Router Discovery
# Send Router Solicitation
Router Solicitation:
- Source: FE80::2E0:4CFF:FE68:12AB
- Destination: All-Routers Multicast (FF02::2)

# Step 4: Receive Router Advertisement
Router Advertisement:
- Prefix: 2001:DB8::/64
- Flags: A(utonomous), L(ink)
- Valid Lifetime: 86400 seconds
- Preferred Lifetime: 14400 seconds

# Step 5: Form Global Address
Global Address = Prefix + Interface Identifier
Example: 2001:DB8::2E0:4CFF:FE68:12AB

# Linux IPv6 Configuration
# View IPv6 addresses
ip -6 addr show

# View neighbor cache
ip -6 neigh show

# View router table
ip -6 route show

# Enable/disable IPv6 forwarding
echo 1 > /proc/sys/net/ipv6/conf/all/forwarding

# Configure IPv6 address manually
ip -6 addr add 2001:db8::1/64 dev eth0

# Python IPv6 NDP operations
import socket
import struct
import subprocess

def send_neighbor_solicitation(interface, target_ip):
    # Create raw ICMPv6 socket (requires root)
    sock = socket.socket(socket.AF_INET6, socket.SOCK_RAW, socket.IPPROTO_ICMPV6)
    
    # Neighbor Solicitation message
    ns_type = 135  # NS type
    ns_code = 0
    ns_checksum = 0  # Kernel will calculate
    ns_reserved = 0
    
    # Convert target IP to bytes
    target_bytes = socket.inet_pton(socket.AF_INET6, target_ip)
    
    # Create NS packet
    ns_packet = struct.pack('!BBHI16s', ns_type, ns_code, ns_checksum, ns_reserved, target_bytes)
    
    # Send to solicited-node multicast address
    solicited_node = f"ff02::1:ff{target_ip.split(':')[-1][:2]}:{target_ip.split(':')[-1][2:]}"
    sock.sendto(ns_packet, (solicited_node, 0))
    
    print(f"Sent NS for {target_ip}")

# Example usage
send_neighbor_solicitation("eth0", "2001:db8::1")`,
        explanation: "IPv6 stateless address autoconfiguration process using NDP."
      },
      {
        title: "NDP Security and SEcure NDP",
        code: `# NDP Security Issues and Mitigations

# Common NDP Attacks:
# 1. Router Advertisement spoofing
# 2. Neighbor Discovery cache poisoning  
# 3. Duplicate Address Detection attacks
# 4. Neighbor Solicitation flooding

# Secure Neighbor Discovery (SEND) - RFC 3971
# Uses cryptographic signatures and certificates

# SEND Router Advertisement with signature
Router Advertisement (SEND):
- Standard RA fields
- RSA Signature Option:
  - Type: 12
  - Key Hash: SHA-1 hash of public key
  - Signature: RSA signature over RA message
- Certificate Path Advertisement (CPA)
- Timestamp Option (for replay protection)

# SEND Certificate Path Advertisement
CPA Message:
- Type: 148 (CPA)
- Code: 0  
- Certificate: X.509 certificate
- Certificate Path: Chain to trust anchor

# Linux NDP Security Configuration
# Enable NDP security features
echo 1 > /proc/sys/net/ipv6/conf/all/drop_unsolicited_na
echo 1 > /proc/sys/net/ipv6/conf/all/drop_unicast_in_l2_multicast

# Router Advertisement Guard (RA Guard)
# Cisco IOS configuration
ipv6 nd raguard policy RA_GUARD_POLICY
 device-role host
 trusted-port
 match ra prefix-list ALLOWED_PREFIXES
 match ra hop-limit minimum 64
 match ra managed-config-flag off
 match ra other-config-flag off

interface FastEthernet0/1
 ipv6 nd raguard attach-policy RA_GUARD_POLICY

# DHCPv6 Guard
ipv6 dhcp guard policy DHCP_GUARD_POLICY
 device-role client
 trusted-port

# NDP Monitoring with tcpdump
# Capture all ICMPv6 traffic
tcpdump -i eth0 icmp6

# Capture only NDP messages
tcpdump -i eth0 'icmp6 and (ip6[40] = 133 or ip6[40] = 134 or ip6[40] = 135 or ip6[40] = 136 or ip6[40] = 137)'

# View IPv6 neighbor cache
ip -6 neighbor show

# Clear neighbor cache entry
ip -6 neighbor del 2001:db8::1 dev eth0

# Python script to monitor NDP traffic
import scapy.all as scapy
from scapy.layers.inet6 import IPv6, ICMPv6ND_NS, ICMPv6ND_NA, ICMPv6ND_RS, ICMPv6ND_RA

def process_ndp_packet(packet):
    if packet.haslayer(ICMPv6ND_NS):
        print(f"NS: {packet[IPv6].src} -> {packet[ICMPv6ND_NS].tgt}")
    elif packet.haslayer(ICMPv6ND_NA):
        print(f"NA: {packet[IPv6].src} -> {packet[IPv6].dst}")
    elif packet.haslayer(ICMPv6ND_RS):
        print(f"RS: {packet[IPv6].src}")
    elif packet.haslayer(ICMPv6ND_RA):
        print(f"RA: {packet[IPv6].src}")

# Start capturing NDP traffic
scapy.sniff(filter="icmp6", prn=process_ndp_packet, iface="eth0")`,
        explanation: "NDP security considerations and Secure Neighbor Discovery implementation."
      }
    ],
    relatedProtocols: ["ipv6", "icmpv6", "dhcpv6", "slaac"],
    resources: [
      {
        title: "RFC 4861 - Neighbor Discovery for IPv6",
        url: "https://tools.ietf.org/html/rfc4861",
        type: "RFC"
      },
      {
        title: "RFC 3971 - SEcure Neighbor Discovery (SEND)",
        url: "https://tools.ietf.org/html/rfc3971",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Router Advertisement spoofing",
      "Neighbor cache poisoning",
      "DAD attacks",
      "Man-in-the-middle attacks",
      "SEND implementation",
      "RA Guard deployment"
    ]
};
