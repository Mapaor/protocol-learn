import { Protocol } from "../../types/protocol";

export const DNSSD: Protocol = {
    id: "dnssd",
    name: "DNS Service Discovery (DNS-SD)",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Mechanism for discovering services on a local network using DNS records.",
    fullDescription:
        "DNS Service Discovery (DNS-SD) is a standard that uses DNS records to advertise and discover services on a network. It is often used with Multicast DNS (mDNS) to enable zero-configuration networking (Zeroconf). Apple’s Bonjour and many IoT devices rely on DNS-SD to announce services like printers, file sharing, or AirPlay devices.",
    port: "Typically UDP 5353 (with mDNS)",
    versions: ["RFC 6763"],
    advantages: [
        "Human-friendly service discovery",
        "Works with existing DNS infrastructure",
        "Zero-configuration networking with mDNS"
    ],
    disadvantages: [
        "Can expose services unintentionally",
        "Relies on multicast in local networks",
        "Not ideal for large-scale enterprise deployments"
    ],
    useCases: [
        "Home and office printer discovery",
        "IoT device service advertisement",
        "Apple Bonjour / AirPlay",
        "Zero-config file sharing"
    ],
    relatedProtocols: ["mdns", "dns", "ssdp", "upnp"],
    resources: [
        {
            title: "RFC 6763 - DNS Service Discovery",
            url: "https://datatracker.ietf.org/doc/html/rfc6763",
            type: "RFC"
        }
    ],
    securityConsiderations: [
        "Can leak service information to attackers",
        "Should be filtered across network boundaries",
        "No built-in encryption or authentication"
    ],
    examples: [
                {
                    title: "Printer Discovery via DNS-SD",
                    code: `; _ipp._tcp.local. PTR MyPrinter._ipp._tcp.local.
        MyPrinter._ipp._tcp.local. SRV 0 0 631 MyPrinter.local.
        MyPrinter._ipp._tcp.local. TXT "txtvers=1" "qtotal=1"`,
                    explanation: "A printer advertises its presence on the local network using a DNS-SD PTR record, allowing computers to automatically discover and connect to it without manual configuration."
                },
                {
                    title: "AirPlay Speaker Announcement",
                    code: `; _airplay._tcp.local. PTR LivingRoomSpeaker._airplay._tcp.local.
        LivingRoomSpeaker._airplay._tcp.local. SRV 0 0 7000 LivingRoomSpeaker.local.
        LivingRoomSpeaker._airplay._tcp.local. TXT "deviceid=XX:XX:XX:XX:XX:XX"`,
                    explanation: "An AirPlay speaker uses DNS-SD to announce its streaming service, enabling compatible devices to find and stream audio to it seamlessly."
                }
    ]
};
