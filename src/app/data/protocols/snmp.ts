import { Protocol } from "../../types/protocol";

export const SNMP: Protocol = {
    id: "snmp",
    name: "SNMP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Simple Network Management Protocol for network device monitoring and management",
    fullDescription: "SNMP (Simple Network Management Protocol) is an Internet Standard protocol for collecting and organizing information about managed devices on IP networks and for modifying that information to change device behavior. It's widely used for network monitoring, fault detection, and configuration management.",
    port: "161 (agent), 162 (manager/traps)",
    versions: ["SNMPv1", "SNMPv2c", "SNMPv3"],
    advantages: [
      "Universal device support",
      "Standardized management",
      "Lightweight protocol",
      "Real-time monitoring",
      "Automated alerts",
      "Scalable architecture",
      "Cross-vendor compatibility",
      "Rich MIB database"
    ],
    disadvantages: [
      "Security limitations (v1/v2c)",
      "UDP unreliability",
      "Limited bandwidth efficiency",
      "Complex MIB navigation",
      "Performance impact",
      "Configuration complexity",
      "Polling overhead",
      "Limited transaction support"
    ],
    useCases: [
      "Network device monitoring",
      "Performance management",
      "Fault detection",
      "Configuration management",
      "Capacity planning",
      "Security monitoring",
      "Asset inventory",
      "Traffic analysis",
      "Service level monitoring",
      "Data center management",
      "IoT device management",
      "Infrastructure automation"
    ],
    examples: [
      {
        title: "SNMP Protocol Operations",
        code: `# SNMP PDU (Protocol Data Unit) Types
GET-REQUEST      - Retrieve specific OID values
GET-NEXT-REQUEST - Retrieve next OID in MIB tree
GET-BULK-REQUEST - Retrieve multiple OIDs efficiently (v2c/v3)
SET-REQUEST      - Modify OID values
GET-RESPONSE     - Response to GET requests
TRAP             - Asynchronous notification (v1)
INFORM-REQUEST   - Reliable notification (v2c/v3)

# SNMP Message Structure
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      Version      |Community  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|              PDU              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# Common OIDs (Object Identifiers)
1.3.6.1.2.1.1.1.0     - sysDescr (System Description)
1.3.6.1.2.1.1.3.0     - sysUpTime (System Uptime)
1.3.6.1.2.1.1.5.0     - sysName (System Name)
1.3.6.1.2.1.2.2.1.10  - ifInOctets (Interface Input Bytes)
1.3.6.1.2.1.2.2.1.16  - ifOutOctets (Interface Output Bytes)
1.3.6.1.2.1.25.1.1.0  - hrSystemUptime (Host Resources Uptime)

# SNMP Data Types
INTEGER, OCTET STRING, NULL, OBJECT IDENTIFIER
IpAddress, Counter32, Gauge32, TimeTicks, Counter64`,
        explanation: "SNMP protocol structure and common operations."
      },
      {
        title: "SNMP Agent Configuration",
        code: `# /etc/snmp/snmpd.conf - Net-SNMP Agent Configuration

# Community strings (SNMPv1/v2c)
rocommunity public 127.0.0.1
rwcommunity private 192.168.1.0/24

# System information
sysLocation "Data Center Room 1"
sysContact "admin@example.com"
sysServices 72

# Access control
# source          community
com2sec readonly  default         public
com2sec readwrite 192.168.1.0/24  private

# Group mappings
group readonlygroup  v2c readonly
group readwritegroup v2c readwrite

# Access permissions
#           group         context sec.model sec.level prefix read   write  notif
access readonlygroup  ""      any       noauth    exact  all    none   none
access readwritegroup ""      any       noauth    exact  all    all    all

# SNMPv3 Configuration
# Create user with authentication and privacy
createUser myuser MD5 mypassword DES myprivpassword

# SNMPv3 access control
rouser myuser priv 1.3.6.1.2.1.1
rwuser myuser priv 1.3.6.1.2.1

# Trap configuration
trapsink 192.168.1.100 public
trap2sink 192.168.1.100 public

# Process monitoring
proc sshd
proc httpd 10 1

# Disk monitoring
disk / 10000
disk /var 5000

# Load monitoring
load 12 14 14`,
        explanation: "SNMP agent configuration with security and monitoring settings."
      },
      {
        title: "SNMP Client Operations",
        code: `#!/usr/bin/env python3
import asyncio
from pysnmp.hlapi.asyncio import *

class SNMPClient:
    def __init__(self, target, community='public', port=161):
        self.target = target
        self.community = community
        self.port = port
    
    async def snmp_get(self, oid):
        """Perform SNMP GET operation"""
        for (errorIndication, errorStatus, errorIndex, varBinds) in await getCmd(
            SnmpEngine(),
            CommunityData(self.community),
            UdpTransportTarget((self.target, self.port)),
            ContextData(),
            ObjectType(ObjectIdentity(oid))):
            
            if errorIndication:
                return f"Error: {errorIndication}"
            elif errorStatus:
                return f"Error: {errorStatus.prettyPrint()}"
            else:
                for varBind in varBinds:
                    return varBind[1].prettyPrint()
    
    async def snmp_walk(self, oid):
        """Perform SNMP WALK operation"""
        results = []
        for (errorIndication, errorStatus, errorIndex, varBinds) in await nextCmd(
            SnmpEngine(),
            CommunityData(self.community),
            UdpTransportTarget((self.target, self.port)),
            ContextData(),
            ObjectType(ObjectIdentity(oid)),
            lexicographicMode=False):
            
            if errorIndication:
                break
            elif errorStatus:
                break
            else:
                for varBind in varBinds:
                    results.append(f"{varBind[0]} = {varBind[1]}")
        return results
    
    async def snmp_set(self, oid, value, value_type='s'):
        """Perform SNMP SET operation"""
        for (errorIndication, errorStatus, errorIndex, varBinds) in await setCmd(
            SnmpEngine(),
            CommunityData(self.community),
            UdpTransportTarget((self.target, self.port)),
            ContextData(),
            ObjectType(ObjectIdentity(oid), value)):
            
            if errorIndication:
                return f"Error: {errorIndication}"
            elif errorStatus:
                return f"Error: {errorStatus.prettyPrint()}"
            else:
                return "Success"

# Usage examples
async def main():
    client = SNMPClient('192.168.1.1', 'public')
    
    # Get system description
    sys_desc = await client.snmp_get('1.3.6.1.2.1.1.1.0')
    print(f"System Description: {sys_desc}")
    
    # Get system uptime
    uptime = await client.snmp_get('1.3.6.1.2.1.1.3.0')
    print(f"System Uptime: {uptime}")
    
    # Walk interface table
    interfaces = await client.snmp_walk('1.3.6.1.2.1.2.2.1.2')
    print("Interfaces:")
    for interface in interfaces:
        print(f"  {interface}")

# Command line tools
# snmpget -v2c -c public 192.168.1.1 1.3.6.1.2.1.1.1.0
# snmpwalk -v2c -c public 192.168.1.1 1.3.6.1.2.1.2.2.1.2
# snmpset -v2c -c private 192.168.1.1 1.3.6.1.2.1.1.5.0 s "NewHostName"`,
        explanation: "Python SNMP client implementation with GET, WALK, and SET operations."
      }
    ],
    diagrams: [
      {
        src: "/snmp_architecture.png",
        alt: "SNMP architecture",
        caption: "SNMP network management architecture with agents and managers"
      },
      {
        src: "/snmp_mib.jpg",
        alt: "SNMP MIB tree",
        caption: "SNMP Management Information Base (MIB) tree structure"
      }
    ],
    relatedProtocols: ["udp", "tcp", "ssh", "http"],
    resources: [
      {
        title: "RFC 3416 - SNMPv2",
        url: "https://tools.ietf.org/html/rfc3416",
        type: "RFC"
      },
      {
        title: "Net-SNMP Project",
        url: "http://www.net-snmp.org/",
        type: "Tool"
      },
      {
        title: "SNMP MIB Browser",
        url: "https://www.ireasoning.com/mibbrowser.shtml",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use SNMPv3 with encryption",
      "Strong community strings",
      "Access control lists",
      "Network segmentation",
      "Regular credential rotation",
      "Monitor SNMP traffic",
      "Disable unnecessary MIBs",
      "Secure trap destinations"
    ]
  }