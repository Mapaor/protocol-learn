import { Protocol } from "../../types/protocol";

export const DCB: Protocol = {
    id: "dcb",
    name: "Data Center Bridging (DCB)",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Suite of Ethernet extensions for lossless data center networking.",
    fullDescription:
        "Data Center Bridging (DCB) is a collection of IEEE standards that enhance traditional Ethernet to support data center workloads requiring low latency and lossless transport, such as storage and converged fabrics. DCB includes Priority-based Flow Control (PFC), Enhanced Transmission Selection (ETS), Data Center Bridging Exchange Protocol (DCBX), and Congestion Notification (QCN).",
    port: "N/A (Ethernet link-layer extensions)",
    versions: [
        "IEEE 802.1Qbb (PFC)",
        "IEEE 802.1Qaz (ETS/DCBX)",
        "IEEE 802.1Qau (QCN)"
    ],
    advantages: [
        "Lossless Ethernet transport",
        "Supports storage protocols over Ethernet (iSCSI, FCoE, NVMe-oF)",
        "Improved QoS and traffic separation",
        "Critical for converged data center fabrics"
    ],
    disadvantages: [
        "Complex configuration",
        "Requires DCB-capable hardware",
        "Potential deadlocks if misconfigured",
        "Primarily applicable in enterprise data centers"
    ],
    useCases: [
        "Data center converged networking",
        "Storage over Ethernet (FCoE, iSCSI, NVMe-oF)",
        "High-performance computing",
        "Cloud data centers"
    ],
    relatedProtocols: ["ethernet", "fcoe", "iscsi", "nvmeof", "roce"],
    resources: [
        {
            title: "IEEE Data Center Bridging Task Group",
            url: "https://1.ieee802.org/dcb/",
            type: "Standard"
        }
    ],
    securityConsiderations: [
        "Primarily affects data plane, not authentication",
        "Misconfiguration can lead to congestion collapse",
        "Should be combined with secure transport protocols for storage"
    ],
    examples: [
        {
            title: "Lossless Ethernet for FCoE Storage",
            code: `# DCB-enabled switch configuration (pseudo-code)
enable dcb
configure pfc priority 3 enable
assign fcoe traffic to priority 3`,
            explanation: "A data center uses DCB to enable lossless Ethernet for Fibre Channel over Ethernet (FCoE) storage traffic by configuring Priority-based Flow Control (PFC) for the FCoE traffic class."
        },
        {
            title: "Low-Latency NVMe-oF Networking",
            code: `# Top-of-rack switch DCB config (pseudo-code)
enable dcb
configure ets bandwidth 50% for priority 4
assign nvmeof traffic to priority 4`,
            explanation: "A cloud provider configures DCB on top-of-rack switches to ensure low-latency, congestion-free networking for NVMe-oF storage by allocating bandwidth and enabling lossless transport."
        },
        {
            title: "Converged Networking Deployment",
            code: `# Example: DCB for converged traffic (pseudo-code)
enable dcb
configure pfc enable for priorities 3,4
map storage to priority 3, regular traffic to priority 0`,
            explanation: "An enterprise deploys DCB to support converged networking, carrying both storage and regular Ethernet traffic on the same infrastructure by mapping different traffic types to separate priorities."
        }
    ]
};
