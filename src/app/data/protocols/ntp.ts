import { Protocol } from "../../types/protocol";

export const NTP: Protocol = {
    id: "ntp",
    name: "NTP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Network Time Protocol for clock synchronization across networks",
    fullDescription: "NTP (Network Time Protocol) is a networking protocol for clock synchronization between computer systems over packet-switched, variable-latency data networks. It's designed to synchronize all participating computers to within a few milliseconds of Coordinated Universal Time (UTC).",
    port: "123",
    versions: ["NTPv3", "NTPv4"],
    advantages: [
      "High accuracy synchronization",
      "Hierarchical time distribution",
      "Network delay compensation",
      "Multiple time sources",
      "Automatic server selection",
      "Scalable architecture",
      "Robust against failures",
      "Cross-platform support"
    ],
    disadvantages: [
      "Network dependency",
      "Security vulnerabilities",
      "Configuration complexity",
      "Clock drift issues",
      "Single points of failure",
      "Bandwidth overhead",
      "Asymmetric delay problems",
      "Limited precision over WAN"
    ],
    useCases: [
      "System clock synchronization",
      "Log file correlation",
      "Financial transactions",
      "Scientific measurements",
      "Network monitoring",
      "Database synchronization",
      "Security event correlation",
      "Distributed systems",
      "Certificate validation",
      "Compliance requirements",
      "Broadcasting systems",
      "Industrial control"
    ],
    examples: [
      {
        title: "NTP Packet Format",
        code: `# NTP Packet Structure (48 bytes)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|LI | VN  |Mode |    Stratum    |     Poll      |   Precision   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                          Root Delay                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Root Dispersion                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Reference Identifier                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                    Reference Timestamp (64)                  |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                    Originate Timestamp (64)                  |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                     Receive Timestamp (64)                   |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
|                     Transmit Timestamp (64)                  |
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# NTP Modes
1 - Symmetric Active
2 - Symmetric Passive  
3 - Client
4 - Server
6 - Control Message
7 - Private Use

# Stratum Levels
0 - Unspecified/Invalid
1 - Primary Reference (GPS, Atomic Clock)
2-15 - Secondary Reference (Synchronized to Stratum 1)
16 - Unsynchronized`,
        explanation: "NTP packet structure and protocol elements."
      },
      {
        title: "NTP Server Configuration",
        code: `# /etc/ntp.conf - NTP daemon configuration

# Use public NTP servers
server 0.pool.ntp.org iburst
server 1.pool.ntp.org iburst
server 2.pool.ntp.org iburst
server 3.pool.ntp.org iburst

# Fallback servers
server 127.127.1.0     # Local clock
fudge  127.127.1.0 stratum 10

# Allow local network clients
restrict 192.168.1.0 mask 255.255.255.0 nomodify notrap

# Security restrictions
restrict default kod nomodify notrap nopeer noquery
restrict -6 default kod nomodify notrap nopeer noquery

# Local loopback
restrict 127.0.0.1
restrict -6 ::1

# Drift file for clock correction
driftfile /var/lib/ntp/ntp.drift

# Log file
logfile /var/log/ntp.log

# Statistics
statsdir /var/log/ntpstats/
statistics loopstats peerstats clockstats
filegen loopstats file loopstats type day enable
filegen peerstats file peerstats type day enable
filegen clockstats file clockstats type day enable

# Leap second handling
leapfile /var/lib/ntp/leap-seconds.list

# Chrony alternative configuration (/etc/chrony/chrony.conf)
pool 2.pool.ntp.org iburst
driftfile /var/lib/chrony/drift
makestep 1.0 3
rtcsync
keyfile /etc/chrony/chrony.keys
commandkey 1
generatecommandkey
noclientlog
log tracking measurements statistics`,
        explanation: "NTP daemon configuration for server and client setups."
      },
      {
        title: "NTP Client Implementation",
        code: `#!/usr/bin/env python3
import socket
import struct
import time
from datetime import datetime

class NTPClient:
    def __init__(self, server='pool.ntp.org', port=123):
        self.server = server
        self.port = port
        
    def get_ntp_time(self):
        """Query NTP server and calculate time offset"""
        
        # NTP packet format (48 bytes)
        packet = bytearray(48)
        
        # Set version (3) and mode (3 for client)
        packet[0] = 0x1B  # 00|011|011 = LI(0)|VN(3)|Mode(3)
        
        # Send timestamp (T1)
        t1 = time.time()
        
        # Create socket and send request
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.settimeout(10)
            
            # Record send time
            send_time = time.time()
            sock.sendto(packet, (self.server, self.port))
            
            # Receive response
            response, addr = sock.recvfrom(48)
            receive_time = time.time()
        
        # Parse NTP response
        unpacked = struct.unpack('!12I', response)
        
        # Extract timestamps
        # NTP timestamp is seconds since 1900-01-01
        ntp_epoch_offset = 2208988800  # Seconds between 1900 and 1970
        
        # Server transmit timestamp (T3)
        t3_seconds = unpacked[10]
        t3_fraction = unpacked[11]
        t3 = t3_seconds - ntp_epoch_offset + (t3_fraction / 4294967296.0)
        
        # Calculate offset and delay
        # T2 would be server receive time (not easily extractable)
        # Simplified calculation assuming symmetric delay
        offset = ((t3 - send_time) + (t3 - receive_time)) / 2
        delay = (receive_time - send_time)
        
        return {
            'server_time': t3,
            'local_time': receive_time,
            'offset': offset,
            'delay': delay,
            'stratum': (response[1] if len(response) > 1 else 0)
        }
    
    def sync_time(self):
        """Get current synchronized time"""
        try:
            ntp_data = self.get_ntp_time()
            corrected_time = time.time() + ntp_data['offset']
            
            return {
                'success': True,
                'corrected_time': corrected_time,
                'datetime': datetime.fromtimestamp(corrected_time),
                'offset_ms': ntp_data['offset'] * 1000,
                'delay_ms': ntp_data['delay'] * 1000,
                'stratum': ntp_data['stratum']
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

# Usage example
def main():
    # Test multiple NTP servers
    servers = [
        'pool.ntp.org',
        'time.google.com',
        'time.cloudflare.com',
        'time.nist.gov'
    ]
    
    for server in servers:
        print(f"\\nQuerying {server}:")
        client = NTPClient(server)
        result = client.sync_time()
        
        if result['success']:
            print(f"  Current time: {result['datetime']}")
            print(f"  Time offset: {result['offset_ms']:.2f} ms")
            print(f"  Network delay: {result['delay_ms']:.2f} ms")
            print(f"  Stratum: {result['stratum']}")
        else:
            print(f"  Error: {result['error']}")

# Command line tools
# ntpq -p              # Show peer status
# ntpstat              # Show synchronization status  
# ntpdate -q server    # Query time without setting
# timedatectl status   # SystemD time status`,
        explanation: "Python NTP client implementation with time synchronization."
      }
    ],
    diagrams: [
      {
        src: "/ntp_hierarchy.png",
        alt: "NTP hierarchy",
        caption: "NTP stratum hierarchy and time distribution"
      },
      {
        src: "/ntp_algorithm.jpg",
        alt: "NTP algorithm",
        caption: "NTP clock synchronization algorithm and offset calculation"
      }
    ],
    relatedProtocols: ["udp", "snmp", "ptp", "dns"],
    resources: [
      {
        title: "RFC 5905 - NTPv4",
        url: "https://tools.ietf.org/html/rfc5905",
        type: "RFC"
      },
      {
        title: "NTP Pool Project",
        url: "https://www.pool.ntp.org/",
        type: "Service"
      },
      {
        title: "Chrony Documentation",
        url: "https://chrony.tuxfamily.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Authenticated NTP (NTP-AUTH)",
      "Access control restrictions",
      "Rate limiting",
      "Monitor for time attacks",
      "Secure time sources",
      "Network segmentation",
      "Disable unused features",
      "Regular security updates"
    ]
  }