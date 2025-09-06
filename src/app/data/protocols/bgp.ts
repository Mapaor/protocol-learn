import { Protocol } from "../../types/protocol";

export const BGP: Protocol = {
    id: "bgp",
    name: "BGP",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Border Gateway Protocol for inter-domain routing on the Internet",
    fullDescription: "BGP (Border Gateway Protocol) is a standardized exterior gateway protocol designed to exchange routing information between autonomous systems on the Internet. BGP is the protocol that makes the Internet work by enabling data routing between different networks and is critical for Internet connectivity.",
    port: "179",
    advantages: [
      "Internet-scale routing",
      "Policy-based routing",
      "Path vector algorithm",
      "Autonomous system support",
      "Flexible route filtering",
      "Incremental updates"
    ],
    disadvantages: [
      "Slow convergence",
      "Complex configuration",
      "Security vulnerabilities",
      "Full table requirement",
      "Memory intensive",
      "Debugging complexity"
    ],
    useCases: [
      "Internet service providers",
      "Enterprise multi-homing",
      "Content delivery networks",
      "Data center interconnect",
      "MPLS VPN services",
      "Internet exchanges",
      "Cloud connectivity",
      "Autonomous system peering",
      "Route optimization",
      "Traffic engineering",
      "Redundancy and failover",
      "Global routing policies"
    ],
    examples: [
      {
        title: "BGP Message Types and Header",
        code: `# BGP Message Header (19 bytes)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                                                               +
|                           Marker                             |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Length               |      Type     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# BGP Message Types
Type 1: OPEN - Establish BGP session
Type 2: UPDATE - Exchange routing information  
Type 3: NOTIFICATION - Error conditions
Type 4: KEEPALIVE - Maintain session

# BGP OPEN Message
OPEN Message:
- Version: 4
- My Autonomous System: 65001
- Hold Time: 180 seconds
- BGP Identifier: 192.168.1.1
- Optional Parameters:
  - Capability: Multiprotocol (IPv6)
  - Capability: Route Refresh
  - Capability: 4-byte AS Numbers

# BGP UPDATE Message
UPDATE Message:
- Withdrawn Routes Length: 0
- Withdrawn Routes: []
- Total Path Attribute Length: 44
- Path Attributes:
  - ORIGIN: IGP (0)
  - AS_PATH: [65001, 65002, 65003]
  - NEXT_HOP: 192.168.1.1
  - MED: 100
  - LOCAL_PREF: 120
  - COMMUNITY: [65001:100, 65001:200]
- Network Layer Reachability Information:
  - 10.0.0.0/8
  - 172.16.0.0/12
  - 192.168.0.0/16

# BGP Path Attributes
Well-known Mandatory:
- ORIGIN (Type 1): IGP, EGP, or Incomplete
- AS_PATH (Type 2): Sequence of AS numbers
- NEXT_HOP (Type 3): IP address of next hop

Well-known Discretionary:
- LOCAL_PREF (Type 5): Local preference value
- ATOMIC_AGGREGATE (Type 6): Route aggregation flag

Optional Transitive:
- AGGREGATOR (Type 7): AS and IP of aggregator
- COMMUNITY (Type 8): Community values

Optional Non-transitive:
- MED (Type 4): Multi-exit discriminator
- ORIGINATOR_ID (Type 9): Route reflector ID
- CLUSTER_LIST (Type 10): Route reflector cluster list`,
        explanation: "BGP message structure and path attributes overview."
      },
      {
        title: "BGP Configuration Examples",
        code: `# Cisco BGP Configuration

# Basic eBGP Configuration
router bgp 65001
 bgp router-id 1.1.1.1
 bgp log-neighbor-changes
 neighbor 192.168.1.2 remote-as 65002
 neighbor 192.168.1.2 description "ISP Connection"
 neighbor 192.168.1.2 password MyBGPPassword
 !
 address-family ipv4
  network 10.0.0.0 mask 255.0.0.0
  neighbor 192.168.1.2 activate
  neighbor 192.168.1.2 prefix-list OUT out
  neighbor 192.168.1.2 filter-list 1 in
 exit-address-family

# iBGP Configuration with Route Reflector
router bgp 65001
 bgp router-id 2.2.2.2
 neighbor 10.0.0.1 remote-as 65001
 neighbor 10.0.0.1 route-reflector-client
 neighbor 10.0.0.3 remote-as 65001
 neighbor 10.0.0.3 route-reflector-client

# BGP Communities and Local Preference
router bgp 65001
 neighbor 192.168.1.2 route-map SET_COMMUNITY out
 neighbor 192.168.1.2 route-map SET_LOCAL_PREF in

route-map SET_COMMUNITY permit 10
 match ip address prefix-list CUSTOMER_ROUTES
 set community 65001:100
 set local-preference 120

route-map SET_LOCAL_PREF permit 10
 match community 65002:200
 set local-preference 80

# AS Path Filtering
ip as-path access-list 1 permit ^65002_
ip as-path access-list 1 deny .*

# Prefix List Configuration
ip prefix-list OUT seq 10 permit 10.0.0.0/8
ip prefix-list OUT seq 20 deny 0.0.0.0/0 le 32

# Linux BGP with FRR (Free Range Routing)
# /etc/frr/bgpd.conf
router bgp 65001
 bgp router-id 3.3.3.3
 neighbor 192.168.1.2 remote-as 65002
 neighbor 192.168.1.2 timers 30 90
 !
 address-family ipv4 unicast
  network 10.0.0.0/8
  neighbor 192.168.1.2 activate
  neighbor 192.168.1.2 soft-reconfiguration inbound
 exit-address-family
 !
 address-family ipv6 unicast
  network 2001:db8::/32
  neighbor 2001:db8::1 activate
 exit-address-family

# BGP Monitoring Commands
show ip bgp summary
show ip bgp neighbors
show ip bgp
show ip bgp regexp ^65001_
show ip route bgp
clear ip bgp * soft

# Python BGP Route Monitoring
#!/usr/bin/env python3
import subprocess
import json
import time

def get_bgp_summary():
    result = subprocess.run(['vtysh', '-c', 'show ip bgp summary json'], 
                          capture_output=True, text=True)
    return json.loads(result.stdout)

def monitor_bgp_neighbors():
    while True:
        summary = get_bgp_summary()
        for neighbor, info in summary.get('peers', {}).items():
            state = info.get('state', 'Unknown')
            uptime = info.get('peerUptime', 'N/A')
            print(f"Neighbor {neighbor}: {state} (Uptime: {uptime})")
        time.sleep(60)

if __name__ == "__main__":
    monitor_bgp_neighbors()`,
        explanation: "BGP configuration examples for Cisco and Linux systems."
      },
      {
        title: "BGP Best Path Selection",
        code: `# BGP Best Path Selection Algorithm (in order)

# 1. Highest Weight (Cisco proprietary)
# 2. Highest Local Preference
# 3. Locally originated routes
# 4. Shortest AS Path
# 5. Lowest Origin type (IGP < EGP < Incomplete)
# 6. Lowest MED (Multi-Exit Discriminator)
# 7. eBGP over iBGP
# 8. Lowest IGP metric to next hop
# 9. Oldest route (for eBGP)
# 10. Lowest Router ID
# 11. Lowest cluster list length
# 12. Lowest neighbor address

# Example BGP Table Analysis
BGP Route Analysis:
Route: 10.1.0.0/16
Path 1: AS_PATH [65002, 65003], LOCAL_PREF 100, MED 50, eBGP
Path 2: AS_PATH [65004, 65005, 65003], LOCAL_PREF 120, MED 30, eBGP
Path 3: AS_PATH [65006], LOCAL_PREF 100, MED 40, eBGP

Best Path Selection:
1. Weight: All equal (default 0)
2. Local Preference: Path 2 wins (120 > 100)
Result: Path 2 selected

# BGP Route Aggregation
router bgp 65001
 aggregate-address 10.0.0.0 255.252.0.0 summary-only
 aggregate-address 172.16.0.0 255.240.0.0 suppress-map SUPPRESS_SPECIFIC

# BGP Confederation
router bgp 65001
 bgp confederation identifier 64512
 bgp confederation peers 65002 65003
 neighbor 192.168.1.2 remote-as 65002

# BGP Route Reflector
router bgp 65001
 neighbor 10.0.0.2 route-reflector-client
 neighbor 10.0.0.3 route-reflector-client
 bgp cluster-id 1.1.1.1

# Python BGP Best Path Algorithm
class BGPRoute:
    def __init__(self, prefix, as_path, local_pref=100, med=0, origin='IGP', next_hop=''):
        self.prefix = prefix
        self.as_path = as_path
        self.local_pref = local_pref
        self.med = med
        self.origin = origin
        self.next_hop = next_hop
        self.weight = 0

def select_best_path(routes):
    def compare_routes(route1, route2):
        # 1. Highest Weight
        if route1.weight != route2.weight:
            return route2.weight - route1.weight
        
        # 2. Highest Local Preference
        if route1.local_pref != route2.local_pref:
            return route2.local_pref - route1.local_pref
        
        # 3. Shortest AS Path
        if len(route1.as_path) != len(route2.as_path):
            return len(route1.as_path) - len(route2.as_path)
        
        # 4. Lowest Origin (IGP=0, EGP=1, Incomplete=2)
        origin_values = {'IGP': 0, 'EGP': 1, 'Incomplete': 2}
        if route1.origin != route2.origin:
            return origin_values[route1.origin] - origin_values[route2.origin]
        
        # 5. Lowest MED
        return route1.med - route2.med
    
    from functools import cmp_to_key
    sorted_routes = sorted(routes, key=cmp_to_key(compare_routes))
    return sorted_routes[0] if sorted_routes else None

# Example usage
routes = [
    BGPRoute('10.1.0.0/16', [65002, 65003], local_pref=100, med=50),
    BGPRoute('10.1.0.0/16', [65004, 65005, 65003], local_pref=120, med=30),
    BGPRoute('10.1.0.0/16', [65006], local_pref=100, med=40)
]

best_route = select_best_path(routes)
print(f"Best path for {best_route.prefix}: AS_PATH {best_route.as_path}")

# BGP Security - Route Origin Validation (ROV)
# RPKI (Resource Public Key Infrastructure) validation
router bgp 65001
 bgp rpki server 192.168.1.100 port 8282
 neighbor 192.168.1.2 route-map RPKI_FILTER in

route-map RPKI_FILTER permit 10
 match rpki valid
 set local-preference 120

route-map RPKI_FILTER permit 20
 match rpki not-found
 set local-preference 100

route-map RPKI_FILTER deny 30
 match rpki invalid`,
        explanation: "BGP best path selection algorithm and security features."
      }
    ],
    relatedProtocols: ["ospf", "tcp", "mpls", "ipv4", "ipv6"],
    resources: [
      {
        title: "RFC 4271 - BGP-4 Protocol",
        url: "https://tools.ietf.org/html/rfc4271",
        type: "RFC"
      },
      {
        title: "RFC 7908 - BGP Security Considerations",
        url: "https://tools.ietf.org/html/rfc7908",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Route hijacking prevention",
      "RPKI implementation",
      "AS path validation",
      "Route filtering",
      "Peer authentication",
      "Prefix origin validation"
    ]
};
