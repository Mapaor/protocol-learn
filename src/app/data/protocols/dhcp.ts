import { Protocol } from "../../types/protocol";

export const DHCP: Protocol = {
    id: "dhcp",
    name: "DHCP",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Dynamic Host Configuration Protocol for automatic IP address assignment",
    fullDescription: "DHCP (Dynamic Host Configuration Protocol) is a network management protocol used on Internet Protocol networks for automatically assigning IP addresses and other communication parameters to devices connected to the network.",
    port: "67 (server), 68 (client)",
    versions: ["DHCPv4", "DHCPv6"],
    advantages: [
      "Automatic IP configuration",
      "Centralized management",
      "Efficient IP usage",
      "Reduced configuration errors",
      "Easy network changes",
      "Scalability"
    ],
    disadvantages: [
      "Single point of failure",
      "Security vulnerabilities",
      "Network dependency",
      "IP conflicts possible",
      "Limited control for clients"
    ],
    useCases: [
      "Automatic IP assignment",
      "Network configuration",
      "Guest networks",
      "Large network management",
      "Dynamic environments",
      "Mobile device support",
      "ISP customer networks",
      "Corporate networks",
      "Home networks",
      "Public Wi-Fi",
      "IoT device configuration",
      "Network bootstrapping"
    ],
    examples: [
      {
        title: "DHCP Process (DORA)",
        code: `1. DISCOVER
   Client: "I need an IP address"
   Broadcast: 255.255.255.255

2. OFFER
   Server: "Here's an available IP: 192.168.1.100"
   Lease time: 24 hours

3. REQUEST
   Client: "I accept 192.168.1.100"
   
4. ACKNOWLEDGE
   Server: "IP assigned successfully"
   Additional options: DNS, Gateway, etc.`,
        explanation: "The DHCP DORA process for automatic IP address assignment."
      },
      {
        title: "DHCP Configuration Example",
        code: `# DHCP server configuration (dhcpd.conf)
subnet 192.168.1.0 netmask 255.255.255.0 {
    range 192.168.1.100 192.168.1.200;
    option domain-name-servers 8.8.8.8, 8.8.4.4;
    option domain-name "example.com";
    option routers 192.168.1.1;
    option broadcast-address 192.168.1.255;
    default-lease-time 86400;
    max-lease-time 172800;
}

# Static reservation
host server {
    hardware ethernet 00:50:56:c0:00:08;
    fixed-address 192.168.1.50;
}`,
        explanation: "DHCP server configuration with IP range, options, and static reservations."
      }
    ],
    diagrams: [
      {
        src: "/dhcp.png",
        alt: "DHCP process flow",
        caption: "DHCP DORA process for automatic network configuration"
      },
      {
        src: "/dhcp_security.jpg",
        alt: "DHCP security considerations",
        caption: "DHCP security threats and mitigation strategies"
      }
    ],
    relatedProtocols: ["dns", "arp", "udp"],
    resources: [
      {
        title: "RFC 2131 - DHCP Protocol",
        url: "https://tools.ietf.org/html/rfc2131",
        type: "RFC"
      },
      {
        title: "ISC DHCP Server",
        url: "https://www.isc.org/dhcp/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "DHCP snooping",
      "Rogue server prevention",
      "MAC address filtering",
      "DHCP reservations",
      "Network segmentation"
    ]
  }