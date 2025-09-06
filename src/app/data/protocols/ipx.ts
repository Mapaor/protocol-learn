import { Protocol } from "../../types/protocol";

export const IPX: Protocol = {
  id: "ipx",
  name: "Internetwork Packet Exchange (IPX)",
  category: "Network",
  difficulty: "Intermediate",
  shortDescription: "Network layer protocol used for routing packets in Novell NetWare networks.",
  fullDescription:
    "IPX is a connectionless network layer protocol developed by Novell for their NetWare systems. It provides addressing, routing, and packet delivery within LANs and WANs. IPX works closely with the SPX protocol (Sequenced Packet Exchange) for reliable transport and is often used alongside NCP for file and print services. IPX addresses consist of a network number and a node number, allowing efficient routing across networks.",
  port: "N/A (Protocol number varies, often over Ethernet 0x8137)",
  versions: ["IPX v1", "IPX v2"],
  advantages: [
    "Efficient routing in Novell environments",
    "Lightweight and fast",
    "Well-integrated with NCP and NetWare services",
    "Connectionless, low overhead"
  ],
  disadvantages: [
    "Proprietary to Novell, limited modern support",
    "Superseded by TCP/IP",
    "Not interoperable with most non-NetWare systems",
    "No built-in encryption or security"
  ],
  useCases: [
    "File and print sharing on Novell NetWare LANs",
    "Routing network traffic in legacy NetWare environments",
    "Supporting legacy enterprise applications"
  ],
  examples: [
    {
      title: "IPX Packet Monitoring (Linux example)",
      code: `# Capture IPX packets on a Linux system using tcpdump
sudo tcpdump -i eth0 proto 0x8137
# Analyze IPX traffic headers`,
      explanation: "Demonstrates how to capture and inspect IPX traffic on a network interface."
    }
  ],
  relatedProtocols: ["ncp", "spx", "netbios", "tcp", "udp"],
  resources: [
    {
      title: "IPX Protocol Overview",
      url: "https://en.wikipedia.org/wiki/Internetwork_Packet_Exchange",
      type: "Reference"
    },
    {
      title: "Novell IPX/SPX Documentation",
      url: "https://www.novell.com/documentation/ncp",
      type: "Documentation"
    }
  ],
  securityConsiderations: [
    "IPX traffic is unencrypted; restrict to trusted networks",
    "Monitor for spoofing in mixed LAN environments",
    "Modern networks should migrate to TCP/IP for better security"
  ]
};
