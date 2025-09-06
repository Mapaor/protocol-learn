import { Protocol } from "../../types/protocol";

export const SPX: Protocol = {
  id: "spx",
  name: "Sequenced Packet Exchange (SPX)",
  category: "Transport",
  difficulty: "Intermediate",
  shortDescription: "Connection-oriented transport protocol providing reliable delivery over IPX networks.",
  fullDescription:
    "SPX is a transport layer protocol developed by Novell that provides reliable, connection-oriented communication on top of the connectionless IPX protocol. It ensures ordered delivery of packets, retransmits lost packets, and uses sequence numbers and acknowledgments to maintain reliability. SPX is commonly used in conjunction with NCP to support file, print, and messaging services in Novell NetWare environments.",
  port: "N/A (runs over IPX)",
  versions: ["SPX v1", "SPX v2"],
  advantages: [
    "Reliable, connection-oriented delivery",
    "Ensures packet ordering and integrity",
    "Well-integrated with NCP and NetWare services",
    "Supports session-based communications"
  ],
  disadvantages: [
    "Proprietary to Novell; limited modern support",
    "Overhead due to sequencing and acknowledgments",
    "Dependent on IPX network layer",
    "Superseded by TCP/IP in modern networks"
  ],
  useCases: [
    "Reliable file and print services in NetWare LANs",
    "Supporting NCP applications requiring ordered delivery",
    "Legacy enterprise systems using IPX/SPX networks"
  ],
  examples: [
    {
      title: "SPX Connection Example",
      code: `# Example: Using SPX for file services in legacy NetWare network
# Client connects to server using NCP over SPX/IPX
# Commands depend on NetWare client tools
# Example: map a NetWare drive using SPX
map c: server_name /vol:share_name`,
      explanation: "Shows how SPX is used as the transport layer for NCP to access file shares in NetWare networks."
    }
  ],
  relatedProtocols: ["ipx", "ncp", "netbios", "tcp"],
  resources: [
    {
      title: "SPX Protocol Overview",
      url: "https://en.wikipedia.org/wiki/Sequenced_Packet_Exchange",
      type: "Reference"
    },
    {
      title: "Novell IPX/SPX Documentation",
      url: "https://www.novell.com/documentation/ncp",
      type: "Documentation"
    }
  ],
  securityConsiderations: [
    "SPX traffic is unencrypted; restrict to trusted networks",
    "Monitor for spoofing or session hijacking in legacy LANs",
    "Modern networks should prefer TCP/IP for better security"
  ]
};