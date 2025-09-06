import { Protocol } from "../../types/protocol";

export const NCP: Protocol = {
  id: "ncp",
  name: "NetWare Core Protocol (NCP)",
  category: "Network",
  difficulty: "Intermediate",
  shortDescription: "Protocol used by Novell NetWare for file, print, and messaging services.",
  fullDescription:
    "NCP is the core network protocol of Novell NetWare, responsible for managing file access, printing, directory services, and messaging across the network. Originally designed to work over IPX/SPX, later implementations support TCP/IP. NCP enables clients to interact with servers for shared resources in a way similar to modern SMB/CIFS protocols.",
  port: "Various (typically IPX/SPX or TCP/IP over port 524 for login)",
  versions: ["Novell NetWare NCP v3/v4/v5"],
  advantages: [
    "Efficient file and print sharing in Novell environments",
    "Integrated directory services",
    "Supports legacy NetWare clients",
    "Reliable network messaging capabilities"
  ],
  disadvantages: [
    "Proprietary to Novell/NetWare",
    "Limited modern support outside legacy systems",
    "Dependent on specific client/server software",
    "Security limitations compared to modern protocols"
  ],
  useCases: [
    "File and print services in legacy Novell NetWare networks",
    "Network messaging and directory services",
    "Maintaining compatibility with older enterprise systems"
  ],
  examples: [
    {
      title: "Connecting to an NCP server (Linux client example)",
      code: `# Mount a NetWare share via NCP
sudo mount -t ncp server:/volume/share /mnt/netware
# Access files on the NetWare server
ls /mnt/netware`,
      explanation: "Demonstrates mounting and accessing a NetWare file share using NCP."
    }
  ],
  relatedProtocols: ["ipx", "tcp", "udp", "netbios", "smb"],
  resources: [
    {
      title: "Novell NCP Protocol Documentation",
      url: "https://www.novell.com/documentation/ncp",
      type: "Documentation"
    },
    {
      title: "NCP Overview and Technical Details",
      url: "https://en.wikipedia.org/wiki/NetWare_Core_Protocol",
      type: "Reference"
    }
  ],
  securityConsiderations: [
    "Ensure NCP services are only accessible on trusted networks",
    "Use modern authentication methods if possible",
    "Legacy NCP may be vulnerable to spoofing and unauthorized access"
  ]
};
