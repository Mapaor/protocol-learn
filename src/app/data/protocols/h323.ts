import { Protocol } from "../../types/protocol";

export const H323: Protocol = {
    id: "h323",
    name: "H.323",
    category: "Multimedia",
    difficulty: "Advanced",
    shortDescription: "ITU-T standard for multimedia communications over packet networks",
    fullDescription: "H.323 is a recommendation from the ITU-T that defines the protocols to provide audio-visual communication sessions on any packet network. It is widely used in IP telephony, internet telephony and video conferencing. H.323 addresses call signaling and control, multimedia transport and control, and bandwidth control for point-to-point and multi-point conferences.",
    port: "1720 (call signaling), 1719 (RAS), dynamic (media)",
    versions: ["H.323v1", "H.323v2", "H.323v3", "H.323v4", "H.323v5", "H.323v6", "H.323v7"],
    advantages: [
      "Mature and stable protocol",
      "Interoperability across vendors",
      "Comprehensive feature set",
      "Support for complex topologies",
      "Quality of Service support",
      "Security features",
      "Scalable architecture",
      "Wide industry adoption"
    ],
    disadvantages: [
      "Complex protocol stack",
      "Firewall/NAT challenges",
      "Resource intensive",
      "Configuration complexity",
      "Troubleshooting difficulties",
      "Limited mobility support",
      "Slower call setup",
      "Competition from SIP"
    ],
    useCases: [
      "Enterprise VoIP systems",
      "Video conferencing",
      "IP telephony",
      "Contact centers",
      "Distance learning",
      "Telemedicine",
      "Unified communications",
      "Legacy system integration",
      "Carrier networks",
      "Government communications",
      "Broadcasting systems",
      "Emergency services"
    ],
    examples: [
      {
        title: "H.323 Protocol Stack",
        code: `# H.323 Protocol Architecture

Application Layer:
├── H.323 Applications (Video conferencing, IP phones)
└── H.450.x Supplementary Services

H.323 Control Protocols:
├── H.225.0 Call Signaling (Q.931 based)
├── H.225.0 RAS (Registration, Admission, Status)
└── H.245 Control Protocol (Media negotiation)

Transport Layer:
├── TCP (H.225.0, H.245)
└── UDP (RAS, RTP/RTCP)

Network Layer:
└── IP (IPv4/IPv6)

Data Link Layer:
└── Ethernet, ATM, Frame Relay, etc.

# H.323 Components

Terminal:
- End-user device (IP phone, softphone, video terminal)
- Implements H.323 protocols
- Audio/video codecs

Gateway:
- Connects H.323 to other networks (PSTN, ISDN)
- Protocol translation
- Media conversion

Gatekeeper:
- Address resolution (E.164 to IP)
- Admission control
- Bandwidth management
- Call routing
- Authentication and authorization

Multipoint Control Unit (MCU):
├── Multipoint Controller (MC): Call signaling
└── Multipoint Processor (MP): Media mixing

Border Element:
- NAT/Firewall traversal
- Topology hiding
- Security enforcement

# H.323 Codecs

Audio Codecs:
- G.711 (PCM, 64 kbps)
- G.722 (Wideband, 64 kbps)
- G.723.1 (5.3/6.3 kbps)
- G.729 (8 kbps)
- G.729A (8 kbps, reduced complexity)

Video Codecs:
- H.261 (CIF/QCIF)
- H.263 (Improved compression)
- H.264 (Advanced Video Coding)
- H.265 (HEVC)

# H.323 Call Flow
1. RAS Registration (Terminal -> Gatekeeper)
2. ARQ (Admission Request)
3. ACF (Admission Confirm)
4. Setup (H.225.0)
5. Call Proceeding
6. Alerting
7. Connect
8. H.245 Capability Exchange
9. Master/Slave Determination
10. Open Logical Channels
11. Media Flow (RTP/RTCP)
12. Call Termination`,
        explanation: "H.323 protocol architecture, components, and call flow."
      },
      {
        title: "H.323 Configuration Examples",
        code: `
\`\`\`
# Cisco H.323 Gateway Configuration

# Enable H.323 service
interface GigabitEthernet0/0
 ip address 192.168.1.10 255.255.255.0
 h323-gateway voip interface
 h323-gateway voip id GW1 ipaddr 192.168.1.10 1720
 h323-gateway voip h323-id gateway1.company.com

# Configure gatekeeper
gatekeeper
 zone local company.com 192.168.1.10
 zone prefix company.com 555....
 gw-type-prefix 1#* default-technology
 arq reject-unknown-prefix
 bandwidth total zone company.com 1024
 no shutdown

# Voice dial-peers for H.323
dial-peer voice 1 voip
 destination-pattern 555....
 session target ipv4:192.168.1.20
 session protocol sipv2
 codec g711ulaw
 dtmf-relay h245-alphanumeric

dial-peer voice 2 pots  
 destination-pattern 9T
 port 1/0/0:23
 prefix 555

# H.323 gateway settings
voice service voip
 h323
  h225 timeout setup 10
  h245 timeout 30
  call start slow

# Quality of Service
interface GigabitEthernet0/0
 service-policy output VOIP_POLICY

class-map match-all H323_SIGNALING
 match ip dscp af31

class-map match-all H323_MEDIA
 match ip dscp ef

policy-map VOIP_POLICY
 class H323_SIGNALING
  bandwidth 64
  set dscp af31
 class H323_MEDIA  
  priority 512
  set dscp ef

# Asterisk H.323 Configuration
# h323.conf
[general]
port = 1720
bindaddr = 0.0.0.0
gatekeeper = 192.168.1.5
gatekeeperId = company_gk
AllowGKRouted = yes
AcceptUnregisteredCalls = no
FastStart = yes
H245Tunneling = yes
SilenceSuppression = yes

[codec_prefs]
disallow = all
allow = ulaw
allow = alaw  
allow = gsm
allow = g729

# Extensions.conf for H.323
[h323-incoming]
exten => _555XXXX,1,Dial(SIP/\${EXTEN})
exten => _555XXXX,n,Hangup()

[h323-outgoing]  
exten => _9NXXNXXXXXX,1,Dial(H323/\${EXTEN:1}@192.168.1.10)
exten => _9NXXNXXXXXX,n,Hangup()

# OpenH323 Gatekeeper Configuration
# gatekeeper.ini
[Gatekeeper::Main]
Fourtytwo=42
Name=Company_GK
EnableIPv6=0

[GkStatus::Auth]
rule=password
gkadmin=secret

[RoutedMode]
GKRouted=1
H245Routed=0
CallSignalPort=1720
AcceptUnregisteredCalls=0
RemoveH245AddressOnTunneling=1

[RasSrv::Neighbors]
; Neighbor gatekeepers
GK_North=192.168.2.10:1719
GK_South=192.168.3.10:1719

[EP::Alias]
; Endpoint aliases
5551234=192.168.1.100
gateway1=192.168.1.10

[RasSrv::ARQFeatures]
ArjReasonRouteCallToGatekeeper=1
CallUnregisteredEndpoints=0

[Routing::Sql]
Driver=MySQL
Database=h323_routing
Username=gk_user
Password=gk_pass
Query=SELECT alias FROM routes WHERE prefix='%{Callee-E164-Number:1}'
\`\`\`
`,
        explanation: "H.323 configuration examples for various platforms and systems."
      },
      {
        title: "H.323 Monitoring and Troubleshooting",
        code: `# H.323 Debugging and Monitoring

# Cisco debug commands
debug h225 asn1
debug h245 asn1  
debug h323 ras
debug voip ccapi inout
debug cch323 h225
debug cch323 h245

# Show H.323 status
show h323 gateway
show h323 calls
show gatekeeper calls
show gatekeeper endpoints
show gatekeeper zone status

# H.323 call statistics
show call active voice brief
show call history voice brief
show voice call summary

# Wireshark H.323 analysis
# Display filters:
h225          # H.225.0 Call Signaling
h245          # H.245 Control Protocol  
ras           # Registration, Admission, Status
rtp           # Real-time Transport Protocol
rtcp          # RTP Control Protocol

# Common H.323 issues and solutions

# Issue: Calls fail to establish
# Check: Gatekeeper registration, network connectivity
show gatekeeper endpoints registered
ping <remote_endpoint_ip>

# Issue: One-way audio
# Check: NAT/Firewall, RTP ports, codec mismatch
show ip nat translations
show voice call legs

# Issue: Poor audio quality  
# Check: Bandwidth, jitter, packet loss, codec
show interface gigabitethernet0/0
show voice rtp statistics

# Python H.323 monitoring script
import socket
import struct
import time

class H323Monitor:
    def __init__(self):
        self.ras_port = 1719
        self.h225_port = 1720
        
    def monitor_ras_traffic(self):
        """Monitor H.323 RAS messages"""
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            sock.bind(('', self.ras_port))
            sock.settimeout(1.0)
            
            print("Monitoring H.323 RAS traffic on port 1719...")
            
            while True:
                try:
                    data, addr = sock.recvfrom(1024)
                    self.parse_ras_message(data, addr)
                except socket.timeout:
                    continue
                except KeyboardInterrupt:
                    break
                    
        except Exception as e:
            print(f"Error monitoring RAS: {e}")
    
    def parse_ras_message(self, data, addr):
        """Parse H.323 RAS message"""
        if len(data) < 4:
            return
            
        # Basic RAS message parsing
        msg_type = data[0]
        
        ras_types = {
            0x80: "GRQ (Gatekeeper Request)",
            0x81: "GCF (Gatekeeper Confirm)", 
            0x82: "GRJ (Gatekeeper Reject)",
            0x83: "RRQ (Registration Request)",
            0x84: "RCF (Registration Confirm)",
            0x85: "RRJ (Registration Reject)",
            0x86: "URQ (Unregistration Request)",
            0x87: "UCF (Unregistration Confirm)",
            0x88: "URJ (Unregistration Reject)",
            0x89: "ARQ (Admission Request)",
            0x8A: "ACF (Admission Confirm)",
            0x8B: "ARJ (Admission Reject)",
            0x8C: "BRQ (Bandwidth Request)",
            0x8D: "BCF (Bandwidth Confirm)",
            0x8E: "BRJ (Bandwidth Reject)",
            0x8F: "DRQ (Disengage Request)",
            0x90: "DCF (Disengage Confirm)",
            0x91: "DRJ (Disengage Reject)",
            0x92: "LRQ (Location Request)",
            0x93: "LCF (Location Confirm)",
            0x94: "LRJ (Location Reject)"
        }
        
        msg_name = ras_types.get(msg_type, f"Unknown (0x{msg_type:02x})")
        print(f"RAS from {addr[0]}:{addr[1]} - {msg_name}")
    
    def check_h323_connectivity(self, host, port=1720):
        """Check H.323 call signaling connectivity"""
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(5)
            result = sock.connect_ex((host, port))
            sock.close()
            
            if result == 0:
                print(f"H.323 call signaling available on {host}:{port}")
                return True
            else:
                print(f"H.323 call signaling unavailable on {host}:{port}")
                return False
                
        except Exception as e:
            print(f"Error checking H.323 connectivity: {e}")
            return False
    
    def scan_h323_network(self, network):
        """Scan network for H.323 services"""
        import ipaddress
        import threading
        
        def check_host(ip):
            if self.check_h323_connectivity(str(ip)):
                # Also check RAS port
                try:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                    sock.settimeout(1)
                    sock.sendto(b'\\x80\\x00\\x00\\x00', (str(ip), 1719))  # Simple GRQ
                    response, addr = sock.recvfrom(1024)
                    print(f"  RAS service also available on {ip}")
                    sock.close()
                except:
                    pass
        
        net = ipaddress.IPv4Network(network, strict=False)
        threads = []
        
        print(f"Scanning {network} for H.323 services...")
        
        for ip in net.hosts():
            thread = threading.Thread(target=check_host, args=(ip,))
            thread.start()
            threads.append(thread)
            
            # Limit concurrent threads
            if len(threads) >= 50:
                for t in threads:
                    t.join()
                threads = []
        
        # Wait for remaining threads
        for thread in threads:
            thread.join()

# H.323 call quality monitoring
class H323CallQuality:
    def __init__(self):
        self.calls = {}
    
    def monitor_rtp_quality(self, rtp_stream):
        """Monitor RTP stream quality metrics"""
        metrics = {
            'packets_sent': 0,
            'packets_received': 0,
            'packets_lost': 0,
            'jitter': 0.0,
            'latency': 0.0,
            'mos_score': 0.0
        }
        
        # Calculate MOS score based on packet loss and jitter
        packet_loss_percent = (metrics['packets_lost'] / max(metrics['packets_sent'], 1)) * 100
        
        if packet_loss_percent < 1 and metrics['jitter'] < 20:
            metrics['mos_score'] = 4.5  # Excellent
        elif packet_loss_percent < 3 and metrics['jitter'] < 40:
            metrics['mos_score'] = 4.0  # Good
        elif packet_loss_percent < 5 and metrics['jitter'] < 60:
            metrics['mos_score'] = 3.5  # Fair
        else:
            metrics['mos_score'] = 2.0  # Poor
        
        return metrics

# Usage
monitor = H323Monitor()
# monitor.monitor_ras_traffic()
monitor.scan_h323_network('192.168.1.0/24')`,
        explanation: "H.323 monitoring, troubleshooting tools, and network analysis scripts."
      }
    ],
    diagrams: [
      {
        src: "/h323_architecture.png",
        alt: "H.323 architecture",
        caption: "H.323 protocol stack and component architecture"
      },
      {
        src: "/h323_call_flow.jpg",
        alt: "H.323 call flow",
        caption: "H.323 call establishment and termination sequence"
      }
    ],
    relatedProtocols: ["sip", "rtp", "rtcp", "q931"],
    resources: [
      {
        title: "ITU-T H.323 Recommendation",
        url: "https://www.itu.int/rec/T-REC-H.323/",
        type: "Standard"
      },
      {
        title: "H.323 Implementation Guide",
        url: "https://www.cisco.com/c/en/us/support/docs/voice/h323/",
        type: "Guide"
      },
      {
        title: "OpenH323 Project",
        url: "http://www.openh323.org/",
        type: "Implementation"
      }
    ],
    securityConsiderations: [
      "Authentication and authorization",
      "Media encryption (SRTP)",
      "Signaling security (TLS)",
      "Firewall configuration",
      "NAT traversal security",
      "DoS attack prevention",
      "Call admission control",
      "Network segmentation"
    ]
  }