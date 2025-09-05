import { Protocol } from "../../types/protocol";

export const SCTP: Protocol = {
    id: "sctp",
    name: "SCTP",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Stream Control Transmission Protocol for reliable message-oriented transport",
    fullDescription: "SCTP (Stream Control Transmission Protocol) is a transport-layer protocol that provides some of the features of both UDP and TCP. It offers message-oriented communication with reliable delivery, ordered and unordered message delivery, multi-streaming, and multi-homing capabilities.",
    port: "Variable (application dependent)",
    advantages: [
      "Multi-streaming",
      "Multi-homing",
      "Message-oriented",
      "Partial reliability",
      "Built-in heartbeat",
      "Path selection"
    ],
    disadvantages: [
      "Limited OS support",
      "NAT traversal issues",
      "Firewall problems",
      "Learning curve",
      "Debugging complexity",
      "Limited tooling"
    ],
    useCases: [
      "Telecommunication signaling",
      "WebRTC data channels",
      "High-availability systems",
      "Real-time communications",
      "Network redundancy",
      "Streaming applications",
      "VoIP signaling",
      "SS7 over IP",
      "Gaming protocols",
      "IoT communications",
      "Cluster communications",
      "Financial trading systems"
    ],
    examples: [
      {
        title: "SCTP Packet Structure",
        code: `# SCTP Common Header (12 bytes)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Source Port Number        |     Destination Port Number  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      Verification Tag                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           Checksum                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# SCTP Chunk Types
Chunk Type    Description
0             DATA
1             INIT
2             INIT ACK
3             SACK (Selective Acknowledgment)
4             HEARTBEAT
5             HEARTBEAT ACK
6             ABORT
7             SHUTDOWN
8             SHUTDOWN ACK
9             ERROR
10            COOKIE ECHO
11            COOKIE ACK
12            ECNE (Explicit Congestion Notification Echo)
13            CWR (Congestion Window Reduced)
14            SHUTDOWN COMPLETE

# DATA Chunk Format
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Type = 0    | Res |I|U|B|E|    Length                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                              TSN                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      Stream Identifier        |   Stream Sequence Number     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                  Payload Protocol Identifier                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
\\                                                               \\
/                            User Data                          /
\\                                                               \\
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# Flags:
# I = Immediate bit
# U = Unordered bit  
# B = Beginning fragment bit
# E = Ending fragment bit`,
        explanation: "SCTP packet structure and chunk format details."
      },
      {
        title: "SCTP Association Establishment",
        code: `# SCTP Four-Way Handshake

# Step 1: Client sends INIT
Client -> Server: INIT
{
  Initiate Tag: 12345
  Window Credit: 65536
  Number of Outbound Streams: 10
  Number of Inbound Streams: 10
  Initial TSN: 1000
  Supported Address Types: IPv4, IPv6
  Chunk List: [DATA, SACK, HEARTBEAT]
}

# Step 2: Server responds with INIT ACK + Cookie
Server -> Client: INIT ACK  
{
  Initiate Tag: 67890
  Window Credit: 32768
  Number of Outbound Streams: 5
  Number of Inbound Streams: 10  
  Initial TSN: 2000
  State Cookie: [encrypted association state]
}

# Step 3: Client echoes Cookie
Client -> Server: COOKIE ECHO
{
  Cookie: [copy of state cookie from INIT ACK]
}

# Step 4: Server confirms with COOKIE ACK
Server -> Client: COOKIE ACK
{
  // Association established, ready for data transfer
}

# Association is now ESTABLISHED
# Both sides can send DATA chunks

# Linux SCTP Socket Programming (C)
#include <sys/socket.h>
#include <netinet/sctp.h>

// Create SCTP socket
int sock = socket(AF_INET, SOCK_SEQPACKET, IPPROTO_SCTP);

// Enable multi-streaming
struct sctp_initmsg initmsg;
initmsg.sinit_num_ostreams = 10;   // Outbound streams
initmsg.sinit_max_instreams = 10;  // Inbound streams  
initmsg.sinit_max_attempts = 3;
initmsg.sinit_max_init_timeo = 30;
setsockopt(sock, IPPROTO_SCTP, SCTP_INITMSG, &initmsg, sizeof(initmsg));

// Bind and listen (server)
struct sockaddr_in addr;
addr.sin_family = AF_INET;
addr.sin_addr.s_addr = INADDR_ANY;
addr.sin_port = htons(9999);
bind(sock, (struct sockaddr*)&addr, sizeof(addr));
listen(sock, 5);

// Accept connection
int client_sock = accept(sock, NULL, NULL);

// Send data on specific stream
struct sctp_sndrcvinfo sinfo;
memset(&sinfo, 0, sizeof(sinfo));
sinfo.sinfo_stream = 2;  // Stream number
sinfo.sinfo_ppid = htonl(1234);  // Payload protocol ID

char message[] = "Hello SCTP!";
sctp_send(client_sock, message, strlen(message), &sinfo, 0);`,
        explanation: "SCTP association establishment and basic socket programming."
      },
      {
        title: "SCTP Multi-homing Example",
        code: `# SCTP Multi-homing Configuration

# Server with multiple network interfaces
Primary Path:   192.168.1.100:9999
Secondary Path: 10.0.0.100:9999

# Client connects to server using both paths
# Primary path for normal traffic
# Secondary path for failover

# Python SCTP multi-homing (using pysctp)
import socket
import sctp

# Create SCTP socket with multi-homing
sock = sctp.sctpsocket_tcp(socket.AF_INET)

# Bind to multiple local addresses
local_addrs = [
    ('192.168.1.50', 0),
    ('10.0.0.50', 0)
]
sock.bindx(local_addrs)

# Connect to server with multiple addresses
server_addrs = [
    ('192.168.1.100', 9999),
    ('10.0.0.100', 9999)
]
sock.connectx(server_addrs)

# Send data (SCTP will choose best path)
message = b"Multi-homed SCTP message"
sock.sctp_send(message, stream=0)

# Path management
# SCTP automatically handles:
# - Path heartbeats
# - Path failure detection
# - Automatic failover
# - Path recovery
# - Load balancing

# Manual path management
import ctypes

# Get path information
class SCTPPathInfo(ctypes.Structure):
    _fields_ = [
        ("spp_address", ctypes.c_char * 128),
        ("spp_state", ctypes.c_uint32),
        ("spp_cwnd", ctypes.c_uint32),
        ("spp_srtt", ctypes.c_uint32),
        ("spp_rto", ctypes.c_uint32),
        ("spp_mtu", ctypes.c_uint32)
    ]

# WebRTC Data Channel over SCTP
# JavaScript WebRTC API uses SCTP internally
const peerConnection = new RTCPeerConnection();

// Create ordered data channel (uses SCTP stream 0)
const orderedChannel = peerConnection.createDataChannel('ordered', {
    ordered: true,
    maxRetransmits: 3
});

// Create unordered data channel (uses different SCTP stream)
const unorderedChannel = peerConnection.createDataChannel('unordered', {
    ordered: false,
    maxRetransmits: 0
});

// Send data on specific channel/stream
orderedChannel.send('Critical data - must arrive in order');
unorderedChannel.send('Game update - order not important');

# SCTP Stream Management
# Each association can have multiple streams
# Streams provide independent, ordered delivery
# Head-of-line blocking only within same stream

# Stream 0: Control messages (ordered)
# Stream 1: Audio data (partial reliability)  
# Stream 2: Video data (unordered, time-sensitive)
# Stream 3: File transfer (ordered, reliable)`,
        explanation: "SCTP multi-homing configuration and stream management examples."
      }
    ],
    relatedProtocols: ["tcp", "udp", "webrtc", "ip"],
    resources: [
      {
        title: "RFC 4960 - SCTP Specification",
        url: "https://tools.ietf.org/html/rfc4960",
        type: "RFC"
      },
      {
        title: "SCTP Programming Guide",
        url: "https://tools.ietf.org/html/draft-ietf-tsvwg-sctpsocket",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Cookie mechanism security",
      "Verification tag validation",
      "Path validation",
      "Flooding protection",
      "Authentication extensions",
      "Firewall traversal"
    ]
};
