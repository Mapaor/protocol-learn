import { Protocol } from "../../types/protocol";

export const TURN: Protocol = {
    id: "turn",
    name: "TURN",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Traversal Using Relays around NAT for media relay when direct connection fails",
    fullDescription: "TURN (Traversal Using Relays around NAT) is a protocol that serves as the other way around the NAT connectivity problem. TURN does not attempt to establish a direct path between the two peers. Instead, both endpoints send their media to a TURN server which forwards it to the other party. This ensures that a connection can be established even in very restrictive network environments.",
    port: "3478 (UDP/TCP), 5349 (TLS), 443 (HTTPS)",
    versions: ["TURN (RFC 5766)", "TURN-TCP (RFC 6062)", "TURN Extensions (RFC 7635)"],
    advantages: [
      "Works with symmetric NATs",
      "Guaranteed connectivity",
      "Supports TCP and UDP",
      "Authentication mechanisms",
      "Bandwidth control",
      "Firewall traversal",
      "Multiple transport protocols",
      "Reliable fallback option"
    ],
    disadvantages: [
      "Higher bandwidth consumption",
      "Server infrastructure costs",
      "Increased latency",
      "Single point of failure",
      "Scaling challenges",
      "Security considerations",
      "Complex deployment",
      "Authentication overhead"
    ],
    useCases: [
      "WebRTC media relay",
      "VoIP in restrictive networks",
      "Video conferencing",
      "P2P file sharing",
      "Online gaming",
      "IoT device communication",
      "Corporate firewalls",
      "Mobile applications",
      "Real-time collaboration",
      "Remote desktop access",
      "Live streaming",
      "Voice assistants"
    ],
    examples: [
      {
        title: "TURN Protocol Messages and Allocation",
        code: `# TURN Protocol Operation

# TURN Message Types (extends STUN)
0x003 - Allocate Request
0x103 - Allocate Success Response
0x113 - Allocate Error Response

0x004 - Refresh Request  
0x104 - Refresh Success Response
0x114 - Refresh Error Response

0x006 - Send Indication
0x007 - Data Indication

0x008 - CreatePermission Request
0x108 - CreatePermission Success Response
0x118 - CreatePermission Error Response

0x009 - ChannelBind Request
0x109 - ChannelBind Success Response  
0x119 - ChannelBind Error Response

# TURN Attributes (extends STUN attributes)
0x000C - CHANNEL-NUMBER
0x000D - LIFETIME
0x0010 - BANDWIDTH (deprecated)
0x0012 - XOR-PEER-ADDRESS
0x0013 - DATA
0x0016 - XOR-RELAYED-ADDRESS
0x0017 - REQUESTED-TRANSPORT
0x0018 - DONT-FRAGMENT
0x0019 - RESERVATION-TOKEN
0x001A - PRIORITY (ICE)

# TURN Allocation Process
1. Client -> TURN Server: Allocate Request
   - REQUESTED-TRANSPORT attribute (UDP=17, TCP=6)
   - Optional: LIFETIME, BANDWIDTH
   - Authentication required

2. TURN Server -> Client: Allocate Success Response
   - XOR-RELAYED-ADDRESS (allocated IP:port)
   - LIFETIME (allocation duration)
   - XOR-MAPPED-ADDRESS (client's public address)

3. Permission Creation:
   Client -> TURN Server: CreatePermission Request
   - XOR-PEER-ADDRESS (allowed peer addresses)

4. Data Relay:
   a) Send Indication Method:
      Client -> TURN Server: Send Indication
      - XOR-PEER-ADDRESS (destination)
      - DATA (payload)
   
   b) Channel Data Method:
      Client -> TURN Server: ChannelData Message
      - Channel Number (2 bytes)
      - Length (2 bytes)  
      - Application Data

# TURN Authentication
- Long-term credential mechanism
- Username/password or shared secret
- MESSAGE-INTEGRITY attribute (HMAC-SHA1)
- NONCE for replay protection

# Example TURN Allocate Request
TURN Message:
- Message Type: 0x003 (Allocate Request)
- Message Length: variable
- Magic Cookie: 0x2112A442
- Transaction ID: 96-bit random

Attributes:
- REQUESTED-TRANSPORT: 17 (UDP)
- USERNAME: "user@domain.com"
- REALM: "turn.example.com"
- NONCE: "random_nonce_value"
- MESSAGE-INTEGRITY: HMAC-SHA1 hash

# Channel Data Format
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Channel Number        |            Length             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
/                       Application Data                        /
/                                                               /
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`,
        explanation: "TURN protocol messages, allocation process, and data relay mechanisms."
      },
      {
        title: "TURN Client Implementation",
        code: `// JavaScript TURN client implementation
class TURNClient {
    constructor(serverConfig) {
        this.server = serverConfig.urls;
        this.username = serverConfig.username;
        this.credential = serverConfig.credential;
        this.socket = null;
        this.allocation = null;
        this.permissions = new Map();
        this.channels = new Map();
        this.realm = null;
        this.nonce = null;
    }

    async allocate(transport = 'UDP') {
        try {
            // Connect to TURN server
            await this.connect();
            
            // Send Allocate request
            const request = this.createAllocateRequest(transport);
            const response = await this.sendRequest(request);
            
            if (response.success) {
                this.allocation = {
                    relayedAddress: response.relayedAddress,
                    mappedAddress: response.mappedAddress,
                    lifetime: response.lifetime
                };
                
                console.log('TURN allocation successful:', this.allocation);
                return this.allocation;
            } else {
                throw new Error('TURN allocation failed: ' + response.error);
            }
        } catch (error) {
            console.error('TURN allocation error:', error);
            throw error;
        }
    }

    createAllocateRequest(transport) {
        const msgType = 0x003; // Allocate Request
        const transactionId = this.generateTransactionId();
        
        const attributes = [];
        
        // REQUESTED-TRANSPORT attribute
        attributes.push({
            type: 0x0017,
            value: new Uint8Array([transport === 'TCP' ? 6 : 17, 0, 0, 0])
        });
        
        // USERNAME attribute
        if (this.username) {
            const usernameBytes = new TextEncoder().encode(this.username);
            attributes.push({
                type: 0x0006,
                value: usernameBytes
            });
        }
        
        // REALM attribute
        if (this.realm) {
            const realmBytes = new TextEncoder().encode(this.realm);
            attributes.push({
                type: 0x0014,
                value: realmBytes
            });
        }
        
        // NONCE attribute
        if (this.nonce) {
            const nonceBytes = new TextEncoder().encode(this.nonce);
            attributes.push({
                type: 0x0015,
                value: nonceBytes
            });
        }
        
        return this.buildMessage(msgType, attributes, transactionId);
    }

    async createPermission(peerAddress) {
        if (!this.allocation) {
            throw new Error('No active TURN allocation');
        }
        
        const msgType = 0x008; // CreatePermission Request
        const transactionId = this.generateTransactionId();
        
        const attributes = [];
        
        // XOR-PEER-ADDRESS attribute
        const xorPeerAddr = this.createXorAddress(peerAddress, 0x0012);
        attributes.push(xorPeerAddr);
        
        // Add authentication attributes
        this.addAuthAttributes(attributes);
        
        const request = this.buildMessage(msgType, attributes, transactionId);
        const response = await this.sendRequest(request);
        
        if (response.success) {
            this.permissions.set(peerAddress.ip, Date.now() + 300000); // 5 minutes
            console.log('Permission created for:', peerAddress);
        }
        
        return response;
    }

    async bindChannel(peerAddress, channelNumber) {
        if (!this.allocation) {
            throw new Error('No active TURN allocation');
        }
        
        const msgType = 0x009; // ChannelBind Request
        const transactionId = this.generateTransactionId();
        
        const attributes = [];
        
        // CHANNEL-NUMBER attribute
        attributes.push({
            type: 0x000C,
            value: new Uint8Array([
                (channelNumber >> 8) & 0xFF,
                channelNumber & 0xFF,
                0, 0 // Reserved
            ])
        });
        
        // XOR-PEER-ADDRESS attribute
        const xorPeerAddr = this.createXorAddress(peerAddress, 0x0012);
        attributes.push(xorPeerAddr);
        
        // Add authentication attributes
        this.addAuthAttributes(attributes);
        
        const request = this.buildMessage(msgType, attributes, transactionId);
        const response = await this.sendRequest(request);
        
        if (response.success) {
            this.channels.set(channelNumber, peerAddress);
            console.log('Channel bound:', channelNumber, 'to', peerAddress);
        }
        
        return response;
    }

    sendData(peerAddress, data, useChannel = true) {
        if (!this.allocation) {
            throw new Error('No active TURN allocation');
        }
        
        // Find channel for peer
        let channelNumber = null;
        for (const [channel, addr] of this.channels.entries()) {
            if (addr.ip === peerAddress.ip && addr.port === peerAddress.port) {
                channelNumber = channel;
                break;
            }
        }
        
        if (useChannel && channelNumber !== null) {
            // Use Channel Data method
            this.sendChannelData(channelNumber, data);
        } else {
            // Use Send Indication method
            this.sendIndication(peerAddress, data);
        }
    }

    sendChannelData(channelNumber, data) {
        // Channel Data message format
        const header = new ArrayBuffer(4);
        const view = new DataView(header);
        
        view.setUint16(0, channelNumber, false); // Channel Number
        view.setUint16(2, data.length, false);   // Length
        
        // Combine header and data
        const message = new Uint8Array(header.byteLength + data.length);
        message.set(new Uint8Array(header), 0);
        message.set(data, header.byteLength);
        
        this.socket.send(message);
    }

    sendIndication(peerAddress, data) {
        const msgType = 0x006; // Send Indication
        const transactionId = this.generateTransactionId();
        
        const attributes = [];
        
        // XOR-PEER-ADDRESS attribute
        const xorPeerAddr = this.createXorAddress(peerAddress, 0x0012);
        attributes.push(xorPeerAddr);
        
        // DATA attribute
        attributes.push({
            type: 0x0013,
            value: data
        });
        
        const indication = this.buildMessage(msgType, attributes, transactionId);
        this.socket.send(indication);
    }

    async refresh(lifetime = 600) {
        if (!this.allocation) {
            throw new Error('No active TURN allocation');
        }
        
        const msgType = 0x004; // Refresh Request
        const transactionId = this.generateTransactionId();
        
        const attributes = [];
        
        // LIFETIME attribute
        attributes.push({
            type: 0x000D,
            value: new Uint8Array([
                (lifetime >> 24) & 0xFF,
                (lifetime >> 16) & 0xFF,
                (lifetime >> 8) & 0xFF,
                lifetime & 0xFF
            ])
        });
        
        // Add authentication attributes
        this.addAuthAttributes(attributes);
        
        const request = this.buildMessage(msgType, attributes, transactionId);
        const response = await this.sendRequest(request);
        
        if (response.success) {
            this.allocation.lifetime = response.lifetime;
            console.log('TURN allocation refreshed, new lifetime:', response.lifetime);
        }
        
        return response;
    }

    deallocate() {
        // Send refresh with lifetime 0 to deallocate
        return this.refresh(0);
    }

    // Helper methods
    createXorAddress(address, attrType) {
        // Implementation depends on IPv4/IPv6
        const family = address.ip.includes(':') ? 0x02 : 0x01;
        
        if (family === 0x01) { // IPv4
            const port = address.port ^ (0x2112A442 >> 16);
            const ipBytes = address.ip.split('.').map(x => parseInt(x));
            const ipInt = (ipBytes[0] << 24) | (ipBytes[1] << 16) | (ipBytes[2] << 8) | ipBytes[3];
            const xorIp = ipInt ^ 0x2112A442;
            
            const value = new Uint8Array(8);
            value[0] = 0; // Reserved
            value[1] = family;
            value[2] = (port >> 8) & 0xFF;
            value[3] = port & 0xFF;
            value[4] = (xorIp >> 24) & 0xFF;
            value[5] = (xorIp >> 16) & 0xFF;
            value[6] = (xorIp >> 8) & 0xFF;
            value[7] = xorIp & 0xFF;
            
            return { type: attrType, value };
        }
        
        throw new Error('IPv6 not implemented');
    }

    addAuthAttributes(attributes) {
        if (this.username) {
            attributes.push({
                type: 0x0006,
                value: new TextEncoder().encode(this.username)
            });
        }
        
        if (this.realm) {
            attributes.push({
                type: 0x0014,
                value: new TextEncoder().encode(this.realm)
            });
        }
        
        if (this.nonce) {
            attributes.push({
                type: 0x0015,
                value: new TextEncoder().encode(this.nonce)
            });
        }
        
        // MESSAGE-INTEGRITY would be calculated here
        // Simplified for brevity
    }

    generateTransactionId() {
        const id = new Uint8Array(12);
        crypto.getRandomValues(id);
        return id;
    }

    buildMessage(msgType, attributes, transactionId) {
        // Calculate total length
        let totalLength = 0;
        for (const attr of attributes) {
            totalLength += 4 + attr.value.length;
            // Add padding to 4-byte boundary
            totalLength += (4 - (attr.value.length % 4)) % 4;
        }
        
        // Build message
        const message = new ArrayBuffer(20 + totalLength);
        const view = new DataView(message);
        
        // STUN/TURN header
        view.setUint16(0, msgType, false);
        view.setUint16(2, totalLength, false);
        view.setUint32(4, 0x2112A442, false); // Magic Cookie
        
        // Transaction ID
        for (let i = 0; i < 12; i++) {
            view.setUint8(8 + i, transactionId[i]);
        }
        
        // Attributes
        let offset = 20;
        for (const attr of attributes) {
            view.setUint16(offset, attr.type, false);
            view.setUint16(offset + 2, attr.value.length, false);
            
            const attrArray = new Uint8Array(message, offset + 4, attr.value.length);
            attrArray.set(attr.value);
            
            offset += 4 + attr.value.length;
            
            // Add padding
            const padding = (4 - (attr.value.length % 4)) % 4;
            offset += padding;
        }
        
        return new Uint8Array(message);
    }

    async connect() {
        // WebSocket connection for demonstration
        // Real implementation would use UDP/TCP sockets
        return new Promise((resolve, reject) => {
            this.socket = new WebSocket(this.server);
            this.socket.onopen = () => resolve();
            this.socket.onerror = (error) => reject(error);
        });
    }

    async sendRequest(request) {
        return new Promise((resolve, reject) => {
            this.socket.send(request);
            
            this.socket.onmessage = (event) => {
                const response = this.parseResponse(event.data);
                resolve(response);
            };
            
            setTimeout(() => {
                reject(new Error('Request timeout'));
            }, 5000);
        });
    }

    parseResponse(data) {
        // Parse TURN response message
        // Simplified implementation
        return { success: true, relayedAddress: { ip: '203.0.113.1', port: 49152 } };
    }
}

// Usage example
const turnConfig = {
    urls: 'turn:turn.example.com:3478',
    username: 'user@domain.com',
    credential: 'password123'
};

const turnClient = new TURNClient(turnConfig);

// Allocate TURN relay
turnClient.allocate('UDP').then(allocation => {
    console.log('TURN relay allocated:', allocation);
    
    // Create permission for peer
    const peerAddress = { ip: '192.168.1.100', port: 12345 };
    return turnClient.createPermission(peerAddress);
}).then(() => {
    // Send data to peer
    const data = new TextEncoder().encode('Hello peer!');
    turnClient.sendData({ ip: '192.168.1.100', port: 12345 }, data);
}).catch(error => {
    console.error('TURN client error:', error);
});`,
        explanation: "Complete TURN client implementation with allocation, permissions, and data relay."
      },
      {
        title: "TURN Server Setup and Configuration",
        code: `# coturn TURN Server Configuration
# /etc/turnserver.conf

# Basic server configuration
listening-port=3478
tls-listening-port=5349
alt-listening-port=443
alt-tls-listening-port=5349

# IP addresses
listening-ip=0.0.0.0
relay-ip=203.0.113.1
external-ip=203.0.113.1

# Authentication
use-auth-secret
static-auth-secret=MyTurnSecret123
realm=turn.example.com

# User database (alternative to auth-secret)
# userdb=/var/lib/turn/turndb
# user=alice:password123
# user=bob:password456

# Security features
fingerprint
stale-nonce=600
max-bps=1000000
bps-capacity=1000000
total-quota=100
user-quota=10

# TLS/SSL certificates
cert=/etc/ssl/certs/turn.crt
pkey=/etc/ssl/private/turn.key
dh-file=/etc/ssl/dh2048.pem

# Networking
no-multicast-peers
no-loopback-peers
no-tcp-relay
denied-peer-ip=10.0.0.0-10.255.255.255
denied-peer-ip=192.168.0.0-192.168.255.255
denied-peer-ip=172.16.0.0-172.31.255.255
denied-peer-ip=127.0.0.0-127.255.255.255
denied-peer-ip=169.254.0.0-169.254.255.255

# Logging
verbose
log-file=/var/log/turnserver.log
pidfile=/var/run/turnserver.pid
no-stdout-log

# Performance tuning
max-allocate-lifetime=3600
default-allocate-lifetime=600
channel-lifetime=600
permission-lifetime=300

# Database for persistent storage
# redis-userdb="ip=127.0.0.1 dbname=0 password=turn connect_timeout=30"
# redis-statsdb="ip=127.0.0.1 dbname=1 password=turn connect_timeout=30"

# Web admin interface
web-admin
web-admin-ip=127.0.0.1
web-admin-port=8080

# Docker Compose for TURN server
version: '3.8'
services:
  coturn:
    image: coturn/coturn:latest
    container_name: turn-server
    restart: unless-stopped
    ports:
      - "3478:3478/udp"
      - "3478:3478/tcp"
      - "5349:5349/tcp"
      - "443:443/tcp"
      - "49152-65535:49152-65535/udp"
    volumes:
      - ./turnserver.conf:/etc/coturn/turnserver.conf:ro
      - ./ssl:/etc/ssl:ro
      - ./logs:/var/log
    environment:
      - TURN_USERNAME=admin
      - TURN_PASSWORD=secure_password
    command: ["-c", "/etc/coturn/turnserver.conf"]

# Nginx reverse proxy for TURN over HTTPS
server {
    listen 443 ssl http2;
    server_name turn.example.com;
    
    ssl_certificate /etc/ssl/certs/turn.crt;
    ssl_certificate_key /etc/ssl/private/turn.key;
    
    location / {
        proxy_pass http://127.0.0.1:3478;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# TURN server monitoring script
#!/bin/bash

TURN_SERVER="turn.example.com"
TURN_PORT="3478"
USERNAME="testuser"
PASSWORD="testpass"

check_turn_server() {
    echo "Checking TURN server: $TURN_SERVER:$TURN_PORT"
    
    # Test UDP connectivity
    nc -u -z $TURN_SERVER $TURN_PORT
    if [ $? -eq 0 ]; then
        echo "✓ UDP port $TURN_PORT is reachable"
    else
        echo "✗ UDP port $TURN_PORT is not reachable"
    fi
    
    # Test TCP connectivity
    nc -z $TURN_SERVER $TURN_PORT
    if [ $? -eq 0 ]; then
        echo "✓ TCP port $TURN_PORT is reachable"
    else
        echo "✗ TCP port $TURN_PORT is not reachable"
    fi
    
    # Test TURN allocation using turnutils
    if command -v turnutils_uclient &> /dev/null; then
        echo "Testing TURN allocation..."
        turnutils_uclient -T -u $USERNAME -w $PASSWORD $TURN_SERVER -p $TURN_PORT
    else
        echo "turnutils_uclient not found, install coturn-utils"
    fi
}

monitor_turn_stats() {
    # Monitor TURN server statistics
    echo "TURN Server Statistics:"
    echo "======================"
    
    # Check active allocations
    ALLOCATIONS=$(ss -tulpn | grep :3478 | wc -l)
    echo "Active connections: $ALLOCATIONS"
    
    # Check log for recent activity
    if [ -f /var/log/turnserver.log ]; then
        echo "Recent TURN activity:"
        tail -n 20 /var/log/turnserver.log | grep -E "(Allocate|CreatePermission|ChannelBind)"
    fi
    
    # Check system resources
    echo "System Resources:"
    echo "Memory usage: $(free -h | grep '^Mem' | awk '{print $3 "/" $2}')"
    echo "CPU usage: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//')"
    echo "Disk usage: $(df -h / | tail -1 | awk '{print $5}')"
}

# Python TURN server monitoring
import requests
import json
import time
from datetime import datetime

class TURNMonitor:
    def __init__(self, server_url, username, password):
        self.server_url = server_url
        self.auth = (username, password)
        
    def get_stats(self):
        """Get TURN server statistics via REST API"""
        try:
            response = requests.get(
                f"{self.server_url}/stats",
                auth=self.auth,
                timeout=10
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return None
                
        except Exception as e:
            print(f"Error getting stats: {e}")
            return None
    
    def monitor_continuous(self, interval=60):
        """Continuously monitor TURN server"""
        print(f"Starting TURN server monitoring (interval: {interval}s)")
        
        while True:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            stats = self.get_stats()
            
            if stats:
                print(f"[{timestamp}] TURN Stats:")
                print(f"  Active allocations: {stats.get('allocations', 0)}")
                print(f"  Total sessions: {stats.get('sessions', 0)}")
                print(f"  Bytes relayed: {stats.get('bytes_relayed', 0)}")
                print(f"  Server uptime: {stats.get('uptime', 'unknown')}")
            else:
                print(f"[{timestamp}] Failed to get TURN stats")
            
            time.sleep(interval)

# Usage
monitor = TURNMonitor("http://turn.example.com:8080", "admin", "password")
monitor.monitor_continuous(30)`,
        explanation: "TURN server configuration using coturn, Docker deployment, and monitoring tools."
      }
    ],
    diagrams: [
      {
        src: "/turn_protocol.png",
        alt: "TURN protocol operation",
        caption: "TURN protocol relay mechanism and data flow"
      },
      {
        src: "/turn_allocation.jpg",
        alt: "TURN allocation process",
        caption: "TURN allocation, permission, and channel binding process"
      }
    ],
    relatedProtocols: ["stun", "ice", "webrtc", "rtp"],
    resources: [
      {
        title: "RFC 5766 - Traversal Using Relays around NAT (TURN)",
        url: "https://tools.ietf.org/html/rfc5766",
        type: "RFC"
      },
      {
        title: "RFC 6062 - Traversal Using Relays around NAT (TURN) Extensions for TCP Allocations",
        url: "https://tools.ietf.org/html/rfc6062",
        type: "RFC"
      },
      {
        title: "coturn TURN Server",
        url: "https://github.com/coturn/coturn",
        type: "Implementation"
      }
    ],
    securityConsiderations: [
      "Strong authentication mechanisms",
      "Rate limiting and quotas",
      "DDoS protection",
      "Secure credential storage",
      "TLS encryption",
      "Access control lists",
      "Regular security updates",
      "Network monitoring"
    ]
  }