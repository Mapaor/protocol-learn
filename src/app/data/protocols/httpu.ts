import { Protocol } from "../../types/protocol";

export const HTTPU: Protocol = {
    id: "httpu",
    name: "HTTPU (HTTP over UDP)",
    category: "Application",
    difficulty: "Advanced",
    shortDescription: "Experimental variant of HTTP transported over UDP.",
    fullDescription:
        "HTTPU is an experimental protocol that maps HTTP semantics onto UDP instead of TCP. It was used in some service discovery and control protocols, like UPnP and multicast-based HTTP operations. However, HTTPU never saw broad adoption and has largely been replaced by modern approaches such as HTTP/3 over QUIC.",
    port: "Varies (used in UPnP: UDP 1900)",
    versions: ["RFC 2616-related experiments"],
    advantages: [
        "Lower latency than TCP in some scenarios",
        "Enables multicast HTTP messages",
        "Used in UPnP discovery mechanisms"
    ],
    disadvantages: [
        "Unreliable transport (no TCP guarantees)",
        "Never standardized or widely deployed",
        "Obsolete, replaced by QUIC/HTTP3"
    ],
    useCases: [
        "UPnP discovery",
        "Experimental multicast HTTP messaging"
    ],
    relatedProtocols: ["http", "udp", "upnp", "ssdp"],
    resources: [
        {
            title: "UPnP Device Architecture",
            url: "https://openconnectivity.org/developer/specifications/upnp-resources/upnp/",
            type: "Specification"
        }
    ],
    securityConsiderations: [
        "No encryption or authentication",
        "Vulnerable to spoofing and injection attacks",
        "Not recommended for new deployments"
    ],
    examples: [
        {
            title: "HTTPU Request Example (UPnP Discovery)",
            explanation: "A typical HTTPU M-SEARCH request sent over UDP for device discovery in UPnP.",
            code: `M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 3
ST: ssdp:all

`
        },
        {
            title: "HTTPU Response Example (UPnP Device)",
            explanation: "A sample HTTPU response from a device responding to an M-SEARCH request.",
            code: `HTTP/1.1 200 OK
CACHE-CONTROL: max-age=1800
DATE: Sat, 11 Jun 2022 10:00:00 GMT
EXT:
LOCATION: http://192.168.1.2:80/device-desc.xml
SERVER: Custom/1.0 UPnP/1.0 Proc/Ver
ST: upnp:rootdevice
USN: uuid:device-UUID::upnp:rootdevice

`
        }
    ]
};
