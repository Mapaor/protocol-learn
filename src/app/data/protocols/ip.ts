import { Protocol } from "../../types/protocol";

export const IP: Protocol = {
    id: "ip",
    name: "IP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Internet Protocol for packet routing and addressing in networks",
    fullDescription: "The Internet Protocol (IP) is the principal communications protocol in the Internet protocol suite for relaying datagrams across network boundaries. Its routing function enables internetworking, and essentially establishes the Internet. IP defines packet structures that encapsulate the data to be delivered and addressing methods to label the datagram with source and destination information.",
    port: "N/A (Network layer protocol)",
    versions: ["IPv4 (RFC 791)", "IPv6 (RFC 8200)"],
    advantages: [
      "Universal addressing scheme",
      "Packet-based communication",
      "Scalable routing",
      "Platform independence",
      "Best-effort delivery",
      "Fragmentation support",
      "Widely supported",
      "Foundation for TCP/UDP"
    ],
    disadvantages: [
      "No guaranteed delivery",
      "No flow control",
      "No error recovery",
      "Security vulnerabilities",
      "Address exhaustion (IPv4)",
      "Fragmentation overhead",
      "No built-in authentication",
      "Limited QoS support"
    ],
    useCases: [
      "Internet communication",
      "Local area networking",
      "Wide area networking",
      "Virtual private networks",
      "Cloud computing",
      "IoT device connectivity",
      "Mobile communications",
      "Data center networking",
      "Satellite communications",
      "Industrial networks",
      "Home networking",
      "Enterprise networking"
    ],
    examples: [
      {
        title: "IPv4 vs IPv6 Comparison",
        code: `# IPv4 Header Format (20 bytes minimum)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# IPv6 Header Format (40 bytes fixed)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version| Traffic Class |           Flow Label                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Payload Length        |  Next Header  |   Hop Limit   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                         Source Address                        +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                      Destination Address                      +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# Key Differences
Feature          | IPv4              | IPv6
Address Size     | 32 bits           | 128 bits
Address Space    | 4.3 billion       | 340 undecillion
Header Size      | 20-60 bytes       | 40 bytes (fixed)
Fragmentation    | Routers & hosts   | Source only
Checksum         | Header checksum   | No checksum
Security         | Optional (IPSec)  | Built-in (IPSec)
Auto-config      | DHCP              | SLAAC + DHCPv6
Broadcast        | Yes               | No (multicast)

# Address Examples
IPv4: 192.168.1.1
IPv6: 2001:db8:85a3::8a2e:370:7334

# Subnet Examples  
IPv4: 192.168.1.0/24 (256 addresses)
IPv6: 2001:db8::/64 (18 quintillion addresses)`,
        explanation: "Comparison between IPv4 and IPv6 protocols including header formats and key differences."
      },
      {
        title: "IP Address Configuration",
        code: `# Linux IP configuration
# Show IP addresses
ip addr show
ip -4 addr show  # IPv4 only
ip -6 addr show  # IPv6 only

# Add IPv4 address
ip addr add 192.168.1.100/24 dev eth0

# Add IPv6 address
ip -6 addr add 2001:db8::100/64 dev eth0

# Remove IP address
ip addr del 192.168.1.100/24 dev eth0

# Set interface up/down
ip link set eth0 up
ip link set eth0 down

# Show routing table
ip route show
ip -6 route show

# Add static route
ip route add 10.0.0.0/8 via 192.168.1.1
ip -6 route add 2001:db8:2::/64 via 2001:db8::1

# Default gateway
ip route add default via 192.168.1.1
ip -6 route add default via 2001:db8::1

# Windows IP configuration
# Show IP configuration
ipconfig /all

# Set static IP
netsh interface ip set address "Local Area Connection" static 192.168.1.100 255.255.255.0 192.168.1.1

# Set IPv6 address
netsh interface ipv6 set address "Local Area Connection" 2001:db8::100

# Enable/disable DHCP
netsh interface ip set address "Local Area Connection" dhcp

# DNS configuration
netsh interface ip set dns "Local Area Connection" static 8.8.8.8
netsh interface ipv6 set dns "Local Area Connection" 2001:4860:4860::8888

# Cisco router IP configuration
# IPv4 interface configuration
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown

# IPv6 interface configuration  
interface GigabitEthernet0/1
 ipv6 address 2001:db8::1/64
 ipv6 enable
 no shutdown

# IPv6 unicast routing
ipv6 unicast-routing

# Dual-stack configuration
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 ipv6 address 2001:db8::1/64
 no shutdown`,
        explanation: "IP address configuration across different platforms and devices."
      },
      {
        title: "IP Packet Analysis and Programming",
        code: `// C IP packet structure definitions
#include <netinet/ip.h>
#include <netinet/ip6.h>

// IPv4 header structure
struct iphdr {
    uint8_t  version:4,     // IP version (4)
             ihl:4;         // Internet Header Length
    uint8_t  tos;           // Type of Service
    uint16_t tot_len;       // Total Length
    uint16_t id;            // Identification
    uint16_t frag_off;      // Fragment Offset
    uint8_t  ttl;           // Time To Live
    uint8_t  protocol;      // Protocol
    uint16_t check;         // Header Checksum
    uint32_t saddr;         // Source Address
    uint32_t daddr;         // Destination Address
};

// IPv6 header structure
struct ip6_hdr {
    union {
        struct ip6_hdrctl {
            uint32_t ip6_un1_flow; // Version, Traffic Class, Flow Label
            uint16_t ip6_un1_plen; // Payload Length
            uint8_t  ip6_un1_nxt;  // Next Header
            uint8_t  ip6_un1_hlim; // Hop Limit
        } ip6_un1;
        uint8_t ip6_un2_vfc;       // Version and Traffic Class
    } ip6_ctlun;
    struct in6_addr ip6_src;       // Source Address
    struct in6_addr ip6_dst;       // Destination Address
};

// Python IP packet parsing
import struct
import socket

class IPv4Packet:
    def __init__(self, data):
        # Parse IPv4 header (minimum 20 bytes)
        header = struct.unpack('!BBHHHBBH4s4s', data[:20])
        
        self.version = (header[0] >> 4) & 0xF
        self.ihl = header[0] & 0xF
        self.tos = header[1]
        self.total_length = header[2]
        self.identification = header[3]
        self.flags = (header[4] >> 13) & 0x7
        self.fragment_offset = header[4] & 0x1FFF
        self.ttl = header[5]
        self.protocol = header[6]
        self.checksum = header[7]
        self.source_ip = socket.inet_ntoa(header[8])
        self.dest_ip = socket.inet_ntoa(header[9])
        
        # Extract payload
        header_length = self.ihl * 4
        self.payload = data[header_length:]
    
    def __str__(self):
        return f"IPv4: {self.source_ip} -> {self.dest_ip}, Protocol: {self.protocol}, TTL: {self.ttl}"

class IPv6Packet:
    def __init__(self, data):
        # Parse IPv6 header (fixed 40 bytes)
        header = struct.unpack('!IHBB16s16s', data[:40])
        
        self.version = (header[0] >> 28) & 0xF
        self.traffic_class = (header[0] >> 20) & 0xFF
        self.flow_label = header[0] & 0xFFFFF
        self.payload_length = header[1]
        self.next_header = header[2]
        self.hop_limit = header[3]
        self.source_ip = socket.inet_ntop(socket.AF_INET6, header[4])
        self.dest_ip = socket.inet_ntop(socket.AF_INET6, header[5])
        
        # Extract payload
        self.payload = data[40:]
    
    def __str__(self):
        return f"IPv6: {self.source_ip} -> {self.dest_ip}, Next Header: {self.next_header}, Hop Limit: {self.hop_limit}"

# Raw socket packet capture (requires root)
def capture_ip_packets():
    # Create raw socket
    sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(0x0003))
    
    while True:
        packet, addr = sock.recvfrom(65536)
        
        # Skip Ethernet header (14 bytes)
        ip_packet = packet[14:]
        
        # Check IP version
        version = (ip_packet[0] >> 4) & 0xF
        
        if version == 4:
            ipv4 = IPv4Packet(ip_packet)
            print(ipv4)
        elif version == 6:
            ipv6 = IPv6Packet(ip_packet)
            print(ipv6)

# IP address validation
import ipaddress

def validate_ip_address(ip_str):
    try:
        ip = ipaddress.ip_address(ip_str)
        return {
            'valid': True,
            'version': ip.version,
            'is_private': ip.is_private,
            'is_multicast': ip.is_multicast,
            'is_loopback': ip.is_loopback
        }
    except ValueError:
        return {'valid': False}

# Usage examples
print(validate_ip_address("192.168.1.1"))
print(validate_ip_address("2001:db8::1"))`,
        explanation: "IP packet structure definitions and programming examples for packet parsing."
      }
    ],
    diagrams: [
      {
        src: "/ip_protocol_stack.png",
        alt: "IP protocol stack",
        caption: "Internet Protocol stack showing IP layer position and relationships"
      },
      {
        src: "/ipv4_vs_ipv6.jpg",
        alt: "IPv4 vs IPv6 comparison",
        caption: "Visual comparison of IPv4 and IPv6 header formats and features"
      }
    ],
    relatedProtocols: ["ipv4", "ipv6", "tcp", "udp", "icmp", "arp"],
    resources: [
      {
        title: "RFC 791 - Internet Protocol (IPv4)",
        url: "https://tools.ietf.org/html/rfc791",
        type: "RFC"
      },
      {
        title: "RFC 8200 - Internet Protocol Version 6 (IPv6)",
        url: "https://tools.ietf.org/html/rfc8200",
        type: "RFC"
      },
      {
        title: "IP Protocol Tutorial",
        url: "https://www.iana.org/assignments/protocol-numbers/",
        type: "Reference"
      }
    ],
    securityConsiderations: [
      "IP spoofing prevention",
      "DDoS attack mitigation",
      "Fragmentation attacks",
      "IP source routing security",
      "Network access control",
      "Traffic monitoring",
      "Firewall implementation",
      "VPN security"
    ]
  }