import { Protocol } from "../../types/protocol";

export const DNS: Protocol = {
    id: "dns",
    name: "DNS",
    category: "Network",
    difficulty: "Intermediate",
    shortDescription: "Domain Name System for translating domain names to IP addresses",
    fullDescription: "DNS (Domain Name System) is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates human-readable domain names to IP addresses.",
    port: "53",
    versions: ["DNS", "DNS over HTTPS", "DNS over TLS"],
    advantages: [
      "Human-readable names",
      "Hierarchical structure",
      "Distributed system",
      "Caching capabilities",
      "Load balancing support",
      "Fault tolerance"
    ],
    disadvantages: [
      "Single point of failure",
      "Cache poisoning vulnerabilities",
      "Privacy concerns",
      "Propagation delays",
      "Complex configuration"
    ],
    useCases: [
      "Web browsing",
      "Email routing",
      "Service discovery",
      "Content delivery networks",
      "Load balancing",
      "Network troubleshooting",
      "Domain management",
      "Subdomain routing",
      "API endpoint resolution",
      "Microservices discovery",
      "Geographic routing",
      "Failover mechanisms"
    ],
    examples: [
      {
        title: "DNS Query Example",
        code: `# DNS query using dig
dig example.com

;; ANSWER SECTION:
example.com.    300    IN    A    93.184.216.34

# DNS query for specific record type
dig MX example.com
dig AAAA example.com
dig NS example.com

# Reverse DNS lookup
dig -x 93.184.216.34`,
        explanation: "DNS queries using dig command for various record types and reverse lookups."
      },
      {
        title: "DNS Record Types",
        code: `# Common DNS record types
A       example.com.        93.184.216.34
AAAA    example.com.        2606:2800:220:1:248:1893:25c8:1946
CNAME   www.example.com.    example.com.
MX      example.com.        10 mail.example.com.
NS      example.com.        ns1.example.com.
TXT     example.com.        "v=spf1 include:_spf.example.com ~all"
PTR     34.216.184.93.in-addr.arpa.    example.com.`,
        explanation: "Various DNS record types and their purposes in domain name resolution."
      }
    ],
    diagrams: [
      {
        src: "/dns.png",
        alt: "DNS resolution process",
        caption: "DNS query resolution process from client to authoritative server"
      }
    ],
    relatedProtocols: ["http", "tcp", "udp"],
    commonCommands: [
      {
        command: "dig",
        description: "DNS lookup tool",
        example: "dig example.com"
      },
      {
        command: "nslookup",
        description: "DNS query tool",
        example: "nslookup example.com"
      },
      {
        command: "host",
        description: "DNS lookup utility",
        example: "host example.com"
      }
    ],
    resources: [
      {
        title: "RFC 1035 - DNS Implementation",
        url: "https://tools.ietf.org/html/rfc1035",
        type: "RFC"
      },
      {
        title: "BIND DNS Server",
        url: "https://www.isc.org/bind/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "DNSSEC implementation",
      "DNS over HTTPS/TLS",
      "Cache poisoning protection",
      "Rate limiting",
      "Access control"
    ]
  }