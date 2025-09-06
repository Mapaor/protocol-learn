import { Protocol } from "../../types/protocol";

export const WINS: Protocol = {
  id: "wins",
  name: "Windows Internet Name Service (WINS)",
  category: "Network",
  difficulty: "Intermediate",
  shortDescription: "Microsoft service for NetBIOS name resolution over TCP/IP.",
  fullDescription:
    "WINS is a Microsoft service that resolves NetBIOS names to IP addresses in TCP/IP networks. It provides dynamic registration and resolution of computer names, supporting legacy Windows networking and applications. While largely superseded by DNS, WINS remains in use in some enterprise environments for legacy support.",
  port: "TCP/UDP 137",
  versions: ["Microsoft WINS"],
  advantages: [
    "Dynamic NetBIOS name resolution",
    "Reduces broadcast traffic compared to pure NetBIOS broadcasts",
    "Integrates with Windows networking infrastructure"
  ],
  disadvantages: [
    "Proprietary Microsoft protocol",
    "Mostly deprecated in favor of DNS",
    "Limited interoperability with non-Windows systems"
  ],
  useCases: [
    "Legacy Windows network environments",
    "Supporting older applications using NetBIOS names",
    "Migration scenarios from NetBIOS to DNS"
  ],
  examples: [
    {
      title: "Query WINS Server (Windows CMD)",
      code: `# Query WINS for a NetBIOS name
nbtstat -A 192.168.1.100`,
      explanation: "Demonstrates checking NetBIOS name resolution using WINS."
    }
  ],
  relatedProtocols: ["netbios", "tcp", "udp", "dns"],
  resources: [
    {
      title: "Microsoft WINS Documentation",
      url: "https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc757950(v=ws.10)",
      type: "Documentation"
    }
  ],
  securityConsiderations: [
    "WINS traffic can be spoofed; use internal networks only",
    "Integrate with firewalls to limit exposure",
    "DNS is preferred for modern networks"
  ]
};
