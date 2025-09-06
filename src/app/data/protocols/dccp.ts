import { Protocol } from "../../types/protocol";

export const DCCP: Protocol = {
    id: "dccp",
    name: "DCCP",
    category: "Transport",
    difficulty: "Advanced",
    shortDescription: "DCCP - Datagram Congestion Control Protocol",
    fullDescription: "Datagram Congestion Control Protocol (DCCP) is a transport protocol that provides bidirectional unicast connections of congestion-controlled unreliable datagrams. DCCP combines the efficiency of UDP with the congestion control mechanisms of TCP, making it suitable for applications that need timely delivery over reliability.",
    port: "Variable (application-specific)",
    advantages: [
      "Congestion control for unreliable delivery",
      "Lower latency than TCP",
      "Built-in flow control",
      "Multiple congestion control algorithms",
      "Connection-oriented unreliable service",
      "Partial checksum coverage",
      "Explicit congestion notification",
      "Suitable for real-time applications"
    ],
    disadvantages: [
      "Limited OS support",
      "Complex implementation",
      "No reliability guarantees",
      "Less mature than TCP/UDP",
      "NAT traversal issues",
      "Application complexity",
      "Limited debugging tools"
    ],
    useCases: [
      "Video streaming applications",
      "Online gaming",
      "VoIP communications",
      "Real-time data transmission",
      "Live broadcasting",
      "Interactive multimedia",
      "Time-sensitive IoT data",
      "Financial trading systems",
      "Video conferencing",
      "Live sports streaming",
      "Remote desktop protocols",
      "Sensor networks"
    ],
    examples: [
      {
        title: "DCCP Packet Structure and Header Format",
        code: `# DCCP Header Format (RFC 4340)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |           Dest Port           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data Offset  | CCVal | CsCov |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Res       | Type  |X|     |          Sequence Number      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Sequence Number (continued)                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# Extended Sequence Numbers (when X=1)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                Acknowledgment Number (continued)               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# DCCP Packet Types
REQUEST = 0        # Connection initiation
RESPONSE = 1       # Response to REQUEST
DATA = 2          # Data packet
ACK = 3           # Acknowledgment only
DATAACK = 4       # Data + Acknowledgment
CLOSEREQ = 5      # Close request
CLOSE = 6         # Close
RESET = 7         # Reset connection
SYNC = 8          # Synchronize sequence numbers
SYNCACK = 9       # Synchronize acknowledgment
INVALID = 10      # Invalid packet type

# DCCP Options
# Padding Option (Type 0)
+--------+
|00000000|
+--------+

# Mandatory Option (Type 1)
+--------+--------+--------+-----//-----+
|00000001|  Len   | Option |  Option   |
+--------+--------+--------+-----//-----+

# Slow Receiver Option (Type 2)
+--------+--------+
|00000010|00000010|
+--------+--------+

# Feature Negotiation Options
# Change L/R (Types 32-63)
+--------+--------+--------+-----//-----+
|  Type  |  Len   |Feature#|  Value(s) |
+--------+--------+--------+-----//-----+

# DCCP Features
CCID = 1                    # Congestion Control ID
ALLOW_SHORT_SEQNOS = 2      # Allow short sequence numbers
SEQUENCE_WINDOW = 3         # Sequence window size
ECN_INCAPABLE = 4          # ECN incapable
ACK_RATIO = 5              # Acknowledgment ratio
SEND_ACK_VECTOR = 6        # Send Ack Vector
SEND_NDP_COUNT = 7         # Send NDP count
MINIMUM_CHECKSUM_COVERAGE = 8  # Min checksum coverage
CHECK_DATA_CHECKSUM = 9     # Check data checksum
SEND_LEV_RATE = 192        # Send loss event rate

# DCCP Service Codes (examples)
SERVICE_CODE_DISCARD = 1262698832  # "DISC"
SERVICE_CODE_RTCP = 1381257043     # "RTCP"
SERVICE_CODE_RTP = 1381131344      # "RTP "

# Congestion Control IDs (CCID)
CCID_2_TCP_LIKE = 2        # TCP-like congestion control
CCID_3_TFRC = 3           # TCP-Friendly Rate Control
CCID_4_TFRC_SP = 4        # TFRC Small Packet variant

# DCCP Connection States
CLOSED = 0
LISTEN = 1
REQUEST = 2
RESPOND = 3
PARTOPEN = 4
OPEN = 5
CLOSEREQ = 6
CLOSING = 7
TIMEWAIT = 8

# State Transition Examples
# Client:  CLOSED -> REQUEST -> PARTOPEN -> OPEN
# Server:  CLOSED -> LISTEN -> RESPOND -> OPEN

# DCCP Reset Codes
UNSPECIFIED = 0
CLOSED = 1
ABORTED = 2
NO_CONNECTION = 3
PACKET_ERROR = 4
OPTION_ERROR = 5
MANDATORY_ERROR = 6
CONNECTION_REFUSED = 7
BAD_SERVICE_CODE = 8
TOO_BUSY = 9
BAD_INIT_COOKIE = 10
AGGRESSION_PENALTY = 11

# Example DCCP Packet Construction
import struct

def create_dccp_header(src_port, dst_port, packet_type, seq_num, 
                      ack_num=0, service_code=0, options=b''):
    """Create DCCP header."""
    # Basic header fields
    data_offset = (12 + len(options) + 3) // 4  # In 32-bit words
    ccval = 0  # Congestion control value
    cscov = 0  # Checksum coverage (0 = entire packet)
    
    # Pack basic header
    header = struct.pack('!HHBBH',
        src_port,           # Source port
        dst_port,           # Destination port  
        (data_offset << 4) | ccval,  # Data offset and CCVal
        cscov,              # Checksum coverage
        0                   # Checksum (calculated later)
    )
    
    # Packet type and flags
    type_field = (packet_type << 1) | 0  # X bit = 0 for short seq nums
    header += struct.pack('!BH', 0, type_field)  # Reserved + Type
    
    # Sequence number (24 bits for short format)
    header += struct.pack('!I', seq_num)[1:]  # Take last 3 bytes
    
    # Add acknowledgment number if needed
    if packet_type in [ACK, DATAACK, SYNC, SYNCACK]:
        header += struct.pack('!I', ack_num)[1:]  # 24-bit ack number
    
    # Add service code for REQUEST packets
    if packet_type == REQUEST:
        header += struct.pack('!I', service_code)
    
    # Add options
    header += options
    
    # Pad to 32-bit boundary
    while len(header) % 4 != 0:
        header += b'\\x00'
    
    return header

# DCCP Option Construction
def create_dccp_option(option_type, option_data=b''):
    """Create DCCP option."""
    if option_type == 0:  # Padding
        return b'\\x00'
    
    option_len = 2 + len(option_data)
    return struct.pack('!BB', option_type, option_len) + option_data

# Feature Negotiation Option
def create_feature_option(option_type, feature_num, values):
    """Create feature negotiation option."""
    if isinstance(values, int):
        values = [values]
    
    data = struct.pack('!B', feature_num)
    for value in values:
        if isinstance(value, int):
            if value < 256:
                data += struct.pack('!B', value)
            else:
                data += struct.pack('!H', value)
        else:
            data += value
    
    return create_dccp_option(option_type, data)

# CCID Option (Congestion Control ID)
def create_ccid_option(ccid_value):
    """Create CCID feature option."""
    return create_feature_option(32, CCID, ccid_value)  # Change L

# Example Packet Creation
def create_dccp_request(src_port, dst_port, seq_num, service_code):
    """Create DCCP REQUEST packet."""
    # Add CCID option
    ccid_opt = create_ccid_option(2)  # TCP-like congestion control
    
    header = create_dccp_header(
        src_port, dst_port, REQUEST, seq_num, 
        service_code=service_code, options=ccid_opt
    )
    
    return header

def create_dccp_response(src_port, dst_port, seq_num, ack_num):
    """Create DCCP RESPONSE packet."""
    # Add CCID option
    ccid_opt = create_ccid_option(3)  # TFRC congestion control
    
    header = create_dccp_header(
        src_port, dst_port, RESPONSE, seq_num, ack_num, 
        options=ccid_opt
    )
    
    return header

def create_dccp_data(src_port, dst_port, seq_num, data):
    """Create DCCP DATA packet."""
    header = create_dccp_header(src_port, dst_port, DATA, seq_num)
    return header + data

# Example Usage
if __name__ == "__main__":
    # Create REQUEST packet
    request = create_dccp_request(12345, 80, 1000000, SERVICE_CODE_RTP)
    print(f"REQUEST packet: {request.hex()}")
    
    # Create RESPONSE packet  
    response = create_dccp_response(80, 12345, 2000000, 1000001)
    print(f"RESPONSE packet: {response.hex()}")
    
    # Create DATA packet
    data_packet = create_dccp_data(12345, 80, 1000002, b"Hello DCCP!")
    print(f"DATA packet: {data_packet.hex()}")`,
        explanation: "DCCP packet structure, header format, and packet construction examples."
      },
      {
        title: "DCCP Socket Implementation and Connection Management",
        code: `# Python DCCP Socket Implementation (Linux-specific)
import socket
import struct
import threading
import time
from enum import Enum
from typing import Dict, Optional, Callable

class DCCPState(Enum):
    """DCCP connection states."""
    CLOSED = 0
    LISTEN = 1
    REQUEST = 2
    RESPOND = 3
    PARTOPEN = 4
    OPEN = 5
    CLOSEREQ = 6
    CLOSING = 7
    TIMEWAIT = 8

class DCCPPacketType(Enum):
    """DCCP packet types."""
    REQUEST = 0
    RESPONSE = 1
    DATA = 2
    ACK = 3
    DATAACK = 4
    CLOSEREQ = 5
    CLOSE = 6
    RESET = 7
    SYNC = 8
    SYNCACK = 9

class DCCPCCID(Enum):
    """DCCP Congestion Control IDs."""
    CCID_2_TCP_LIKE = 2
    CCID_3_TFRC = 3
    CCID_4_TFRC_SP = 4

class DCCPSocket:
    """DCCP socket implementation."""
    
    def __init__(self, family=socket.AF_INET, ccid=DCCPCCID.CCID_3_TFRC):
        # Note: DCCP support requires Linux kernel with DCCP module
        try:
            self.sock = socket.socket(family, socket.SOCK_DCCP, socket.IPPROTO_DCCP)
        except (OSError, AttributeError):
            # Fallback to UDP for demonstration
            self.sock = socket.socket(family, socket.SOCK_DGRAM)
            print("Warning: Using UDP fallback (DCCP not supported)")
        
        self.state = DCCPState.CLOSED
        self.local_addr = None
        self.remote_addr = None
        self.seq_num = 1000000  # Initial sequence number
        self.ack_num = 0
        self.ccid = ccid
        self.service_code = 0
        self.callbacks: Dict[str, Callable] = {}
        self.running = False
        self.receive_thread = None
    
    def set_service_code(self, service_code: int):
        """Set DCCP service code."""
        self.service_code = service_code
        try:
            # Linux-specific DCCP socket option
            self.sock.setsockopt(socket.SOL_DCCP, socket.DCCP_SOCKOPT_SERVICE, 
                               struct.pack('!I', service_code))
        except (AttributeError, OSError):
            pass  # Not supported in fallback mode
    
    def set_ccid(self, ccid: DCCPCCID):
        """Set congestion control algorithm."""
        self.ccid = ccid
        try:
            # Set TX CCID
            self.sock.setsockopt(socket.SOL_DCCP, socket.DCCP_SOCKOPT_TX_CCID, 
                               ccid.value)
            # Set RX CCID
            self.sock.setsockopt(socket.SOL_DCCP, socket.DCCP_SOCKOPT_RX_CCID, 
                               ccid.value)
        except (AttributeError, OSError):
            pass  # Not supported in fallback mode
    
    def bind(self, address):
        """Bind socket to address."""
        self.sock.bind(address)
        self.local_addr = address
        print(f"DCCP socket bound to {address}")
    
    def listen(self, backlog=5):
        """Listen for incoming connections."""
        self.sock.listen(backlog)
        self.state = DCCPState.LISTEN
        print(f"DCCP socket listening with backlog {backlog}")
    
    def accept(self):
        """Accept incoming connection."""
        if self.state != DCCPState.LISTEN:
            raise RuntimeError("Socket not in listening state")
        
        try:
            conn, addr = self.sock.accept()
            client_socket = DCCPSocket()
            client_socket.sock = conn
            client_socket.remote_addr = addr
            client_socket.state = DCCPState.OPEN
            client_socket.seq_num = self.seq_num + 1
            print(f"Accepted DCCP connection from {addr}")
            return client_socket, addr
        except Exception as e:
            print(f"Accept failed: {e}")
            raise
    
    def connect(self, address):
        """Connect to remote DCCP server."""
        self.remote_addr = address
        self.state = DCCPState.REQUEST
        
        try:
            self.sock.connect(address)
            self.state = DCCPState.OPEN
            print(f"Connected to DCCP server at {address}")
        except Exception as e:
            self.state = DCCPState.CLOSED
            print(f"Connection failed: {e}")
            raise
    
    def send(self, data: bytes) -> int:
        """Send data over DCCP connection."""
        if self.state != DCCPState.OPEN:
            raise RuntimeError("Connection not established")
        
        try:
            bytes_sent = self.sock.send(data)
            self.seq_num += 1
            print(f"Sent {bytes_sent} bytes via DCCP")
            return bytes_sent
        except Exception as e:
            print(f"Send failed: {e}")
            raise
    
    def recv(self, bufsize: int) -> bytes:
        """Receive data from DCCP connection."""
        if self.state not in [DCCPState.OPEN, DCCPState.PARTOPEN]:
            raise RuntimeError("Connection not established")
        
        try:
            data = self.sock.recv(bufsize)
            if data:
                self.ack_num += 1
                print(f"Received {len(data)} bytes via DCCP")
            return data
        except Exception as e:
            print(f"Receive failed: {e}")
            raise
    
    def sendto(self, data: bytes, address) -> int:
        """Send data to specific address (connectionless)."""
        try:
            bytes_sent = self.sock.sendto(data, address)
            print(f"Sent {bytes_sent} bytes to {address}")
            return bytes_sent
        except Exception as e:
            print(f"Sendto failed: {e}")
            raise
    
    def recvfrom(self, bufsize: int):
        """Receive data from any source."""
        try:
            data, addr = self.sock.recvfrom(bufsize)
            print(f"Received {len(data)} bytes from {addr}")
            return data, addr
        except Exception as e:
            print(f"Recvfrom failed: {e}")
            raise
    
    def close(self):
        """Close DCCP connection."""
        if self.state == DCCPState.OPEN:
            self.state = DCCPState.CLOSEREQ
            # Send close request (simulated)
            print("Sending DCCP close request")
        
        self.running = False
        if self.receive_thread:
            self.receive_thread.join(timeout=1.0)
        
        self.sock.close()
        self.state = DCCPState.CLOSED
        print("DCCP connection closed")
    
    def set_callback(self, event: str, callback: Callable):
        """Set event callback."""
        self.callbacks[event] = callback
    
    def start_receive_loop(self):
        """Start background receive loop."""
        if self.receive_thread and self.receive_thread.is_alive():
            return
        
        self.running = True
        self.receive_thread = threading.Thread(target=self._receive_loop)
        self.receive_thread.daemon = True
        self.receive_thread.start()
    
    def _receive_loop(self):
        """Background receive loop."""
        while self.running and self.state in [DCCPState.OPEN, DCCPState.PARTOPEN]:
            try:
                data = self.recv(1024)
                if data and 'data_received' in self.callbacks:
                    self.callbacks['data_received'](data)
            except Exception as e:
                if self.running:
                    print(f"Receive loop error: {e}")
                    if 'error' in self.callbacks:
                        self.callbacks['error'](e)
                break
        
        print("Receive loop ended")

# DCCP Server Implementation
class DCCPServer:
    """DCCP server for handling multiple clients."""
    
    def __init__(self, host='localhost', port=8080, ccid=DCCPCCID.CCID_3_TFRC):
        self.host = host
        self.port = port
        self.ccid = ccid
        self.socket = DCCPSocket(ccid=ccid)
        self.clients: Dict[str, DCCPSocket] = {}
        self.running = False
        self.message_handler = None
    
    def set_message_handler(self, handler: Callable):
        """Set message handler for incoming data."""
        self.message_handler = handler
    
    def start(self):
        """Start DCCP server."""
        try:
            self.socket.set_service_code(1262698832)  # "DISC" service
            self.socket.set_ccid(self.ccid)
            self.socket.bind((self.host, self.port))
            self.socket.listen(10)
            
            self.running = True
            print(f"DCCP server started on {self.host}:{self.port}")
            
            while self.running:
                try:
                    client_socket, client_addr = self.socket.accept()
                    client_id = f"{client_addr[0]}:{client_addr[1]}"
                    self.clients[client_id] = client_socket
                    
                    # Start handling client in separate thread
                    thread = threading.Thread(
                        target=self._handle_client, 
                        args=(client_socket, client_id)
                    )
                    thread.daemon = True
                    thread.start()
                    
                    print(f"New client connected: {client_id}")
                
                except Exception as e:
                    if self.running:
                        print(f"Accept error: {e}")
        
        except Exception as e:
            print(f"Server error: {e}")
        finally:
            self.stop()
    
    def _handle_client(self, client_socket: DCCPSocket, client_id: str):
        """Handle individual client connection."""
        try:
            while self.running and client_socket.state == DCCPState.OPEN:
                data = client_socket.recv(1024)
                if not data:
                    break
                
                print(f"Received from {client_id}: {data.decode('utf-8', errors='ignore')}")
                
                # Call message handler if set
                if self.message_handler:
                    response = self.message_handler(data, client_id)
                    if response:
                        client_socket.send(response)
                else:
                    # Echo back by default
                    echo_response = f"Echo: {data.decode('utf-8', errors='ignore')}"
                    client_socket.send(echo_response.encode())
        
        except Exception as e:
            print(f"Client {client_id} error: {e}")
        finally:
            client_socket.close()
            if client_id in self.clients:
                del self.clients[client_id]
            print(f"Client {client_id} disconnected")
    
    def broadcast(self, message: bytes):
        """Broadcast message to all connected clients."""
        disconnected = []
        for client_id, client_socket in self.clients.items():
            try:
                client_socket.send(message)
            except Exception as e:
                print(f"Broadcast to {client_id} failed: {e}")
                disconnected.append(client_id)
        
        # Remove disconnected clients
        for client_id in disconnected:
            if client_id in self.clients:
                del self.clients[client_id]
    
    def stop(self):
        """Stop DCCP server."""
        self.running = False
        
        # Close all client connections
        for client_socket in self.clients.values():
            client_socket.close()
        self.clients.clear()
        
        # Close server socket
        self.socket.close()
        print("DCCP server stopped")

# DCCP Client Implementation
class DCCPClient:
    """DCCP client implementation."""
    
    def __init__(self, ccid=DCCPCCID.CCID_2_TCP_LIKE):
        self.socket = DCCPSocket(ccid=ccid)
        self.connected = False
    
    def connect(self, host: str, port: int, service_code: int = 0):
        """Connect to DCCP server."""
        try:
            if service_code:
                self.socket.set_service_code(service_code)
            
            self.socket.connect((host, port))
            self.connected = True
            print(f"Connected to DCCP server {host}:{port}")
            return True
        except Exception as e:
            print(f"Connection failed: {e}")
            return False
    
    def send_message(self, message: str) -> bool:
        """Send message to server."""
        if not self.connected:
            print("Not connected to server")
            return False
        
        try:
            self.socket.send(message.encode())
            return True
        except Exception as e:
            print(f"Send failed: {e}")
            return False
    
    def receive_message(self, timeout: float = 5.0) -> Optional[str]:
        """Receive message from server."""
        if not self.connected:
            return None
        
        try:
            self.socket.sock.settimeout(timeout)
            data = self.socket.recv(1024)
            return data.decode('utf-8', errors='ignore') if data else None
        except socket.timeout:
            print("Receive timeout")
            return None
        except Exception as e:
            print(f"Receive failed: {e}")
            return None
    
    def disconnect(self):
        """Disconnect from server."""
        if self.connected:
            self.socket.close()
            self.connected = False
            print("Disconnected from server")

# Example Usage and Testing
def dccp_server_example():
    """Example DCCP server."""
    def handle_message(data: bytes, client_id: str) -> bytes:
        message = data.decode('utf-8', errors='ignore')
        print(f"Processing message from {client_id}: {message}")
        
        # Simple command processing
        if message.strip().upper() == "TIME":
            response = f"Server time: {time.ctime()}"
        elif message.strip().upper() == "HELLO":
            response = f"Hello {client_id}!"
        else:
            response = f"Received: {message}"
        
        return response.encode()
    
    server = DCCPServer(host='localhost', port=8080, ccid=DCCPCCID.CCID_3_TFRC)
    server.set_message_handler(handle_message)
    
    try:
        server.start()
    except KeyboardInterrupt:
        print("\\nServer interrupted")
    finally:
        server.stop()

def dccp_client_example():
    """Example DCCP client."""
    client = DCCPClient(ccid=DCCPCCID.CCID_2_TCP_LIKE)
    
    if client.connect('localhost', 8080):
        try:
            # Send test messages
            messages = ["Hello", "TIME", "How are you?", "HELLO"]
            
            for msg in messages:
                print(f"Sending: {msg}")
                if client.send_message(msg):
                    response = client.receive_message()
                    if response:
                        print(f"Received: {response}")
                
                time.sleep(1)
        
        except KeyboardInterrupt:
            print("\\nClient interrupted")
        finally:
            client.disconnect()

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "server":
        dccp_server_example()
    else:
        dccp_client_example()`,
        explanation: "Complete DCCP socket implementation with server and client examples."
      },
      {
        title: "DCCP Congestion Control and Performance Analysis",
        code: `# DCCP Congestion Control Implementation and Analysis
import time
import threading
import queue
import statistics
from dataclasses import dataclass
from typing import List, Dict, Optional
from enum import Enum

class CCIDType(Enum):
    """Congestion Control ID types."""
    CCID_2_TCP_LIKE = 2      # TCP-like congestion control
    CCID_3_TFRC = 3          # TCP-Friendly Rate Control
    CCID_4_TFRC_SP = 4       # TFRC for Small Packets

@dataclass
class CongestionMetrics:
    """Congestion control metrics."""
    timestamp: float
    rtt: float
    loss_rate: float
    send_rate: float
    receive_rate: float
    cwnd: int = 0            # Congestion window (CCID-2)
    ssthresh: int = 0        # Slow start threshold (CCID-2)
    p: float = 0.0           # Loss probability (CCID-3)
    
class DCCP_CCID2:
    """TCP-like congestion control for DCCP."""
    
    def __init__(self, initial_cwnd: int = 1, initial_ssthresh: int = 65535):
        self.cwnd = initial_cwnd
        self.ssthresh = initial_ssthresh
        self.last_ack_time = time.time()
        self.rtt_samples = []
        self.duplicate_acks = 0
        self.in_slow_start = True
        self.metrics_history = []
        self.lost_packets = set()
    
    def on_ack_received(self, ack_num: int, rtt: float):
        """Handle ACK reception."""
        current_time = time.time()
        self.rtt_samples.append(rtt)
        
        # Keep only recent RTT samples
        if len(self.rtt_samples) > 10:
            self.rtt_samples.pop(0)
        
        if self.in_slow_start:
            # Slow start: increase cwnd by 1 for each ACK
            self.cwnd += 1
            if self.cwnd >= self.ssthresh:
                self.in_slow_start = False
        else:
            # Congestion avoidance: increase cwnd by 1/cwnd for each ACK
            self.cwnd += 1.0 / self.cwnd
        
        self.last_ack_time = current_time
        self.duplicate_acks = 0
        
        # Record metrics
        self._record_metrics(current_time)
    
    def on_packet_loss(self, lost_seq: int):
        """Handle packet loss detection."""
        if lost_seq not in self.lost_packets:
            self.lost_packets.add(lost_seq)
            
            # TCP-like response to loss
            self.ssthresh = max(self.cwnd // 2, 2)
            self.cwnd = self.ssthresh
            self.in_slow_start = False
            
            print(f"CCID-2: Packet loss detected, cwnd reduced to {self.cwnd}")
    
    def on_duplicate_ack(self, ack_num: int):
        """Handle duplicate ACK."""
        self.duplicate_acks += 1
        
        if self.duplicate_acks >= 3:
            # Fast retransmit
            self.on_packet_loss(ack_num + 1)
            self.duplicate_acks = 0
    
    def get_send_rate(self) -> float:
        """Get current sending rate."""
        if not self.rtt_samples:
            return 1.0  # Default rate
        
        avg_rtt = statistics.mean(self.rtt_samples)
        return self.cwnd / avg_rtt if avg_rtt > 0 else 1.0
    
    def _record_metrics(self, timestamp: float):
        """Record current metrics."""
        avg_rtt = statistics.mean(self.rtt_samples) if self.rtt_samples else 0
        loss_rate = len(self.lost_packets) / max(1, len(self.metrics_history))
        
        metrics = CongestionMetrics(
            timestamp=timestamp,
            rtt=avg_rtt,
            loss_rate=loss_rate,
            send_rate=self.get_send_rate(),
            receive_rate=0,  # Would be calculated separately
            cwnd=int(self.cwnd),
            ssthresh=self.ssthresh
        )
        
        self.metrics_history.append(metrics)

class DCCP_CCID3:
    """TCP-Friendly Rate Control for DCCP."""
    
    def __init__(self):
        self.p = 0.0                    # Loss event rate
        self.rtt = 0.1                  # Round-trip time
        self.s = 1460                   # Packet size in bytes
        self.t_rto = 4.0               # Retransmit timeout
        self.x_recv = 0.0              # Receive rate
        self.x_calc = 0.0              # Calculated rate
        self.x = 0.0                   # Current sending rate
        self.tld = 0.0                 # Time since last loss decrease
        self.loss_events = []
        self.rtt_samples = []
        self.metrics_history = []
    
    def calculate_tfrc_rate(self) -> float:
        """Calculate TFRC sending rate."""
        if self.p == 0:
            # No loss, use slow start rate
            return min(2 * self.x_recv, self.slow_start_rate())
        
        # TFRC equation: X = s / (R * sqrt(2*p/3) + t_RTO * sqrt(3*p/8) * p * (1 + 32*p^2))
        if self.rtt <= 0 or self.p <= 0:
            return self.x_recv
        
        # Simplified TFRC calculation
        numerator = self.s
        denominator = (self.rtt * (2 * self.p / 3) ** 0.5 + 
                      self.t_rto * (3 * self.p / 8) ** 0.5 * self.p * 
                      (1 + 32 * self.p ** 2))
        
        if denominator > 0:
            return numerator / denominator
        else:
            return self.x_recv
    
    def slow_start_rate(self) -> float:
        """Calculate slow start rate."""
        if self.rtt > 0:
            return self.s / self.rtt
        return 1.0
    
    def on_feedback_received(self, receive_rate: float, loss_rate: float, rtt: float):
        """Process feedback from receiver."""
        self.x_recv = receive_rate
        self.p = loss_rate
        self.rtt = rtt
        self.rtt_samples.append(rtt)
        
        # Keep recent samples
        if len(self.rtt_samples) > 20:
            self.rtt_samples.pop(0)
        
        # Calculate new sending rate
        self.x_calc = self.calculate_tfrc_rate()
        
        # Update sending rate (limited increase/decrease)
        if self.x_calc > self.x:
            self.x = min(self.x_calc, 2 * self.x_recv)
        else:
            self.x = max(self.x_calc, self.x_recv)
        
        self._record_metrics(time.time())
    
    def on_loss_event(self, timestamp: float):
        """Handle loss event."""
        self.loss_events.append(timestamp)
        
        # Keep recent loss events (last 8)
        if len(self.loss_events) > 8:
            self.loss_events.pop(0)
        
        # Update loss event rate
        if len(self.loss_events) >= 2:
            time_span = self.loss_events[-1] - self.loss_events[0]
            if time_span > 0:
                self.p = (len(self.loss_events) - 1) / time_span
        
        self.tld = timestamp
        print(f"CCID-3: Loss event, p={self.p:.6f}, rate={self.x:.2f}")
    
    def get_send_rate(self) -> float:
        """Get current sending rate."""
        return self.x
    
    def _record_metrics(self, timestamp: float):
        """Record current metrics."""
        avg_rtt = statistics.mean(self.rtt_samples) if self.rtt_samples else 0
        
        metrics = CongestionMetrics(
            timestamp=timestamp,
            rtt=avg_rtt,
            loss_rate=self.p,
            send_rate=self.x,
            receive_rate=self.x_recv,
            p=self.p
        )
        
        self.metrics_history.append(metrics)

class DCCPPerformanceAnalyzer:
    """DCCP performance analysis and monitoring."""
    
    def __init__(self):
        self.connections = {}
        self.global_metrics = []
        self.monitoring_active = False
        self.monitor_thread = None
    
    def register_connection(self, conn_id: str, ccid_type: CCIDType, ccid_instance):
        """Register DCCP connection for monitoring."""
        self.connections[conn_id] = {
            'ccid_type': ccid_type,
            'ccid_instance': ccid_instance,
            'start_time': time.time(),
            'bytes_sent': 0,
            'bytes_received': 0,
            'packets_sent': 0,
            'packets_received': 0,
            'retransmissions': 0
        }
        print(f"Registered connection {conn_id} with {ccid_type.name}")
    
    def update_connection_stats(self, conn_id: str, bytes_sent: int = 0, 
                               bytes_received: int = 0, packets_sent: int = 0,
                               packets_received: int = 0, retransmissions: int = 0):
        """Update connection statistics."""
        if conn_id in self.connections:
            conn = self.connections[conn_id]
            conn['bytes_sent'] += bytes_sent
            conn['bytes_received'] += bytes_received
            conn['packets_sent'] += packets_sent
            conn['packets_received'] += packets_received
            conn['retransmissions'] += retransmissions
    
    def start_monitoring(self, interval: float = 1.0):
        """Start performance monitoring."""
        if self.monitoring_active:
            return
        
        self.monitoring_active = True
        self.monitor_thread = threading.Thread(
            target=self._monitor_loop, 
            args=(interval,)
        )
        self.monitor_thread.daemon = True
        self.monitor_thread.start()
        print(f"Started DCCP performance monitoring (interval: {interval}s)")
    
    def stop_monitoring(self):
        """Stop performance monitoring."""
        self.monitoring_active = False
        if self.monitor_thread:
            self.monitor_thread.join(timeout=2.0)
        print("Stopped DCCP performance monitoring")
    
    def _monitor_loop(self, interval: float):
        """Performance monitoring loop."""
        while self.monitoring_active:
            timestamp = time.time()
            
            for conn_id, conn_data in self.connections.items():
                ccid_instance = conn_data['ccid_instance']
                
                # Get latest metrics from CCID
                if hasattr(ccid_instance, 'metrics_history') and ccid_instance.metrics_history:
                    latest_metrics = ccid_instance.metrics_history[-1]
                    
                    # Calculate additional metrics
                    duration = timestamp - conn_data['start_time']
                    throughput_mbps = (conn_data['bytes_sent'] * 8) / (duration * 1000000) if duration > 0 else 0
                    packet_loss_rate = (conn_data['retransmissions'] / 
                                       max(1, conn_data['packets_sent'])) if conn_data['packets_sent'] > 0 else 0
                    
                    global_metric = {
                        'timestamp': timestamp,
                        'connection_id': conn_id,
                        'ccid_type': conn_data['ccid_type'].name,
                        'throughput_mbps': throughput_mbps,
                        'packet_loss_rate': packet_loss_rate,
                        'rtt_ms': latest_metrics.rtt * 1000,
                        'send_rate': latest_metrics.send_rate,
                        'receive_rate': latest_metrics.receive_rate,
                        'bytes_sent': conn_data['bytes_sent'],
                        'bytes_received': conn_data['bytes_received']
                    }
                    
                    self.global_metrics.append(global_metric)
            
            time.sleep(interval)
    
    def get_performance_summary(self, conn_id: Optional[str] = None) -> Dict:
        """Get performance summary for connection(s)."""
        if conn_id and conn_id in self.connections:
            connections_to_analyze = {conn_id: self.connections[conn_id]}
        else:
            connections_to_analyze = self.connections
        
        summary = {}
        
        for cid, conn_data in connections_to_analyze.items():
            ccid_instance = conn_data['ccid_instance']
            duration = time.time() - conn_data['start_time']
            
            # Calculate summary statistics
            if hasattr(ccid_instance, 'metrics_history') and ccid_instance.metrics_history:
                metrics = ccid_instance.metrics_history
                rtts = [m.rtt for m in metrics if m.rtt > 0]
                send_rates = [m.send_rate for m in metrics if m.send_rate > 0]
                
                summary[cid] = {
                    'ccid_type': conn_data['ccid_type'].name,
                    'duration_seconds': duration,
                    'total_bytes_sent': conn_data['bytes_sent'],
                    'total_bytes_received': conn_data['bytes_received'],
                    'average_throughput_mbps': (conn_data['bytes_sent'] * 8) / (duration * 1000000) if duration > 0 else 0,
                    'packet_loss_rate': (conn_data['retransmissions'] / max(1, conn_data['packets_sent'])),
                    'average_rtt_ms': statistics.mean(rtts) * 1000 if rtts else 0,
                    'min_rtt_ms': min(rtts) * 1000 if rtts else 0,
                    'max_rtt_ms': max(rtts) * 1000 if rtts else 0,
                    'average_send_rate': statistics.mean(send_rates) if send_rates else 0,
                    'packets_sent': conn_data['packets_sent'],
                    'packets_received': conn_data['packets_received'],
                    'retransmissions': conn_data['retransmissions']
                }
            else:
                summary[cid] = {
                    'ccid_type': conn_data['ccid_type'].name,
                    'duration_seconds': duration,
                    'status': 'No metrics available'
                }
        
        return summary
    
    def compare_ccids(self) -> Dict:
        """Compare performance across different CCID types."""
        ccid_performance = {}
        
        for conn_id, conn_data in self.connections.items():
            ccid_name = conn_data['ccid_type'].name
            
            if ccid_name not in ccid_performance:
                ccid_performance[ccid_name] = {
                    'connections': [],
                    'total_throughput': 0,
                    'average_rtt': 0,
                    'total_loss_rate': 0
                }
            
            summary = self.get_performance_summary(conn_id)
            if conn_id in summary:
                conn_summary = summary[conn_id]
                ccid_performance[ccid_name]['connections'].append(conn_summary)
                ccid_performance[ccid_name]['total_throughput'] += conn_summary.get('average_throughput_mbps', 0)
                ccid_performance[ccid_name]['average_rtt'] += conn_summary.get('average_rtt_ms', 0)
                ccid_performance[ccid_name]['total_loss_rate'] += conn_summary.get('packet_loss_rate', 0)
        
        # Calculate averages
        for ccid_name, data in ccid_performance.items():
            num_connections = len(data['connections'])
            if num_connections > 0:
                data['average_throughput_mbps'] = data['total_throughput'] / num_connections
                data['average_rtt_ms'] = data['average_rtt'] / num_connections
                data['average_loss_rate'] = data['total_loss_rate'] / num_connections
        
        return ccid_performance

# Example Usage and Testing
def test_ccid_performance():
    """Test CCID performance comparison."""
    analyzer = DCCPPerformanceAnalyzer()
    
    # Create CCID instances
    ccid2 = DCCP_CCID2(initial_cwnd=4, initial_ssthresh=64)
    ccid3 = DCCP_CCID3()
    
    # Register connections
    analyzer.register_connection("conn_ccid2", CCIDType.CCID_2_TCP_LIKE, ccid2)
    analyzer.register_connection("conn_ccid3", CCIDType.CCID_3_TFRC, ccid3)
    
    # Start monitoring
    analyzer.start_monitoring(0.5)
    
    # Simulate network conditions
    print("Simulating network traffic...")
    
    for i in range(20):
        # Simulate ACKs and feedback for CCID-2
        rtt = 0.05 + (i % 5) * 0.01  # Variable RTT
        ccid2.on_ack_received(i, rtt)
        
        # Simulate occasional packet loss
        if i % 8 == 7:
            ccid2.on_packet_loss(i)
        
        # Update connection stats
        analyzer.update_connection_stats("conn_ccid2", 
                                       bytes_sent=1460, 
                                       packets_sent=1)
        
        # Simulate feedback for CCID-3
        receive_rate = 100000 + i * 1000  # Increasing receive rate
        loss_rate = 0.001 if i % 10 == 9 else 0.0001
        ccid3.on_feedback_received(receive_rate, loss_rate, rtt)
        
        if i % 10 == 9:
            ccid3.on_loss_event(time.time())
        
        analyzer.update_connection_stats("conn_ccid3", 
                                       bytes_sent=1460, 
                                       packets_sent=1)
        
        time.sleep(0.1)
    
    # Get performance summary
    print("\\n=== Performance Summary ===")
    summary = analyzer.get_performance_summary()
    for conn_id, stats in summary.items():
        print(f"\\nConnection {conn_id}:")
        for key, value in stats.items():
            print(f"  {key}: {value}")
    
    # Compare CCIDs
    print("\\n=== CCID Comparison ===")
    comparison = analyzer.compare_ccids()
    for ccid_name, data in comparison.items():
        print(f"\\n{ccid_name}:")
        print(f"  Average Throughput: {data.get('average_throughput_mbps', 0):.2f} Mbps")
        print(f"  Average RTT: {data.get('average_rtt_ms', 0):.2f} ms")
        print(f"  Average Loss Rate: {data.get('average_loss_rate', 0):.4f}")
    
    analyzer.stop_monitoring()

if __name__ == "__main__":
    test_ccid_performance()`,
        explanation: "DCCP congestion control algorithms implementation and performance analysis tools."
      }
    ],
    relatedProtocols: ["tcp", "udp", "quic", "sctp"],
    resources: [
      {
        title: "RFC 4340 - Datagram Congestion Control Protocol",
        url: "https://tools.ietf.org/html/rfc4340",
        type: "RFC"
      },
      {
        title: "RFC 4341 - CCID 2: TCP-like Congestion Control",
        url: "https://tools.ietf.org/html/rfc4341",
        type: "RFC"
      },
      {
        title: "RFC 4342 - CCID 3: TCP-Friendly Rate Control",
        url: "https://tools.ietf.org/html/rfc4342",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Connection hijacking prevention",
      "Congestion control attacks",
      "Partial checksum verification",
      "Service code validation",
      "Reset attack mitigation",
      "ECN manipulation protection"
    ]
};
