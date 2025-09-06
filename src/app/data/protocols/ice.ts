import { Protocol } from "../../types/protocol";

export const ICE: Protocol = {
    id: "ice",
    name: "ICE",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Interactive Connectivity Establishment for NAT traversal in peer-to-peer communications",
    fullDescription: "ICE (Interactive Connectivity Establishment) is a framework for connecting peers through Network Address Translators (NATs). ICE makes use of STUN and TURN protocols to discover the best path for media in real-time communications, particularly used in WebRTC, VoIP, and video conferencing applications.",
    port: "Various (uses STUN/TURN ports, dynamic RTP ports)",
    versions: ["ICE (RFC 5245)", "ICE-lite", "Trickle ICE (RFC 8838)"],
    advantages: [
      "Automatic NAT traversal",
      "Multiple candidate gathering",
      "Optimal path selection",
      "Firewall traversal",
      "Peer-to-peer connectivity",
      "Fallback mechanisms",
      "Standards-based approach",
      "Wide industry adoption"
    ],
    disadvantages: [
      "Complex implementation",
      "Multiple network requests",
      "Connectivity establishment delay",
      "Bandwidth overhead",
      "TURN server dependency",
      "Debugging complexity",
      "Battery consumption on mobile",
      "Security considerations"
    ],
    useCases: [
      "WebRTC applications",
      "VoIP communications",
      "Video conferencing",
      "Peer-to-peer file sharing",
      "Online gaming",
      "Remote desktop applications",
      "Live streaming",
      "IoT device communication",
      "Real-time collaboration",
      "Screen sharing",
      "Voice assistants",
      "Telepresence systems"
    ],
    examples: [
      {
        title: "ICE Candidate Types and Gathering",
        code: `# ICE Candidate Types

1. Host Candidates:
   - Local IP addresses and ports
   - Directly accessible interfaces
   - No NAT traversal required
   
2. Server Reflexive Candidates:
   - Public IP/port discovered via STUN
   - NAT's external mapping
   - One-to-one NAT traversal
   
3. Peer Reflexive Candidates:
   - Discovered during connectivity checks
   - Additional NAT mappings
   - Dynamic discovery
   
4. Relay Candidates:
   - TURN server relay addresses
   - Guaranteed connectivity
   - Last resort mechanism

# ICE Candidate Priority Formula
priority = (2^24) * (type preference) + 
          (2^8) * (local preference) + 
          (2^0) * (component ID)

# Type Preferences (higher = better):
- Host: 126
- Peer Reflexive: 110  
- Server Reflexive: 100
- Relay: 0

# Example ICE Candidates
candidate:1 1 UDP 2113667326 192.168.1.100 54400 typ host
candidate:2 1 UDP 1694498815 203.0.113.10 54400 typ srflx raddr 192.168.1.100 rport 54400
candidate:3 1 UDP 16777215 198.51.100.1 49152 typ relay raddr 203.0.113.10 rport 54401

# ICE State Machine
Gathering → Checking → Connected → Completed
    ↓           ↓         ↓          ↓
   Failed    Failed   Failed   Disconnected
    ↓           ↓         ↓          ↓
  Closed     Closed   Closed     Closed

# ICE Connectivity Check Process
1. Form candidate pairs (local + remote)
2. Prioritize pairs based on candidate priorities
3. Send STUN binding requests (connectivity checks)
4. Process responses and update pair states
5. Select nominated pair for media flow
6. Establish media session

# SDP ICE Attributes
a=ice-ufrag:4ZcD        # ICE username fragment
a=ice-pwd:2/1yfjhh      # ICE password
a=ice-options:trickle   # ICE options
a=candidate:...         # ICE candidates
a=remote-candidates:... # Remote candidates
a=ice-mismatch          # ICE version mismatch`,
        explanation: "ICE candidate types, priority calculation, and connectivity establishment process."
      },
      {
        title: "ICE Implementation in WebRTC",
        code: `// JavaScript WebRTC ICE implementation
class WebRTCICEManager {
    constructor() {
        this.peerConnection = null;
        this.localCandidates = [];
        this.remoteCandidates = [];
        this.iceCandidateQueue = [];
    }
    
    async initializePeerConnection() {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                {
                    urls: 'turn:turn.example.com:3478',
                    username: 'turnuser',
                    credential: 'turnpass'
                }
            ],
            iceTransportPolicy: 'all', // 'all' or 'relay'
            iceCandidatePoolSize: 10
        };
        
        this.peerConnection = new RTCPeerConnection(configuration);
        
        // Handle ICE candidate events
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.handleLocalICECandidate(event.candidate);
            } else {
                console.log('ICE gathering completed');
            }
        };
        
        // Handle ICE connection state changes
        this.peerConnection.oniceconnectionstatechange = () => {
            console.log('ICE connection state:', this.peerConnection.iceConnectionState);
            this.handleICEConnectionStateChange();
        };
        
        // Handle ICE gathering state changes
        this.peerConnection.onicegatheringstatechange = () => {
            console.log('ICE gathering state:', this.peerConnection.iceGatheringState);
        };
        
        return this.peerConnection;
    }
    
    handleLocalICECandidate(candidate) {
        console.log('Local ICE candidate:', candidate);
        
        // Parse candidate information
        const candidateInfo = this.parseICECandidate(candidate.candidate);
        this.localCandidates.push(candidateInfo);
        
        // Send candidate to remote peer via signaling
        this.sendCandidateToRemotePeer(candidate);
    }
    
    parseICECandidate(candidateString) {
        // Parse ICE candidate string
        const parts = candidateString.split(' ');
        
        return {
            foundation: parts[0].split(':')[1],
            componentId: parseInt(parts[1]),
            transport: parts[2],
            priority: parseInt(parts[3]),
            address: parts[4],
            port: parseInt(parts[5]),
            type: parts[7],
            relatedAddress: parts[9] || null,
            relatedPort: parts[11] ? parseInt(parts[11]) : null
        };
    }
    
    async addRemoteICECandidate(candidate) {
        try {
            await this.peerConnection.addIceCandidate(candidate);
            console.log('Added remote ICE candidate successfully');
            
            const candidateInfo = this.parseICECandidate(candidate.candidate);
            this.remoteCandidates.push(candidateInfo);
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
        }
    }
    
    handleICEConnectionStateChange() {
        const state = this.peerConnection.iceConnectionState;
        
        switch (state) {
            case 'new':
                console.log('ICE connection is new');
                break;
            case 'checking':
                console.log('ICE connectivity checks in progress');
                break;
            case 'connected':
                console.log('ICE connection established');
                this.onICEConnected();
                break;
            case 'completed':
                console.log('ICE gathering completed');
                break;
            case 'failed':
                console.log('ICE connection failed');
                this.onICEFailed();
                break;
            case 'disconnected':
                console.log('ICE connection disconnected');
                break;
            case 'closed':
                console.log('ICE connection closed');
                break;
        }
    }
    
    onICEConnected() {
        // Get selected candidate pair
        this.peerConnection.getStats().then(stats => {
            stats.forEach(report => {
                if (report.type === 'candidate-pair' && report.selected) {
                    console.log('Selected candidate pair:', report);
                }
            });
        });
    }
    
    onICEFailed() {
        console.log('ICE connection failed, attempting restart');
        this.restartICE();
    }
    
    async restartICE() {
        try {
            await this.peerConnection.restartIce();
            console.log('ICE restart initiated');
        } catch (error) {
            console.error('ICE restart failed:', error);
        }
    }
    
    // Trickle ICE support
    enableTrickleICE() {
        // Process queued candidates when remote description is set
        this.peerConnection.onremotedescription = () => {
            this.iceCandidateQueue.forEach(candidate => {
                this.addRemoteICECandidate(candidate);
            });
            this.iceCandidateQueue = [];
        };
    }
    
    sendCandidateToRemotePeer(candidate) {
        // This would be implemented with your signaling mechanism
        // e.g., WebSocket, Socket.IO, etc.
        console.log('Sending candidate to remote peer:', candidate);
    }
    
    getICEStatistics() {
        return this.peerConnection.getStats().then(stats => {
            const iceStats = {
                localCandidates: [],
                remoteCandidates: [],
                candidatePairs: []
            };
            
            stats.forEach(report => {
                if (report.type === 'local-candidate') {
                    iceStats.localCandidates.push(report);
                } else if (report.type === 'remote-candidate') {
                    iceStats.remoteCandidates.push(report);
                } else if (report.type === 'candidate-pair') {
                    iceStats.candidatePairs.push(report);
                }
            });
            
            return iceStats;
        });
    }
}

// Usage example
const iceManager = new WebRTCICEManager();

async function setupWebRTCConnection() {
    const pc = await iceManager.initializePeerConnection();
    
    // Add media stream
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
    });
    
    // Create offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    // Send offer to remote peer via signaling
    // ...
    
    // After receiving answer and setting remote description
    // ICE candidates will be automatically gathered and exchanged
}

// Python ICE candidate parsing
import re
from dataclasses import dataclass
from typing import Optional

@dataclass
class ICECandidate:
    foundation: str
    component_id: int
    transport: str
    priority: int
    address: str
    port: int
    candidate_type: str
    related_address: Optional[str] = None
    related_port: Optional[int] = None
    
def parse_ice_candidate(candidate_string):
    """Parse ICE candidate from SDP format"""
    # Example: candidate:1 1 UDP 2113667326 192.168.1.100 54400 typ host
    pattern = r'candidate:(\S+) (\d+) (\S+) (\d+) (\S+) (\d+) typ (\S+)(?:\s+raddr\s+(\S+))?(?:\s+rport\s+(\d+))?'
    
    match = re.match(pattern, candidate_string)
    if not match:
        raise ValueError(f"Invalid ICE candidate format: {candidate_string}")
    
    groups = match.groups()
    
    return ICECandidate(
        foundation=groups[0],
        component_id=int(groups[1]),
        transport=groups[2],
        priority=int(groups[3]),
        address=groups[4],
        port=int(groups[5]),
        candidate_type=groups[6],
        related_address=groups[7],
        related_port=int(groups[8]) if groups[8] else None
    )

def calculate_ice_priority(candidate_type, local_pref=65535, component_id=1):
    """Calculate ICE candidate priority"""
    type_preferences = {
        'host': 126,
        'srflx': 100,  # server reflexive
        'prflx': 110,  # peer reflexive
        'relay': 0
    }
    
    type_pref = type_preferences.get(candidate_type, 0)
    
    priority = (2**24 * type_pref + 
               2**8 * local_pref + 
               2**0 * (256 - component_id))
    
    return priority & 0xFFFFFFFF  # Ensure 32-bit value`,
        explanation: "WebRTC ICE implementation with candidate handling and JavaScript/Python examples."
      },
      {
        title: "ICE Server Configuration and Troubleshooting",
        code: `# ICE Server Configuration

# STUN Server Configuration (coturn)
# /etc/turnserver.conf
listening-port=3478
tls-listening-port=5349
listening-ip=0.0.0.0
relay-ip=192.168.1.100
external-ip=203.0.113.100
realm=example.com
server-name=turn.example.com
lt-cred-mech
fingerprint
user=username:password
total-quota=100
stale-nonce=600
cert=/etc/ssl/certs/turn_server_cert.pem
pkey=/etc/ssl/private/turn_server_pkey.pem
no-stdout-log
log-file=/var/log/turn.log
pidfile="/var/run/turnserver.pid"

# Start coturn server
turnserver -c /etc/turnserver.conf -v

# Test STUN server
stunclient stun.l.google.com 19302

# Test TURN server  
turnutils_peer -n -p 3478 -h turn.example.com

# ICE Configuration Examples

# Basic WebRTC ICE configuration
const iceConfig = {
    iceServers: [
        // Google STUN servers
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        
        // Custom TURN server
        {
            urls: 'turn:turn.example.com:3478',
            username: 'user',
            credential: 'pass'
        },
        {
            urls: 'turns:turn.example.com:5349',
            username: 'user', 
            credential: 'pass'
        }
    ],
    iceTransportPolicy: 'all', // 'all' or 'relay'
    iceCandidatePoolSize: 10,
    bundlePolicy: 'balanced', // 'balanced', 'max-compat', 'max-bundle'
    rtcpMuxPolicy: 'require'  // 'negotiate' or 'require'
};

# ICE Troubleshooting Tools

# JavaScript ICE diagnostics
function diagnoseICEConnection(peerConnection) {
    peerConnection.getStats().then(stats => {
        console.log('=== ICE Diagnostics ===');
        
        const localCandidates = [];
        const remoteCandidates = [];
        const candidatePairs = [];
        
        stats.forEach(report => {
            switch (report.type) {
                case 'local-candidate':
                    localCandidates.push({
                        id: report.id,
                        candidateType: report.candidateType,
                        address: report.address,
                        port: report.port,
                        protocol: report.protocol,
                        priority: report.priority
                    });
                    break;
                    
                case 'remote-candidate':
                    remoteCandidates.push({
                        id: report.id,
                        candidateType: report.candidateType,
                        address: report.address,
                        port: report.port,
                        protocol: report.protocol,
                        priority: report.priority
                    });
                    break;
                    
                case 'candidate-pair':
                    candidatePairs.push({
                        id: report.id,
                        localCandidateId: report.localCandidateId,
                        remoteCandidateId: report.remoteCandidateId,
                        state: report.state,
                        nominated: report.nominated,
                        selected: report.selected,
                        bytesSent: report.bytesSent,
                        bytesReceived: report.bytesReceived,
                        currentRoundTripTime: report.currentRoundTripTime,
                        availableOutgoingBitrate: report.availableOutgoingBitrate
                    });
                    break;
            }
        });
        
        console.log('Local Candidates:', localCandidates);
        console.log('Remote Candidates:', remoteCandidates);
        console.log('Candidate Pairs:', candidatePairs);
        
        // Find selected pair
        const selectedPair = candidatePairs.find(pair => pair.selected);
        if (selectedPair) {
            const localCandidate = localCandidates.find(c => c.id === selectedPair.localCandidateId);
            const remoteCandidate = remoteCandidates.find(c => c.id === selectedPair.remoteCandidateId);
            
            console.log('Selected Path:');
            console.log('  Local:', localCandidate);
            console.log('  Remote:', remoteCandidate);
            console.log('  RTT:', selectedPair.currentRoundTripTime, 'ms');
        }
    });
}

# Python ICE testing tool
import asyncio
import socket
import struct
import hashlib
import hmac
from typing import List, Tuple

class ICETester:
    def __init__(self, stun_server: str, stun_port: int = 3478):
        self.stun_server = stun_server
        self.stun_port = stun_port
        
    async def test_stun_connectivity(self) -> Tuple[str, int]:
        """Test STUN server connectivity and get reflexive address"""
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(5.0)
        
        # STUN binding request
        msg_type = 0x0001  # Binding Request
        msg_length = 0
        magic_cookie = 0x2112A442
        transaction_id = struct.pack('!12B', *[i for i in range(12)])
        
        stun_header = struct.pack('!HHI12s', msg_type, msg_length, magic_cookie, transaction_id)
        
        try:
            sock.sendto(stun_header, (self.stun_server, self.stun_port))
            response, addr = sock.recvfrom(1024)
            
            # Parse STUN response
            if len(response) >= 20:
                header = struct.unpack('!HHI12s', response[:20])
                
                if header[0] == 0x0101:  # Binding Success Response
                    # Parse attributes
                    offset = 20
                    while offset < len(response):
                        if offset + 4 > len(response):
                            break
                            
                        attr_type, attr_length = struct.unpack('!HH', response[offset:offset+4])
                        offset += 4
                        
                        if attr_type == 0x0001:  # MAPPED-ADDRESS
                            family = struct.unpack('!H', response[offset+2:offset+4])[0]
                            if family == 0x01:  # IPv4
                                port = struct.unpack('!H', response[offset+4:offset+6])[0]
                                ip_bytes = response[offset+6:offset+10]
                                ip = socket.inet_ntoa(ip_bytes)
                                return ip, port
                        
                        # Align to 4-byte boundary
                        offset += (attr_length + 3) & ~3
            
            return None, None
            
        except Exception as e:
            print(f"STUN test failed: {e}")
            return None, None
        finally:
            sock.close()
    
    def get_local_candidates(self) -> List[dict]:
        """Get local host candidates"""
        candidates = []
        
        # Get all network interfaces
        hostname = socket.gethostname()
        try:
            # Get all IP addresses for this host
            addrs = socket.getaddrinfo(hostname, None, socket.AF_INET)
            
            for addr in addrs:
                ip = addr[4][0]
                if not ip.startswith('127.'):  # Skip loopback
                    candidates.append({
                        'type': 'host',
                        'address': ip,
                        'port': 0,  # Will be assigned later
                        'priority': self.calculate_priority('host', ip)
                    })
        except:
            pass
        
        return candidates
    
    def calculate_priority(self, candidate_type: str, address: str, local_pref: int = 65535) -> int:
        """Calculate ICE candidate priority"""
        type_preferences = {
            'host': 126,
            'srflx': 100,
            'prflx': 110,
            'relay': 0
        }
        
        type_pref = type_preferences.get(candidate_type, 0)
        
        # Simple local preference based on address type
        if address.startswith('192.168.') or address.startswith('10.') or address.startswith('172.'):
            local_pref = 65535  # Private address
        else:
            local_pref = 65534  # Public address
        
        component_id = 1  # RTP component
        
        priority = (2**24 * type_pref + 
                   2**8 * local_pref + 
                   2**0 * (256 - component_id))
        
        return priority & 0xFFFFFFFF

async def test_ice_connectivity():
    """Test ICE connectivity with various STUN servers"""
    stun_servers = [
        'stun.l.google.com',
        'stun1.l.google.com', 
        'stun.stunprotocol.org'
    ]
    
    for server in stun_servers:
        print(f"Testing {server}...")
        tester = ICETester(server)
        
        ip, port = await tester.test_stun_connectivity()
        if ip and port:
            print(f"  Reflexive address: {ip}:{port}")
        else:
            print(f"  Failed to get reflexive address")
        
        local_candidates = tester.get_local_candidates()
        print(f"  Local candidates: {len(local_candidates)}")
        for candidate in local_candidates:
            print(f"    {candidate}")

# Run test
# asyncio.run(test_ice_connectivity())`,
        explanation: "ICE server configuration, diagnostics tools, and testing utilities."
      }
    ],
    diagrams: [
      {
        src: "/ice_architecture.png",
        alt: "ICE architecture",
        caption: "ICE framework architecture showing candidate gathering and connectivity establishment"
      },
      {
        src: "/ice_nat_traversal.jpg",
        alt: "ICE NAT traversal",
        caption: "ICE NAT traversal process using STUN and TURN servers"
      }
    ],
    relatedProtocols: ["stun", "turn", "rtp", "webrtc", "sdp"],
    resources: [
      {
        title: "RFC 5245 - Interactive Connectivity Establishment (ICE)",
        url: "https://tools.ietf.org/html/rfc5245",
        type: "RFC"
      },
      {
        title: "RFC 8838 - Trickle ICE", 
        url: "https://tools.ietf.org/html/rfc8838",
        type: "RFC"
      },
      {
        title: "WebRTC ICE Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "TURN server authentication",
      "ICE credential security",
      "Network topology exposure",
      "DoS attack prevention",
      "Bandwidth limiting",
      "Access control policies",
      "Monitoring and logging",
      "Regular security updates"
    ]
  }