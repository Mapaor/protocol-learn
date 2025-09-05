import { Protocol } from "../../types/protocol";

export const IGMP: Protocol = {
    id: "igmp",
    name: "IGMP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Internet Group Management Protocol for IPv4 multicast group management",
    fullDescription: "IGMP (Internet Group Management Protocol) is a communications protocol used by hosts and adjacent routers on IPv4 networks to establish multicast group memberships. It allows hosts to join and leave multicast groups, and routers use it to discover which multicast groups have members on their networks.",
    port: "N/A (Network layer protocol)",
    advantages: [
      "Efficient multicast delivery",
      "Bandwidth conservation",
      "Automatic group management",
      "Router optimization",
      "Scalable distribution",
      "Network efficiency"
    ],
    disadvantages: [
      "IPv4 only",
      "Security vulnerabilities",
      "Limited scope",
      "Router dependency",
      "Configuration complexity",
      "Debugging challenges"
    ],
    useCases: [
      "Video streaming",
      "Live broadcasting",
      "IPTV services",
      "Online gaming",
      "Financial data feeds",
      "Software distribution",
      "Videoconferencing",
      "Stock market data",
      "News feeds",
      "Distance learning",
      "Enterprise communications",
      "IoT device coordination"
    ],
    examples: [
      {
        title: "IGMP Message Format",
        code: `# IGMPv2 Message Format
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      Type     | Max Resp Time |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Group Address                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# IGMP Message Types
Type    Description
0x11    Membership Query (General or Group-Specific)
0x16    Version 2 Membership Report  
0x17    Leave Group Message
0x12    Version 1 Membership Report (legacy)

# IGMPv3 Message Format (more complex)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Type = 0x22  |    Reserved   |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Reserved            |  Number of Group Records (M) |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
.                        Group Record [1]                      .
.                                                               .
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
.                        Group Record [2]                      .
.                                                               .
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                               .                               |
.                               .                               .
.                               .                               .
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
.                        Group Record [M]                      .
.                                                               .
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# IGMPv3 Group Record Types
1    MODE_IS_INCLUDE
2    MODE_IS_EXCLUDE  
3    CHANGE_TO_INCLUDE_MODE
4    CHANGE_TO_EXCLUDE_MODE
5    ALLOW_NEW_SOURCES
6    BLOCK_OLD_SOURCES`,
        explanation: "IGMP message format and types for different versions."
      },
      {
        title: "IGMP Protocol Operation",
        code: `# IGMP Protocol Flow

# 1. Router sends General Query (periodic)
Router -> All Hosts (224.0.0.1): IGMP Query
{
  Type: 0x11 (Membership Query)
  Max Response Time: 10 seconds
  Group Address: 0.0.0.0 (General Query)
}

# 2. Hosts respond with group memberships
Host A -> All Routers (224.0.0.2): IGMP Report
{
  Type: 0x16 (Version 2 Report)
  Group Address: 224.1.1.1 (Video Stream)
}

Host B -> All Routers (224.0.0.2): IGMP Report  
{
  Type: 0x16 (Version 2 Report)
  Group Address: 224.1.2.1 (Audio Stream)
}

# 3. Application joins multicast group
# Host sends IGMP Report when first application joins

# 4. Router forwards multicast traffic
# Router only forwards multicast packets for groups with members

# 5. Host leaves group
Host A -> All Routers (224.0.0.2): IGMP Leave
{
  Type: 0x17 (Leave Group)
  Group Address: 224.1.1.1
}

# 6. Router sends Group-Specific Query
Router -> Subnet: IGMP Query
{
  Type: 0x11 (Membership Query)
  Max Response Time: 3 seconds  
  Group Address: 224.1.1.1 (Specific Group)
}

# 7. If no response, router stops forwarding

# Linux IGMP Socket Programming
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

// Join multicast group
int sock = socket(AF_INET, SOCK_DGRAM, 0);
struct ip_mreq mreq;
mreq.imr_multiaddr.s_addr = inet_addr("224.1.1.1");
mreq.imr_interface.s_addr = INADDR_ANY;
setsockopt(sock, IPPROTO_IP, IP_ADD_MEMBERSHIP, &mreq, sizeof(mreq));

// Bind to multicast address
struct sockaddr_in addr;
addr.sin_family = AF_INET;
addr.sin_addr.s_addr = INADDR_ANY;
addr.sin_port = htons(12345);
bind(sock, (struct sockaddr*)&addr, sizeof(addr));

// Receive multicast data
char buffer[1024];
recv(sock, buffer, sizeof(buffer), 0);

// Leave multicast group
setsockopt(sock, IPPROTO_IP, IP_DROP_MEMBERSHIP, &mreq, sizeof(mreq));

// Send multicast data (separate socket)
int send_sock = socket(AF_INET, SOCK_DGRAM, 0);
struct sockaddr_in dest_addr;
dest_addr.sin_family = AF_INET;
dest_addr.sin_addr.s_addr = inet_addr("224.1.1.1");
dest_addr.sin_port = htons(12345);

char message[] = "Multicast message";
sendto(send_sock, message, strlen(message), 0, 
       (struct sockaddr*)&dest_addr, sizeof(dest_addr));`,
        explanation: "IGMP protocol operation flow and socket programming examples."
      },
      {
        title: "IGMP Network Configuration",
        code: `# Router IGMP Configuration (Cisco)

# Enable multicast routing
ip multicast-routing

# Configure interface for IGMP
interface FastEthernet0/1
  ip address 192.168.1.1 255.255.255.0
  ip igmp version 2
  ip igmp query-interval 60        # Query every 60 seconds
  ip igmp query-max-response-time 10
  ip igmp last-member-query-interval 1000
  
# IGMP snooping on switches
ip igmp snooping
ip igmp snooping vlan 10

# Python multicast client
import socket
import struct

# Create UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# Bind to multicast group
multicast_group = '224.1.1.1'
server_address = ('', 12345)
sock.bind(server_address)

# Join multicast group
group = socket.inet_aton(multicast_group)
mreq = struct.pack('4sL', group, socket.INADDR_ANY)
sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)

# Receive multicast data
while True:
    data, address = sock.recvfrom(1024)
    print(f"Received: {data.decode()} from {address}")

# Python multicast sender  
import socket
import time

# Create socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Set TTL for multicast
ttl = struct.pack('b', 1)  # TTL = 1 (local network only)
sock.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, ttl)

# Send multicast messages
multicast_group = ('224.1.1.1', 12345)
message_count = 0

while True:
    message = f"Message {message_count}".encode()
    sock.sendto(message, multicast_group)
    message_count += 1
    time.sleep(1)

# IGMPv3 Source Filtering (Python)
# Include specific sources
sources = [socket.inet_aton('192.168.1.100')]
mreq_source = struct.pack('4s4sL', group, socket.inet_aton('0.0.0.0'), len(sources))
for source in sources:
    mreq_source += source
sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_SOURCE_MEMBERSHIP, mreq_source)

# Exclude specific sources  
sock.setsockopt(socket.IPPROTO_IP, socket.IP_BLOCK_SOURCE, 
                struct.pack('4s4s', group, socket.inet_aton('192.168.1.200')))

# Monitoring IGMP (Linux)
# View multicast group memberships
cat /proc/net/igmp
cat /proc/net/dev_mcast

# Use tcpdump to capture IGMP traffic
tcpdump -i eth0 igmp

# Use netstat for multicast sockets
netstat -g`,
        explanation: "IGMP network configuration and Python multicast programming."
      }
    ],
    relatedProtocols: ["ipv4", "icmp", "udp", "pim"],
    resources: [
      {
        title: "RFC 3376 - IGMPv3 Specification",
        url: "https://tools.ietf.org/html/rfc3376",
        type: "RFC"
      },
      {
        title: "RFC 2236 - IGMPv2 Specification", 
        url: "https://tools.ietf.org/html/rfc2236",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "IGMP spoofing attacks",
      "Multicast flooding",
      "Unauthorized group access",
      "Network resource exhaustion",
      "Access control lists",
      "IGMP snooping security"
    ]
};
