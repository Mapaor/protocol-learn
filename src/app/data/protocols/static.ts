import { Protocol } from "../../types/protocol";

export const STATIC: Protocol = {
    id: "static",
    name: "Static Routing",
    category: "Network",
    difficulty: "Beginner",
    shortDescription: "Manual routing configuration for deterministic network paths",
    fullDescription: "Static routing is a form of routing that occurs when a router uses a manually-configured routing entry, rather than information from dynamic routing traffic. Static routes are fixed routes that do not change unless manually reconfigured.",
    port: "N/A (configuration-based)",
    versions: ["IPv4 Static Routes", "IPv6 Static Routes", "Floating Static Routes"],
    advantages: [
      "Simple configuration",
      "No routing protocol overhead",
      "Deterministic paths",
      "Security through obscurity",
      "Bandwidth conservation",
      "Predictable behavior",
      "No convergence time",
      "Suitable for small networks"
    ],
    disadvantages: [
      "Manual configuration required",
      "No automatic failover",
      "Scalability limitations",
      "Administrative overhead",
      "Error-prone configuration",
      "No dynamic adaptation",
      "Difficult troubleshooting",
      "Network topology changes require updates"
    ],
    useCases: [
      "Small networks",
      "Stub networks",
      "Default gateway configuration",
      "Point-to-point links",
      "Security-sensitive environments",
      "Backup routes",
      "Policy-based routing",
      "Network labs and testing",
      "Simple branch offices",
      "Internet connectivity",
      "VPN configurations",
      "Load balancing scenarios"
    ],
    examples: [
      {
        title: "Basic Static Route Configuration",
        code: `# Cisco IOS Static Route Configuration

# Basic static route syntax
ip route destination_network subnet_mask next_hop_ip [administrative_distance]

# Default route (gateway of last resort)
ip route 0.0.0.0 0.0.0.0 192.168.1.1

# Network-specific static route
ip route 10.2.0.0 255.255.255.0 192.168.1.10

# Host-specific static route
ip route 10.3.1.5 255.255.255.255 192.168.1.20

# Static route via interface
ip route 172.16.0.0 255.255.0.0 GigabitEthernet0/1

# Static route with administrative distance
ip route 10.4.0.0 255.255.255.0 192.168.1.30 100

# Floating static route (backup)
ip route 10.5.0.0 255.255.255.0 192.168.1.40 200

# IPv6 static routes
ipv6 route ::/0 2001:db8::1
ipv6 route 2001:db8:2::/64 2001:db8::10

# Linux static route configuration
# Temporary route (lost on reboot)
route add -net 10.2.0.0/24 gw 192.168.1.10

# Default route
route add default gw 192.168.1.1

# Permanent routes (Ubuntu/Debian)
# /etc/network/interfaces
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    up route add -net 10.2.0.0/24 gw 192.168.1.10
    down route del -net 10.2.0.0/24 gw 192.168.1.10

# CentOS/RHEL static routes
# /etc/sysconfig/network-scripts/route-eth0
10.2.0.0/24 via 192.168.1.10
172.16.0.0/16 via 192.168.1.20`,
        explanation: "Basic static route configuration across different platforms."
      },
      {
        title: "Advanced Static Routing",
        code: `# Advanced Cisco static routing features

# Load balancing with equal-cost static routes
ip route 10.10.0.0 255.255.255.0 192.168.1.10
ip route 10.10.0.0 255.255.255.0 192.168.1.20

# Unequal load balancing using administrative distance
ip route 10.11.0.0 255.255.255.0 192.168.1.10 1
ip route 10.11.0.0 255.255.255.0 192.168.1.20 5

# Static route with object tracking
track 1 ip sla 1 reachability
ip route 10.12.0.0 255.255.255.0 192.168.1.10 track 1
ip route 10.12.0.0 255.255.255.0 192.168.1.20 200

# IP SLA configuration for tracking
ip sla 1
 icmp-echo 192.168.1.10 source-interface GigabitEthernet0/0
 frequency 10
ip sla schedule 1 life forever start-time now

# Null route (blackhole)
ip route 192.168.100.0 255.255.255.0 null0

# Static NAT with route
ip nat inside source static 10.1.1.100 203.0.113.100
ip route 203.0.113.100 255.255.255.255 10.1.1.100

# Policy-based routing with static routes
access-list 100 permit ip 10.1.1.0 0.0.0.255 any
route-map PBR permit 10
 match ip address 100
 set ip next-hop 192.168.1.100

interface GigabitEthernet0/0
 ip policy route-map PBR

# Windows static route configuration
# Add persistent static route
route add 10.2.0.0 mask 255.255.255.0 192.168.1.10 -p

# Add route with metric
route add 172.16.0.0 mask 255.255.0.0 192.168.1.20 metric 1

# Delete static route
route delete 10.2.0.0

# Display routing table
route print

# PowerShell static routing
New-NetRoute -DestinationPrefix "10.3.0.0/24" -NextHop "192.168.1.10" -InterfaceAlias "Ethernet"

# Remove route
Remove-NetRoute -DestinationPrefix "10.3.0.0/24"`,
        explanation: "Advanced static routing features including load balancing and tracking."
      },
      {
        title: "Static Route Automation",
        code: `#!/bin/bash
# Static route management script

CONFIG_FILE="/etc/static-routes.conf"
LOG_FILE="/var/log/static-routes.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Function to add static route
add_route() {
    local network=$1
    local gateway=$2
    local interface=$3
    
    if [ -z "$interface" ]; then
        route add -net $network gw $gateway
    else
        route add -net $network gw $gateway dev $interface
    fi
    
    if [ $? -eq 0 ]; then
        log_message "Added route: $network via $gateway"
        echo "$network $gateway $interface" >> $CONFIG_FILE
    else
        log_message "Failed to add route: $network via $gateway"
    fi
}

# Function to remove static route
remove_route() {
    local network=$1
    local gateway=$2
    
    route del -net $network gw $gateway
    
    if [ $? -eq 0 ]; then
        log_message "Removed route: $network via $gateway"
        # Remove from config file
        sed -i "/$network $gateway/d" $CONFIG_FILE
    else
        log_message "Failed to remove route: $network via $gateway"
    fi
}

# Function to load routes from config file
load_routes() {
    if [ -f "$CONFIG_FILE" ]; then
        while read -r network gateway interface; do
            if [ ! -z "$network" ] && [ ! -z "$gateway" ]; then
                add_route $network $gateway $interface
            fi
        done < $CONFIG_FILE
    fi
}

# Function to check route reachability
check_routes() {
    route -n | grep "^[0-9]" | while read -r network gateway genmask flags metric ref use iface; do
        if [ "$gateway" != "0.0.0.0" ]; then
            ping -c 1 -W 2 $gateway >/dev/null 2>&1
            if [ $? -ne 0 ]; then
                log_message "Gateway $gateway unreachable for network $network"
                echo "WARNING: Gateway $gateway unreachable for network $network"
            fi
        fi
    done
}

# Python static route manager
import subprocess
import ipaddress
import json
import logging

class StaticRouteManager:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def add_route(self, destination, gateway, interface=None, metric=None):
        """Add a static route"""
        try:
            # Validate IP addresses
            dest_net = ipaddress.ip_network(destination, strict=False)
            gw_addr = ipaddress.ip_address(gateway)
            
            # Build route command
            cmd = ['ip', 'route', 'add', str(dest_net), 'via', str(gw_addr)]
            
            if interface:
                cmd.extend(['dev', interface])
            
            if metric:
                cmd.extend(['metric', str(metric)])
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                self.logger.info(f"Added route: {destination} via {gateway}")
                return True
            else:
                self.logger.error(f"Failed to add route: {result.stderr}")
                return False
                
        except Exception as e:
            self.logger.error(f"Error adding route: {e}")
            return False
    
    def remove_route(self, destination, gateway=None):
        """Remove a static route"""
        try:
            dest_net = ipaddress.ip_network(destination, strict=False)
            
            cmd = ['ip', 'route', 'del', str(dest_net)]
            
            if gateway:
                gw_addr = ipaddress.ip_address(gateway)
                cmd.extend(['via', str(gw_addr)])
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                self.logger.info(f"Removed route: {destination}")
                return True
            else:
                self.logger.error(f"Failed to remove route: {result.stderr}")
                return False
                
        except Exception as e:
            self.logger.error(f"Error removing route: {e}")
            return False
    
    def get_routes(self):
        """Get current routing table"""
        try:
            result = subprocess.run(['ip', 'route', 'show'], 
                                  capture_output=True, text=True)
            
            routes = []
            for line in result.stdout.strip().split('\\n'):
                if line:
                    routes.append(line)
            
            return routes
            
        except Exception as e:
            self.logger.error(f"Error getting routes: {e}")
            return []

# Usage example
route_mgr = StaticRouteManager()
route_mgr.add_route('10.2.0.0/24', '192.168.1.10')
routes = route_mgr.get_routes()
print(f"Current routes: {len(routes)}")`,
        explanation: "Static route automation and management scripts."
      }
    ],
    diagrams: [
      {
        src: "/static_routing_topology.png",
        alt: "Static routing topology",
        caption: "Network topology with static routes configuration"
      },
      {
        src: "/static_vs_dynamic.jpg",
        alt: "Static vs dynamic routing comparison",
        caption: "Comparison between static and dynamic routing protocols"
      }
    ],
    relatedProtocols: ["ospf", "eigrp", "bgp", "rip"],
    resources: [
      {
        title: "Cisco Static Routing Configuration Guide",
        url: "https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/16448-default.html",
        type: "Guide"
      },
      {
        title: "Linux Advanced Routing HOWTO",
        url: "http://www.lartc.org/",
        type: "Documentation"
      },
      {
        title: "Windows Routing Documentation",
        url: "https://docs.microsoft.com/en-us/windows-server/networking/technologies/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Access control for route configuration",
      "Route validation and verification",
      "Monitoring for unauthorized changes",
      "Backup and recovery procedures",
      "Change management processes",
      "Network segmentation",
      "Logging and auditing",
      "Documentation maintenance"
    ]
  }