import { Protocol } from "../../types/protocol";

export const NETBIOS: Protocol = {
    id: "netbios",
    name: "NetBIOS",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Network Basic Input/Output System for legacy Windows networking",
    fullDescription: "NetBIOS (Network Basic Input/Output System) is an API that provides services related to the session layer of the OSI model, allowing applications on separate computers to communicate over a local area network. It was originally developed for IBM PC Network and later adopted by Microsoft for Windows networking.",
    port: "N/A (API/Session layer)",
    versions: ["NetBIOS", "NetBEUI", "NBF"],
    advantages: [
      "Simple programming interface",
      "Session management",
      "Name registration service",
      "Broadcast messaging",
      "Legacy application support",
      "No routing required",
      "Peer-to-peer networking",
      "Built into Windows"
    ],
    disadvantages: [
      "Limited to local networks",
      "Not routable (original)",
      "Security vulnerabilities",
      "Performance limitations",
      "Protocol complexity",
      "Legacy technology",
      "Modern alternatives available",
      "Maintenance overhead"
    ],
    useCases: [
      "Legacy Windows applications",
      "File and printer sharing",
      "Network browsing",
      "Computer identification",
      "Session establishment",
      "Messaging services",
      "Network games (legacy)",
      "Industrial systems",
      "Embedded applications",
      "Network troubleshooting",
      "Security assessments",
      "Protocol analysis"
    ],
    examples: [
      {
        title: "NetBIOS API Programming",
        code: `// C NetBIOS API programming example
#include <windows.h>
#include <nb30.h>

// NetBIOS Command Block (NCB) structure
typedef struct _NCB {
    UCHAR ncb_command;      // Command code
    UCHAR ncb_retcode;      // Return code
    UCHAR ncb_lsn;          // Local session number
    UCHAR ncb_num;          // Name number
    PUCHAR ncb_buffer;      // Message buffer
    WORD ncb_length;        // Buffer length
    UCHAR ncb_callname[16]; // Called name
    UCHAR ncb_name[16];     // Our name
    UCHAR ncb_rto;          // Receive timeout
    UCHAR ncb_sto;          // Send timeout
    void (*ncb_post)(struct _NCB *); // Post routine
    UCHAR ncb_lana_num;     // LAN adapter number
    UCHAR ncb_cmd_cplt;     // Command complete flag
    UCHAR ncb_reserve[10];  // Reserved
    HANDLE ncb_event;       // Event handle
} NCB, *PNCB;

// Add NetBIOS name
int netbios_add_name(const char* name) {
    NCB ncb;
    
    memset(&ncb, 0, sizeof(NCB));
    ncb.ncb_command = NCBADDNAME;
    memset(ncb.ncb_name, ' ', 16);
    strncpy(ncb.ncb_name, name, min(strlen(name), 15));
    ncb.ncb_lana_num = 0;
    
    UCHAR ret = Netbios(&ncb);
    
    if (ret == NRC_GOODRET) {
        printf("Name '%s' added successfully\\n", name);
        return ncb.ncb_num;  // Return name number
    } else {
        printf("Failed to add name '%s', error: %d\\n", name, ret);
        return -1;
    }
}

// Delete NetBIOS name  
int netbios_delete_name(UCHAR name_num) {
    NCB ncb;
    
    memset(&ncb, 0, sizeof(NCB));
    ncb.ncb_command = NCBDELNAME;
    ncb.ncb_num = name_num;
    ncb.ncb_lana_num = 0;
    
    UCHAR ret = Netbios(&ncb);
    return (ret == NRC_GOODRET) ? 0 : -1;
}

// Listen for incoming connections
int netbios_listen(UCHAR name_num) {
    NCB ncb;
    
    memset(&ncb, 0, sizeof(NCB));
    ncb.ncb_command = NCBLISTEN;
    ncb.ncb_num = name_num;
    memset(ncb.ncb_callname, '*', 16);  // Accept any caller
    ncb.ncb_lana_num = 0;
    
    UCHAR ret = Netbios(&ncb);
    
    if (ret == NRC_GOODRET) {
        printf("Session established, LSN: %d\\n", ncb.ncb_lsn);
        return ncb.ncb_lsn;  // Return local session number
    } else {
        printf("Listen failed, error: %d\\n", ret);
        return -1;
    }
}

// Call (connect to) another NetBIOS name
int netbios_call(UCHAR name_num, const char* remote_name) {
    NCB ncb;
    
    memset(&ncb, 0, sizeof(NCB));
    ncb.ncb_command = NCBCALL;
    ncb.ncb_num = name_num;
    memset(ncb.ncb_callname, ' ', 16);
    strncpy(ncb.ncb_callname, remote_name, min(strlen(remote_name), 15));
    ncb.ncb_lana_num = 0;
    
    UCHAR ret = Netbios(&ncb);
    
    if (ret == NRC_GOODRET) {
        printf("Connected to '%s', LSN: %d\\n", remote_name, ncb.ncb_lsn);
        return ncb.ncb_lsn;
    } else {
        printf("Call to '%s' failed, error: %d\\n", remote_name, ret);
        return -1;
    }
}

// Send data over NetBIOS session
int netbios_send(UCHAR lsn, const char* data, int length) {
    NCB ncb;
    
    memset(&ncb, 0, sizeof(NCB));
    ncb.ncb_command = NCBSEND;
    ncb.ncb_lsn = lsn;
    ncb.ncb_buffer = (PUCHAR)data;
    ncb.ncb_length = length;
    ncb.ncb_lana_num = 0;
    
    UCHAR ret = Netbios(&ncb);
    return (ret == NRC_GOODRET) ? 0 : -1;
}

// Receive data from NetBIOS session
int netbios_receive(UCHAR lsn, char* buffer, int buffer_size) {
    NCB ncb;
    
    memset(&ncb, 0, sizeof(NCB));
    ncb.ncb_command = NCBRECV;
    ncb.ncb_lsn = lsn;
    ncb.ncb_buffer = (PUCHAR)buffer;
    ncb.ncb_length = buffer_size;
    ncb.ncb_lana_num = 0;
    
    UCHAR ret = Netbios(&ncb);
    
    if (ret == NRC_GOODRET) {
        return ncb.ncb_length;  // Return bytes received
    } else {
        return -1;
    }
}`,
        explanation: "NetBIOS API programming examples in C for Windows applications."
      },
      {
        title: "NetBIOS Commands and Operations",
        code: `# NetBIOS Command Types and Operations

# Name Management Commands
NCBADDNAME (0x30)     # Add unique name
NCBADDGRNAME (0x36)   # Add group name  
NCBDELNAME (0x31)     # Delete name
NCBRESET (0x32)       # Reset adapter
NCBASTAT (0x33)       # Adapter status
NCBFINDNAME (0x78)    # Find name
NCBSSTAT (0x34)       # Session status

# Session Commands  
NCBCALL (0x10)        # Call (connect)
NCBLISTEN (0x11)      # Listen for connection
NCBHANGUP (0x12)      # Hangup session
NCBSEND (0x14)        # Send data
NCBRECV (0x15)        # Receive data
NCBRECVANY (0x16)     # Receive from any session
NCBCHAINSEND (0x17)   # Chain send
NCBSENDNA (0x71)      # Send no acknowledge

# Datagram Commands
NCBDGSEND (0x20)      # Send datagram
NCBDGRECV (0x21)      # Receive datagram
NCBDGSENDBC (0x22)    # Send broadcast datagram
NCBDGRECVBC (0x23)    # Receive broadcast datagram

# NetBIOS Name Types (16th byte)
0x00 - Workstation Service
0x01 - Messenger Service  
0x03 - Messenger Service
0x06 - RAS Server Service
0x1B - Domain Master Browser
0x1C - Domain Controllers
0x1D - Master Browser
0x1E - Browser Service Elections
0x1F - NetDDE Service
0x20 - File Server Service
0x21 - RAS Client Service
0x22 - Microsoft Exchange Interchange
0x23 - Microsoft Exchange Store
0x24 - Microsoft Exchange Directory
0x30 - Modem Sharing Server Service
0x31 - Modem Sharing Client Service
0x43 - SMS Clients Remote Control
0x44 - SMS Administrators Remote Control
0x45 - SMS Clients Remote Chat
0x46 - SMS Clients Remote Transfer
0x4C - DEC Pathworks TCPIP service on Windows NT
0x52 - DEC Pathworks TCPIP service on Windows NT
0x87 - Microsoft Exchange MTA
0x6A - Microsoft Exchange IMC
0xBE - Network Monitor Agent
0xBF - Network Monitor Application

# NetBIOS Return Codes
NRC_GOODRET (0x00)    # Success
NRC_BUFLEN (0x01)     # Buffer length error
NRC_ILLCMD (0x03)     # Invalid command
NRC_CMDTMO (0x05)     # Command timeout
NRC_INCOMP (0x06)     # Message incomplete
NRC_BADDR (0x07)      # Invalid buffer address
NRC_SNUMOUT (0x08)    # Session number out of range
NRC_NORES (0x09)      # No resource available
NRC_SCLOSED (0x0A)    # Session closed
NRC_CMDCAN (0x0B)     # Command canceled
NRC_DUPNAME (0x0D)    # Duplicate name
NRC_NAMTFUL (0x0E)    # Name table full
NRC_ACTSES (0x0F)     # Name has active session
NRC_LOCTFUL (0x11)    # Local session table full
NRC_REMTFUL (0x12)    # Remote session table full
NRC_ILLNN (0x13)      # Invalid name number
NRC_NOCALL (0x14)     # No callname
NRC_NOWILD (0x15)     # Cannot put asterisk in NCB name
NRC_INUSE (0x16)      # Name in use on remote adapter
NRC_NAMERR (0x17)     # Name deleted
NRC_SABORT (0x18)     # Session ended abnormally
NRC_NAMCONF (0x19)    # Name conflict detected
NRC_IFBUSY (0x21)     # Interface busy
NRC_TOOMANY (0x22)    # Too many commands outstanding
NRC_BRIDGE (0x23)     # Invalid NCB_LANA_NUM field
NRC_CANOCCR (0x24)    # Command completed while cancel occurring
NRC_CANCEL (0x26)     # Command not valid to cancel
NRC_DUPENV (0x30)     # Name defined by another process
NRC_ENVNOTDEF (0x34)  # Environment undefined
NRC_OSRESNOTAV (0x35) # Required OS resources not available
NRC_MAXAPPS (0x36)    # Max number of applications exceeded
NRC_NOSAPS (0x37)     # No SAPS available for NetBIOS
NRC_NORESOURCES (0x38)# Requested resources not available
NRC_INVADDRESS (0x39) # Invalid NCB address or length
NRC_INVDDID (0x3B)    # Invalid NCB DDID
NRC_LOCKFAIL (0x3C)   # Lock of user area failed
NRC_OPENERR (0x3F)    # NetBIOS not loaded
NRC_SYSTEM (0x40)     # System error`,
        explanation: "NetBIOS command types, name types, and return codes reference."
      },
      {
        title: "NetBIOS Monitoring and Analysis",
        code: `# NetBIOS Monitoring Tools and Techniques

# Windows NetBIOS monitoring commands
# Show NetBIOS statistics
nbtstat -s    # Show sessions with names
nbtstat -S    # Show sessions with IP addresses
nbtstat -n    # Show local NetBIOS names
nbtstat -c    # Show NetBIOS name cache
nbtstat -r    # Show name resolution statistics

# PowerShell NetBIOS monitoring
# Get NetBIOS sessions
Get-CimInstance -ClassName Win32_NetworkConnection | 
    Where-Object {$_.RemoteName -like "\\\\*"} |
    Select-Object LocalName, RemoteName, Status, UserName

# Monitor NetBIOS events
Get-WinEvent -FilterHashtable @{LogName='System'; ProviderName='NetBT'} |
    Select-Object TimeCreated, LevelDisplayName, Message

# Check NetBIOS configuration
Get-WmiObject -Class Win32_NetworkAdapterConfiguration |
    Where-Object {$_.NetBIOSOptions -ne $null} |
    Select-Object Description, NetBIOSOptions, WINSPrimaryServer

# Python NetBIOS monitoring script
import struct
import socket
import time

class NetBIOSMonitor:
    def __init__(self):
        self.names = {}
        
    def decode_netbios_name(self, encoded_name):
        """Decode NetBIOS first-level encoded name"""
        if len(encoded_name) < 32:
            return None
            
        decoded = b''
        for i in range(0, 32, 2):
            if i + 1 >= len(encoded_name):
                break
            high = encoded_name[i] - 0x41
            low = encoded_name[i + 1] - 0x41
            decoded += bytes([(high << 4) | low])
        
        # Extract name and type
        name = decoded[:15].rstrip(b' ').decode('ascii', errors='ignore')
        name_type = decoded[15] if len(decoded) > 15 else 0
        
        return name, name_type
    
    def monitor_netbios_traffic(self, interface='eth0'):
        """Monitor NetBIOS name service traffic"""
        try:
            # Create raw socket for UDP traffic
            sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(0x0800))
            sock.bind((interface, 0))
            
            print(f"Monitoring NetBIOS traffic on {interface}...")
            
            while True:
                packet, addr = sock.recvfrom(65536)
                
                # Parse Ethernet header (14 bytes)
                eth_header = packet[:14]
                
                # Parse IP header
                ip_header = packet[14:34]
                ip_version = (packet[14] >> 4) & 0xF
                
                if ip_version != 4:
                    continue
                
                # Extract protocol
                protocol = packet[23]
                
                if protocol != 17:  # UDP
                    continue
                
                # Parse UDP header
                udp_header = packet[34:42]
                dest_port = struct.unpack('!H', udp_header[2:4])[0]
                
                if dest_port == 137:  # NetBIOS Name Service
                    self.parse_nbns_packet(packet[42:])
                
        except KeyboardInterrupt:
            print("\\nStopping NetBIOS monitor...")
        except Exception as e:
            print(f"Error: {e}")
    
    def parse_nbns_packet(self, data):
        """Parse NetBIOS Name Service packet"""
        if len(data) < 12:
            return
        
        # Parse DNS-style header
        header = struct.unpack('!HHHHHH', data[:12])
        transaction_id = header[0]
        flags = header[1]
        questions = header[2]
        answers = header[3]
        
        is_response = (flags & 0x8000) != 0
        opcode = (flags >> 11) & 0xF
        
        print(f"NetBIOS {'Response' if is_response else 'Query'}: "
              f"TID={transaction_id:04x}, Questions={questions}, Answers={answers}")
        
        # Parse questions section
        offset = 12
        for i in range(questions):
            name_info = self.parse_nbns_name(data, offset)
            if name_info:
                name, name_type, new_offset = name_info
                print(f"  Query: {name}<{name_type:02x}>")
                offset = new_offset + 4  # Skip QTYPE and QCLASS
    
    def parse_nbns_name(self, data, offset):
        """Parse NetBIOS name from packet"""
        if offset >= len(data):
            return None
        
        length = data[offset]
        if length != 32:  # NetBIOS encoded name length
            return None
        
        encoded_name = data[offset + 1:offset + 1 + length]
        result = self.decode_netbios_name(encoded_name)
        
        if result:
            name, name_type = result
            return name, name_type, offset + 1 + length + 1  # +1 for null terminator
        
        return None

# Network scanning for NetBIOS names
def scan_netbios_network(network='192.168.1.0/24'):
    """Scan network for NetBIOS enabled hosts"""
    import ipaddress
    import threading
    
    def check_host(ip):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((str(ip), 139))
            sock.close()
            
            if result == 0:
                print(f"NetBIOS session service available on {ip}")
                
        except:
            pass
    
    net = ipaddress.IPv4Network(network, strict=False)
    threads = []
    
    for ip in net.hosts():
        thread = threading.Thread(target=check_host, args=(ip,))
        thread.start()
        threads.append(thread)
    
    for thread in threads:
        thread.join()

# Usage
monitor = NetBIOSMonitor()
# monitor.monitor_netbios_traffic('eth0')
scan_netbios_network('192.168.1.0/24')`,
        explanation: "NetBIOS monitoring tools and network analysis scripts."
      }
    ],
    diagrams: [
      {
        src: "/netbios_architecture.png",
        alt: "NetBIOS architecture",
        caption: "NetBIOS API architecture and service layers"
      },
      {
        src: "/netbios_session.jpg",
        alt: "NetBIOS session flow",
        caption: "NetBIOS session establishment and data transfer flow"
      }
    ],
    relatedProtocols: ["nbt", "smb", "ncp", "ipx"],
    resources: [
      {
        title: "IBM NetBIOS Specification",
        url: "https://www.ibm.com/support/knowledgecenter/",
        type: "Specification"
      },
      {
        title: "Microsoft NetBIOS Documentation",
        url: "https://docs.microsoft.com/en-us/previous-versions/windows/",
        type: "Documentation"
      },
      {
        title: "NetBIOS Programming Guide",
        url: "https://docs.microsoft.com/en-us/windows/win32/netbios/",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Disable NetBIOS where possible",
      "Use modern protocols instead",
      "Implement network segmentation",
      "Monitor for enumeration",
      "Block unnecessary ports",
      "Use encryption for data",
      "Regular security assessments",
      "Legacy system protection"
    ]
  }