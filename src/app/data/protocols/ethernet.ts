import { Protocol } from "../../types/protocol";

export const ETHERNET: Protocol = {
  id: "ethernet",
  name: "Ethernet",
  category: "Network",
  difficulty: "Beginner",
  shortDescription: "Ethernet is the dominant LAN technology for framing and transmitting data over physical media.",
  fullDescription: "Ethernet is a family of networking technologies standardized as IEEE 802.3. It defines the physical and data link layer specifications for local area networks (LANs), including wiring, signaling, frame formats, and error detection. Ethernet is the most widely deployed LAN technology worldwide, supporting speeds from 10 Mbps to 400 Gbps and beyond. It provides MAC addressing, frame encapsulation, and collision detection/avoidance mechanisms.",
  port: "N/A (Data Link Layer protocol)",
  versions: [
    "Ethernet II (DIX)",
    "IEEE 802.3 (standardized)",
    "Fast Ethernet (100 Mbps)",
    "Gigabit Ethernet (1 Gbps)",
    "10 Gigabit Ethernet",
    "40/100/400 Gigabit Ethernet"
  ],
  advantages: [
    "Simple and widely adopted",
    "Supports multiple speeds and media types",
    "Low cost and reliable",
    "Standardized (IEEE 802.3)",
    "MAC addressing for device identification",
    "Backward compatibility across generations",
    "Scales from LANs to data centers"
  ],
  disadvantages: [
    "Originally limited by collisions (CSMA/CD, now mostly obsolete)",
    "Broadcast domain size can lead to congestion",
    "No inherent QoS (requires extensions)",
    "Security issues (e.g., ARP spoofing, sniffing)",
    "Not suitable for very long distances without additional protocols",
    "Still mostly best-effort delivery"
  ],
  useCases: [
    "Local Area Networks (LANs)",
    "Campus networking",
    "Data center fabrics",
    "Enterprise backbone",
    "Home networks",
    "Storage networking (iSCSI, NVMe-oF over Ethernet)",
    "Carrier Ethernet (WAN extensions)",
    "Industrial control systems"
  ],
  examples: [
    {
      title: "Ethernet Frame Structure",
      code: `+-------------------+-------------------+-------------------+
| Preamble (7B)   | SFD (1B)          | Destination MAC (6B) |
+-------------------+-------------------+-------------------+
| Source MAC (6B) | EtherType/Length (2B) |
+-------------------+-------------------+
| Payload (46-1500B, up to 9000B for Jumbo) |
+------------------------------------------------------------+
| Frame Check Sequence (4B CRC) |
+------------------------------------------------------------+`,
      explanation: "The standard Ethernet II frame format showing MAC addresses, EtherType, payload, and CRC."
    },
    {
      title: "Example Linux Commands",
      code: `# Show Ethernet interfaces
ip link show

# Bring interface up/down
ip link set eth0 up
ip link set eth0 down

# Show MAC address
cat /sys/class/net/eth0/address

# Change MAC address
ip link set dev eth0 address 02:42:ac:11:00:02`,
      explanation: "Common Ethernet configuration tasks on Linux."
    }
  ],
  diagrams: [
    {
      src: "/ethernet_frame.png",
      alt: "Ethernet frame format",
      caption: "Ethernet II frame format with MAC addresses and EtherType field"
    },
    {
      src: "/ethernet_speeds.jpg",
      alt: "Ethernet speed evolution",
      caption: "Ethernet technology evolution from 10 Mbps to 400 Gbps"
    }
  ],
  relatedProtocols: ["ip", "arp", "vlan", "roce", "iwarp", "mpls"],
  resources: [
    {
      title: "IEEE 802.3 Ethernet Standard",
      url: "https://standards.ieee.org/standard/802_3-2018.html",
      type: "Standard"
    },
    {
      title: "Ethernet Frame Structure (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Ethernet_frame",
      type: "Reference"
    }
  ],
  securityConsiderations: [
    "MAC spoofing and address flooding attacks",
    "Eavesdropping on broadcast domains",
    "ARP poisoning in Ethernet LANs",
    "Lack of encryption (requires higher layer security like IPsec, TLS, or MACsec)",
    "VLAN hopping attacks",
    "DoS via broadcast storms"
  ]
};
