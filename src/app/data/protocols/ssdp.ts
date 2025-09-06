import { Protocol } from "../../types/protocol";

export const SSDP: Protocol = {
    id: "ssdp",
    name: "Simple Service Discovery Protocol (SSDP)",
    category: "Network",
    difficulty: "Beginner",
    shortDescription: "Protocol for discovering devices and services on a local network.",
    fullDescription:
        "SSDP (Simple Service Discovery Protocol) is part of UPnP (Universal Plug and Play) and allows devices to discover each other on a local network. It uses multicast over UDP port 1900 to announce and discover services, such as printers, media servers, or IoT devices. SSDP messages are typically exchanged using HTTP-like request/response syntax.",
    port: "UDP 1900",
    versions: ["UPnP 1.0 (SSDP defined)", "UPnP 1.1"],
    advantages: [
        "Zero-configuration device discovery",
        "Lightweight and simple",
        "Widely supported in consumer devices",
        "Works with HTTP syntax for easy parsing"
    ],
    disadvantages: [
        "Limited to local subnets (multicast scope)",
        "Security vulnerabilities in UPnP/SSDP exposed many devices",
        "No authentication by default"
    ],
    useCases: [
        "Discovering smart TVs and media servers",
        "Finding printers and scanners on LAN",
        "IoT device discovery",
        "UPnP-enabled applications"
    ],
    examples: [
        {
            title: "SSDP M-SEARCH Request",
            code: `M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 2
ST: ssdp:all`,
            explanation: "An SSDP client request to discover all UPnP devices on the network."
        },
        {
            title: "SSDP NOTIFY Message",
            code: `NOTIFY * HTTP/1.1
HOST: 239.255.255.250:1900
NT: upnp:rootdevice
NTS: ssdp:alive
USN: uuid:device-UUID::upnp:rootdevice
LOCATION: http://192.168.1.2:80/description.xml
CACHE-CONTROL: max-age=1800
SERVER: OS/version UPnP/1.0 product/version`,
            explanation: "A device announces its presence on the network using a NOTIFY message."
        },
        {
            title: "SSDP HTTPU Response",
            code: `HTTP/1.1 200 OK
CACHE-CONTROL: max-age=1800
DATE: Fri, 01 Jan 2021 00:00:00 GMT
EXT:
LOCATION: http://192.168.1.2:80/description.xml
SERVER: OS/version UPnP/1.0 product/version
ST: upnp:rootdevice
USN: uuid:device-UUID::upnp:rootdevice`,
            explanation: "A typical response from a device to an M-SEARCH request."
        }
    ],
    relatedProtocols: ["upnp", "httpu", "mdns"],
    resources: [
        {
            title: "SSDP Wikipedia",
            url: "https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol",
            type: "Reference"
        }
    ],
    securityConsiderations: [
        "UPnP/SSDP exploited in DDoS reflection attacks",
        "No built-in authentication",
        "Devices should restrict SSDP exposure to LAN only"
    ]
};
