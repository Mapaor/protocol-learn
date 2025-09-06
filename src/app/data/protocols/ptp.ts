import { Protocol } from "../../types/protocol";

export const PTP: Protocol = {
    id: "ptp",
    name: "PTP",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Precision Time Protocol for sub-microsecond clock synchronization",
    fullDescription: "PTP (Precision Time Protocol), also known as IEEE 1588, is a protocol used to synchronize clocks throughout a computer network. It achieves clock accuracy in the sub-microsecond range, making it suitable for measurement and control systems that require precise timing.",
    port: "319 (event), 320 (general)",
    versions: ["IEEE 1588-2002 (PTPv1)", "IEEE 1588-2008 (PTPv2)", "IEEE 1588-2019"],
    advantages: [
      "Sub-microsecond accuracy",
      "Hardware timestamping support",
      "Automatic network topology discovery",
      "Fault tolerance mechanisms",
      "Scalable architecture",
      "Multiple clock domains",
      "Transparent clock support",
      "Quality of service awareness"
    ],
    disadvantages: [
      "Complex implementation",
      "Hardware dependency for best accuracy",
      "Network infrastructure requirements",
      "Configuration complexity",
      "Limited over WAN",
      "Switch support needed",
      "Cost of precision hardware",
      "Troubleshooting difficulty"
    ],
    useCases: [
      "Industrial automation",
      "Financial trading systems",
      "Power grid synchronization",
      "Telecommunications networks",
      "Audio/video production",
      "Scientific measurements",
      "Distributed control systems",
      "5G network synchronization",
      "Smart grid applications",
      "High-frequency trading",
      "Synchronized data acquisition",
      "Broadcast systems"
    ],
    examples: [
      {
        title: "PTP Message Types",
        code: `# PTP Message Categories

Event Messages (Timestamped):
- Sync: Master clock synchronization signal
- Delay_Req: Delay request from slave
- Pdelay_Req: Peer delay request
- Pdelay_Resp: Peer delay response

General Messages (Not timestamped):
- Announce: Best master clock algorithm info
- Follow_Up: Precise timestamp for Sync
- Delay_Resp: Delay response from master
- Pdelay_Resp_Follow_Up: Precise peer delay timestamp
- Management: Configuration and monitoring
- Signaling: Enhanced features negotiation

# PTP Clock Types
Ordinary Clock (OC):
- Single PTP port
- Can be master or slave

Boundary Clock (BC):
- Multiple PTP ports
- Slave on one port, master on others
- Regenerates PTP messages

Transparent Clock (TC):
- Forwards PTP messages
- Measures and corrects residence time
- End-to-End (E2E) or Peer-to-Peer (P2P)

# PTP Domains
Domain 0: Default domain
Domain 1-127: User configurable domains
Domain 128-255: Vendor specific`,
        explanation: "PTP protocol message types and clock architectures."
      },
      {
        title: "PTP Synchronization Process",
        code: `# Two-Step Synchronization Process

1. Offset Calculation:
Master -> Slave: Sync message at T1
Master -> Slave: Follow_Up with precise T1
Slave receives at T2

2. Delay Measurement:
Slave -> Master: Delay_Req at T3
Master -> Slave: Delay_Resp with T4 (receive time)

3. Clock Correction Calculation:
Offset = ((T2 - T1) - (T4 - T3)) / 2
Delay = ((T2 - T1) + (T4 - T3)) / 2

# Best Master Clock Algorithm (BMCA)
Priority1 (user configurable)
Class (clock quality indicator)
Accuracy (time accuracy specification)
Variance (stability measure)
Priority2 (user configurable)
Clock Identity (unique identifier)

# PTP Configuration Example
[global]
verbose = 1
use_syslog = 1
logging_level = 6
path_trace_enabled = 1
follow_up_info = 1

[eth0]
network_transport = UDPv4
delay_mechanism = E2E
delay_filter = moving_median
delay_filter_length = 10
announce_receipt_timeout = 3
sync_receipt_timeout = 0
masterOnly = 0
priority1 = 128
priority2 = 128`,
        explanation: "PTP synchronization algorithm and configuration parameters."
      },
      {
        title: "PTP Linux Implementation",
        code: `#!/bin/bash
# PTP4L - Linux PTP daemon setup

# Install PTP tools
sudo apt-get install linuxptp

# Check hardware timestamping support
ethtool -T eth0

# PTP Master configuration
sudo ptp4l -i eth0 -m -s -2 -P

# PTP Slave configuration  
sudo ptp4l -i eth0 -m -s -2

# PHC (PTP Hardware Clock) utilities
# Show PTP clock status
phc_ctl /dev/ptp0 get

# Set system clock from PTP
sudo phc2sys -s eth0 -m -w

# Monitor PTP synchronization
watch -n 1 'pmc -u -b 0 "GET CURRENT_DATA_SET"'

# PTP statistics
pmc -u -b 0 "GET TIME_STATUS_NP" | grep master_offset

# Boundary clock setup
sudo ptp4l -i eth0 -i eth1 -m -2

# Transparent clock configuration
sudo ptp4l -i eth0 -m -2 -T

# Python PTP monitoring
import subprocess
import json

def get_ptp_status():
    result = subprocess.run(['pmc', '-u', '-b', '0', 'GET CURRENT_DATA_SET'], 
                          capture_output=True, text=True)
    return result.stdout

def parse_offset(status):
    for line in status.split('\\n'):
        if 'offsetFromMaster' in line:
            return line.split()[-1]
    return None

status = get_ptp_status()
offset = parse_offset(status)
print(f"Current offset from master: {offset} ns")`,
        explanation: "Linux PTP implementation using ptp4l daemon and monitoring tools."
      }
    ],
    diagrams: [
      {
        src: "/ptp_architecture.png",
        alt: "PTP network architecture",
        caption: "PTP clock hierarchy with master, boundary, and transparent clocks"
      },
      {
        src: "/ptp_synchronization.jpg",
        alt: "PTP synchronization process",
        caption: "PTP two-step synchronization and offset calculation"
      }
    ],
    relatedProtocols: ["ntp", "udp", "ethernet", "ipv4"],
    resources: [
      {
        title: "IEEE 1588-2019 Standard",
        url: "https://standards.ieee.org/standard/1588-2019.html",
        type: "Standard"
      },
      {
        title: "Linux PTP Project",
        url: "http://linuxptp.sourceforge.net/",
        type: "Tool"
      },
      {
        title: "PTP Best Practices",
        url: "https://www.nist.gov/programs-projects/ieee-1588-precision-time-protocol",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Message authentication",
      "Authorization mechanisms",
      "Secure key distribution",
      "Network access control",
      "Monitoring and alerting",
      "Physical security of grandmaster",
      "Redundant time sources",
      "Attack detection systems"
    ]
  }