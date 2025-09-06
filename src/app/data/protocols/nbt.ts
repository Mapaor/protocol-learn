import { Protocol } from "../../types/protocol";

export const NBT: Protocol = {
    id: "nbt",
    name: "NBT",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "NetBIOS over TCP/IP for Windows network name resolution and services",
    fullDescription: "NBT (NetBIOS over TCP/IP) is a networking protocol that allows legacy computer applications relying on the NetBIOS API to be used on modern TCP/IP networks. NBT provides the NetBIOS name service, datagram service, and session service over TCP/IP.",
    port: "137 (name service), 138 (datagram), 139 (session)",
    versions: ["RFC 1001", "RFC 1002"],
    advantages: [
      "Legacy Windows compatibility",
      "Simple name resolution",
      "Broadcast-based discovery",
      "No infrastructure required",
      "File and printer sharing",
      "Session establishment",
      "Datagram messaging",
      "Wide Windows support"
    ],
    disadvantages: [
      "Security vulnerabilities",
      "Broadcast traffic overhead",
      "Limited to local segment",
      "Name collision issues",
      "Protocol complexity",
      "Modern alternatives available",
      "Performance limitations",
      "Troubleshooting complexity"
    ],
    useCases: [
      "Windows file sharing",
      "Legacy application support",
      "Network browsing",
      "Printer discovery",
      "Domain controller location",
      "Computer name resolution",
      "Network neighborhood",
      "SMB protocol support",
      "Old Windows networks",
      "Mixed environment compatibility",
      "Network troubleshooting",
      "Penetration testing"
    ],
    examples: [
      {
        title: "NBT Services and Ports",
        code: `# NBT Services and Port Usage

# Port 137/UDP - NetBIOS Name Service (NBNS)
# Name registration, resolution, and release
# Functions:
- Name Query (opcode 0)
- Name Registration (opcode 5) 
- Name Release (opcode 6)
- WACK (Wait for Acknowledgment)
- Name Refresh
- Name Conflict Detection

# Port 138/UDP - NetBIOS Datagram Service (NBDS)
# Connectionless communication
# Functions:
- Direct Unique Datagram
- Direct Group Datagram  
- Broadcast Datagram
- Datagram Error

# Port 139/TCP - NetBIOS Session Service (NBSS)
# Connection-oriented communication
# Functions:
- Session Request
- Positive Session Response
- Negative Session Response
- Session Message
- Session Keep Alive

# NetBIOS Name Types
00 - Workstation Service
03 - Messenger Service
06 - RAS Server Service
1B - Domain Master Browser
1C - Domain Controllers
1D - Master Browser
1E - Browser Service Elections
20 - File Server Service
21 - RAS Client Service

# NBT Name Format
NetBIOS Name: 15 characters + 1 suffix byte
Encoded Name: 32 bytes (each nibble encoded as A-P)

Example:
WORKSTATION    <00> -> WORKSTATION service
WORKSTATION    <20> -> File sharing service
DOMAIN         <1C> -> Domain controller
DOMAIN         <1B> -> Domain master browser

# NBT Node Types
B-node (Broadcast): Uses broadcast for name resolution
P-node (Point-to-point): Uses WINS server
M-node (Mixed): Tries broadcast first, then WINS
H-node (Hybrid): Tries WINS first, then broadcast`,
        explanation: "NBT services, ports, and NetBIOS name structure."
      },
      {
        title: "NBT Configuration and Tools",
        code: `# Windows NBT Configuration

# Show NetBIOS name table
nbtstat -n

# Sample output:
Local Area Connection:
Node IpAddress: [192.168.1.100] Scope Id: []
    NetBIOS Local Name Table
Name               Type         Status
---------------------------------------------
COMPUTER1      <00>  UNIQUE      Registered
COMPUTER1      <20>  UNIQUE      Registered
WORKGROUP      <00>  GROUP       Registered
WORKGROUP      <1E>  GROUP       Registered

# Show NetBIOS name cache
nbtstat -c

# Show remote NetBIOS names
nbtstat -A 192.168.1.50

# Show NetBIOS statistics
nbtstat -s
nbtstat -S  # With IP addresses

# Purge and reload NetBIOS name cache
nbtstat -R
nbtstat -RR  # Release and refresh

# Registry configuration
# HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NetBT\Parameters

# Enable/Disable NetBIOS over TCP/IP
# 0 = Use NetBIOS setting from DHCP
# 1 = Enable NetBIOS over TCP/IP  
# 2 = Disable NetBIOS over TCP/IP
reg add "HKLM\SYSTEM\CurrentControlSet\Services\NetBT\Parameters" /v NetbiosOptions /t REG_DWORD /d 2

# WINS server configuration
reg add "HKLM\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces\{Interface-GUID}" /v NameServer /t REG_SZ /d "192.168.1.10"

# Node type configuration
# 1 = B-node (broadcast)
# 2 = P-node (point-to-point) 
# 4 = M-node (mixed)
# 8 = H-node (hybrid)
reg add "HKLM\SYSTEM\CurrentControlSet\Services\NetBT\Parameters" /v NodeType /t REG_DWORD /d 8

# Linux NBT tools (Samba)
# Install nmblookup
sudo apt-get install samba-common-bin

# Query NetBIOS names
nmblookup -A 192.168.1.100
nmblookup COMPUTER1

# Find workgroup master browser
nmblookup WORKGROUP#1d

# Find domain controllers
nmblookup DOMAIN#1c

# Scan for NetBIOS names
for i in {1..254}; do
    nmblookup -A 192.168.1.$i 2>/dev/null | grep -v "failed" &
done

# Python NBT scanner
import socket
import struct

def nbt_query(target_ip, name, name_type=0x20):
    """Query NetBIOS name on target IP"""
    
    # Encode NetBIOS name
    encoded_name = encode_netbios_name(name, name_type)
    
    # Build NBT query packet
    transaction_id = 0x1234
    flags = 0x0100  # Standard query
    questions = 1
    answers = 0
    authority = 0
    additional = 0
    
    header = struct.pack('>HHHHHH', transaction_id, flags, 
                        questions, answers, authority, additional)
    
    # Question section
    question = encoded_name + struct.pack('>HH', 0x0020, 0x0001)  # NB query, IN class
    
    packet = header + question
    
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(2)
        sock.sendto(packet, (target_ip, 137))
        
        response, addr = sock.recvfrom(1024)
        sock.close()
        
        return parse_nbt_response(response)
        
    except socket.timeout:
        return None
    except Exception as e:
        return None

def encode_netbios_name(name, name_type):
    """Encode NetBIOS name using first-level encoding"""
    # Pad name to 15 characters
    name = name.ljust(15)[:15]
    
    # Add name type suffix
    name_bytes = name.encode('ascii') + bytes([name_type])
    
    # First-level encoding: each nibble becomes A-P
    encoded = b''
    for byte in name_bytes:
        encoded += bytes([0x41 + (byte >> 4)])    # High nibble
        encoded += bytes([0x41 + (byte & 0x0F)])  # Low nibble
    
    # Add length byte and null terminator
    return bytes([32]) + encoded + bytes([0])

def scan_netbios_names(network):
    """Scan network for NetBIOS names"""
    import ipaddress
    
    results = []
    net = ipaddress.IPv4Network(network, strict=False)
    
    for ip in net.hosts():
        result = nbt_query(str(ip), '*')
        if result:
            results.append({'ip': str(ip), 'names': result})
    
    return results`,
        explanation: "NBT configuration tools and programming examples for name resolution."
      },
      {
        title: "NBT Security and Troubleshooting",
        code: `# NBT Security Assessment

# Disable NetBIOS over TCP/IP (recommended)
# Method 1: Registry
reg add "HKLM\SYSTEM\CurrentControlSet\Services\NetBT\Parameters" /v NetbiosOptions /t REG_DWORD /d 2

# Method 2: Network adapter settings
# Network Adapter -> Properties -> TCP/IPv4 -> Advanced -> WINS -> Disable NetBIOS over TCP/IP

# Method 3: Group Policy
# Computer Configuration -> Administrative Templates -> Network -> DNS Client -> Turn off NetBIOS name resolution

# NBT enumeration tools (security testing)
# enum4linux - enumerate SMB/NetBIOS information
enum4linux -a 192.168.1.100

# nbtscan - scan for NetBIOS names
nbtscan 192.168.1.0/24

# nmap NBT scripts
nmap -sU -p 137 --script nbstat 192.168.1.0/24
nmap -p 139 --script smb-enum-shares 192.168.1.100

# Responder - capture NBT-NS traffic
python Responder.py -I eth0 -A

# NBT-NS spoofing protection
# Use static entries in hosts file
echo "192.168.1.10 server1" >> /etc/hosts

# Monitor NBT traffic
# Wireshark filters
nbns                    # NetBIOS Name Service
nbdgm                   # NetBIOS Datagram Service  
nbss                    # NetBIOS Session Service

# tcpdump NBT traffic
tcpdump -i eth0 port 137 or port 138 or port 139

# PowerShell NBT monitoring
# Get NetBIOS statistics
Get-WmiObject -Class Win32_NetworkAdapterConfiguration | 
    Where-Object {$_.TcpipNetbiosOptions -ne $null} |
    Select-Object Description, TcpipNetbiosOptions

# 0 = Use NetBIOS setting from DHCP server
# 1 = Enable NetBIOS over TCP/IP
# 2 = Disable NetBIOS over TCP/IP

# Check for NBT-NS traffic
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=5156} |
    Where-Object {$_.Message -like "*137*" -or $_.Message -like "*138*" -or $_.Message -like "*139*"}

# NBT hardening script
$interfaces = Get-WmiObject -Class Win32_NetworkAdapterConfiguration -Filter "TcpipNetbiosOptions IS NOT NULL"

foreach ($interface in $interfaces) {
    if ($interface.TcpipNetbiosOptions -ne 2) {
        Write-Host "Disabling NetBIOS on interface: $($interface.Description)"
        $interface.SetTcpipNetbios(2)  # Disable NetBIOS
    }
}

# Firewall rules to block NBT
# Windows Firewall
netsh advfirewall firewall add rule name="Block NBT-NS" protocol=UDP dir=in localport=137 action=block
netsh advfirewall firewall add rule name="Block NBT-DGM" protocol=UDP dir=in localport=138 action=block  
netsh advfirewall firewall add rule name="Block NBT-SSN" protocol=TCP dir=in localport=139 action=block

# Linux iptables
iptables -A INPUT -p udp --dport 137 -j DROP
iptables -A INPUT -p udp --dport 138 -j DROP
iptables -A INPUT -p tcp --dport 139 -j DROP

# NBT troubleshooting commands
# Clear NetBIOS name cache
nbtstat -RR

# Check NetBIOS name conflicts
eventvwr.msc
# Look for Event ID 4319 (duplicate name on network)

# Test NetBIOS name resolution
ping COMPUTERNAME
telnet COMPUTERNAME 139

# Check WINS server configuration
ipconfig /all | findstr "WINS"

# Restart NetBIOS service
net stop netbt
net start netbt

# NBT packet capture analysis
# Look for:
# - Excessive broadcast traffic
# - Name conflicts (negative responses)
# - Failed session establishments
# - Suspicious name queries`,
        explanation: "NBT security hardening and troubleshooting procedures."
      }
    ],
    diagrams: [
      {
        src: "/nbt_architecture.png",
        alt: "NBT protocol architecture",
        caption: "NetBIOS over TCP/IP protocol stack and service relationships"
      },
      {
        src: "/nbt_name_resolution.jpg",
        alt: "NBT name resolution process",
        caption: "NetBIOS name resolution flow using broadcast and WINS"
      }
    ],
    relatedProtocols: ["netbios", "smb", "wins", "tcp"],
    resources: [
      {
        title: "RFC 1001 - NetBIOS Service Protocols",
        url: "https://tools.ietf.org/html/rfc1001",
        type: "RFC"
      },
      {
        title: "RFC 1002 - NetBIOS on TCP/UDP",
        url: "https://tools.ietf.org/html/rfc1002",
        type: "RFC"
      },
      {
        title: "Microsoft NetBIOS Documentation",
        url: "https://docs.microsoft.com/en-us/previous-versions/windows/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Disable NetBIOS where possible",
      "Use modern name resolution",
      "Implement network segmentation",
      "Monitor for enumeration attempts",
      "Block NBT ports at firewall",
      "Use static name entries",
      "Regular security assessments",
      "Alternative protocols adoption"
    ]
  }