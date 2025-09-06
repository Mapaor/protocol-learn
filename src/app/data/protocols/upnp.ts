import { Protocol } from "../../types/protocol";

export const UPNP: Protocol = {
    id: "upnp",
    name: "Universal Plug and Play (UPnP)",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Set of protocols for device discovery and service advertisement on local networks.",
    fullDescription:
        "Universal Plug and Play (UPnP) is a collection of networking protocols that allow devices to discover each other and establish functional network services automatically. It builds on SSDP (for discovery) and SOAP/XML (for control) to enable plug-and-play experiences for media devices, printers, and network equipment. UPnP is widely used in consumer electronics but has been criticized for security weaknesses.",
    port: "UDP 1900 (SSDP), HTTP 2869",
    versions: ["UPnP 1.0 (1999)", "UPnP 1.1 (2008)", "UPnP+ (2015)"],
    advantages: [
        "Zero-configuration device setup",
        "Enables interoperability across vendors",
        "Widely supported in consumer devices"
    ],
    disadvantages: [
        "Serious security vulnerabilities (open ports, unauthenticated requests)",
        "Not recommended for untrusted networks",
        "Often disabled in enterprise deployments"
    ],
    useCases: [
        "Smart TVs, gaming consoles, media sharing",
        "Home automation systems",
        "Automatic router port forwarding (NAT traversal)"
    ],
    relatedProtocols: ["ssdp", "soap", "httpu", "dnssd", "xml"],
    resources: [
        {
            title: "UPnP Forum Specifications",
            url: "https://openconnectivity.org/developer/specifications/upnp-resources/upnp/",
            type: "Specification"
        }
    ],
    securityConsiderations: [
        "Exploited in numerous botnets (e.g., Mirai)",
        "Devices often ship with insecure default configs",
        "UPnP should not be exposed to the public Internet"
    ],
    examples: [
        {
            title: "SSDP Discovery Request",
            explanation: "A typical SSDP M-SEARCH request sent by a device to discover UPnP services on the local network.",
            code: `M-SEARCH * HTTP/1.1
HOST: 239.255.255.250:1900
MAN: "ssdp:discover"
MX: 3
ST: ssdp:all`
        },
        {
            title: "UPnP Port Forwarding (IGD Example)",
            explanation: "A SOAP request to add a port mapping on a UPnP-enabled router.",
            code: `POST /upnp/control/WANIPConn1 HTTP/1.1
HOST: 192.168.1.1:2869
CONTENT-TYPE: text/xml; charset="utf-8"
SOAPACTION: "urn:schemas-upnp-org:service:WANIPConnection:1#AddPortMapping"
Content-Length: nnn

<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
                        s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
    <s:Body>
        <u:AddPortMapping xmlns:u="urn:schemas-upnp-org:service:WANIPConnection:1">
            <NewRemoteHost></NewRemoteHost>
            <NewExternalPort>12345</NewExternalPort>
            <NewProtocol>TCP</NewProtocol>
            <NewInternalPort>12345</NewInternalPort>
            <NewInternalClient>192.168.1.100</NewInternalClient>
            <NewEnabled>1</NewEnabled>
            <NewPortMappingDescription>Example</NewPortMappingDescription>
            <NewLeaseDuration>0</NewLeaseDuration>
        </u:AddPortMapping>
    </s:Body>
</s:Envelope>`
        }
    ]
};
