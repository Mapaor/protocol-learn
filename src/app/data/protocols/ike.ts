import { Protocol } from "../../types/protocol";

export const IKE: Protocol = {
    id: "ike",
    name: "IKE",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Internet Key Exchange protocol for establishing secure IPSec VPN connections",
    fullDescription: "IKE (Internet Key Exchange) is a protocol used to set up a security association (SA) in the IPsec protocol suite. IKE builds upon the Oakley protocol and ISAKMP to provide a method for authenticating communications and establishing and managing security associations. IKE typically uses X.509 certificates or pre-shared keys for authentication.",
    port: "500 (UDP), 4500 (UDP NAT-T)",
    versions: ["IKEv1 (RFC 2409)", "IKEv2 (RFC 7296)", "IKEv2bis (RFC 4306)"],
    advantages: [
      "Strong authentication",
      "Perfect Forward Secrecy",
      "Flexible encryption algorithms",
      "NAT traversal support",
      "Dead peer detection",
      "Automatic key management",
      "Certificate-based auth",
      "Vendor interoperability"
    ],
    disadvantages: [
      "Complex protocol",
      "Configuration complexity",
      "Performance overhead",
      "NAT complications",
      "Certificate management",
      "Multiple round trips",
      "Debugging difficulties",
      "DoS vulnerabilities"
    ],
    useCases: [
      "Site-to-site VPNs",
      "Remote access VPNs",
      "Mobile device security",
      "Cloud connectivity",
      "Corporate networks",
      "Government communications",
      "Industrial IoT security",
      "Secure tunneling",
      "Branch office connectivity",
      "Partner network access",
      "Secure file transfer",
      "Database connections"
    ],
    examples: [
      {
        title: "IKE Protocol Phases and Message Exchange",
        code: `# IKEv1 Two-Phase Protocol

## Phase 1: ISAKMP SA Establishment
# Establishes secure channel for Phase 2 negotiation

Mode: Main Mode (6 messages) or Aggressive Mode (3 messages)

Main Mode Exchange:
1. Initiator -> Responder: SA proposal
   - Security Association (SA) payload
   - Supported encryption/hash/DH group/auth methods
   
2. Responder -> Initiator: SA response  
   - Chosen SA proposal
   
3. Initiator -> Responder: Key Exchange + Nonce
   - Key Exchange (KE) payload with DH public value
   - Nonce payload
   
4. Responder -> Initiator: Key Exchange + Nonce
   - Key Exchange (KE) payload with DH public value  
   - Nonce payload
   
5. Initiator -> Responder: Identity + Authentication
   - Identity (ID) payload (encrypted)
   - Authentication payload (encrypted)
   
6. Responder -> Initiator: Identity + Authentication
   - Identity (ID) payload (encrypted)
   - Authentication payload (encrypted)

## Phase 2: IPSec SA Establishment  
# Establishes actual data encryption SAs

Quick Mode Exchange (3 messages):
1. Initiator -> Responder: Hash + SA + Nonce + [ID + ID]
   - IPSec SA proposal
   - PFS key exchange (optional)
   
2. Responder -> Initiator: Hash + SA + Nonce + [ID + ID]
   - Chosen IPSec SA
   
3. Initiator -> Responder: Hash
   - Confirmation

# IKEv2 Simplified Exchange (4 messages)

1. IKE_SA_INIT Request (Initiator -> Responder):
   - SA payload (IKE SA proposals)
   - KE payload (DH public key)
   - Ni payload (initiator nonce)
   
2. IKE_SA_INIT Response (Responder -> Initiator):
   - SA payload (chosen IKE SA)
   - KE payload (DH public key)
   - Nr payload (responder nonce)
   - [CERTREQ] (certificate request)
   
3. IKE_AUTH Request (Initiator -> Responder):
   - IDi payload (initiator identity)
   - [CERT] (certificate)
   - AUTH payload (authentication)
   - SA payload (child SA proposals)
   - TSi payload (traffic selectors)
   - TSr payload (traffic selectors)
   
4. IKE_AUTH Response (Responder -> Initiator):
   - IDr payload (responder identity)
   - [CERT] (certificate)
   - AUTH payload (authentication)
   - SA payload (chosen child SA)
   - TSi payload (traffic selectors)
   - TSr payload (traffic selectors)

# IKE Payload Types
1  - Security Association (SA)
2  - Proposal (P)
3  - Transform (T)
4  - Key Exchange (KE)
5  - Identification (ID)
6  - Certificate (CERT)
7  - Certificate Request (CERTREQ)
8  - Hash (HASH)
9  - Signature (SIG)
10 - Nonce (NONCE)
11 - Notification (N)
12 - Delete (D)
13 - Vendor ID (VID)

# Encryption Algorithms
DES-CBC, 3DES-CBC, AES-CBC, AES-GCM, ChaCha20-Poly1305

# Hash Algorithms  
MD5, SHA-1, SHA-256, SHA-384, SHA-512

# Diffie-Hellman Groups
Group 1 (768-bit), Group 2 (1024-bit), Group 5 (1536-bit)
Group 14 (2048-bit), Group 19 (256-bit ECC), Group 20 (384-bit ECC)

# Authentication Methods
Pre-shared keys, RSA signatures, DSS signatures, 
X.509 certificates, Kerberos`,
        explanation: "IKE protocol phases, message exchanges, and security parameters."
      },
      {
        title: "IKE Configuration Examples",
        code: `# StrongSwan IKEv2 Configuration
# /etc/ipsec.conf

config setup
    uniqueids=yes
    charondebug="cfg 2, dmn 2, ike 2, net 2"

conn site-to-site
    type=tunnel
    auto=start
    keyexchange=ikev2
    
    # Local gateway
    left=203.0.113.1
    leftsubnet=192.168.1.0/24
    leftid=@gateway1.example.com
    leftcert=gateway1.crt
    
    # Remote gateway  
    right=203.0.113.2
    rightsubnet=192.168.2.0/24
    rightid=@gateway2.example.com
    
    # IKE algorithms
    ike=aes256-sha256-modp2048!
    esp=aes256-sha256-modp2048!
    
    # Timeouts
    ikelifetime=24h
    keylife=8h
    rekeymargin=3m
    keyingtries=3
    
    # Dead peer detection
    dpdaction=restart
    dpddelay=30s
    dpdtimeout=120s

conn roadwarrior
    type=tunnel
    auto=add
    keyexchange=ikev2
    
    # Server side
    left=%defaultroute
    leftsubnet=0.0.0.0/0
    leftid=@vpn.example.com
    leftcert=server.crt
    leftauth=pubkey
    
    # Client side
    right=%any
    rightauth=eap-mschapv2
    rightsourceip=10.1.0.0/16
    rightdns=8.8.8.8,8.8.4.4
    
    # Algorithms
    ike=aes256-sha256-modp2048,aes128-sha1-modp1024!
    esp=aes256-sha256,aes128-sha1!
    
    # EAP configuration
    eap_identity=%identity

# /etc/ipsec.secrets
: RSA server.key
alice : EAP "password123"
bob : EAP "securepass456"

# Cisco ASA IKEv2 Configuration
crypto ikev2 policy 10
 encryption aes-256
 integrity sha256
 group 14
 prf sha256
 lifetime seconds 86400

crypto ikev2 keyring KEYRING
 peer PEER1
  address 203.0.113.2
  pre-shared-key MySecretKey123

crypto ikev2 profile PROFILE1
 match identity remote address 203.0.113.2 255.255.255.255
 authentication remote pre-share
 authentication local pre-share
 keyring local KEYRING
 lifetime 3600
 dpd 30 5 periodic

crypto ipsec transform-set ESP-AES256-SHA256 esp-aes-256 esp-sha256-hmac
crypto ipsec profile IPSEC-PROFILE1
 set transform-set ESP-AES256-SHA256
 set ikev2-profile PROFILE1

interface tunnel100
 ip address 10.0.0.1 255.255.255.252
 tunnel source GigabitEthernet0/0
 tunnel destination 203.0.113.2
 tunnel mode ipsec ipv4
 tunnel protection ipsec profile IPSEC-PROFILE1

# Linux ip xfrm (manual IKE testing)
# Add Security Policy Database entries
ip xfrm policy add src 192.168.1.0/24 dst 192.168.2.0/24 dir out \
    tmpl src 203.0.113.1 dst 203.0.113.2 proto esp mode tunnel

ip xfrm policy add src 192.168.2.0/24 dst 192.168.1.0/24 dir in \
    tmpl src 203.0.113.2 dst 203.0.113.1 proto esp mode tunnel

# Add Security Association Database entries  
ip xfrm state add src 203.0.113.1 dst 203.0.113.2 proto esp spi 0x1000 \
    enc aes 0x606162636465666768696a6b6c6d6e6f7071727374757677 \
    auth sha256 0x606162636465666768696a6b6c6d6e6f70717273747576777879

ip xfrm state add src 203.0.113.2 dst 203.0.113.1 proto esp spi 0x2000 \
    enc aes 0x606162636465666768696a6b6c6d6e6f7071727374757677 \
    auth sha256 0x606162636465666768696a6b6c6d6e6f70717273747576777879

# Windows PowerShell VPN Configuration
# Create VPN connection with IKEv2
Add-VpnConnection -Name "Corporate VPN" \
    -ServerAddress "vpn.example.com" \
    -TunnelType Ikev2 \
    -AuthenticationMethod EAP \
    -EncryptionLevel Maximum \
    -SplitTunneling $false

# Set EAP configuration
Set-VpnConnectionIPsecConfiguration -ConnectionName "Corporate VPN" \
    -AuthenticationTransformConstants SHA256128 \
    -CipherTransformConstants AES256 \
    -DHGroup Group14 \
    -IntegrityCheckMethod SHA256 \
    -PfsGroup Group14 \
    -EncryptionMethod AES256

# Connect to VPN
rasdial "Corporate VPN" username password`,
        explanation: "IKE configuration examples for various platforms and devices."
      },
      {
        title: "IKE Monitoring and Troubleshooting",
        code: `# StrongSwan IKE Monitoring Commands

# Show IKE status
ipsec status
ipsec statusall

# Show active connections
ipsec listconnections
ipsec listsas

# Show certificates
ipsec listcerts
ipsec listcacerts

# Show algorithms
ipsec listalgs

# Debug IKE negotiation
ipsec up connection-name --debug

# Monitor IKE logs
tail -f /var/log/charon.log
journalctl -f -u strongswan

# IKE packet capture analysis
tcpdump -i any -n port 500 or port 4500

# Python IKE packet parser
import struct
import socket

class IKEParser:
    def __init__(self):
        self.payload_types = {
            0: "NONE",
            1: "Security Association",
            2: "Proposal", 
            3: "Transform",
            4: "Key Exchange",
            5: "Identification",
            6: "Certificate",
            7: "Certificate Request",
            8: "Hash",
            9: "Signature",
            10: "Nonce",
            11: "Notification",
            12: "Delete",
            13: "Vendor ID"
        }
        
        self.exchange_types = {
            0: "NONE",
            1: "Base",
            2: "Identity Protection (Main Mode)",
            3: "Authentication Only",
            4: "Aggressive",
            5: "Informational",
            32: "Quick Mode"
        }
    
    def parse_isakmp_header(self, data):
        """Parse ISAKMP header (28 bytes)"""
        if len(data) < 28:
            return None
            
        header = struct.unpack('!8s8sIBBBBII', data[:28])
        
        return {
            'initiator_cookie': header[0].hex(),
            'responder_cookie': header[1].hex(),
            'next_payload': header[2],
            'version': (header[3] >> 4, header[3] & 0xF),
            'exchange_type': header[4],
            'flags': header[5],
            'message_id': header[6],
            'length': header[7]
        }
    
    def parse_payload(self, data, offset):
        """Parse IKE payload"""
        if offset + 4 > len(data):
            return None, offset
            
        next_payload, reserved, length = struct.unpack('!BBH', data[offset:offset+4])
        
        if offset + length > len(data):
            return None, offset
            
        payload_data = data[offset+4:offset+length]
        
        payload = {
            'type': next_payload,
            'type_name': self.payload_types.get(next_payload, f"Unknown ({next_payload})"),
            'length': length,
            'data': payload_data
        }
        
        return payload, offset + length
    
    def parse_packet(self, data):
        """Parse complete IKE packet"""
        header = self.parse_isakmp_header(data)
        if not header:
            return None
            
        payloads = []
        offset = 28
        next_payload = header['next_payload']
        
        while next_payload != 0 and offset < len(data):
            payload, offset = self.parse_payload(data, offset)
            if payload:
                payloads.append(payload)
                next_payload = payload['type']
            else:
                break
        
        return {
            'header': header,
            'payloads': payloads
        }
    
    def analyze_exchange(self, packet):
        """Analyze IKE exchange type and phase"""
        if not packet or 'header' not in packet:
            return "Invalid packet"
            
        header = packet['header']
        exchange_type = header['exchange_type']
        message_id = header['message_id']
        
        analysis = {
            'exchange_name': self.exchange_types.get(exchange_type, f"Unknown ({exchange_type})"),
            'phase': 1 if exchange_type in [2, 4] else 2 if exchange_type == 32 else 0,
            'message_id': message_id,
            'flags': {
                'encryption': bool(header['flags'] & 0x01),
                'commit': bool(header['flags'] & 0x02),
                'auth_only': bool(header['flags'] & 0x04)
            }
        }
        
        return analysis

# IKE monitoring script
def monitor_ike_traffic():
    """Monitor IKE traffic on the network"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_UDP)
    sock.bind(('', 500))
    
    parser = IKEParser()
    
    print("Monitoring IKE traffic on port 500...")
    
    while True:
        try:
            data, addr = sock.recvfrom(65536)
            
            # Skip IP header (assume 20 bytes)
            udp_data = data[20:]
            
            # Skip UDP header (8 bytes)
            ike_data = udp_data[8:]
            
            packet = parser.parse_packet(ike_data)
            if packet:
                analysis = parser.analyze_exchange(packet)
                
                print(f"\\nIKE packet from {addr[0]}:")
                print(f"  Exchange: {analysis['exchange_name']}")
                print(f"  Phase: {analysis['phase']}")
                print(f"  Message ID: {analysis['message_id']}")
                print(f"  Encrypted: {analysis['flags']['encryption']}")
                print(f"  Payloads: {len(packet['payloads'])}")
                
                for i, payload in enumerate(packet['payloads']):
                    print(f"    {i+1}. {payload['type_name']} ({payload['length']} bytes)")
                    
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Error: {e}")
    
    sock.close()

# IKE connection troubleshooting script
def diagnose_ike_connection(peer_ip, local_ip=None):
    """Diagnose IKE connectivity issues"""
    print(f"Diagnosing IKE connection to {peer_ip}")
    print("=" * 50)
    
    # Test UDP 500 connectivity
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(5)
        sock.connect((peer_ip, 500))
        print("✓ UDP 500 connectivity: OK")
        sock.close()
    except Exception as e:
        print(f"✗ UDP 500 connectivity: FAILED ({e})")
    
    # Test UDP 4500 connectivity (NAT-T)
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(5)
        sock.connect((peer_ip, 4500))
        print("✓ UDP 4500 connectivity: OK")
        sock.close()
    except Exception as e:
        print(f"✗ UDP 4500 connectivity: FAILED ({e})")
    
    # Check IPsec policies
    import subprocess
    try:
        result = subprocess.run(['ip', 'xfrm', 'policy'], 
                              capture_output=True, text=True)
        if peer_ip in result.stdout:
            print("✓ IPsec policies: Found")
        else:
            print("✗ IPsec policies: Not found")
    except:
        print("? IPsec policies: Unable to check")
    
    # Check security associations
    try:
        result = subprocess.run(['ip', 'xfrm', 'state'], 
                              capture_output=True, text=True)
        if peer_ip in result.stdout:
            print("✓ Security associations: Found")
        else:
            print("✗ Security associations: Not found")
    except:
        print("? Security associations: Unable to check")
    
    # Check StrongSwan status
    try:
        result = subprocess.run(['ipsec', 'status'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ StrongSwan: Running")
            if peer_ip in result.stdout:
                print("✓ Connection to peer: Established")
            else:
                print("✗ Connection to peer: Not established")
        else:
            print("✗ StrongSwan: Not running")
    except:
        print("? StrongSwan: Unable to check")

# Usage
# monitor_ike_traffic()
# diagnose_ike_connection("203.0.113.2")`,
        explanation: "IKE monitoring, troubleshooting, and packet analysis tools."
      }
    ],
    diagrams: [
      {
        src: "/ike_protocol.png",
        alt: "IKE protocol phases",
        caption: "IKE protocol phases and message exchange flow"
      },
      {
        src: "/ike_architecture.jpg",
        alt: "IKE and IPSec architecture",
        caption: "IKE role in IPSec VPN architecture and security associations"
      }
    ],
    relatedProtocols: ["ipsec", "esp", "ah", "x509"],
    resources: [
      {
        title: "RFC 7296 - Internet Key Exchange Protocol Version 2 (IKEv2)",
        url: "https://tools.ietf.org/html/rfc7296",
        type: "RFC"
      },
      {
        title: "RFC 2409 - The Internet Key Exchange (IKE)",
        url: "https://tools.ietf.org/html/rfc2409",
        type: "RFC"
      },
      {
        title: "StrongSwan VPN Documentation",
        url: "https://strongswan.org/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Strong pre-shared keys",
      "Certificate validation",
      "DDoS protection",
      "Dead peer detection",
      "Perfect Forward Secrecy",
      "Algorithm selection",
      "Key lifecycle management",
      "Regular security audits"
    ]
  }