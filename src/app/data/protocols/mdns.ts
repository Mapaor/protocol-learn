import { Protocol } from "../../types/protocol";

export const MDNS: Protocol = {
  id: "mdns",
  name: "Multicast DNS (mDNS)",
  category: "Network",
  difficulty: "Intermediate",
  shortDescription: "Protocol for resolving hostnames to IP addresses in local networks without a DNS server.",
  fullDescription:
    "Multicast DNS (mDNS) is a protocol that resolves hostnames to IP addresses in small networks without a central DNS server. It uses UDP port 5353 and multicast address 224.0.0.251 (IPv4) or ff02::fb (IPv6). mDNS is widely used with DNS-SD (Service Discovery) to allow devices like printers, smart speakers, and IoT devices to advertise and discover services in local networks. Apple's Bonjour is a well-known implementation.",
  port: "UDP 5353",
  versions: ["RFC 6762"],
  advantages: [
    "Zero-configuration networking",
    "Works without a central DNS server",
    "Supports both IPv4 and IPv6",
    "Widely implemented in consumer devices (Bonjour, Avahi)"
  ],
  disadvantages: [
    "Limited to local link networks",
    "Can cause multicast traffic overhead",
    "Not suitable for large-scale networks",
    "No strong security by default"
  ],
  useCases: [
    "Discovering printers and file shares",
    "IoT device discovery",
    "Smart home networks",
    "AirPlay and Chromecast service resolution"
  ],
  examples: [
    {
      title: "mDNS Query Example",
      code: `Standard query 0x0000 A myprinter.local`,
      explanation: "A client querying for the IP address of 'myprinter.local' using mDNS."
    }
  ],
  relatedProtocols: ["dns", "dnssd", "ssdp"],
  resources: [
    {
      title: "RFC 6762 - Multicast DNS",
      url: "https://datatracker.ietf.org/doc/html/rfc6762",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "Can leak device information across VLANs if not filtered",
    "No built-in encryption or authentication",
    "Can be abused for local network reconnaissance"
  ]
};
