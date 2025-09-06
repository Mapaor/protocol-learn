import { Protocol } from "../../types/protocol";

export const RIP: Protocol = {
    id: "rip",
    name: "RIP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Routing Information Protocol for distance-vector routing",
    fullDescription: "RIP (Routing Information Protocol) is one of the oldest distance-vector routing protocols that uses hop count as its routing metric. It prevents routing loops by implementing a limit on the number of hops allowed in a path from source to destination. RIP is simple to configure and implement but has limitations in larger networks.",
    port: "520 (UDP)",
    advantages: [
      "Simple configuration",
      "Easy to understand",
      "Automatic route discovery",
      "Loop prevention mechanisms",
      "Vendor independent",
      "Low resource usage"
    ],
    disadvantages: [
      "Limited to 15 hops",
      "Slow convergence",
      "Periodic updates only",
      "High bandwidth usage",
      "Count-to-infinity problem",
      "No VLSM support (RIPv1)"
    ],
    useCases: [
      "Small networks",
      "Stub networks",
      "Simple topologies",
      "Educational purposes",
      "Legacy systems",
      "Backup routing",
      "Home networks",
      "Branch offices",
      "Testing environments",
      "Simple LANs",
      "Non-critical networks",
      "Proof of concepts"
    ],
    examples: [
      {
        title: "RIP Packet Format and Message Types",
        code: `# RIP Message Format (RFC 2453)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Command (1)  |  Version (1)  |       Routing Domain (2)      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Address Family Identifier (2)        |     Route Tag (2)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        IP Address (4)                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Subnet Mask (4)                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Next Hop (4)                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Metric (4)                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# RIP Header Fields
Command:
  1 = Request  (asking for routing information)
  2 = Response (providing routing information)
  
Version:
  1 = RIPv1 (classful, no subnet masks)
  2 = RIPv2 (classless, includes subnet masks)

Routing Domain: Usually 0 (used for authentication in RIPv2)

# Route Entry Fields (20 bytes each)
Address Family Identifier: 2 for IP
Route Tag: External route tag (RIPv2 only)
IP Address: Network address
Subnet Mask: Network mask (RIPv2 only, 0 in RIPv1)
Next Hop: Next hop IP (RIPv2 only, 0 in RIPv1)
Metric: Hop count (1-15, 16 = infinity/unreachable)

# RIPv1 vs RIPv2 Differences
RIPv1:
- Classful routing (no subnet masks)
- Broadcast updates (255.255.255.255)
- No authentication
- No VLSM support
- No next hop information

RIPv2:
- Classless routing (includes subnet masks)
- Multicast updates (224.0.0.9)
- Supports authentication
- VLSM support
- Next hop information included
- Route tags for external routes

# RIP Authentication (RIPv2)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|             0xFFFF            |    Authentication Type (2)    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Authentication Data                     |
~                              (16 bytes)                       ~
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Authentication Types:
0 = No authentication
2 = Simple password (plaintext)
3 = MD5 authentication

# Example RIP Request Packet (Hexadecimal)
01 01 00 00  # Command=1 (Request), Version=1, Domain=0
00 00 00 00  # AFI=0, Tag=0 (special request for entire table)
00 00 00 00  # IP Address = 0.0.0.0
00 00 00 00  # Subnet Mask = 0.0.0.0
00 00 00 00  # Next Hop = 0.0.0.0
00 00 00 10  # Metric = 16 (infinity - requesting all routes)

# Example RIP Response Packet (RIPv2)
02 02 00 00  # Command=2 (Response), Version=2, Domain=0
00 02 00 00  # AFI=2 (IP), Route Tag=0
C0 A8 01 00  # IP Address = 192.168.1.0
FF FF FF 00  # Subnet Mask = 255.255.255.0
00 00 00 00  # Next Hop = 0.0.0.0 (use advertising router)
00 00 00 01  # Metric = 1 hop

00 02 00 00  # AFI=2 (IP), Route Tag=0
C0 A8 02 00  # IP Address = 192.168.2.0
FF FF FF 00  # Subnet Mask = 255.255.255.0
00 00 00 00  # Next Hop = 0.0.0.0
00 00 00 02  # Metric = 2 hops

# RIP Timers
Update Timer: 30 seconds (periodic updates)
Invalid Timer: 180 seconds (route becomes invalid)
Holddown Timer: 180 seconds (suppresses updates)
Flush Timer: 240 seconds (route removed from table)`,
        explanation: "RIP packet structure, message types, and protocol differences between versions."
      },
      {
        title: "RIP Configuration and Implementation",
        code: `# Cisco RIP Configuration

# Basic RIPv1 Configuration
Router> enable
Router# configure terminal
Router(config)# router rip
Router(config-router)# version 1
Router(config-router)# network 192.168.1.0
Router(config-router)# network 192.168.2.0
Router(config-router)# exit

# RIPv2 Configuration with Authentication
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
Router(config-router)# network 192.168.2.0
Router(config-router)# network 10.0.0.0
Router(config-router)# no auto-summary
Router(config-router)# exit

# Interface Authentication (Simple Password)
Router(config)# interface FastEthernet0/0
Router(config-if)# ip rip authentication mode text
Router(config-if)# ip rip authentication key-chain mykeys
Router(config-if)# exit

# Key Chain Configuration
Router(config)# key chain mykeys
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string secretpassword
Router(config-keychain-key)# exit

# MD5 Authentication
Router(config)# interface FastEthernet0/1
Router(config-if)# ip rip authentication mode md5
Router(config-if)# ip rip authentication key-chain md5keys
Router(config-if)# exit

Router(config)# key chain md5keys
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string md5password
Router(config-keychain-key)# exit

# RIP Passive Interface (don't send updates)
Router(config)# router rip
Router(config-router)# passive-interface FastEthernet0/2
Router(config-router)# exit

# Default Route Distribution
Router(config)# router rip
Router(config-router)# default-information originate
Router(config-router)# exit

# Route Filtering
Router(config)# access-list 10 deny 192.168.10.0 0.0.0.255
Router(config)# access-list 10 permit any
Router(config)# router rip
Router(config-router)# distribute-list 10 out FastEthernet0/0
Router(config-router)# exit

# Linux Quagga/FRR RIP Configuration (/etc/quagga/ripd.conf)
hostname ripd
password zebra
enable password zebra

debug rip events
debug rip packet

interface eth0
 ip rip authentication mode md5
 ip rip authentication key-chain ripkey

interface eth1
 no ip rip advertisement

router rip
 version 2
 network 192.168.1.0/24
 network 192.168.2.0/24
 network 10.0.0.0/8
 no auto-summary
 passive-interface eth1
 default-information originate

key chain ripkey
 key 1
  key-string mypassword

line vty
 exec-timeout 0 0

# Python RIP Implementation
import socket
import struct
import time
import threading
from typing import Dict, List, Tuple

class RIPRoute:
    def __init__(self, network: str, mask: str, next_hop: str, metric: int, tag: int = 0):
        self.network = network
        self.mask = mask
        self.next_hop = next_hop
        self.metric = min(metric, 16)  # 16 = infinity
        self.tag = tag
        self.timestamp = time.time()
        self.timeout = 180  # Route timeout in seconds
    
    def is_expired(self) -> bool:
        return time.time() - self.timestamp > self.timeout
    
    def to_bytes(self, version: int = 2) -> bytes:
        """Convert route to RIP packet format."""
        afi = 2  # Address Family IP
        
        # Convert IP addresses to binary
        network_bin = socket.inet_aton(self.network)
        mask_bin = socket.inet_aton(self.mask) if version == 2 else socket.inet_aton("0.0.0.0")
        next_hop_bin = socket.inet_aton(self.next_hop) if version == 2 else socket.inet_aton("0.0.0.0")
        
        return struct.pack('!HHIIIII', 
                          afi, self.tag, 
                          struct.unpack('!I', network_bin)[0],
                          struct.unpack('!I', mask_bin)[0],
                          struct.unpack('!I', next_hop_bin)[0],
                          self.metric)

class RIPPacket:
    REQUEST = 1
    RESPONSE = 2
    
    def __init__(self, command: int, version: int = 2):
        self.command = command
        self.version = version
        self.domain = 0
        self.routes: List[RIPRoute] = []
    
    def add_route(self, route: RIPRoute):
        self.routes.append(route)
    
    def to_bytes(self) -> bytes:
        """Convert packet to binary format."""
        header = struct.pack('!BBH', self.command, self.version, self.domain)
        
        routes_data = b''
        for route in self.routes:
            routes_data += route.to_bytes(self.version)
        
        return header + routes_data
    
    @classmethod
    def from_bytes(cls, data: bytes) -> 'RIPPacket':
        """Parse binary data into RIP packet."""
        if len(data) < 4:
            return None
        
        command, version, domain = struct.unpack('!BBH', data[:4])
        packet = cls(command, version)
        packet.domain = domain
        
        # Parse route entries (20 bytes each)
        offset = 4
        while offset + 20 <= len(data):
            route_data = data[offset:offset + 20]
            afi, tag, network, mask, next_hop, metric = struct.unpack('!HHIIIII', route_data)
            
            if afi == 2:  # IP address family
                network_ip = socket.inet_ntoa(struct.pack('!I', network))
                mask_ip = socket.inet_ntoa(struct.pack('!I', mask))
                next_hop_ip = socket.inet_ntoa(struct.pack('!I', next_hop))
                
                route = RIPRoute(network_ip, mask_ip, next_hop_ip, metric, tag)
                packet.add_route(route)
            
            offset += 20
        
        return packet

class RIPDaemon:
    def __init__(self, interface_ip: str, version: int = 2):
        self.interface_ip = interface_ip
        self.version = version
        self.port = 520
        self.multicast_group = "224.0.0.9"  # RIPv2 multicast
        self.routing_table: Dict[str, RIPRoute] = {}
        self.neighbors: List[str] = []
        self.running = False
        self.socket = None
        
        # RIP timers
        self.update_interval = 30    # Send updates every 30 seconds
        self.timeout_interval = 180  # Route timeout
        self.garbage_interval = 120  # Garbage collection
    
    def start(self):
        """Start RIP daemon."""
        self.running = True
        
        # Create UDP socket
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.socket.bind(('', self.port))
        
        # Join multicast group for RIPv2
        if self.version == 2:
            mreq = struct.pack('4s4s', 
                             socket.inet_aton(self.multicast_group),
                             socket.inet_aton(self.interface_ip))
            self.socket.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
        
        # Start threads
        threading.Thread(target=self._receive_loop, daemon=True).start()
        threading.Thread(target=self._update_loop, daemon=True).start()
        threading.Thread(target=self._timeout_loop, daemon=True).start()
    
    def _receive_loop(self):
        """Receive and process RIP packets."""
        while self.running:
            try:
                data, addr = self.socket.recvfrom(1024)
                packet = RIPPacket.from_bytes(data)
                
                if packet:
                    self._process_packet(packet, addr[0])
                    
            except Exception as e:
                print(f"Receive error: {e}")
    
    def _process_packet(self, packet: RIPPacket, sender_ip: str):
        """Process received RIP packet."""
        if packet.command == RIPPacket.REQUEST:
            self._handle_request(sender_ip)
        elif packet.command == RIPPacket.RESPONSE:
            self._handle_response(packet, sender_ip)
    
    def _handle_request(self, sender_ip: str):
        """Handle RIP request - send our routing table."""
        response = RIPPacket(RIPPacket.RESPONSE, self.version)
        
        for route in self.routing_table.values():
            if not route.is_expired():
                # Split horizon: don't advertise routes back to their source
                if route.next_hop != sender_ip:
                    response.add_route(route)
        
        self._send_packet(response, sender_ip)
    
    def _handle_response(self, packet: RIPPacket, sender_ip: str):
        """Handle RIP response - update routing table."""
        for route in packet.routes:
            route_key = f"{route.network}/{route.mask}"
            
            # Increment metric (add one hop)
            route.metric += 1
            route.next_hop = sender_ip
            route.timestamp = time.time()
            
            # Update routing table if route is better
            if (route_key not in self.routing_table or 
                route.metric < self.routing_table[route_key].metric):
                
                if route.metric <= 15:  # Valid route
                    self.routing_table[route_key] = route
                    print(f"Updated route: {route_key} via {sender_ip} metric {route.metric}")
                elif route_key in self.routing_table:
                    # Route became unreachable
                    self.routing_table[route_key].metric = 16
                    print(f"Route {route_key} became unreachable")
    
    def _update_loop(self):
        """Send periodic routing updates."""
        while self.running:
            time.sleep(self.update_interval)
            self._send_updates()
    
    def _send_updates(self):
        """Send routing table to all neighbors."""
        if not self.routing_table:
            return
        
        response = RIPPacket(RIPPacket.RESPONSE, self.version)
        
        for route in self.routing_table.values():
            if not route.is_expired() and route.metric < 16:
                response.add_route(route)
        
        # Send to multicast group (RIPv2) or broadcast (RIPv1)
        if self.version == 2:
            dest = self.multicast_group
        else:
            dest = "255.255.255.255"
        
        self._send_packet(response, dest)
    
    def _timeout_loop(self):
        """Remove expired routes."""
        while self.running:
            time.sleep(30)  # Check every 30 seconds
            
            expired_routes = []
            for route_key, route in self.routing_table.items():
                if route.is_expired():
                    expired_routes.append(route_key)
            
            for route_key in expired_routes:
                print(f"Removing expired route: {route_key}")
                del self.routing_table[route_key]
    
    def _send_packet(self, packet: RIPPacket, dest_ip: str):
        """Send RIP packet to destination."""
        try:
            data = packet.to_bytes()
            self.socket.sendto(data, (dest_ip, self.port))
        except Exception as e:
            print(f"Send error to {dest_ip}: {e}")
    
    def add_static_route(self, network: str, mask: str, next_hop: str, metric: int = 1):
        """Add static route to routing table."""
        route_key = f"{network}/{mask}"
        route = RIPRoute(network, mask, next_hop, metric)
        self.routing_table[route_key] = route
        print(f"Added static route: {route_key}")
    
    def show_routing_table(self):
        """Display current routing table."""
        print("\\nRIP Routing Table:")
        print("Network/Mask".ljust(20) + "Next Hop".ljust(15) + "Metric".ljust(8) + "Age")
        print("-" * 60)
        
        for route_key, route in self.routing_table.items():
            age = int(time.time() - route.timestamp)
            status = "Expired" if route.is_expired() else f"{age}s"
            print(f"{route_key:<20} {route.next_hop:<15} {route.metric:<8} {status}")
    
    def stop(self):
        """Stop RIP daemon."""
        self.running = False
        if self.socket:
            self.socket.close()

# Example Usage
if __name__ == "__main__":
    # Create RIP daemon
    rip = RIPDaemon("192.168.1.1", version=2)
    
    # Add some static routes
    rip.add_static_route("192.168.1.0", "255.255.255.0", "0.0.0.0", 1)
    rip.add_static_route("10.0.0.0", "255.0.0.0", "192.168.1.254", 2)
    
    # Start daemon
    rip.start()
    
    try:
        while True:
            time.sleep(10)
            rip.show_routing_table()
    except KeyboardInterrupt:
        rip.stop()`,
        explanation: "Complete RIP configuration examples and Python implementation with routing table management."
      },
      {
        title: "RIP Troubleshooting and Advanced Features",
        code: `# RIP Debugging and Troubleshooting Commands

# Cisco Debug Commands
Router# debug ip rip
Router# debug ip rip events
Router# debug ip rip database
Router# debug ip rip trigger

# Show Commands
Router# show ip rip database
Router# show ip route rip
Router# show ip protocols
Router# show ip interface brief

# Example Debug Output
RIP: received v2 update from 192.168.1.2 on FastEthernet0/0
      192.168.2.0/24 via 0.0.0.0 in 1 hops
      10.0.0.0/8 via 192.168.1.3 in 2 hops
RIP: sending v2 update to 224.0.0.9 via FastEthernet0/0 (192.168.1.1)
      192.168.1.0/24 via 0.0.0.0, metric 1, tag 0
      172.16.0.0/16 via 0.0.0.0, metric 1, tag 0

# Common RIP Problems and Solutions

# Problem 1: Count-to-Infinity
# Solution: Split Horizon and Poison Reverse
Router(config)# interface FastEthernet0/0
Router(config-if)# ip split-horizon  # Default enabled
Router(config-if)# no ip split-horizon  # Disable if needed

# Problem 2: Slow Convergence  
# Solution: Triggered Updates and Holddown Timers
Router(config)# router rip
Router(config-router)# timers basic 30 180 180 240
# update invalid holddown flush

# Problem 3: Auto-summarization Issues (RIPv2)
Router(config)# router rip
Router(config-router)# no auto-summary  # Disable auto-summarization

# Problem 4: Authentication Mismatch
Router# show ip rip database
# Check for authentication errors in logs

# Route Summarization Configuration
Router(config)# interface FastEthernet0/0
Router(config-if)# ip summary-address rip 192.168.0.0 255.255.252.0

# RIP Offset Lists (modify metrics)
Router(config)# access-list 1 permit 192.168.10.0 0.0.0.255
Router(config)# router rip
Router(config-router)# offset-list 1 in 5 FastEthernet0/0

# Default Route Injection
Router(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.254
Router(config)# router rip
Router(config-router)# default-information originate

# Enhanced RIP Monitoring Script (Python)
import socket
import struct
import time
import json
from collections import defaultdict

class RIPMonitor:
    def __init__(self):
        self.statistics = {
            'packets_received': 0,
            'packets_sent': 0,
            'routes_learned': 0,
            'routes_advertised': 0,
            'updates_received': defaultdict(int),
            'neighbors': set(),
            'convergence_events': []
        }
        self.route_history = defaultdict(list)
        self.last_update = {}
    
    def capture_rip_traffic(self, interface_ip: str, duration: int = 300):
        """Monitor RIP traffic for specified duration."""
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind(('', 520))
        
        # Join multicast group
        mreq = struct.pack('4s4s', 
                          socket.inet_aton("224.0.0.9"),
                          socket.inet_aton(interface_ip))
        sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
        
        start_time = time.time()
        
        print(f"Monitoring RIP traffic for {duration} seconds...")
        
        while time.time() - start_time < duration:
            try:
                data, addr = sock.recvfrom(1024)
                self._analyze_packet(data, addr[0])
            except socket.timeout:
                continue
            except KeyboardInterrupt:
                break
        
        sock.close()
        return self.generate_report()
    
    def _analyze_packet(self, data: bytes, sender_ip: str):
        """Analyze RIP packet and update statistics."""
        if len(data) < 4:
            return
        
        command, version, domain = struct.unpack('!BBH', data[:4])
        self.statistics['packets_received'] += 1
        self.statistics['neighbors'].add(sender_ip)
        
        if command == 2:  # Response
            self.statistics['updates_received'][sender_ip] += 1
            routes = self._parse_routes(data[4:], version)
            
            for route in routes:
                route_key = f"{route['network']}/{route['mask']}"
                
                # Track route changes
                if route_key in self.last_update:
                    if self.last_update[route_key]['metric'] != route['metric']:
                        event = {
                            'timestamp': time.time(),
                            'route': route_key,
                            'old_metric': self.last_update[route_key]['metric'],
                            'new_metric': route['metric'],
                            'source': sender_ip
                        }
                        self.statistics['convergence_events'].append(event)
                
                self.last_update[route_key] = route
                self.route_history[route_key].append({
                    'timestamp': time.time(),
                    'metric': route['metric'],
                    'source': sender_ip
                })
                
                self.statistics['routes_learned'] += 1
    
    def _parse_routes(self, data: bytes, version: int) -> list:
        """Parse route entries from RIP packet."""
        routes = []
        offset = 0
        
        while offset + 20 <= len(data):
            route_data = data[offset:offset + 20]
            afi, tag, network, mask, next_hop, metric = struct.unpack('!HHIIIII', route_data)
            
            if afi == 2:  # IP
                route = {
                    'network': socket.inet_ntoa(struct.pack('!I', network)),
                    'mask': socket.inet_ntoa(struct.pack('!I', mask)),
                    'next_hop': socket.inet_ntoa(struct.pack('!I', next_hop)),
                    'metric': metric,
                    'tag': tag
                }
                routes.append(route)
            
            offset += 20
        
        return routes
    
    def generate_report(self) -> dict:
        """Generate monitoring report."""
        convergence_time = self._calculate_convergence_time()
        
        report = {
            'summary': {
                'monitoring_duration': time.time(),
                'total_packets': self.statistics['packets_received'],
                'unique_neighbors': len(self.statistics['neighbors']),
                'routes_learned': self.statistics['routes_learned'],
                'convergence_events': len(self.statistics['convergence_events']),
                'average_convergence_time': convergence_time
            },
            'neighbors': list(self.statistics['neighbors']),
            'convergence_events': self.statistics['convergence_events'][-10:],  # Last 10 events
            'route_stability': self._analyze_route_stability(),
            'recommendations': self._generate_recommendations()
        }
        
        return report
    
    def _calculate_convergence_time(self) -> float:
        """Calculate average convergence time."""
        if not self.statistics['convergence_events']:
            return 0
        
        convergence_times = []
        for event in self.statistics['convergence_events']:
            # Simple convergence time calculation
            convergence_times.append(30)  # Assuming 30s average
        
        return sum(convergence_times) / len(convergence_times)
    
    def _analyze_route_stability(self) -> dict:
        """Analyze route stability."""
        stable_routes = 0
        unstable_routes = 0
        
        for route_key, history in self.route_history.items():
            if len(history) == 1:
                stable_routes += 1
            else:
                unstable_routes += 1
        
        return {
            'stable_routes': stable_routes,
            'unstable_routes': unstable_routes,
            'stability_ratio': stable_routes / (stable_routes + unstable_routes) if (stable_routes + unstable_routes) > 0 else 0
        }
    
    def _generate_recommendations(self) -> list:
        """Generate optimization recommendations."""
        recommendations = []
        
        if len(self.statistics['convergence_events']) > 10:
            recommendations.append("High number of convergence events detected. Consider using triggered updates.")
        
        if len(self.statistics['neighbors']) > 5:
            recommendations.append("Large number of RIP neighbors. Consider migrating to OSPF or EIGRP.")
        
        stability = self._analyze_route_stability()
        if stability['stability_ratio'] < 0.8:
            recommendations.append("Route instability detected. Check for routing loops or metric issues.")
        
        return recommendations

# RIP Performance Optimization
def optimize_rip_timers(network_size: int, link_reliability: float) -> dict:
    """Calculate optimal RIP timers based on network characteristics."""
    
    base_update = 30
    base_invalid = 180
    base_holddown = 180
    base_flush = 240
    
    # Adjust for network size
    if network_size > 50:
        base_update *= 1.5
        base_invalid *= 1.5
        base_holddown *= 1.5
    
    # Adjust for link reliability
    if link_reliability < 0.95:
        base_invalid *= 1.2
        base_holddown *= 1.2
        base_flush *= 1.2
    
    return {
        'update_timer': int(base_update),
        'invalid_timer': int(base_invalid),
        'holddown_timer': int(base_holddown),
        'flush_timer': int(base_flush)
    }

# RIP to OSPF Migration Planning
def plan_rip_to_ospf_migration(rip_topology: dict) -> dict:
    """Plan migration from RIP to OSPF."""
    
    areas = {}
    backbone_routers = []
    
    # Analyze current topology
    for router, connections in rip_topology.items():
        # Determine area assignment based on hop count
        max_hops = max([conn['metric'] for conn in connections])
        
        if max_hops <= 2:
            area = "0.0.0.0"  # Backbone area
            backbone_routers.append(router)
        else:
            area = f"0.0.0.{len(areas) + 1}"
        
        areas[router] = area
    
    migration_plan = {
        'phase1': {
            'description': "Enable OSPF alongside RIP",
            'routers': list(rip_topology.keys()),
            'commands': [
                "router ospf 1",
                "passive-interface default",
                "no passive-interface <core-interfaces>"
            ]
        },
        'phase2': {
            'description': "Redistribute RIP into OSPF",
            'commands': [
                "router ospf 1",
                "redistribute rip metric 20"
            ]
        },
        'phase3': {
            'description': "Remove RIP configuration",
            'commands': [
                "no router rip",
                "no redistribute rip"
            ]
        },
        'areas': areas,
        'backbone_routers': backbone_routers
    }
    
    return migration_plan

# Usage Example
if __name__ == "__main__":
    # Monitor RIP network
    monitor = RIPMonitor()
    report = monitor.capture_rip_traffic("192.168.1.1", 300)
    
    print(json.dumps(report, indent=2))
    
    # Calculate optimal timers
    timers = optimize_rip_timers(network_size=25, link_reliability=0.98)
    print(f"Recommended timers: {timers}")`,
        explanation: "Advanced RIP features including debugging, monitoring, optimization, and migration planning."
      }
    ],
    relatedProtocols: ["ospf", "eigrp", "bgp", "isis", "static"],
    resources: [
      {
        title: "RFC 2453 - RIP Version 2",
        url: "https://tools.ietf.org/html/rfc2453",
        type: "RFC"
      },
      {
        title: "RFC 1058 - RIP Version 1",
        url: "https://tools.ietf.org/html/rfc1058",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Authentication mechanisms",
      "Route filtering",
      "Access control lists",
      "Update source verification",
      "DoS attack prevention",
      "Routing loops prevention"
    ]
};
