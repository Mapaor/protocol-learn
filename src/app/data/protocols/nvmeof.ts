import { Protocol } from "../../types/protocol";

export const NVMEOF: Protocol = {
    id: "nvmeof",
    name: "NVMe over Fabrics (NVMe-oF)",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Protocol for accessing NVMe storage devices over network fabrics.",
    fullDescription:
        "NVMe over Fabrics (NVMe-oF) is an extension of the NVMe protocol that enables high-performance access to NVMe storage devices across network fabrics such as Fibre Channel, InfiniBand, RoCE, iWARP, and TCP. It reduces latency compared to traditional storage protocols by maintaining the NVMe command set while extending transport over networks.",
    port: "Depends on transport (e.g., TCP 4420 for NVMe/TCP)",
    versions: ["NVMe-oF 1.0 (2016)", "NVMe-oF 1.1 (2019)"],
    advantages: [
        "High-performance remote storage access",
        "Preserves NVMe command set",
        "Supports multiple transports (TCP, RoCE, Fibre Channel)",
        "Scalable for data centers"
    ],
    disadvantages: [
        "Complex deployment",
        "Requires specialized fabric support for optimal performance",
        "Limited interoperability in early versions"
    ],
    useCases: [
        "Data center storage networks",
        "Hyperconverged infrastructure",
        "Cloud storage services",
        "High-performance computing (HPC)"
    ],
    relatedProtocols: ["nvme", "rdma", "iwarp", "roce", "fibrechannel", "tcp"],
    resources: [
        {
            title: "NVM Express NVMe-oF Specification",
            url: "https://nvmexpress.org/developers/nvme-of-specification/",
            type: "Specification"
        }
    ],
    securityConsiderations: [
        "Authentication and encryption depend on transport layer",
        "Should be combined with TLS/IPsec for secure deployment",
        "Access control needed to prevent unauthorized storage access"
    ],
    examples: [
        {
            title: "Connecting to an NVMe-oF target using NVMe/TCP on Linux",
            code: `sudo nvme connect -t tcp -n nqn.2014-08.org.nvmexpress:uuid:12345678-1234-1234-1234-123456789abc -a 192.168.1.100 -s 4420`,
            explanation: "This command connects a Linux host to an NVMe-oF target using the TCP transport."
        },
        {
            title: "Listing NVMe-oF subsystems available on a target",
            code: `nvme discover -t tcp -a 192.168.1.100 -s 4420`,
            explanation: "This command lists the NVMe-oF subsystems that are available on the specified target."
        }
    ]
};
