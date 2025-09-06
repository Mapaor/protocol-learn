import { Protocol } from "../../types/protocol";

export const STUN: Protocol = {
    id: "stun",
    name: "STUN",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Session Traversal Utilities for NAT discovery and traversal",
    fullDescription: "STUN (Session Traversal Utilities for NAT) is a standardized set of methods and a network protocol to allow an end host to discover its public IP address if it is located behind a NAT. It is used to establish media sessions in VoIP, peer-to-peer communications, and other real-time communication applications.",
    port: "3478 (UDP/TCP), 5349 (TLS)",
    versions: ["STUN (RFC 3489)", "STUN (RFC 5389)", "STUN (RFC 8489)"],
    advantages: [
      "Simple NAT discovery",
      "Lightweight protocol",
      "Low latency",
      "Widely supported",
      "Standards-based",
      "Easy to implement",
      "Minimal server resources",
      "Public servers available"
    ],
    disadvantages: [
      "Limited NAT traversal",
      "Symmetric NAT issues",
      "No guaranteed connectivity",
      "Firewall dependencies",
      "No relay capability",
      "Security limitations",
      "Single point of failure",
      "IPv6 transition challenges"
    ],
    useCases: [
      "WebRTC connectivity",
      "VoIP applications",
      "P2P file sharing",
      "Online gaming",
      "Video conferencing",
      "IoT device discovery",
      "Network diagnostics",
      "Firewall traversal",
      "Mobile applications",
      "Real-time messaging",
      "Remote access tools",
      "Media streaming"
    ],
    examples: [
      {
        title: "STUN Protocol Structure and Messages",
        code: `# STUN Message Format (RFC 5389)

 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|0 0|     STUN Message Type     |         Message Length        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Magic Cookie                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                     Transaction ID (96 bits)                 |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# STUN Message Types
0x0001 - Binding Request
0x0101 - Binding Success Response  
0x0111 - Binding Error Response

# Magic Cookie: 0x2112A442 (fixed value)

# STUN Attributes
0x0001 - MAPPED-ADDRESS (deprecated)
0x0002 - USERNAME
0x0003 - MESSAGE-INTEGRITY
0x0004 - MESSAGE-INTEGRITY-SHA256
0x0005 - ERROR-CODE
0x0006 - UNKNOWN-ATTRIBUTES
0x0008 - REALM
0x0009 - NONCE
0x0020 - XOR-MAPPED-ADDRESS
0x8022 - SOFTWARE
0x8023 - ALTERNATE-SERVER
0x8028 - FINGERPRINT

# Attribute Format
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Type                  |            Length             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Value (variable)                ....
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# XOR-MAPPED-ADDRESS Format (most commonly used)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|0 0 0 0 0 0 0 0|    Family     |         X-Port                |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                X-Address (Variable)
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# Family: 0x01 = IPv4, 0x02 = IPv6
# X-Port = Port XOR (Magic Cookie >> 16)  
# X-Address = IP Address XOR Magic Cookie

# STUN Transaction Process
1. Client sends Binding Request
2. NAT/Firewall translates source address
3. STUN server receives request with public IP/port
4. Server responds with XOR-MAPPED-ADDRESS
5. Client extracts public IP/port information

# NAT Type Detection (RFC 3489 style)
Test I:   Basic connectivity test
Test II:  Same server, different port
Test III: Different server, same port

Results:
- Open Internet: No NAT
- Full Cone NAT: Same external mapping for all destinations
- Restricted Cone NAT: External mapping restricted by remote IP
- Port Restricted Cone NAT: External mapping restricted by remote IP:port
- Symmetric NAT: Different external mapping per destination`,
        explanation: "STUN protocol structure, message types, and NAT detection process."
      },
      {
        title: "STUN Client Implementation",
        code: `// JavaScript STUN client implementation
class STUNClient {
    constructor() {
        this.servers = [
            'stun.l.google.com:19302',
            'stun1.l.google.com:19302',
            'stun.stunprotocol.org:3478'
        ];
        this.timeout = 5000;
    }
    
    async getPublicAddress(stunServer = null) {
        const server = stunServer || this.servers[0];
        const [host, port] = server.split(':');
        
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(\`wss://\${host}:\${port || 3478}\`);
            // Note: WebSocket example - actual STUN requires UDP
            
            const timer = setTimeout(() => {
                socket.close();
                reject(new Error('STUN request timeout'));
            }, this.timeout);
            
            socket.onopen = () => {
                const request = this.createBindingRequest();
                socket.send(request);
            };
            
            socket.onmessage = (event) => {
                clearTimeout(timer);
                const response = this.parseSTUNResponse(event.data);
                socket.close();
                
                if (response.success) {
                    resolve({
                        publicIP: response.mappedAddress.ip,
                        publicPort: response.mappedAddress.port,
                        server: server
                    });
                } else {
                    reject(new Error(response.error));
                }
            };
            
            socket.onerror = (error) => {
                clearTimeout(timer);
                reject(error);
            };
        });
    }
    
    createBindingRequest() {
        // STUN Binding Request
        const msgType = 0x0001;  // Binding Request
        const msgLength = 0;     // No attributes initially
        const magicCookie = 0x2112A442;
        const transactionId = this.generateTransactionId();
        
        const buffer = new ArrayBuffer(20);
        const view = new DataView(buffer);
        
        view.setUint16(0, msgType, false);          // Message Type
        view.setUint16(2, msgLength, false);        // Message Length
        view.setUint32(4, magicCookie, false);      // Magic Cookie
        
        // Transaction ID (12 bytes)
        for (let i = 0; i < 12; i++) {
            view.setUint8(8 + i, transactionId[i]);
        }
        
        return buffer;
    }
    
    generateTransactionId() {
        const id = new Uint8Array(12);
        if (window.crypto) {
            window.crypto.getRandomValues(id);
        } else {
            for (let i = 0; i < 12; i++) {
                id[i] = Math.floor(Math.random() * 256);
            }
        }
        return id;
    }
    
    parseSTUNResponse(data) {
        const view = new DataView(data);
        
        const msgType = view.getUint16(0, false);
        const msgLength = view.getUint16(2, false);
        const magicCookie = view.getUint32(4, false);
        
        if (magicCookie !== 0x2112A442) {
            return { success: false, error: 'Invalid magic cookie' };
        }
        
        if (msgType === 0x0101) { // Binding Success Response
            return this.parseAttributes(data, 20, msgLength);
        } else if (msgType === 0x0111) { // Binding Error Response
            return { success: false, error: 'STUN server error' };
        }
        
        return { success: false, error: 'Unknown response type' };
    }
    
    parseAttributes(data, offset, length) {
        const view = new DataView(data);
        let mappedAddress = null;
        
        while (offset < 20 + length) {
            const attrType = view.getUint16(offset, false);
            const attrLength = view.getUint16(offset + 2, false);
            
            if (attrType === 0x0020) { // XOR-MAPPED-ADDRESS
                mappedAddress = this.parseXorMappedAddress(data, offset + 4, attrLength);
            }
            
            // Move to next attribute (pad to 4-byte boundary)
            offset += 4 + ((attrLength + 3) & ~3);
        }
        
        if (mappedAddress) {
            return { success: true, mappedAddress };
        } else {
            return { success: false, error: 'No mapped address found' };
        }
    }
    
    parseXorMappedAddress(data, offset, length) {
        const view = new DataView(data);
        
        const family = view.getUint8(offset + 1);
        const xPort = view.getUint16(offset + 2, false);
        
        // XOR with magic cookie
        const port = xPort ^ (0x2112A442 >> 16);
        
        if (family === 0x01) { // IPv4
            const xAddress = view.getUint32(offset + 4, false);
            const address = xAddress ^ 0x2112A442;
            
            const ip = [
                (address >> 24) & 0xFF,
                (address >> 16) & 0xFF,
                (address >> 8) & 0xFF,
                address & 0xFF
            ].join('.');
            
            return { ip, port };
        }
        
        return null;
    }
    
    async testMultipleServers() {
        const results = [];
        
        for (const server of this.servers) {
            try {
                const result = await this.getPublicAddress(server);
                results.push({ server, ...result, success: true });
            } catch (error) {
                results.push({ server, error: error.message, success: false });
            }
        }
        
        return results;
    }
}

// Python STUN client implementation
import socket
import struct
import random
import time

class STUNClient:
    STUN_SERVERS = [
        ('stun.l.google.com', 19302),
        ('stun1.l.google.com', 19302),
        ('stun.stunprotocol.org', 3478)
    ]
    
    MAGIC_COOKIE = 0x2112A442
    
    def __init__(self, timeout=5.0):
        self.timeout = timeout
    
    def get_public_address(self, stun_server=None):
        """Get public IP and port using STUN"""
        if stun_server is None:
            stun_server = self.STUN_SERVERS[0]
        
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(self.timeout)
        
        try:
            # Create STUN binding request
            transaction_id = struct.pack('!12B', *[random.randint(0, 255) for _ in range(12)])
            request = self.create_binding_request(transaction_id)
            
            # Send request
            sock.sendto(request, stun_server)
            
            # Receive response
            response, addr = sock.recvfrom(1024)
            
            # Parse response
            return self.parse_response(response, transaction_id)
            
        except socket.timeout:
            raise Exception(f"STUN request to {stun_server} timed out")
        except Exception as e:
            raise Exception(f"STUN request failed: {e}")
        finally:
            sock.close()
    
    def create_binding_request(self, transaction_id):
        """Create STUN binding request packet"""
        msg_type = 0x0001      # Binding Request
        msg_length = 0         # No attributes
        magic_cookie = self.MAGIC_COOKIE
        
        return struct.pack('!HHI12s', msg_type, msg_length, magic_cookie, transaction_id)
    
    def parse_response(self, response, expected_transaction_id):
        """Parse STUN response packet"""
        if len(response) < 20:
            raise Exception("Invalid STUN response: too short")
        
        # Parse header
        msg_type, msg_length, magic_cookie, transaction_id = struct.unpack('!HHI12s', response[:20])
        
        if magic_cookie != self.MAGIC_COOKIE:
            raise Exception("Invalid STUN response: bad magic cookie")
        
        if transaction_id != expected_transaction_id:
            raise Exception("Invalid STUN response: transaction ID mismatch")
        
        if msg_type == 0x0101:  # Binding Success Response
            return self.parse_attributes(response[20:20+msg_length])
        elif msg_type == 0x0111:  # Binding Error Response
            raise Exception("STUN server returned error")
        else:
            raise Exception(f"Unknown STUN response type: 0x{msg_type:04x}")
    
    def parse_attributes(self, attributes_data):
        """Parse STUN attributes from response"""
        offset = 0
        mapped_address = None
        
        while offset < len(attributes_data):
            if offset + 4 > len(attributes_data):
                break
            
            attr_type, attr_length = struct.unpack('!HH', attributes_data[offset:offset+4])
            offset += 4
            
            if attr_type == 0x0020:  # XOR-MAPPED-ADDRESS
                mapped_address = self.parse_xor_mapped_address(
                    attributes_data[offset:offset+attr_length])
            
            # Move to next attribute (4-byte aligned)
            offset += (attr_length + 3) & ~3
        
        if mapped_address:
            return mapped_address
        else:
            raise Exception("No mapped address found in STUN response")
    
    def parse_xor_mapped_address(self, data):
        """Parse XOR-MAPPED-ADDRESS attribute"""
        if len(data) < 8:
            raise Exception("Invalid XOR-MAPPED-ADDRESS attribute")
        
        reserved, family, x_port = struct.unpack('!BBH', data[:4])
        
        # XOR port with magic cookie
        port = x_port ^ (self.MAGIC_COOKIE >> 16)
        
        if family == 0x01:  # IPv4
            x_address = struct.unpack('!I', data[4:8])[0]
            address = x_address ^ self.MAGIC_COOKIE
            
            ip = socket.inet_ntoa(struct.pack('!I', address))
            return {'ip': ip, 'port': port, 'family': 'IPv4'}
        elif family == 0x02:  # IPv6
            # IPv6 XOR with magic cookie + transaction ID
            # Implementation depends on transaction ID
            raise Exception("IPv6 XOR-MAPPED-ADDRESS not implemented")
        else:
            raise Exception(f"Unknown address family: {family}")
    
    def test_all_servers(self):
        """Test all STUN servers and return results"""
        results = []
        
        for server in self.STUN_SERVERS:
            try:
                start_time = time.time()
                result = self.get_public_address(server)
                end_time = time.time()
                
                results.append({
                    'server': f"{server[0]}:{server[1]}",
                    'success': True,
                    'public_ip': result['ip'],
                    'public_port': result['port'],
                    'response_time': round((end_time - start_time) * 1000, 2)
                })
            except Exception as e:
                results.append({
                    'server': f"{server[0]}:{server[1]}",
                    'success': False,
                    'error': str(e)
                })
        
        return results

# Usage examples
if __name__ == "__main__":
    client = STUNClient()
    
    try:
        result = client.get_public_address()
        print(f"Public address: {result['ip']}:{result['port']}")
    except Exception as e:
        print(f"STUN test failed: {e}")
    
    # Test all servers
    print("\\nTesting all STUN servers:")
    results = client.test_all_servers()
    for result in results:
        if result['success']:
            print(f"✓ {result['server']}: {result['public_ip']}:{result['public_port']} ({result['response_time']}ms)")
        else:
            print(f"✗ {result['server']}: {result['error']}")`,
        explanation: "STUN client implementation in JavaScript and Python with packet parsing."
      },
      {
        title: "STUN Server Configuration and Testing",
        code: `
# STUN Server Setup (using coturn)

# Install coturn (Debian/Ubuntu)
sudo apt-get install coturn

# Start STUN server on default port (3478)
sudo turnserver -a -o -v -n --no-tls --no-dtls -L 0.0.0.0 -p 3478

# Test STUN server using stunclient (https://github.com/jselbie/stunserver)
stunclient <server_ip> 3478

# Diagnostic tools
# - stunclient (C/C++)
# - nmap --script stun-info
# - Wireshark (filter: stun)
`,
        explanation: "STUN server setup instructions using coturn, and tools for testing and diagnostics."
      }
    ],
    diagrams: [
      {
        src: "/stun_protocol.png",
        alt: "STUN protocol flow",
        caption: "STUN protocol operation and NAT address discovery process"
      },
      {
        src: "/stun_nat_types.jpg",
        alt: "STUN NAT type detection",
        caption: "Different NAT types and STUN detection methods"
      }
    ],
    relatedProtocols: ["turn", "ice", "nat", "upnp"],
    resources: [
      {
        title: "RFC 5389 - Session Traversal Utilities for NAT (STUN)",
        url: "https://tools.ietf.org/html/rfc5389",
        type: "RFC"
      },
      {
        title: "RFC 8489 - Session Traversal Utilities for NAT (STUN)",
        url: "https://tools.ietf.org/html/rfc8489",
        type: "RFC"
      },
      {
        title: "STUN Protocol Overview",
        url: "https://webrtc.org/getting-started/",
        type: "Tutorial"
      }
    ],
    securityConsiderations: [
      "Rate limiting requests",
      "DDoS attack prevention", 
      "Access control policies",
      "Monitor for abuse",
      "Secure server deployment",
      "Regular security updates",
      "Network filtering",
      "Authentication mechanisms"
    ]
  }