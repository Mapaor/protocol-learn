import { Protocol } from "../../types/protocol";

export const ATM: Protocol = {
    id: "atm",
    name: "Asynchronous Transfer Mode (ATM)",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Cell-based networking protocol for high-speed data transfer.",
    fullDescription:
        "Asynchronous Transfer Mode (ATM) is a high-speed networking protocol designed for wide area networks (WANs) and telecommunication backbones. It uses fixed-size cells (53 bytes) for transporting voice, video, and data. ATM supports Quality of Service (QoS) guarantees and was widely deployed in telecom networks in the 1990s and early 2000s. It has largely been replaced by IP/MPLS networks.",
    port: "Layer 2 / Layer 3 (no TCP/UDP)",
    versions: ["ATM Forum UNI 3.0, 4.0"],
    advantages: [
        "High-speed, low-latency transport",
        "Supports voice, video, and data simultaneously",
        "QoS guarantees possible",
        "Cell switching reduces jitter and congestion"
    ],
    disadvantages: [
        "Obsolete technology",
        "Complex and expensive hardware",
        "Low efficiency for small packets",
        "Mostly replaced by IP/MPLS"
    ],
    useCases: [
        "Legacy telecom backbones",
        "WAN links for voice/video/data integration",
        "ATM-based DSL networks (historical)",
        "High-speed research networks (legacy)"
    ],
    relatedProtocols: ["frame-relay", "mpls", "ip"],
    resources: [
        {
            title: "ATM Forum Specifications",
            url: "https://www.itu.int/en/ITU-T/studygroups/2008-2011/11/Pages/atm.aspx",
            type: "Standard"
        }
    ],
    securityConsiderations: [
        "Relies on underlying network security",
        "No built-in encryption or authentication",
        "Legacy ATM networks may still carry sensitive traffic"
    ],
    examples: [
        {
            title: "Campus Backbone with ATM",
            code: "// ATM switches connect buildings across a university campus\n// Each building has an ATM interface for high-speed data transfer",
            explanation: "A university campus backbone in the late 1990s used ATM switches to connect buildings, providing high-speed, low-latency networking for research and administration."
        },
        {
            title: "ATM for DSL Broadband",
            code: "// Telecom provider uses ATM to deliver DSL\n// ATM PVCs carry customer data to the DSLAM",
            explanation: "Telecom providers used ATM as the underlying protocol to deliver DSL broadband to homes, with ATM PVCs carrying customer data to the DSLAM."
        },
        {
            title: "Enterprise Video Conferencing over ATM",
            code: "// ATM network provides QoS for video conferencing\n// Guaranteed bandwidth for real-time video streams",
            explanation: "Video conferencing systems in enterprises used ATM to guarantee bandwidth and low latency for real-time video communication."
        },
        {
            title: "Research Networks with ATM",
            code: "// Supercomputers interconnected via ATM\n// Low-latency, high-throughput data transfer for research",
            explanation: "Research networks interconnected supercomputers with ATM to achieve low-latency, high-throughput data transfer for scientific applications."
        }
    ]
};
