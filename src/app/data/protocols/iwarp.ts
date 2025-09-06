import { Protocol } from "../../types/protocol";

export const IWARP: Protocol = {
  id: "iwarp",
  name: "iWARP",
  category: "Transport",
  difficulty: "Advanced",
  shortDescription: "Internet Wide Area RDMA Protocol over TCP",
  fullDescription: "iWARP (Internet Wide Area RDMA Protocol) is a suite of protocols that enables RDMA (Remote Direct Memory Access) over standard TCP/IP networks. It builds on top of TCP to provide reliable, congestion-aware data transfer while preserving RDMA’s low-latency, zero-copy semantics. iWARP combines RDMAP, DDP, and MPA protocols to allow high-performance networking over Ethernet and routable IP fabrics.",
  port: "N/A (runs over TCP, typically port 5001+ for iWARP services)",
  versions: ["RDMAP (RFC 5040)", "DDP (RFC 5041)", "MPA (RFC 5044)"],
  advantages: [
    "Enables RDMA over standard Ethernet/IP networks",
    "Preserves TCP reliability and congestion control",
    "Interoperates across routed IP networks (WAN/LAN)",
    "No special network infrastructure required",
    "Zero-copy, low-latency transfers",
    "Scalable across large environments"
  ],
  disadvantages: [
    "Higher latency than RoCE (due to TCP overhead)",
    "Complex protocol stack (RDMAP/DDP/MPA over TCP)",
    "Limited adoption compared to RoCE in data centers",
    "Performance depends on TCP tuning",
    "Requires RDMA-capable NICs with iWARP support"
  ],
  useCases: [
    "High-performance computing (HPC)",
    "Cloud data centers over routable IP fabrics",
    "Enterprise storage protocols (iSER, NVMe-oF over iWARP)",
    "Virtual machine live migration",
    "Distributed databases",
    "Remote memory access in hybrid WAN/LAN environments"
  ],
  examples: [
    {
      title: "iWARP Protocol Stack",
      code: `Application
  │
  ├─ RDMAP (Remote Direct Memory Access Protocol, RFC 5040)
  │
  ├─ DDP (Direct Data Placement, RFC 5041)
  │
  ├─ MPA (Marker PDU Aligned framing, RFC 5044)
  │
  └─ TCP/IP → Ethernet`,
      explanation: "iWARP is layered on top of TCP/IP using RDMAP, DDP, and MPA to provide RDMA functionality."
    },
    {
      title: "NVMe over Fabrics using iWARP",
      code: `# Example Linux configuration with NVMe over Fabrics (iWARP transport)
nvme connect -t rdma -a 192.168.1.100 -s 4420 --traddr=192.168.1.200 --transport=iwarp`,
      explanation: "NVMe-oF target and initiator using iWARP transport over standard TCP/IP Ethernet."
    }
  ],
  diagrams: [
    {
      src: "/iwarp_protocol_stack.png",
      alt: "iWARP protocol stack",
      caption: "Protocol stack showing RDMAP, DDP, MPA layered over TCP/IP and Ethernet"
    }
  ],
  relatedProtocols: ["rdma", "tcp", "roce", "ethernet", "nvmeof"],
  resources: [
    {
      title: "RFC 5040 - RDMAP",
      url: "https://datatracker.ietf.org/doc/html/rfc5040",
      type: "RFC"
    },
    {
      title: "RFC 5041 - DDP",
      url: "https://datatracker.ietf.org/doc/html/rfc5041",
      type: "RFC"
    },
    {
      title: "RFC 5044 - MPA",
      url: "https://datatracker.ietf.org/doc/html/rfc5044",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "TCP/IP security applies (spoofing, MITM, DoS)",
    "Requires NIC firmware validation for iWARP stack",
    "Encryption must be layered (e.g., IPsec, TLS)",
    "Congestion control inherited from TCP",
    "Vulnerability to TCP-based attacks (RST injection, flooding)"
  ]
};
