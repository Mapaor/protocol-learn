import { Protocol } from "../../types/protocol";

export const EIGRP: Protocol = {
    id: "eigrp",
    name: "EIGRP",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Enhanced Interior Gateway Routing Protocol - Cisco's advanced distance vector protocol",
    fullDescription: "EIGRP (Enhanced Interior Gateway Routing Protocol) is Cisco's proprietary advanced distance vector routing protocol that combines the advantages of link-state and distance vector protocols. It uses the Diffusing Update Algorithm (DUAL) to ensure loop-free paths and provides rapid convergence with minimal network overhead.",
    port: "88 (IP Protocol), UDP for Hello packets",
    advantages: [
      "Fast convergence",
      "Loop-free topology",
      "VLSM support",
      "Unequal cost load balancing",
      "Minimal bandwidth usage",
      "Classless routing",
      "Authentication support",
      "Scalable design"
    ],
    disadvantages: [
      "Cisco proprietary",
      "Complex configuration",
      "Memory intensive",
      "Limited vendor support",
      "Stuck-in-Active issues",
      "Requires careful planning"
    ],
    useCases: [
      "Enterprise networks",
      "Campus networks",
      "WAN connectivity",
      "Multi-protocol routing",
      "Large-scale LANs",
      "Branch office connections",
      "Data center interconnects",
      "Service provider networks",
      "Cisco-centric environments",
      "Mixed media networks",
      "Redundant topologies",
      "Load balancing scenarios"
    ],
    examples: [
      {
        title: "EIGRP Packet Types and Headers",
        code: `# EIGRP Packet Header Format
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Version (1)  |    Opcode (1) |           Checksum (2)        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            Flags (4)                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Sequence (4)                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      Acknowledgment (4)                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Virtual Router ID (2)                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      Autonomous System (2)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# EIGRP Packet Types (Opcode values)
1 = Update      - Routing table updates
2 = Request     - Request for specific routes  
3 = Query       - Route query (lost route)
4 = Reply       - Response to query
5 = Hello       - Neighbor discovery/keepalive
6 = IPX SAP     - IPX Service Advertisement
10 = SIA-Query  - Stuck-in-Active query
11 = SIA-Reply  - Stuck-in-Active reply

# EIGRP Header Flags
0x01 = INIT      - Initialization flag
0x02 = CR        - Conditional Receive
0x04 = RS        - Restart flag  
0x08 = EOT       - End of Table

# EIGRP TLV (Type-Length-Value) Format
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|             Type (2)          |           Length (2)          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             Value                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# EIGRP TLV Types
0x0001 = General Parameters TLV
0x0002 = Authentication TLV  
0x0003 = Sequence TLV
0x0004 = Software Version TLV
0x0005 = Next Multicast Sequence TLV
0x0006 = Peer Stub Info TLV
0x0007 = Peer Termination TLV

0x0102 = IPv4 Internal Route TLV
0x0103 = IPv4 External Route TLV
0x0402 = IPv6 Internal Route TLV
0x0403 = IPv6 External Route TLV

# IPv4 Internal Route TLV
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|             Type (2)          |           Length (2)          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Next Hop (4)                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                          Delay (4)                            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Bandwidth (4)                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| MTU (3)                       | Hop Count (1) |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| Reliability (1)| Load (1)     | Prefix Length | Destination   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        (variable)                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# EIGRP Metric Calculation
Metric = 256 * (K1*Bandwidth + (K2*Bandwidth)/(256-Load) + K3*Delay + K5/(Reliability+K4))

Default K values:
K1 = 1 (Bandwidth)
K2 = 0 (Load - not used by default)
K3 = 1 (Delay)  
K4 = 0 (Reliability - not used by default)
K5 = 0 (MTU - not used by default)

Simplified formula (default): Metric = 256 * (Bandwidth + Delay)

Where:
Bandwidth = 10^7 / minimum_bandwidth_in_kbps
Delay = sum_of_delays_in_microseconds / 10

# Hello Packet Parameters TLV
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|             Type (2)          |           Length (2)          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| K1 | K2 | K3 | K4 | K5 | K6 |     Hold Time (2)              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# EIGRP Neighbor States
0 = Down/Inactive
1 = Pending (waiting for Hello)
2 = Up (established neighbor)

# EIGRP Route States  
0 = Passive (stable)
1 = Active (computing route)
2 = Update (being updated)
3 = Query (querying neighbors)
4 = Reply (replying to query)
5 = SIA-Query (stuck in active query)
6 = SIA-Reply (stuck in active reply)`,
        explanation: "EIGRP packet structure, TLV formats, and metric calculation details."
      },
      {
        title: "EIGRP Configuration and Implementation",
        code: `# Basic EIGRP Configuration (Cisco)

# Enable EIGRP process
Router> enable
Router# configure terminal
Router(config)# router eigrp 100
Router(config-router)# network 192.168.1.0 0.0.0.255
Router(config-router)# network 192.168.2.0 0.0.0.255
Router(config-router)# network 10.0.0.0 0.255.255.255
Router(config-router)# no auto-summary
Router(config-router)# exit

# Interface-specific EIGRP configuration
Router(config)# interface FastEthernet0/0
Router(config-if)# ip summary-address eigrp 100 192.168.0.0 255.255.252.0
Router(config-if)# ip bandwidth-percent eigrp 100 50
Router(config-if)# ip hello-interval eigrp 100 60
Router(config-if)# ip hold-time eigrp 100 180
Router(config-if)# exit

# EIGRP Authentication (MD5)
Router(config)# key chain EIGRP-KEYS
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string MySecretKey
Router(config-keychain-key)# exit
Router(config-keychain)# exit

Router(config)# interface FastEthernet0/0
Router(config-if)# ip authentication mode eigrp 100 md5
Router(config-if)# ip authentication key-chain eigrp 100 EIGRP-KEYS
Router(config-if)# exit

# EIGRP Load Balancing
Router(config)# router eigrp 100
Router(config-router)# maximum-paths 4
Router(config-router)# variance 2
Router(config-router)# exit

# EIGRP Stub Configuration
Router(config)# router eigrp 100
Router(config-router)# eigrp stub connected summary
Router(config-router)# exit

# Route Filtering
Router(config)# access-list 10 permit 192.168.1.0 0.0.0.255
Router(config)# router eigrp 100
Router(config-router)# distribute-list 10 out FastEthernet0/1
Router(config-router)# exit

# Python EIGRP Implementation (Simplified)
import socket
import struct
import time
import hashlib
import threading
from typing import Dict, List, Tuple
from enum import Enum

class EIGRPOpcode(Enum):
    UPDATE = 1
    REQUEST = 2
    QUERY = 3
    REPLY = 4
    HELLO = 5
    SIA_QUERY = 10
    SIA_REPLY = 11

class EIGRPTLVType(Enum):
    PARAMETERS = 0x0001
    AUTHENTICATION = 0x0002
    SEQUENCE = 0x0003
    SOFTWARE_VERSION = 0x0004
    IPV4_INTERNAL = 0x0102
    IPV4_EXTERNAL = 0x0103

class EIGRPPacket:
    def __init__(self, opcode: EIGRPOpcode, asn: int = 100):
        self.version = 2
        self.opcode = opcode
        self.checksum = 0
        self.flags = 0
        self.sequence = 0
        self.acknowledgment = 0
        self.virtual_router_id = 0
        self.autonomous_system = asn
        self.tlvs = []
    
    def add_tlv(self, tlv_type: EIGRPTLVType, data: bytes):
        """Add TLV to packet."""
        tlv = {
            'type': tlv_type.value,
            'length': len(data) + 4,
            'data': data
        }
        self.tlvs.append(tlv)
    
    def to_bytes(self) -> bytes:
        """Convert packet to binary format."""
        # Pack header (20 bytes)
        header = struct.pack('!BBHIIIHH',
            self.version,
            self.opcode.value,
            0,  # Checksum placeholder
            self.flags,
            self.sequence,
            self.acknowledgment,
            self.virtual_router_id,
            self.autonomous_system
        )
        
        # Pack TLVs
        tlv_data = b''
        for tlv in self.tlvs:
            tlv_header = struct.pack('!HH', tlv['type'], tlv['length'])
            tlv_data += tlv_header + tlv['data']
        
        packet = header + tlv_data
        
        # Calculate checksum
        checksum = self._calculate_checksum(packet)
        
        # Update checksum in header
        packet = packet[:2] + struct.pack('!H', checksum) + packet[4:]
        
        return packet
    
    def _calculate_checksum(self, data: bytes) -> int:
        """Calculate Internet checksum."""
        checksum = 0
        
        # Ensure even length
        if len(data) % 2:
            data += b'\\x00'
        
        # Sum all 16-bit words
        for i in range(0, len(data), 2):
            word = struct.unpack('!H', data[i:i+2])[0]
            checksum += word
            checksum = (checksum & 0xFFFF) + (checksum >> 16)
        
        return (~checksum) & 0xFFFF

class EIGRPNeighbor:
    def __init__(self, ip: str, interface: str):
        self.ip = ip
        self.interface = interface
        self.sequence_number = 0
        self.last_hello = time.time()
        self.hold_time = 15
        self.srtt = 0  # Smooth Round Trip Time
        self.rto = 5000  # Retransmission Timeout (ms)
        self.q_count = 0  # Queue count
        self.uptime = time.time()
        self.version = 2
        self.state = "Up"
    
    def is_alive(self) -> bool:
        """Check if neighbor is still alive."""
        return time.time() - self.last_hello < self.hold_time
    
    def update_srtt(self, rtt: float):
        """Update smooth round trip time."""
        if self.srtt == 0:
            self.srtt = rtt
        else:
            self.srtt = (self.srtt * 7 + rtt) / 8
        
        # Update RTO
        self.rto = max(1000, min(5000, self.srtt * 3))

class EIGRPRoute:
    def __init__(self, network: str, mask: str, next_hop: str, 
                 delay: int, bandwidth: int, reliability: int = 255, 
                 load: int = 1, mtu: int = 1500, hop_count: int = 0):
        self.network = network
        self.mask = mask
        self.next_hop = next_hop
        self.delay = delay
        self.bandwidth = bandwidth
        self.reliability = reliability
        self.load = load
        self.mtu = mtu
        self.hop_count = hop_count
        self.feasible_distance = 0
        self.advertised_distance = 0
        self.state = "Passive"
        self.timestamp = time.time()
    
    def calculate_metric(self, k1=1, k2=0, k3=1, k4=0, k5=0) -> int:
        """Calculate EIGRP composite metric."""
        if k5 == 0:
            metric = k1 * self.bandwidth + k3 * self.delay
        else:
            metric = (k1 * self.bandwidth + k3 * self.delay) * k5 / (self.reliability + k4)
        
        if k2 != 0:
            metric += k2 * self.bandwidth / (256 - self.load)
        
        return int(metric * 256)
    
    def to_tlv_data(self) -> bytes:
        """Convert route to IPv4 Internal TLV data."""
        next_hop_bin = socket.inet_aton(self.next_hop)
        network_bin = socket.inet_aton(self.network)
        
        # Calculate prefix length
        mask_int = struct.unpack('!I', socket.inet_aton(self.mask))[0]
        prefix_length = bin(mask_int).count('1')
        
        # Pack route data
        data = struct.pack('!IIIIBBBBB',
            struct.unpack('!I', next_hop_bin)[0],
            self.delay,
            self.bandwidth,
            (self.mtu << 8) | self.hop_count,
            self.reliability,
            self.load,
            prefix_length
        ) + network_bin[:((prefix_length + 7) // 8)]
        
        return data

class EIGRPDaemon:
    def __init__(self, router_id: str, asn: int = 100):
        self.router_id = router_id
        self.asn = asn
        self.neighbors: Dict[str, EIGRPNeighbor] = {}
        self.topology_table: Dict[str, List[EIGRPRoute]] = {}
        self.routing_table: Dict[str, EIGRPRoute] = {}
        self.interfaces = {}
        self.sequence_number = 1
        self.running = False
        
        # EIGRP K values
        self.k1 = 1  # Bandwidth
        self.k2 = 0  # Load
        self.k3 = 1  # Delay
        self.k4 = 0  # Reliability
        self.k5 = 0  # MTU
        
        # Timers
        self.hello_interval = 5
        self.hold_time = 15
    
    def add_interface(self, interface: str, ip: str, mask: str, 
                     delay: int = 1000, bandwidth: int = 10000):
        """Add network interface to EIGRP process."""
        self.interfaces[interface] = {
            'ip': ip,
            'mask': mask,
            'delay': delay,
            'bandwidth': bandwidth,
            'socket': None
        }
        
        # Add directly connected route
        route = EIGRPRoute(ip, mask, "0.0.0.0", delay, bandwidth)
        route.feasible_distance = 0
        route.advertised_distance = 0
        
        network_key = f"{ip}/{mask}"
        if network_key not in self.topology_table:
            self.topology_table[network_key] = []
        self.topology_table[network_key].append(route)
        self.routing_table[network_key] = route
    
    def start(self):
        """Start EIGRP daemon."""
        self.running = True
        
        # Create sockets for each interface
        for interface, config in self.interfaces.items():
            sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, 88)
            sock.bind((config['ip'], 0))
            config['socket'] = sock
        
        # Start threads
        threading.Thread(target=self._hello_loop, daemon=True).start()
        threading.Thread(target=self._receive_loop, daemon=True).start()
        threading.Thread(target=self._neighbor_maintenance, daemon=True).start()
    
    def _hello_loop(self):
        """Send periodic Hello packets."""
        while self.running:
            for interface, config in self.interfaces.items():
                self._send_hello(interface)
            time.sleep(self.hello_interval)
    
    def _send_hello(self, interface: str):
        """Send Hello packet on interface."""
        config = self.interfaces[interface]
        
        # Create Hello packet
        hello = EIGRPPacket(EIGRPOpcode.HELLO, self.asn)
        
        # Add Parameters TLV
        params_data = struct.pack('!BBBBBBH',
            self.k1, self.k2, self.k3, self.k4, self.k5, 0, self.hold_time)
        hello.add_tlv(EIGRPTLVType.PARAMETERS, params_data)
        
        # Add Software Version TLV
        version_data = struct.pack('!HH', 12, 4)  # IOS version
        hello.add_tlv(EIGRPTLVType.SOFTWARE_VERSION, version_data)
        
        packet_data = hello.to_bytes()
        
        try:
            # Send to multicast address 224.0.0.10
            config['socket'].sendto(packet_data, ("224.0.0.10", 0))
        except Exception as e:
            print(f"Failed to send Hello on {interface}: {e}")
    
    def _receive_loop(self):
        """Receive and process EIGRP packets."""
        while self.running:
            for interface, config in self.interfaces.items():
                try:
                    data, addr = config['socket'].recvfrom(1500)
                    self._process_packet(data, addr[0], interface)
                except Exception:
                    continue
    
    def _process_packet(self, data: bytes, sender_ip: str, interface: str):
        """Process received EIGRP packet."""
        if len(data) < 20:
            return
        
        # Parse header
        header = struct.unpack('!BBHIIIHH', data[:20])
        version, opcode, checksum, flags, sequence, ack, vrid, asn = header
        
        if version != 2 or asn != self.asn:
            return
        
        # Update or create neighbor
        if sender_ip not in self.neighbors:
            self.neighbors[sender_ip] = EIGRPNeighbor(sender_ip, interface)
            print(f"New EIGRP neighbor: {sender_ip} on {interface}")
        
        neighbor = self.neighbors[sender_ip]
        neighbor.last_hello = time.time()
        neighbor.sequence_number = sequence
        
        # Process based on opcode
        if opcode == EIGRPOpcode.HELLO.value:
            self._process_hello(data[20:], neighbor)
        elif opcode == EIGRPOpcode.UPDATE.value:
            self._process_update(data[20:], neighbor)
        elif opcode == EIGRPOpcode.QUERY.value:
            self._process_query(data[20:], neighbor)
        elif opcode == EIGRPOpcode.REPLY.value:
            self._process_reply(data[20:], neighbor)
    
    def _process_hello(self, tlv_data: bytes, neighbor: EIGRPNeighbor):
        """Process Hello packet TLVs."""
        offset = 0
        while offset < len(tlv_data):
            if offset + 4 > len(tlv_data):
                break
            
            tlv_type, tlv_length = struct.unpack('!HH', tlv_data[offset:offset+4])
            
            if tlv_type == EIGRPTLVType.PARAMETERS.value:
                if tlv_length >= 12:
                    params = struct.unpack('!BBBBBBH', tlv_data[offset+4:offset+12])
                    neighbor.hold_time = params[6]
            
            offset += tlv_length
    
    def _process_update(self, tlv_data: bytes, neighbor: EIGRPNeighbor):
        """Process Update packet."""
        print(f"Processing UPDATE from {neighbor.ip}")
        # Parse route TLVs and update topology table
        self._parse_route_tlvs(tlv_data, neighbor)
        self._run_dual()
    
    def _process_query(self, tlv_data: bytes, neighbor: EIGRPNeighbor):
        """Process Query packet."""
        print(f"Processing QUERY from {neighbor.ip}")
        # Send Reply with current route information
        self._send_reply(neighbor)
    
    def _process_reply(self, tlv_data: bytes, neighbor: EIGRPNeighbor):
        """Process Reply packet."""
        print(f"Processing REPLY from {neighbor.ip}")
        self._parse_route_tlvs(tlv_data, neighbor)
        self._run_dual()
    
    def _parse_route_tlvs(self, tlv_data: bytes, neighbor: EIGRPNeighbor):
        """Parse route TLVs from packet."""
        offset = 0
        while offset < len(tlv_data):
            if offset + 4 > len(tlv_data):
                break
            
            tlv_type, tlv_length = struct.unpack('!HH', tlv_data[offset:offset+4])
            
            if tlv_type == EIGRPTLVType.IPV4_INTERNAL.value:
                self._parse_ipv4_route(tlv_data[offset+4:offset+tlv_length], neighbor)
            
            offset += tlv_length
    
    def _parse_ipv4_route(self, route_data: bytes, neighbor: EIGRPNeighbor):
        """Parse IPv4 route from TLV data."""
        if len(route_data) < 17:
            return
        
        # Parse route fields
        fields = struct.unpack('!IIIIBBBBB', route_data[:17])
        next_hop, delay, bandwidth, mtu_hop, reliability, load, prefix_len = fields[:7]
        
        # Extract network address
        network_bytes = route_data[17:17 + ((prefix_len + 7) // 8)]
        network_bytes += b'\\x00' * (4 - len(network_bytes))  # Pad to 4 bytes
        network = socket.inet_ntoa(network_bytes[:4])
        
        # Calculate subnet mask
        mask_int = (0xFFFFFFFF << (32 - prefix_len)) & 0xFFFFFFFF
        mask = socket.inet_ntoa(struct.pack('!I', mask_int))
        
        # Create route object
        route = EIGRPRoute(network, mask, neighbor.ip, delay, bandwidth, 
                          reliability, load, mtu_hop >> 8, mtu_hop & 0xFF)
        route.advertised_distance = route.calculate_metric(self.k1, self.k2, self.k3, self.k4, self.k5)
        
        # Add to topology table
        network_key = f"{network}/{mask}"
        if network_key not in self.topology_table:
            self.topology_table[network_key] = []
        
        # Check if route already exists from this neighbor
        existing_route = None
        for r in self.topology_table[network_key]:
            if r.next_hop == neighbor.ip:
                existing_route = r
                break
        
        if existing_route:
            self.topology_table[network_key].remove(existing_route)
        
        self.topology_table[network_key].append(route)
    
    def _run_dual(self):
        """Run DUAL algorithm to select best routes."""
        for network_key, routes in self.topology_table.items():
            if not routes:
                continue
            
            # Find feasible successors
            best_ad = min(route.advertised_distance for route in routes)
            feasible_routes = []
            
            for route in routes:
                route.feasible_distance = route.advertised_distance
                if route.advertised_distance <= best_ad:
                    feasible_routes.append(route)
            
            if feasible_routes:
                # Select best route (lowest FD)
                best_route = min(feasible_routes, key=lambda r: r.feasible_distance)
                self.routing_table[network_key] = best_route
                best_route.state = "Passive"
    
    def _send_reply(self, neighbor: EIGRPNeighbor):
        """Send Reply packet to neighbor."""
        reply = EIGRPPacket(EIGRPOpcode.REPLY, self.asn)
        reply.sequence = self._get_next_sequence()
        reply.acknowledgment = neighbor.sequence_number
        
        # Add current routes
        for route in self.routing_table.values():
            route_data = route.to_tlv_data()
            reply.add_tlv(EIGRPTLVType.IPV4_INTERNAL, route_data)
        
        self._send_packet(reply, neighbor.ip)
    
    def _send_packet(self, packet: EIGRPPacket, dest_ip: str):
        """Send EIGRP packet to destination."""
        packet_data = packet.to_bytes()
        
        # Find appropriate interface
        for interface, config in self.interfaces.items():
            try:
                config['socket'].sendto(packet_data, (dest_ip, 0))
                break
            except Exception as e:
                print(f"Failed to send packet to {dest_ip}: {e}")
    
    def _get_next_sequence(self) -> int:
        """Get next sequence number."""
        seq = self.sequence_number
        self.sequence_number += 1
        return seq
    
    def _neighbor_maintenance(self):
        """Maintain neighbor relationships."""
        while self.running:
            time.sleep(5)
            
            dead_neighbors = []
            for ip, neighbor in self.neighbors.items():
                if not neighbor.is_alive():
                    dead_neighbors.append(ip)
            
            for ip in dead_neighbors:
                print(f"Neighbor {ip} timed out")
                del self.neighbors[ip]
                # Remove routes learned from dead neighbor
                self._remove_neighbor_routes(ip)
    
    def _remove_neighbor_routes(self, neighbor_ip: str):
        """Remove routes learned from a specific neighbor."""
        for network_key, routes in self.topology_table.items():
            routes[:] = [r for r in routes if r.next_hop != neighbor_ip]
        
        self._run_dual()  # Recompute best paths
    
    def show_neighbors(self):
        """Display EIGRP neighbors."""
        print("\\nEIGRP Neighbors:")
        print("IP Address".ljust(15) + "Interface".ljust(12) + "Hold".ljust(6) + "Uptime".ljust(10) + "SRTT".ljust(8) + "RTO".ljust(6) + "Q Cnt")
        print("-" * 70)
        
        for neighbor in self.neighbors.values():
            uptime = int(time.time() - neighbor.uptime)
            hold = max(0, int(neighbor.hold_time - (time.time() - neighbor.last_hello)))
            print(f"{neighbor.ip:<15} {neighbor.interface:<12} {hold:<6} {uptime:<10} {neighbor.srtt:<8.0f} {neighbor.rto:<6.0f} {neighbor.q_count}")
    
    def show_topology(self):
        """Display EIGRP topology table."""
        print("\\nEIGRP Topology Table:")
        print("Network/Mask".ljust(18) + "Next Hop".ljust(15) + "FD".ljust(10) + "AD".ljust(10) + "State")
        print("-" * 70)
        
        for network_key, routes in self.topology_table.items():
            for route in routes:
                fd = route.feasible_distance
                ad = route.advertised_distance
                state = route.state
                print(f"{network_key:<18} {route.next_hop:<15} {fd:<10} {ad:<10} {state}")
    
    def stop(self):
        """Stop EIGRP daemon."""
        self.running = False
        for interface, config in self.interfaces.items():
            if config['socket']:
                config['socket'].close()

# Example usage
if __name__ == "__main__":
    # Create EIGRP daemon
    eigrp = EIGRPDaemon("192.168.1.1", asn=100)
    
    # Add interfaces
    eigrp.add_interface("eth0", "192.168.1.1", "255.255.255.0", delay=1000, bandwidth=100000)
    eigrp.add_interface("eth1", "10.0.0.1", "255.255.255.0", delay=2000, bandwidth=10000)
    
    # Start daemon
    eigrp.start()
    
    try:
        while True:
            time.sleep(30)
            eigrp.show_neighbors()
            eigrp.show_topology()
    except KeyboardInterrupt:
        eigrp.stop()`,
        explanation: "Complete EIGRP configuration and Python implementation with DUAL algorithm."
      },
      {
        title: "EIGRP Advanced Features and Troubleshooting",
        code: `# Advanced EIGRP Configuration

# Named EIGRP Configuration (Newer IOS versions)
Router(config)# router eigrp MYEIGRP
Router(config-router)# address-family ipv4 unicast autonomous-system 100
Router(config-router-af)# af-interface default
Router(config-router-af-interface)# hello-interval 10
Router(config-router-af-interface)# hold-time 30
Router(config-router-af-interface)# exit-af-interface
Router(config-router-af)# af-interface FastEthernet0/0
Router(config-router-af-interface)# passive-interface
Router(config-router-af-interface)# exit-af-interface
Router(config-router-af)# network 192.168.1.0 0.0.0.255
Router(config-router-af)# network 10.0.0.0 0.255.255.255
Router(config-router-af)# exit-address-family

# EIGRP Over Frame Relay Configuration
Router(config)# interface Serial0/0
Router(config-if)# encapsulation frame-relay
Router(config-if)# no frame-relay inverse-arp
Router(config-if)# ip address 10.1.1.1 255.255.255.0
Router(config-if)# frame-relay map ip 10.1.1.2 200 broadcast
Router(config-if)# frame-relay map ip 10.1.1.3 300 broadcast
Router(config-if)# no ip split-horizon eigrp 100
Router(config-if)# ip bandwidth-percent eigrp 100 50
Router(config-if)# exit

# EIGRP Graceful Restart
Router(config)# router eigrp 100
Router(config-router)# nsf
Router(config-router)# exit

# EIGRP BFD (Bidirectional Forwarding Detection)
Router(config)# router eigrp 100
Router(config-router)# bfd all-interfaces
Router(config-router)# exit

Router(config)# interface FastEthernet0/0
Router(config-if)# bfd interval 50 min_rx 50 multiplier 3
Router(config-if)# exit

# EIGRP Wide Metrics (for higher bandwidth interfaces)
Router(config)# router eigrp 100
Router(config-router)# metric weights 0 0 0 1 0 0 0
Router(config-router)# exit

# EIGRP Troubleshooting Commands
Router# show ip eigrp neighbors
Router# show ip eigrp neighbors detail
Router# show ip eigrp topology
Router# show ip eigrp topology all-links
Router# show ip eigrp topology active
Router# show ip eigrp interfaces
Router# show ip eigrp interfaces detail
Router# show ip eigrp traffic
Router# show ip route eigrp

# Debug Commands
Router# debug ip eigrp
Router# debug ip eigrp neighbor
Router# debug ip eigrp packet
Router# debug ip eigrp fsm
Router# debug eigrp packet hello

# Example Debug Output
EIGRP: Received HELLO on FastEthernet0/0 nbr 192.168.1.2
  AS 100, Flags 0x0:(NONE), Seq 0/0 interfaceQ 0/0 iidbQ 0/0 peerQ 0/0
EIGRP: Neighbor 192.168.1.2 not found on FastEthernet0/0
EIGRP: Enqueueing HELLO on FastEthernet0/0 nbr 192.168.1.2 iidbQ 0/1 peerQ 0/0 serno 1-1

# Python EIGRP Analysis and Monitoring Tool
import re
import subprocess
import json
from datetime import datetime
from typing import Dict, List, Any

class EIGRPAnalyzer:
    def __init__(self, device_ip: str, username: str, password: str):
        self.device_ip = device_ip
        self.username = username
        self.password = password
        self.eigrp_stats = {}
    
    def collect_eigrp_data(self) -> Dict[str, Any]:
        """Collect EIGRP data from network device."""
        commands = [
            "show ip eigrp neighbors",
            "show ip eigrp topology",
            "show ip eigrp interfaces",
            "show ip eigrp traffic"
        ]
        
        results = {}
        for cmd in commands:
            try:
                # In real implementation, use SSH/SNMP to get data
                output = self._execute_command(cmd)
                results[cmd] = output
            except Exception as e:
                print(f"Failed to execute {cmd}: {e}")
                results[cmd] = ""
        
        return self._parse_eigrp_data(results)
    
    def _execute_command(self, command: str) -> str:
        """Execute command on network device (placeholder)."""
        # Placeholder - in real implementation use paramiko SSH or SNMP
        return f"Mock output for: {command}"
    
    def _parse_eigrp_data(self, raw_data: Dict[str, str]) -> Dict[str, Any]:
        """Parse EIGRP command outputs."""
        parsed = {
            'neighbors': self._parse_neighbors(raw_data.get("show ip eigrp neighbors", "")),
            'topology': self._parse_topology(raw_data.get("show ip eigrp topology", "")),
            'interfaces': self._parse_interfaces(raw_data.get("show ip eigrp interfaces", "")),
            'traffic': self._parse_traffic(raw_data.get("show ip eigrp traffic", ""))
        }
        return parsed
    
    def _parse_neighbors(self, output: str) -> List[Dict]:
        """Parse EIGRP neighbors output."""
        neighbors = []
        lines = output.split('\\n')
        
        for line in lines:
            if re.match(r'^\\d+\\.\\d+\\.\\d+\\.\\d+', line):
                parts = line.split()
                if len(parts) >= 5:
                    neighbor = {
                        'ip': parts[0],
                        'interface': parts[1],
                        'hold_time': int(parts[2]) if parts[2].isdigit() else 0,
                        'uptime': parts[3],
                        'srtt': int(parts[4]) if parts[4].isdigit() else 0,
                        'rto': int(parts[5]) if len(parts) > 5 and parts[5].isdigit() else 0,
                        'q_count': int(parts[6]) if len(parts) > 6 and parts[6].isdigit() else 0
                    }
                    neighbors.append(neighbor)
        
        return neighbors
    
    def _parse_topology(self, output: str) -> List[Dict]:
        """Parse EIGRP topology table output."""
        routes = []
        lines = output.split('\\n')
        
        for line in lines:
            if 'via' in line:
                # Parse topology entry
                match = re.search(r'P\\s+([\\d\\.]+/\\d+),.*via\\s+([\\d\\.]+).*\\[(\\d+)/(\\d+)\\]', line)
                if match:
                    route = {
                        'network': match.group(1),
                        'next_hop': match.group(2),
                        'feasible_distance': int(match.group(3)),
                        'advertised_distance': int(match.group(4)),
                        'state': 'Passive' if line.strip().startswith('P') else 'Active'
                    }
                    routes.append(route)
        
        return routes
    
    def _parse_interfaces(self, output: str) -> List[Dict]:
        """Parse EIGRP interfaces output."""
        interfaces = []
        lines = output.split('\\n')
        
        for line in lines:
            if re.match(r'^[A-Za-z]', line):
                parts = line.split()
                if len(parts) >= 4:
                    interface = {
                        'name': parts[0],
                        'peers': int(parts[1]) if parts[1].isdigit() else 0,
                        'xmit_queue': parts[2],
                        'mean_srtt': int(parts[3]) if parts[3].isdigit() else 0,
                        'pacing_time': parts[4] if len(parts) > 4 else "0"
                    }
                    interfaces.append(interface)
        
        return interfaces
    
    def _parse_traffic(self, output: str) -> Dict:
        """Parse EIGRP traffic statistics."""
        traffic = {}
        lines = output.split('\\n')
        
        for line in lines:
            if 'Hellos sent/received' in line:
                match = re.search(r'(\\d+)/(\\d+)', line)
                if match:
                    traffic['hellos_sent'] = int(match.group(1))
                    traffic['hellos_received'] = int(match.group(2))
            elif 'Updates sent/received' in line:
                match = re.search(r'(\\d+)/(\\d+)', line)
                if match:
                    traffic['updates_sent'] = int(match.group(1))
                    traffic['updates_received'] = int(match.group(2))
            elif 'Queries sent/received' in line:
                match = re.search(r'(\\d+)/(\\d+)', line)
                if match:
                    traffic['queries_sent'] = int(match.group(1))
                    traffic['queries_received'] = int(match.group(2))
        
        return traffic
    
    def analyze_convergence(self, topology_snapshots: List[Dict]) -> Dict:
        """Analyze EIGRP convergence behavior."""
        if len(topology_snapshots) < 2:
            return {'convergence_time': 0, 'route_changes': 0}
        
        route_changes = 0
        first_snapshot = topology_snapshots[0]
        last_snapshot = topology_snapshots[-1]
        
        # Compare route states
        for route in first_snapshot.get('topology', []):
            network = route['network']
            
            # Find corresponding route in last snapshot
            for last_route in last_snapshot.get('topology', []):
                if last_route['network'] == network:
                    if (route['feasible_distance'] != last_route['feasible_distance'] or
                        route['next_hop'] != last_route['next_hop']):
                        route_changes += 1
                    break
        
        # Estimate convergence time (simplified)
        convergence_time = len(topology_snapshots) * 5  # 5 seconds per snapshot
        
        return {
            'convergence_time': convergence_time,
            'route_changes': route_changes,
            'stability_score': max(0, 100 - (route_changes * 10))
        }
    
    def detect_sia_routes(self, topology: List[Dict]) -> List[Dict]:
        """Detect potential Stuck-in-Active routes."""
        sia_candidates = []
        
        for route in topology:
            if route.get('state') == 'Active':
                sia_candidates.append({
                    'network': route['network'],
                    'next_hop': route['next_hop'],
                    'risk_level': 'High' if route['feasible_distance'] > 100000 else 'Medium'
                })
        
        return sia_candidates
    
    def optimize_eigrp_timers(self, neighbors: List[Dict], 
                            link_types: Dict[str, str]) -> Dict[str, Dict]:
        """Suggest optimal EIGRP timers based on link types."""
        recommendations = {}
        
        for neighbor in neighbors:
            interface = neighbor['interface']
            link_type = link_types.get(interface, 'ethernet')
            
            if link_type == 'satellite':
                recommendations[interface] = {
                    'hello_interval': 60,
                    'hold_time': 180,
                    'reason': 'High latency satellite link'
                }
            elif link_type == 'serial':
                recommendations[interface] = {
                    'hello_interval': 60,
                    'hold_time': 180,
                    'reason': 'WAN serial link'
                }
            elif neighbor['srtt'] > 1000:  # High RTT
                recommendations[interface] = {
                    'hello_interval': 30,
                    'hold_time': 90,
                    'reason': 'High RTT detected'
                }
            else:
                recommendations[interface] = {
                    'hello_interval': 5,
                    'hold_time': 15,
                    'reason': 'Standard LAN timers'
                }
        
        return recommendations
    
    def generate_health_report(self, eigrp_data: Dict) -> Dict:
        """Generate EIGRP health report."""
        neighbors = eigrp_data.get('neighbors', [])
        topology = eigrp_data.get('topology', [])
        traffic = eigrp_data.get('traffic', {})
        
        # Calculate health metrics
        total_neighbors = len(neighbors)
        active_routes = len([r for r in topology if r.get('state') == 'Active'])
        passive_routes = len([r for r in topology if r.get('state') == 'Passive'])
        
        # Neighbor health
        unstable_neighbors = len([n for n in neighbors if n.get('hold_time', 0) < 5])
        
        # Traffic analysis
        hello_ratio = 0
        if traffic.get('hellos_sent', 0) > 0:
            hello_ratio = traffic.get('hellos_received', 0) / traffic['hellos_sent']
        
        health_score = 100
        issues = []
        
        if active_routes > 0:
            health_score -= active_routes * 10
            issues.append(f"{active_routes} routes in Active state")
        
        if unstable_neighbors > 0:
            health_score -= unstable_neighbors * 15
            issues.append(f"{unstable_neighbors} neighbors with low hold time")
        
        if hello_ratio < 0.8:
            health_score -= 20
            issues.append("Poor Hello packet reception ratio")
        
        if total_neighbors == 0:
            health_score = 0
            issues.append("No EIGRP neighbors detected")
        
        health_score = max(0, health_score)
        
        return {
            'overall_health': health_score,
            'total_neighbors': total_neighbors,
            'active_routes': active_routes,
            'passive_routes': passive_routes,
            'issues': issues,
            'recommendations': self._generate_recommendations(eigrp_data)
        }
    
    def _generate_recommendations(self, eigrp_data: Dict) -> List[str]:
        """Generate optimization recommendations."""
        recommendations = []
        neighbors = eigrp_data.get('neighbors', [])
        topology = eigrp_data.get('topology', [])
        
        if len([r for r in topology if r.get('state') == 'Active']) > 0:
            recommendations.append("Investigate Active routes - possible SIA condition")
        
        if len(neighbors) > 50:
            recommendations.append("Consider EIGRP summarization to reduce neighbor count")
        
        high_metric_routes = [r for r in topology if r.get('feasible_distance', 0) > 1000000]
        if high_metric_routes:
            recommendations.append("Review bandwidth/delay values for high-metric routes")
        
        return recommendations

# EIGRP Security Best Practices
eigrp_security_config = '''
# EIGRP MD5 Authentication
Router(config)# key chain EIGRP_AUTH
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string YourStrongPassword123
Router(config-keychain-key)# accept-lifetime 00:00:00 Jan 1 2024 infinite
Router(config-keychain-key)# send-lifetime 00:00:00 Jan 1 2024 infinite
Router(config-keychain-key)# exit
Router(config-keychain)# exit

Router(config)# interface range FastEthernet0/0-1
Router(config-if-range)# ip authentication mode eigrp 100 md5
Router(config-if-range)# ip authentication key-chain eigrp 100 EIGRP_AUTH
Router(config-if-range)# exit

# EIGRP Route Filtering
Router(config)# ip prefix-list EIGRP_FILTER seq 10 deny 192.168.100.0/24
Router(config)# ip prefix-list EIGRP_FILTER seq 20 permit 0.0.0.0/0 le 32

Router(config)# router eigrp 100
Router(config-router)# distribute-list prefix EIGRP_FILTER in
Router(config-router)# exit

# EIGRP Passive Interfaces (Security)
Router(config)# router eigrp 100
Router(config-router)# passive-interface default
Router(config-router)# no passive-interface FastEthernet0/0
Router(config-router)# no passive-interface FastEthernet0/1
Router(config-router)# exit

# BFD for Fast Failure Detection
Router(config)# interface FastEthernet0/0
Router(config-if)# bfd interval 100 min_rx 100 multiplier 3
Router(config-if)# exit

Router(config)# router eigrp 100
Router(config-router)# bfd interface FastEthernet0/0
Router(config-router)# exit
'''

# Example Usage
if __name__ == "__main__":
    analyzer = EIGRPAnalyzer("192.168.1.1", "admin", "password")
    eigrp_data = analyzer.collect_eigrp_data()
    
    health_report = analyzer.generate_health_report(eigrp_data)
    print("EIGRP Health Report:")
    print(json.dumps(health_report, indent=2))
    
    sia_routes = analyzer.detect_sia_routes(eigrp_data.get('topology', []))
    if sia_routes:
        print("\\nPotential SIA Routes:")
        for route in sia_routes:
            print(f"  {route['network']} - Risk: {route['risk_level']}")`,
        explanation: "Advanced EIGRP features, troubleshooting tools, and security configurations."
      }
    ],
    relatedProtocols: ["ospf", "rip", "bgp", "isis", "pim"],
    resources: [
      {
        title: "RFC 7868 - EIGRP Information Model",
        url: "https://tools.ietf.org/html/rfc7868",
        type: "RFC"
      },
      {
        title: "Cisco EIGRP Configuration Guide",
        url: "https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/13669-1.html",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "MD5 authentication",
      "Route filtering",
      "Passive interfaces",
      "Neighbor authentication",
      "DoS attack prevention",
      "Split horizon enforcement"
    ]
};
