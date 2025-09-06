import { Protocol } from "../../types/protocol";

export const MPLS: Protocol = {
    id: "mpls",
    name: "MPLS",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Multiprotocol Label Switching for efficient packet forwarding",
    fullDescription: "MPLS (Multiprotocol Label Switching) is a routing technique in telecommunications networks that directs data from one node to the next based on short path labels rather than long network addresses, thus avoiding complex lookups in a routing table and speeding traffic flows.",
    port: "N/A (Layer 2.5 protocol)",
    versions: ["MPLS", "MPLS-TE", "MPLS VPN", "MPLS-TP"],
    advantages: [
      "High performance forwarding",
      "Quality of Service support",
      "Traffic engineering capabilities",
      "VPN services enablement",
      "Scalable architecture",
      "Protocol independence",
      "Fast reroute mechanisms",
      "Bandwidth guarantees"
    ],
    disadvantages: [
      "Complex configuration",
      "Vendor lock-in potential",
      "Limited visibility",
      "High implementation costs",
      "Troubleshooting complexity",
      "Requires specialized equipment",
      "Limited over Internet",
      "Skill requirements"
    ],
    useCases: [
      "Service provider networks",
      "Enterprise VPNs",
      "Traffic engineering",
      "Quality of Service",
      "Bandwidth optimization",
      "Network convergence",
      "Metro Ethernet services",
      "Voice over IP networks",
      "Video delivery networks",
      "Cloud connectivity",
      "Disaster recovery networks",
      "Multi-site connectivity"
    ],
    examples: [
      {
        title: "MPLS Label Structure",
        code: `# MPLS Label Format (32 bits)
+--------+-----+---+--------+
| Label  | EXP |S|   TTL   |
| 20bits | 3   |1| 8 bits |
+--------+-----+---+--------+

Label: 20-bit label value
EXP: 3-bit experimental (QoS/CoS)
S: 1-bit bottom of stack
TTL: 8-bit time to live

# MPLS Operations
PUSH: Add label to packet (ingress LER)
SWAP: Replace label (transit LSR) 
POP: Remove label (egress LER/penultimate hop)

# Label Distribution Protocol (LDP)
# Automatic label distribution between LSRs

# Label Switched Path (LSP)
# Predetermined path through MPLS network
Ingress LER -> LSR1 -> LSR2 -> Egress LER
   |           |       |         |
 PUSH       SWAP    SWAP       POP

# Reserved Labels
0: IPv4 Explicit NULL
1: Router Alert
2: IPv6 Explicit NULL
3: Implicit NULL
4-15: Reserved
16+: Available for assignment`,
        explanation: "MPLS label structure and basic operations."
      },
      {
        title: "MPLS VPN Configuration",
        code: `# Cisco MPLS L3VPN Configuration

# Provider Edge (PE) Router Configuration
# Enable MPLS on core interfaces
interface GigabitEthernet0/0
 ip address 10.0.1.1 255.255.255.252
 mpls ip
 no shutdown

# Configure VRF for customer
ip vrf CUSTOMER_A
 rd 65001:100
 route-target export 65001:100
 route-target import 65001:100

# Customer-facing interface
interface GigabitEthernet0/1
 ip vrf forwarding CUSTOMER_A
 ip address 192.168.1.1 255.255.255.0
 no shutdown

# BGP configuration for MPLS VPN
router bgp 65001
 neighbor 10.0.1.2 remote-as 65001
 neighbor 10.0.1.2 update-source Loopback0
 
 address-family vpnv4
  neighbor 10.0.1.2 activate
  neighbor 10.0.1.2 send-community extended
 exit-address-family
 
 address-family ipv4 vrf CUSTOMER_A
  redistribute connected
  redistribute static
 exit-address-family

# Provider (P) Router Configuration
interface GigabitEthernet0/0
 ip address 10.0.1.2 255.255.255.252
 mpls ip
 no shutdown

router ospf 1
 network 10.0.0.0 0.0.255.255 area 0

# Label Distribution Protocol
mpls ldp router-id Loopback0
mpls label protocol ldp
interface GigabitEthernet0/0
 mpls label-switching`,
        explanation: "MPLS L3VPN configuration on Cisco routers."
      },
      {
        title: "MPLS Traffic Engineering",
        code: `# MPLS-TE Configuration
# Enable RSVP-TE for traffic engineering

# Global MPLS-TE configuration
mpls traffic-eng tunnels
mpls traffic-eng router-id Loopback0

# OSPF configuration for TE
router ospf 1
 mpls traffic-eng router-id Loopback0
 mpls traffic-eng area 0

# Interface TE configuration
interface GigabitEthernet0/0
 ip rsvp bandwidth 100000 100000
 mpls traffic-eng tunnels

# Create TE tunnel
interface Tunnel1
 ip unnumbered Loopback0
 tunnel destination 10.0.0.4
 tunnel mode mpls traffic-eng
 tunnel mpls traffic-eng autoroute announce
 tunnel mpls traffic-eng bandwidth 50000
 tunnel mpls traffic-eng path-option 1 explicit name PATH1

# Explicit path configuration
ip explicit-path name PATH1 enable
 next-address 10.0.1.2
 next-address 10.0.2.1
 next-address 10.0.0.4

# Python MPLS monitoring script
import subprocess
import re

def check_mpls_forwarding():
    result = subprocess.run(['show', 'mpls', 'forwarding-table'], 
                          capture_output=True, text=True)
    
    labels = []
    for line in result.stdout.split('\\n'):
        if re.match(r'^\\d+', line):
            parts = line.split()
            if len(parts) >= 3:
                labels.append({
                    'label': parts[0],
                    'destination': parts[1],
                    'next_hop': parts[2]
                })
    
    return labels

def monitor_mpls_tunnels():
    result = subprocess.run(['show', 'mpls', 'traffic-eng', 'tunnels'], 
                          capture_output=True, text=True)
    
    tunnels = []
    current_tunnel = None
    
    for line in result.stdout.split('\\n'):
        if 'Tunnel' in line and 'Destination' in line:
            if current_tunnel:
                tunnels.append(current_tunnel)
            current_tunnel = {'name': line.split()[0]}
        elif current_tunnel and 'State:' in line:
            current_tunnel['state'] = line.split('State:')[1].strip()
    
    if current_tunnel:
        tunnels.append(current_tunnel)
    
    return tunnels

# Usage
labels = check_mpls_forwarding()
tunnels = monitor_mpls_tunnels()

print(f"MPLS Labels: {len(labels)}")
print(f"TE Tunnels: {len(tunnels)}")`,
        explanation: "MPLS Traffic Engineering configuration and monitoring."
      }
    ],
    diagrams: [
      {
        src: "/mpls_architecture.png",
        alt: "MPLS network architecture",
        caption: "MPLS network components and label switching operation"
      },
      {
        src: "/mpls_vpn.jpg",
        alt: "MPLS VPN architecture",
        caption: "MPLS L3VPN architecture with VRF and route targets"
      }
    ],
    relatedProtocols: ["bgp", "ospf", "rsvp", "ldp"],
    resources: [
      {
        title: "RFC 3031 - MPLS Architecture",
        url: "https://tools.ietf.org/html/rfc3031",
        type: "RFC"
      },
      {
        title: "RFC 4364 - BGP/MPLS IP VPNs",
        url: "https://tools.ietf.org/html/rfc4364",
        type: "RFC"
      },
      {
        title: "MPLS Configuration Guide",
        url: "https://www.cisco.com/c/en/us/support/docs/multiprotocol-label-switching-mpls/",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Label spoofing prevention",
      "VPN separation enforcement",
      "Route target validation",
      "Access control lists",
      "Network segmentation",
      "Monitoring and logging",
      "Encryption for sensitive traffic",
      "Regular security audits"
    ]
  }