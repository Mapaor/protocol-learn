import { Protocol } from "../../types/protocol";

export const SLAAC: Protocol = {
    id: "slaac",
    name: "SLAAC",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Stateless Address Autoconfiguration for automatic IPv6 address assignment",
    fullDescription: "SLAAC (Stateless Address Autoconfiguration) is a method in IPv6 that allows a device to automatically configure its own IPv6 address without the need for a DHCPv6 server. It uses Router Advertisement messages and the device's MAC address to generate unique IPv6 addresses.",
    port: "N/A (uses ICMPv6)",
    versions: ["RFC 4862", "RFC 8415 (updates)"],
    advantages: [
      "No server required",
      "Automatic configuration",
      "Reduced network overhead",
      "Plug-and-play networking",
      "Privacy extensions support",
      "Multiple address assignment",
      "Fast deployment",
      "Reduced administration"
    ],
    disadvantages: [
      "Limited control over addresses",
      "Privacy concerns with MAC-based addresses",
      "No centralized management",
      "Duplicate address detection overhead",
      "Security vulnerabilities",
      "Troubleshooting complexity",
      "Limited address tracking",
      "Potential for address conflicts"
    ],
    useCases: [
      "Home networks",
      "Small office networks",
      "IoT device deployment",
      "Guest networks",
      "Temporary connections",
      "Mobile device connectivity",
      "Plug-and-play scenarios",
      "Network bootstrapping",
      "Edge networks",
      "Sensor networks",
      "Auto-configuration systems",
      "Zero-configuration networking"
    ],
    examples: [
      {
        title: "SLAAC Address Formation",
        code: `# SLAAC Address Generation Process

1. Link-Local Address Formation:
   Prefix: fe80::/10
   Interface ID: EUI-64 from MAC address
   
   Example:
   MAC: 00:1B:77:49:54:FD
   EUI-64: 021B:77FF:FE49:54FD
   Link-Local: fe80::021B:77FF:FE49:54FD/64

2. Router Solicitation (RS):
   ICMPv6 Type 133
   Destination: ff02::2 (all-routers multicast)
   Source: link-local or unspecified address

3. Router Advertisement (RA):
   ICMPv6 Type 134
   Contains network prefix information
   Autonomous flag (A-bit) enables SLAAC

4. Global Address Formation:
   Prefix from RA: 2001:db8:1::/64
   Interface ID: 021B:77FF:FE49:54FD
   Global Address: 2001:db8:1::021B:77FF:FE49:54FD/64

# Privacy Extensions (RFC 4941)
# Temporary addresses with random interface IDs
2001:db8:1::1a2b:3c4d:5e6f:7890/64 (temporary)
2001:db8:1::021B:77FF:FE49:54FD/64 (permanent)

# Duplicate Address Detection (DAD)
# Send Neighbor Solicitation for new address
# If no response, address is unique`,
        explanation: "SLAAC address generation process and IPv6 address formation."
      },
      {
        title: "Router Advertisement Configuration",
        code: `# Linux radvd configuration (/etc/radvd.conf)
interface eth0 {
    # Send Router Advertisements
    AdvSendAdvert on;
    
    # Minimum and maximum intervals
    MinRtrAdvInterval 30;
    MaxRtrAdvInterval 100;
    
    # Router lifetime
    AdvDefaultLifetime 1800;
    
    # Prefix configuration
    prefix 2001:db8:1::/64 {
        # Enable SLAAC
        AdvOnLink on;
        AdvAutonomous on;
        
        # Address lifetimes
        AdvValidLifetime 86400;
        AdvPreferredLifetime 14400;
    };
    
    # DNS configuration
    RDNSS 2001:db8::1 {
        AdvRDNSSLifetime 1200;
    };
    
    # DNS search domain
    DNSSL example.com {
        AdvDNSSLLifetime 1200;
    };
};

# Start radvd daemon
sudo systemctl start radvd
sudo systemctl enable radvd

# Cisco router RA configuration
interface GigabitEthernet0/0
 ipv6 address 2001:db8:1::1/64
 ipv6 nd prefix 2001:db8:1::/64
 ipv6 nd ra interval 30
 ipv6 nd ra lifetime 1800
 no shutdown`,
        explanation: "Router Advertisement daemon configuration for SLAAC support."
      },
      {
        title: "SLAAC Client Operations",
        code: `# Linux IPv6 SLAAC configuration

# Enable IPv6 forwarding (for routers)
echo 1 > /proc/sys/net/ipv6/conf/all/forwarding

# SLAAC client settings
# Accept Router Advertisements
echo 1 > /proc/sys/net/ipv6/conf/eth0/accept_ra

# Accept redirects
echo 1 > /proc/sys/net/ipv6/conf/eth0/accept_redirects

# Enable privacy extensions
echo 2 > /proc/sys/net/ipv6/conf/eth0/use_tempaddr

# Duplicate Address Detection attempts
echo 3 > /proc/sys/net/ipv6/conf/eth0/dad_transmits

# Check IPv6 addresses
ip -6 addr show eth0

# Sample output:
# inet6 2001:db8:1::21b:77ff:fe49:54fd/64 scope global dynamic
# inet6 fe80::21b:77ff:fe49:54fd/64 scope link

# Monitor Router Advertisements
sudo tcpdump -i eth0 icmp6 and ip6[40] == 134

# Manual Router Solicitation
echo 1 > /proc/sys/net/ipv6/conf/eth0/router_solicitations

# Python script for SLAAC monitoring
import subprocess
import re

def get_ipv6_addresses():
    result = subprocess.run(['ip', '-6', 'addr', 'show'], 
                          capture_output=True, text=True)
    
    addresses = []
    for line in result.stdout.split('\\n'):
        if 'inet6' in line and 'scope global' in line:
            addr = re.search(r'inet6 ([0-9a-f:]+)/\\d+', line)
            if addr:
                addresses.append(addr.group(1))
    
    return addresses

# Check for SLAAC-generated addresses
ipv6_addrs = get_ipv6_addresses()
for addr in ipv6_addrs:
    if 'ff:fe' in addr:  # EUI-64 format
        print(f"SLAAC address detected: {addr}")`,
        explanation: "Linux SLAAC client configuration and monitoring commands."
      }
    ],
    diagrams: [
      {
        src: "/slaac_process.png",
        alt: "SLAAC address configuration process",
        caption: "SLAAC stateless address autoconfiguration sequence"
      },
      {
        src: "/slaac_address_types.jpg",
        alt: "SLAAC address types",
        caption: "Different IPv6 address types generated by SLAAC"
      }
    ],
    relatedProtocols: ["ipv6", "icmpv6", "ndp", "dhcpv6"],
    resources: [
      {
        title: "RFC 4862 - IPv6 Stateless Address Autoconfiguration",
        url: "https://tools.ietf.org/html/rfc4862",
        type: "RFC"
      },
      {
        title: "RFC 4941 - Privacy Extensions for SLAAC",
        url: "https://tools.ietf.org/html/rfc4941",
        type: "RFC"
      },
      {
        title: "IPv6 Configuration Guide",
        url: "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipv6_basic/configuration/xe-3s/ip6b-xe-3s-book.html",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Router Advertisement guard",
      "Secure neighbor discovery",
      "Privacy address rotation",
      "Address monitoring",
      "Rogue RA protection",
      "Network access control",
      "DAD security",
      "IPv6 firewall rules"
    ]
  }