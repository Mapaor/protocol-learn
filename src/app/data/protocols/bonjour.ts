import { Protocol } from "../../types/protocol";

export const BONJOUR: Protocol = {
    id: "bonjour",
    name: "Bonjour",
    category: "Discovery",
    difficulty: "Intermediate",
    shortDescription: "Apple's zero-configuration networking protocol for automatic service discovery",
    fullDescription: "Bonjour is Apple's implementation of zero-configuration networking (zeroconf), a group of technologies that automatically creates a usable computer network based on the Internet Protocol Suite (TCP/IP) when computers or network peripherals are interconnected. It enables automatic discovery of devices and services on a local network using industry standard IP protocols.",
    port: "5353 (mDNS), 427 (SLP)",
    versions: ["Bonjour 1.0", "Bonjour 2.0", "Bonjour 3.0"],
    advantages: [
      "Zero configuration required",
      "Automatic service discovery",
      "Cross-platform compatibility",
      "No infrastructure needed",
      "User-friendly networking",
      "Dynamic service updates",
      "Conflict resolution",
      "Wide application support"
    ],
    disadvantages: [
      "Limited to local network",
      "Security concerns",
      "Network traffic overhead",
      "Name collision issues",
      "Limited scalability",
      "Firewall complications",
      "Protocol complexity",
      "Debugging difficulties"
    ],
    useCases: [
      "Printer discovery",
      "File sharing services",
      "Media streaming",
      "Home automation",
      "Device pairing",
      "Network gaming",
      "VoIP phone discovery",
      "IoT device integration",
      "Screen sharing",
      "Music synchronization",
      "Chat applications",
      "Local web services"
    ],
    examples: [
      {
        title: "Bonjour Service Discovery",
        code: `# Bonjour uses mDNS (multicast DNS) for service discovery

# Service announcement format
service-name._service-type._protocol.local.

# Common Bonjour service types
_http._tcp.local          # Web servers
_printer._tcp.local       # Network printers  
_afpovertcp._tcp.local    # Apple File Protocol
_ssh._tcp.local           # SSH servers
_ftp._tcp.local           # FTP servers
_airplay._tcp.local       # AirPlay devices
_homekit._tcp.local       # HomeKit devices
_ipp._tcp.local           # Internet Printing Protocol

# Example service announcement
MyPrinter._printer._tcp.local.  IN  SRV  0 0 631 printer.local.
MyPrinter._printer._tcp.local.  IN  TXT  "txtvers=1" "ty=LaserJet"

# mDNS query examples
dig @224.0.0.251 -p 5353 _printer._tcp.local PTR
dig @224.0.0.251 -p 5353 MyPrinter._printer._tcp.local SRV

# DNS-SD (DNS Service Discovery) queries
dns-sd -B _printer._tcp          # Browse for printers
dns-sd -L MyPrinter _printer._tcp # Lookup specific printer
dns-sd -R TestService _http._tcp . 8080 # Register service

# Avahi (Linux implementation)
avahi-browse -a                  # Browse all services
avahi-browse _printer._tcp       # Browse printers
avahi-publish -s TestWeb _http._tcp 80 # Publish service`,
        explanation: "Bonjour service discovery using mDNS and DNS-SD protocols."
      },
      {
        title: "Bonjour Programming (macOS/iOS)",
        code: `// Swift Bonjour service discovery
import Foundation
import Network

class BonjourBrowser: NSObject {
    private var browser: NWBrowser?
    private let queue = DispatchQueue(label: "bonjour.browser")
    
    func startBrowsing(for serviceType: String) {
        let browserDescriptor = NWBrowser.Descriptor.bonjour(type: serviceType, domain: "local")
        
        browser = NWBrowser(for: browserDescriptor, using: .tcp)
        
        browser?.browseResultsChangedHandler = { results, changes in
            for change in changes {
                switch change {
                case .added(let result):
                    print("Service found: \\(result.endpoint)")
                    self.resolveService(result)
                case .removed(let result):
                    print("Service lost: \\(result.endpoint)")
                default:
                    break
                }
            }
        }
        
        browser?.start(queue: queue)
    }
    
    private func resolveService(_ result: NWBrowser.Result) {
        let connection = NWConnection(to: result.endpoint, using: .tcp)
        
        connection.start(queue: queue)
        
        // Extract service information
        if case .service(let name, let type, let domain, let interface) = result.endpoint {
            print("Service: \\(name) Type: \\(type) Domain: \\(domain)")
        }
    }
    
    func stopBrowsing() {
        browser?.cancel()
        browser = nil
    }
}

// Objective-C NSNetService example
@interface BonjourService : NSObject <NSNetServiceDelegate>
@property (strong) NSNetService *netService;
@end

@implementation BonjourService

- (void)publishService {
    self.netService = [[NSNetService alloc] 
                      initWithDomain:@"local." 
                      type:@"_myservice._tcp." 
                      name:@"MyTestService" 
                      port:8080];
    
    self.netService.delegate = self;
    [self.netService publish];
}

- (void)netServiceDidPublish:(NSNetService *)sender {
    NSLog(@"Service published: %@", sender.name);
}

- (void)netService:(NSNetService *)sender didNotPublish:(NSDictionary *)errorDict {
    NSLog(@"Service failed to publish: %@", errorDict);
}

@end

// Python Bonjour with Zeroconf library
from zeroconf import ServiceInfo, Zeroconf
import socket

class BonjourService:
    def __init__(self):
        self.zeroconf = Zeroconf()
        
    def register_service(self, name, service_type, port, properties=None):
        if properties is None:
            properties = {}
            
        # Get local IP address
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        
        info = ServiceInfo(
            service_type,
            f"{name}.{service_type}",
            addresses=[socket.inet_aton(local_ip)],
            port=port,
            properties=properties,
            server=f"{hostname}.local."
        )
        
        self.zeroconf.register_service(info)
        return info
        
    def browse_services(self, service_type):
        from zeroconf import ServiceBrowser
        
        class MyListener:
            def add_service(self, zc, type_, name):
                info = zc.get_service_info(type_, name)
                if info:
                    print(f"Service added: {name}")
                    print(f"  Address: {socket.inet_ntoa(info.addresses[0])}")
                    print(f"  Port: {info.port}")
                    print(f"  Properties: {info.properties}")
                    
            def remove_service(self, zc, type_, name):
                print(f"Service removed: {name}")
                
            def update_service(self, zc, type_, name):
                print(f"Service updated: {name}")
        
        listener = MyListener()
        browser = ServiceBrowser(self.zeroconf, service_type, listener)
        return browser
    
    def close(self):
        self.zeroconf.close()

# Usage
service = BonjourService()
info = service.register_service("MyWebServer", "_http._tcp.local.", 8080, 
                               {"path": "/", "version": "1.0"})
browser = service.browse_services("_http._tcp.local.")`,
        explanation: "Bonjour service discovery programming in Swift, Objective-C, and Python."
      },
      {
        title: "Bonjour Configuration and Troubleshooting",
        code: `# macOS Bonjour configuration and tools

# DNS-SD command line tools
# Browse for all services
dns-sd -B _services._dns-sd._udp

# Browse for specific service type
dns-sd -B _airplay._tcp

# Lookup service details
dns-sd -L "Apple TV" _airplay._tcp

# Register a service
dns-sd -R "Test Service" _http._tcp . 8080 path=/test

# Query specific record
dns-sd -Q test.local A

# Proxy registration (for bridging)
dns-sd -P "Remote Service" _http._tcp local 8080 remote.example.com 80

# Linux Avahi configuration
# /etc/avahi/avahi-daemon.conf
[server]
host-name=myhost
domain-name=local
browse-domains=local
use-ipv4=yes
use-ipv6=yes
allow-interfaces=eth0,wlan0

[wide-area]
enable-wide-area=no

[publish]
disable-publishing=no
disable-user-service-publishing=no
publish-addresses=yes
publish-hinfo=yes
publish-workstation=yes
publish-domain=yes
publish-dns-servers=no
publish-resolv-conf-dns-servers=no

# Service file example
# /etc/avahi/services/myservice.service
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
  <name>My Web Server</name>
  <service>
    <type>_http._tcp</type>
    <port>80</port>
    <txt-record>path=/</txt-record>
    <txt-record>version=1.0</txt-record>
  </service>
</service-group>

# Windows Bonjour troubleshooting
# Check Bonjour service status
sc query "Bonjour Service"

# Start/stop Bonjour service
net start "Bonjour Service"
net stop "Bonjour Service"

# Bonjour Browser for testing
# Download from Apple Developer Tools

# Network troubleshooting
# Check multicast support
ping 224.0.0.251

# Check mDNS traffic
tcpdump -i any port 5353

# Firewall configuration for Bonjour
# Allow UDP port 5353 for mDNS
iptables -A INPUT -p udp --dport 5353 -j ACCEPT
iptables -A OUTPUT -p udp --dport 5353 -j ACCEPT

# Allow multicast traffic
iptables -A INPUT -d 224.0.0.251 -j ACCEPT
iptables -A OUTPUT -d 224.0.0.251 -j ACCEPT

# Python mDNS monitoring script
import socket
import struct

def monitor_mdns():
    # Create multicast socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    # Bind to mDNS port
    sock.bind(('', 5353))
    
    # Join multicast group
    mreq = struct.pack("4sl", socket.inet_aton("224.0.0.251"), socket.INADDR_ANY)
    sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
    
    print("Monitoring mDNS traffic...")
    
    while True:
        try:
            data, addr = sock.recvfrom(1024)
            print(f"mDNS packet from {addr[0]}: {len(data)} bytes")
            
            # Basic DNS header parsing
            if len(data) >= 12:
                transaction_id = struct.unpack('!H', data[0:2])[0]
                flags = struct.unpack('!H', data[2:4])[0]
                questions = struct.unpack('!H', data[4:6])[0]
                answers = struct.unpack('!H', data[6:8])[0]
                
                is_response = (flags & 0x8000) != 0
                print(f"  {'Response' if is_response else 'Query'}: {questions} questions, {answers} answers")
                
        except KeyboardInterrupt:
            break
    
    sock.close()

# Usage
# monitor_mdns()`,
        explanation: "Bonjour configuration, troubleshooting tools, and network monitoring."
      }
    ],
    diagrams: [
      {
        src: "/bonjour_architecture.png",
        alt: "Bonjour architecture",
        caption: "Bonjour zero-configuration networking architecture and mDNS operation"
      },
      {
        src: "/bonjour_discovery.jpg",
        alt: "Bonjour service discovery flow",
        caption: "Bonjour service discovery and resolution process"
      }
    ],
    relatedProtocols: ["mdns", "dns", "upnp", "ssdp"],
    resources: [
      {
        title: "Bonjour Overview",
        url: "https://developer.apple.com/bonjour/",
        type: "Documentation"
      },
      {
        title: "RFC 6763 - DNS-Based Service Discovery",
        url: "https://tools.ietf.org/html/rfc6763",
        type: "RFC"
      },
      {
        title: "Avahi Documentation",
        url: "https://avahi.org/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Network segmentation",
      "Service authentication",
      "Traffic filtering",
      "Information disclosure risks",
      "DoS attack prevention",
      "Name spoofing protection",
      "Firewall configuration",
      "Monitoring and logging"
    ]
  }