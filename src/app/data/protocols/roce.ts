import { Protocol } from "../../types/protocol";

export const ROCE: Protocol = {
  id: "roce",
  name: "RoCE (RDMA over Converged Ethernet)",
  category: "Transport",
  difficulty: "Advanced",
  shortDescription: "RDMA over Converged Ethernet for low-latency data center communication",
  fullDescription: "RoCE (RDMA over Converged Ethernet) is a network protocol that enables RDMA (Remote Direct Memory Access) over Ethernet. Unlike iWARP, which runs over TCP/IP, RoCE operates directly over Ethernet (RoCEv1) or UDP/IP (RoCEv2). RoCE provides extremely low latency and high throughput by bypassing TCP overhead, but typically requires a lossless Ethernet fabric using Data Center Bridging (DCB) features such as Priority Flow Control.",
  port: "UDP port 4791 (RoCEv2), Ethertype 0x8915 (RoCEv1)",
  versions: ["RoCEv1 (Ethernet only)", "RoCEv2 (Routable over UDP/IP)"],
  advantages: [
    "Ultra-low latency and high throughput",
    "Bypasses TCP/IP stack overhead",
    "Widely adopted in data center fabrics",
    "Ideal for GPU clusters and HPC",
    "Compatible with NVMe-oF and storage workloads",
    "Supports scalable Ethernet infrastructures"
  ],
  disadvantages: [
    "Requires lossless Ethernet fabric (DCB, PFC)",
    "Less flexible than iWARP over WAN",
    "Complex QoS and congestion management",
    "RoCEv1 not routable (limited to L2 domains)",
    "RoCEv2 adds UDP/IP but increases config complexity",
    "Vendor-specific implementations (NIC dependency)"
  ],
  useCases: [
    "Data center networking",
    "Machine learning / AI GPU clusters",
    "High-performance computing (HPC)",
    "NVMe over Fabrics (RoCE transport)",
    "Distributed storage systems (Ceph, Lustre)",
    "Financial trading low-latency systems"
  ],
  examples: [
    {
      title: "RoCEv1 vs RoCEv2",
      code: `# RoCEv1
RDMA packets encapsulated directly in Ethernet frames (Ethertype 0x8915)
Non-routable, confined to L2 domains

# RoCEv2
RDMA packets encapsulated in UDP/IP (port 4791)
Routable across IP subnets (L3 support)`,
      explanation: "RoCEv1 is limited to Ethernet broadcast domains, while RoCEv2 allows routable RDMA traffic over UDP/IP."
    },
    {
      title: "Example NVMe-oF target with RoCE",
      code: `# Start NVMe over Fabrics target with RoCE transport
nvmetcli create_subsystem nqn.2014-08.org.nvmexpress:roce-test
nvmetcli create_namespace nqn.2014-08.org.nvmexpress:roce-test /dev/nvme0n1
nvmetcli add_port 1 --addr 192.168.10.100 --trtype=rdma --adrfam=ipv4 --trsvcid=4791`,
      explanation: "RoCE transport configured for NVMe over Fabrics target system."
    }
  ],
  diagrams: [
    {
      src: "/roce_architecture.png",
      alt: "RoCE architecture",
      caption: "RDMA over Converged Ethernet stack showing RoCEv1 and RoCEv2 differences"
    }
  ],
  relatedProtocols: ["rdma", "iwarp", "ethernet", "nvmeof", "udp", "dcb"],
  resources: [
    {
      title: "InfiniBand Trade Association - RoCE",
      url: "https://www.infinibandta.org/roce/",
      type: "Specification"
    },
    {
      title: "RoCEv2 Overview (Mellanox/NVIDIA)",
      url: "https://developer.nvidia.com/roce",
      type: "Reference"
    }
  ],
  securityConsiderations: [
    "Depends on Ethernet security (e.g., VLANs, ACLs)",
    "RoCEv1 vulnerable to L2 spoofing",
    "RoCEv2 exposed to UDP/IP attacks (spoofing, amplification)",
    "Requires isolation in multi-tenant environments",
    "May need IPsec or MACsec for secure RDMA traffic",
    "Congestion attacks possible without DCB tuning"
  ]
};
