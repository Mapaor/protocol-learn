import { Protocol } from "../../types/protocol";

export const ARP: Protocol = {
    id: "arp",
    name: "ARP",
    category: "Network",
    difficulty: "Beginner",
    shortDescription: "Address Resolution Protocol for mapping IP addresses to MAC addresses",
    fullDescription: "ARP (Address Resolution Protocol) is a communication protocol used for discovering the link layer address, such as a MAC address, associated with a given internet layer address, typically an IPv4 address. This mapping is a critical function in the Internet protocol suite.",
    port: "N/A (Layer 2 protocol)",
    advantages: [
      "Essential for network communication",
      "Simple and efficient",
      "Automatic address resolution",
      "Cache mechanism reduces traffic",
      "Works transparently to applications"
    ],
    disadvantages: [
      "Security vulnerabilities (ARP spoofing)",
      "Limited to local network segment",
      "No authentication mechanism",
      "Cache pollution possible",
      "Broadcast traffic overhead"
    ],
    useCases: [
      "IP to MAC address resolution",
      "Local network communication",
      "Ethernet network operations",
      "Network device discovery",
      "Default gateway resolution",
      "Network troubleshooting",
      "DHCP operations",
      "Switch learning",
      "Router operations",
      "Network monitoring"
    ],
    examples: [
      {
        title: "ARP Request and Reply",
        code: `# ARP Request (Broadcast)
Source: 192.168.1.10 (00:11:22:33:44:55)
Target: 192.168.1.1 (00:00:00:00:00:00)
Message: "Who has 192.168.1.1? Tell 192.168.1.10"

# ARP Reply (Unicast)
Source: 192.168.1.1 (aa:bb:cc:dd:ee:ff)
Target: 192.168.1.10 (00:11:22:33:44:55)
Message: "192.168.1.1 is at aa:bb:cc:dd:ee:ff"`,
        explanation: "Basic ARP request and reply process for address resolution."
      },
      {
        title: "ARP Table Commands",
        code: `# View ARP table
arp -a

# Add static ARP entry
arp -s 192.168.1.1 aa-bb-cc-dd-ee-ff

# Delete ARP entry
arp -d 192.168.1.1

# Clear ARP cache
ip neigh flush all  # Linux
arp -d *           # Windows`,
        explanation: "Common ARP table management commands across different operating systems."
      }
    ],
    relatedProtocols: ["ipv4", "dhcp", "ethernet"],
    resources: [
      {
        title: "RFC 826 - ARP Protocol",
        url: "https://tools.ietf.org/html/rfc826",
        type: "RFC"
      },
      {
        title: "ARP Security Considerations",
        url: "https://www.ciscopress.com/articles/article.asp?p=170741",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "ARP spoofing attacks",
      "Static ARP entries",
      "ARP inspection",
      "Network segmentation",
      "Monitoring ARP traffic"
    ]
};
