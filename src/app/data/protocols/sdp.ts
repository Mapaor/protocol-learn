import { Protocol } from "../../types/protocol";

export const SDP: Protocol = {
    id: "sdp",
    name: "SDP",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Sockets Direct Protocol for high-performance RDMA networking",
    fullDescription: "SDP (Sockets Direct Protocol) is a networking protocol that supports stream connections over InfiniBand fabric. It provides a standard socket interface while leveraging RDMA capabilities for high-performance, low-latency communication in cluster and data center environments.",
    port: "Various (application dependent)",
    versions: ["SDP 1.0", "SDP 1.1"],
    advantages: [
      "Standard socket API compatibility",
      "RDMA performance benefits",
      "Zero-copy data transfers",
      "CPU offload capabilities",
      "Low latency communication",
      "High bandwidth utilization",
      "Existing application support",
      "Transparent acceleration"
    ],
    disadvantages: [
      "InfiniBand hardware dependency",
      "Limited platform support",
      "Configuration complexity",
      "Memory registration overhead",
      "Debugging challenges",
      "Limited adoption",
      "Compatibility issues",
      "Performance tuning requirements"
    ],
    useCases: [
      "High-performance computing",
      "Database clusters",
      "Distributed storage systems",
      "Financial trading platforms",
      "Scientific computing",
      "Big data analytics",
      "Machine learning clusters",
      "Virtualization infrastructure",
      "Cloud computing backends",
      "Real-time systems",
      "Message passing applications",
      "Stream processing"
    ],
    examples: [
      {
        title: "SDP Socket Programming",
        code: `// C SDP socket example
#include <sys/socket.h>
#include <netinet/in.h>
#include <infiniband/sdp_inet.h>

// SDP socket creation
int create_sdp_socket() {
    // Use AF_INET_SDP family for SDP
    int sock = socket(AF_INET_SDP, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("SDP socket creation failed");
        return -1;
    }
    
    // Set socket options for optimization
    int opt = 1;
    setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    
    // Buffer size optimization
    int buf_size = 1024 * 1024; // 1MB
    setsockopt(sock, SOL_SOCKET, SO_SNDBUF, &buf_size, sizeof(buf_size));
    setsockopt(sock, SOL_SOCKET, SO_RCVBUF, &buf_size, sizeof(buf_size));
    
    return sock;
}

// SDP server implementation
int sdp_server(int port) {
    int server_sock = create_sdp_socket();
    if (server_sock < 0) return -1;
    
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(port);
    
    if (bind(server_sock, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("SDP bind failed");
        close(server_sock);
        return -1;
    }
    
    if (listen(server_sock, 10) < 0) {
        perror("SDP listen failed");
        close(server_sock);
        return -1;
    }
    
    printf("SDP server listening on port %d\\n", port);
    
    while (1) {
        struct sockaddr_in client_addr;
        socklen_t addr_len = sizeof(client_addr);
        
        int client_sock = accept(server_sock, 
                               (struct sockaddr*)&client_addr, &addr_len);
        if (client_sock < 0) {
            perror("SDP accept failed");
            continue;
        }
        
        // Handle client connection
        handle_client(client_sock);
        close(client_sock);
    }
    
    close(server_sock);
    return 0;
}

// SDP client implementation
int sdp_client(const char* server_ip, int port) {
    int client_sock = create_sdp_socket();
    if (client_sock < 0) return -1;
    
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, server_ip, &addr.sin_addr);
    
    if (connect(client_sock, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("SDP connect failed");
        close(client_sock);
        return -1;
    }
    
    printf("Connected to SDP server %s:%d\\n", server_ip, port);
    
    // Send/receive data
    char buffer[1024];
    send(client_sock, "Hello SDP!", 10, 0);
    recv(client_sock, buffer, sizeof(buffer), 0);
    
    close(client_sock);
    return 0;
}`,
        explanation: "SDP socket programming with standard socket API."
      },
      {
        title: "SDP Configuration",
        code: `# SDP configuration file (/etc/libsdp.conf)

# Socket family mapping rules
# Map TCP sockets to SDP for specific addresses/ports

# Map all TCP connections to SDP
use both server * *:*
use both client * *:*

# Map specific application to SDP
use sdp server 192.168.100.* 8080
use sdp client 192.168.100.* 8080

# Map specific port range to SDP
use sdp both * 5000-6000

# Exclude certain connections from SDP
except tcp server * 22    # SSH
except tcp server * 80    # HTTP
except tcp server * 443   # HTTPS

# Performance tuning options
options {
    sdp_buff_size = 1048576      # 1MB buffer
    sdp_nodelay = 1              # Disable Nagle algorithm
    sdp_keepalive = 1            # Enable keepalive
    sdp_keepalive_time = 7200    # Keepalive time
    sdp_keepalive_intvl = 75     # Keepalive interval
    sdp_keepalive_probes = 9     # Keepalive probes
}

# Environment variables for SDP
export LIBSDP_CONFIG_FILE=/etc/libsdp.conf
export LD_PRELOAD=libsdp.so

# Running applications with SDP
# Method 1: LD_PRELOAD
LD_PRELOAD=libsdp.so ./my_application

# Method 2: sdp_inet wrapper
sdp_inet ./my_application

# Method 3: Direct linking
gcc -o app app.c -lsdp

# SDP statistics and monitoring
# Check SDP connections
ss -s | grep sdp
netstat -i | grep sdp

# SDP performance monitoring script
#!/bin/bash

SDP_STATS_FILE="/proc/net/sdp_stats"

if [ -f "$SDP_STATS_FILE" ]; then
    echo "SDP Statistics:"
    cat $SDP_STATS_FILE
else
    echo "SDP statistics not available"
fi

# Monitor SDP socket usage
echo "Active SDP sockets:"
ss -A sdp

# Check SDP module status
lsmod | grep sdp

# SDP debugging
echo "SDP debug information:"
dmesg | grep -i sdp | tail -10`,
        explanation: "SDP configuration and application integration setup."
      },
      {
        title: "SDP Performance Optimization",
        code: `// SDP performance optimization techniques

#include <sys/socket.h>
#include <infiniband/sdp_inet.h>

int optimize_sdp_socket(int sock) {
    int ret = 0;
    
    // Disable Nagle algorithm for low latency
    int nodelay = 1;
    ret = setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, 
                     &nodelay, sizeof(nodelay));
    if (ret < 0) {
        perror("TCP_NODELAY failed");
        return ret;
    }
    
    // Set large buffer sizes
    int send_buf = 2 * 1024 * 1024;  // 2MB
    int recv_buf = 2 * 1024 * 1024;  // 2MB
    
    ret = setsockopt(sock, SOL_SOCKET, SO_SNDBUF, 
                     &send_buf, sizeof(send_buf));
    ret = setsockopt(sock, SOL_SOCKET, SO_RCVBUF, 
                     &recv_buf, sizeof(recv_buf));
    
    // Enable keepalive for connection management
    int keepalive = 1;
    ret = setsockopt(sock, SOL_SOCKET, SO_KEEPALIVE, 
                     &keepalive, sizeof(keepalive));
    
    // Set keepalive parameters
    int keepidle = 600;   // 10 minutes
    int keepintvl = 60;   // 1 minute
    int keepcnt = 3;      // 3 probes
    
    setsockopt(sock, IPPROTO_TCP, TCP_KEEPIDLE, &keepidle, sizeof(keepidle));
    setsockopt(sock, IPPROTO_TCP, TCP_KEEPINTVL, &keepintvl, sizeof(keepintvl));
    setsockopt(sock, IPPROTO_TCP, TCP_KEEPCNT, &keepcnt, sizeof(keepcnt));
    
    return 0;
}

// High-performance data transfer
ssize_t sdp_bulk_transfer(int sock, void* data, size_t size) {
    const size_t CHUNK_SIZE = 64 * 1024;  // 64KB chunks
    size_t total_sent = 0;
    char* ptr = (char*)data;
    
    while (total_sent < size) {
        size_t remaining = size - total_sent;
        size_t to_send = (remaining > CHUNK_SIZE) ? CHUNK_SIZE : remaining;
        
        ssize_t sent = send(sock, ptr + total_sent, to_send, MSG_NOSIGNAL);
        if (sent <= 0) {
            if (sent == 0) {
                // Connection closed
                break;
            } else if (errno == EAGAIN || errno == EWOULDBLOCK) {
                // Would block, retry
                continue;
            } else {
                // Error
                return -1;
            }
        }
        
        total_sent += sent;
    }
    
    return total_sent;
}

// Python SDP wrapper
import ctypes
import socket
import os

class SDPSocket:
    def __init__(self):
        # Load SDP library
        try:
            self.libsdp = ctypes.CDLL("libsdp.so")
        except OSError:
            raise RuntimeError("SDP library not found")
        
        # Create SDP socket
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Apply SDP optimization
        self.sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 2*1024*1024)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 2*1024*1024)
    
    def connect(self, address):
        return self.sock.connect(address)
    
    def bind(self, address):
        return self.sock.bind(address)
    
    def listen(self, backlog=5):
        return self.sock.listen(backlog)
    
    def accept(self):
        return self.sock.accept()
    
    def send(self, data):
        return self.sock.send(data)
    
    def recv(self, bufsize):
        return self.sock.recv(bufsize)
    
    def close(self):
        return self.sock.close()

# Usage
os.environ['LD_PRELOAD'] = 'libsdp.so'
sdp_sock = SDPSocket()`,
        explanation: "SDP performance optimization and Python wrapper implementation."
      }
    ],
    diagrams: [
      {
        src: "/sdp_architecture.png",
        alt: "SDP architecture",
        caption: "SDP protocol architecture over InfiniBand fabric"
      },
      {
        src: "/sdp_vs_tcp.jpg",
        alt: "SDP vs TCP comparison",
        caption: "Performance comparison between SDP and traditional TCP"
      }
    ],
    relatedProtocols: ["infiniband", "rdma", "tcp", "roce"],
    resources: [
      {
        title: "SDP Specification",
        url: "https://www.infinibandta.org/ibta-specification/",
        type: "Specification"
      },
      {
        title: "OpenFabrics SDP Documentation",
        url: "https://www.openfabrics.org/",
        type: "Documentation"
      },
      {
        title: "InfiniBand SDP Programming Guide",
        url: "https://www.mellanox.com/",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "InfiniBand fabric security",
      "Application-level authentication",
      "Network segmentation",
      "Access control lists",
      "Monitoring and logging",
      "Secure key management",
      "Physical security",
      "Firmware updates"
    ]
  }