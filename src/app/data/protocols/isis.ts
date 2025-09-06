import { Protocol } from "../../types/protocol";

export const ISIS: Protocol = {
    id: "isis",
    name: "IS-IS",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Intermediate System to Intermediate System link-state routing protocol",
    fullDescription: "IS-IS (Intermediate System to Intermediate System) is a routing protocol designed to move information efficiently within a computer network. It is a link-state protocol, operating by reliably flooding link state information throughout a network of routers.",
    port: "N/A (Layer 2 protocol)",
    versions: ["ISO 10589", "RFC 1142", "Integrated IS-IS", "IS-IS Extensions"],
    advantages: [
      "Fast convergence",
      "Hierarchical design",
      "Protocol independence",
      "Efficient flooding",
      "Area-based scaling",
      "Multiple metrics support",
      "Traffic engineering support",
      "IPv6 ready"
    ],
    disadvantages: [
      "Complex configuration",
      "Limited vendor support",
      "OSI background complexity",
      "Debugging difficulties",
      "Limited documentation",
      "Area design requirements",
      "Memory intensive",
      "CPU overhead"
    ],
    useCases: [
      "Service provider networks",
      "Large enterprise networks",
      "Data center interconnects",
      "Internet backbone routing",
      "MPLS networks",
      "IPv6 deployments",
      "Traffic engineering",
      "Multi-area networks",
      "High availability networks",
      "Carrier networks",
      "Academic networks",
      "Government networks"
    ],
    examples: [
      {
        title: "IS-IS PDU Types",
        code: `# IS-IS Protocol Data Units (PDUs)

Hello PDUs:
- Level 1 LAN Hello (Type 15)
- Level 2 LAN Hello (Type 16)  
- Point-to-Point Hello (Type 17)

LSP (Link State PDUs):
- Level 1 LSP (Type 18)
- Level 2 LSP (Type 20)

SNP (Sequence Number PDUs):
- Level 1 CSNP (Type 24) - Complete SNP
- Level 2 CSNP (Type 25)
- Level 1 PSNP (Type 26) - Partial SNP
- Level 2 PSNP (Type 27)

# IS-IS Areas and Levels
Level 1: Intra-area routing (within area)
Level 2: Inter-area routing (between areas)
Level 1-2: Both intra and inter-area routing

# IS-IS Metrics
Default Metric: 0-63 (6 bits)
Delay Metric: Optional
Expense Metric: Optional  
Error Metric: Optional
Wide Metrics: 0-16777215 (24 bits)

# Network Service Access Point (NSAP) Address Format
Area ID | System ID | NSEL
8-20 bytes | 6 bytes | 1 byte

Example: 49.0001.1921.6800.1001.00
- 49: Private area
- 0001: Area ID
- 1921.6800.1001: System ID
- 00: NSEL (Network Selector)`,
        explanation: "IS-IS protocol data units and addressing structure."
      },
      {
        title: "IS-IS Cisco Configuration",
        code: `# Cisco IS-IS configuration

# Global IS-IS configuration
router isis AREA1
 net 49.0001.1921.6800.1001.00
 is-type level-2-only
 metric-style wide
 passive-interface default
 no passive-interface GigabitEthernet0/0
 no passive-interface GigabitEthernet0/1

# Interface IS-IS configuration
interface GigabitEthernet0/0
 ip address 10.1.1.1 255.255.255.252
 ip router isis AREA1
 isis circuit-type level-2-only
 isis metric 10
 isis hello-interval 10
 isis hello-multiplier 3
 no shutdown

interface GigabitEthernet0/1
 ip address 10.1.2.1 255.255.255.252
 ip router isis AREA1
 isis circuit-type level-2-only
 isis metric 20
 no shutdown

# Loopback interface
interface Loopback0
 ip address 192.168.1.1 255.255.255.255
 ip router isis AREA1

# IS-IS authentication
router isis AREA1
 area-password cisco123
 domain-password domain123

# Interface authentication
interface GigabitEthernet0/0
 isis password interface123

# IS-IS summarization
router isis AREA1
 summary-address 192.168.0.0 255.255.0.0

# IS-IS redistribution
router isis AREA1
 redistribute static metric 20
 redistribute ospf 1 metric 30

# Multi-area IS-IS
router isis AREA2
 net 49.0002.1921.6800.2001.00
 is-type level-1-only`,
        explanation: "Cisco IS-IS routing protocol configuration."
      },
      {
        title: "IS-IS Monitoring and Troubleshooting",
        code: `# IS-IS show commands

# Show IS-IS neighbors
show isis neighbors
show isis neighbors detail

# Sample output:
System Id      Type Interface   IP Address      State Holdtime Circuit Id
R2             L2   Gi0/0       10.1.1.2        UP    27       R2.01
R3             L2   Gi0/1       10.1.2.2        UP    22       R3.01

# Show IS-IS database
show isis database
show isis database detail
show isis database level-2

# Show IS-IS topology
show isis topology
show isis topology level-2

# Show IS-IS routes
show isis route
show ip route isis

# Show IS-IS interface information
show isis interface
show isis interface detail

# Debug IS-IS
debug isis adjacency-packets
debug isis update-packets
debug isis spf-events
debug isis route-events

# IS-IS LSP information
show isis database detail R2.00-00

# IS-IS statistics
show isis statistics

# Python IS-IS monitoring script
import subprocess
import re
import json

class ISISMonitor:
    def __init__(self):
        self.neighbors = []
        self.database = []
        self.routes = []
    
    def get_neighbors(self):
        try:
            result = subprocess.run(['vtysh', '-c', 'show isis neighbor'], 
                                  capture_output=True, text=True)
            
            neighbors = []
            for line in result.stdout.split('\\n')[2:]:  # Skip header
                if line.strip():
                    parts = line.split()
                    if len(parts) >= 6:
                        neighbor = {
                            'system_id': parts[0],
                            'interface': parts[1],
                            'level': parts[2],
                            'state': parts[3],
                            'holdtime': parts[4],
                            'snpa': parts[5] if len(parts) > 5 else 'N/A'
                        }
                        neighbors.append(neighbor)
            
            self.neighbors = neighbors
            return neighbors
            
        except Exception as e:
            print(f"Error getting IS-IS neighbors: {e}")
            return []
    
    def get_database(self):
        try:
            result = subprocess.run(['vtysh', '-c', 'show isis database'], 
                                  capture_output=True, text=True)
            
            lsps = []
            for line in result.stdout.split('\\n'):
                if '.00-00' in line or '.01-00' in line:
                    parts = line.split()
                    if len(parts) >= 4:
                        lsp = {
                            'lsp_id': parts[0],
                            'sequence': parts[1],
                            'checksum': parts[2],
                            'lifetime': parts[3]
                        }
                        lsps.append(lsp)
            
            self.database = lsps
            return lsps
            
        except Exception as e:
            print(f"Error getting IS-IS database: {e}")
            return []
    
    def check_convergence(self):
        neighbors = self.get_neighbors()
        database = self.get_database()
        
        # Check if all neighbors are up
        down_neighbors = [n for n in neighbors if n['state'] != 'Up']
        
        # Check for LSP age issues
        old_lsps = [lsp for lsp in database 
                   if int(lsp['lifetime']) < 300]  # Less than 5 minutes
        
        status = {
            'neighbors_total': len(neighbors),
            'neighbors_down': len(down_neighbors),
            'lsps_total': len(database),
            'lsps_aging': len(old_lsps),
            'converged': len(down_neighbors) == 0 and len(old_lsps) == 0
        }
        
        return status

# Usage
monitor = ISISMonitor()
neighbors = monitor.get_neighbors()
status = monitor.check_convergence()

print(f"IS-IS Status: {'Converged' if status['converged'] else 'Not Converged'}")
print(f"Neighbors: {status['neighbors_total']} total, {status['neighbors_down']} down")`,
        explanation: "IS-IS monitoring, troubleshooting commands and automation."
      }
    ],
    diagrams: [
      {
        src: "/isis_hierarchy.png",
        alt: "IS-IS hierarchical design",
        caption: "IS-IS two-level hierarchy with areas and backbone"
      },
      {
        src: "/isis_flooding.jpg",
        alt: "IS-IS LSP flooding",
        caption: "IS-IS link-state advertisement flooding process"
      }
    ],
    relatedProtocols: ["ospf", "bgp", "mpls", "clns"],
    resources: [
      {
        title: "RFC 1142 - OSI IS-IS",
        url: "https://tools.ietf.org/html/rfc1142",
        type: "RFC"
      },
      {
        title: "RFC 5308 - Routing IPv6 with IS-IS",
        url: "https://tools.ietf.org/html/rfc5308",
        type: "RFC"
      },
      {
        title: "IS-IS Configuration Guide",
        url: "https://www.cisco.com/c/en/us/support/docs/ip/integrated-intermediate-system-to-intermediate-system-is-is/",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Authentication mechanisms",
      "Area password protection",
      "LSP authentication",
      "Neighbor authentication",
      "LSA filtering",
      "Route filtering",
      "Network access control",
      "Monitoring and logging"
    ]
  }