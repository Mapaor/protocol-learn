import { Protocol } from "../../types/protocol";

export const FCOE: Protocol = {
    id: "fcoe",
    name: "Fibre Channel over Ethernet (FCoE)",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Encapsulation of Fibre Channel frames over Ethernet networks.",
    fullDescription:
        "FCoE allows Fibre Channel (FC) storage traffic to be carried over Ethernet networks, reducing the need for separate FC infrastructure. It requires lossless Ethernet (often via Data Center Bridging) to maintain reliability. FCoE enables convergence of LAN and SAN traffic onto the same physical network while preserving Fibre Channel protocol semantics.",
    port: "Ethernet (no TCP/UDP)",
    versions: ["FCoE 1.0 (2007)", "FCoE 2.0"],
    advantages: [
        "Converges LAN and SAN traffic on a single network",
        "Reduces cabling and infrastructure costs",
        "Maintains Fibre Channel features (zoning, FCP)",
        "Works with standard Ethernet hardware supporting DCB"
    ],
    disadvantages: [
        "Requires lossless Ethernet (DCB)",
        "Limited adoption outside data centers",
        "Complex configuration",
        "Performance depends on underlying Ethernet network"
    ],
    useCases: [
        "Data center storage area networks (SAN)",
        "Hyperconverged infrastructure",
        "High-performance computing clusters",
        "Enterprise cloud storage"
    ],
    relatedProtocols: ["ethernet", "dcb", "nvmeof", "iscsi"],
    resources: [
        {
            title: "FCoE Standard - T11 Technical Committee",
            url: "https://www.t11.org/",
            type: "Standard"
        }
    ],
    securityConsiderations: [
        "Depends on underlying Ethernet security",
        "Fibre Channel zoning can restrict access",
        "Should be deployed on trusted networks only"
    ],
    examples: [
        {
            title: "Cisco Nexus Switches with FCoE",
            code: "// Example: FCoE configuration on Cisco Nexus (pseudocode)\ninterface vfc1\n  bind interface Ethernet1/1\n  switchport\n  no shutdown",
            explanation: "This example shows a pseudocode configuration for enabling FCoE on a Cisco Nexus switch, binding a virtual Fibre Channel interface to a physical Ethernet port."
        },
        {
            title: "Dell EMC Storage with FCoE",
            code: "// Example: FCoE connection to Dell EMC storage (pseudocode)\nserver connect fcoe\n  storage-array dell-emc\n  ethernet-port eth2\n  enable",
            explanation: "This example demonstrates a pseudocode setup for connecting a server to a Dell EMC storage array over a lossless Ethernet fabric using FCoE."
        }
    ]
};
