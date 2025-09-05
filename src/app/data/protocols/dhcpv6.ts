import { Protocol } from "../../types/protocol";

export const DHCPV6: Protocol = {
    id: "dhcpv6",
    name: "DHCPv6",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Dynamic Host Configuration Protocol for IPv6 address assignment and configuration",
    fullDescription: "DHCPv6 (Dynamic Host Configuration Protocol for IPv6) is a network protocol used to configure devices that are connected to an IPv6 network. It provides stateful address assignment, configuration parameters, and can work alongside IPv6 stateless address autoconfiguration (SLAAC).",
    port: "546 (client), 547 (server)",
    advantages: [
      "Centralized IPv6 management",
      "Stateful address assignment",
      "DNS server configuration",
      "Detailed logging",
      "Policy enforcement",
      "Integration with SLAAC"
    ],
    disadvantages: [
      "Added complexity",
      "Server dependency",
      "Network overhead",
      "Configuration complexity",
      "Security considerations",
      "Dual-stack complications"
    ],
    useCases: [
      "Enterprise IPv6 networks",
      "IPv6 address management",
      "DNS configuration",
      "Prefix delegation",
      "Temporary addresses",
      "Mobile networks",
      "ISP customer networks",
      "Data center networks",
      "IoT deployments",
      "Campus networks",
      "Service provider networks",
      "Cloud environments"
    ],
    examples: [
      {
        title: "DHCPv6 Message Exchange",
        code: `# DHCPv6 Four-Message Exchange (Stateful)
1. SOLICIT
   Client -> All_DHCP_Relay_Agents_and_Servers (ff02::1:2)
   Message: "I need an IPv6 address"
   Options: Client Identifier, IA_NA, Elapsed Time

2. ADVERTISE  
   Server -> Client
   Message: "I can offer you this address"
   Options: Server Identifier, IA_NA with IPv6 address

3. REQUEST
   Client -> Server
   Message: "I want that specific address"
   Options: Client ID, Server ID, IA_NA

4. REPLY
   Server -> Client  
   Message: "Address assigned successfully"
   Options: Server ID, IA_NA with confirmed address

# DHCPv6 Two-Message Exchange (Stateless)
1. INFORMATION-REQUEST
   Client -> Server
   Message: "I need configuration info only"
   
2. REPLY
   Server -> Client
   Message: "Here's your DNS, domain, etc."`,
        explanation: "DHCPv6 message exchange patterns for stateful and stateless operation."
      },
      {
        title: "DHCPv6 Server Configuration",
        code: `# dhcpd6.conf (ISC DHCP)
default-lease-time 7200;
max-lease-time 86400;
log-facility local7;

# Subnet declaration
subnet6 2001:db8::/64 {
    range6 2001:db8::100 2001:db8::200;
    
    # DNS servers
    option dhcp6.name-servers 2001:4860:4860::8888, 2001:4860:4860::8844;
    
    # Domain search list
    option dhcp6.domain-search "example.com", "test.example.com";
    
    # Prefix delegation
    prefix6 2001:db8:1:: 2001:db8:1:ffff:: /56;
}

# Host reservation
host client1 {
    host-identifier option dhcp6.client-id 00:01:00:01:12:34:56:78:aa:bb:cc:dd:ee:ff;
    fixed-address6 2001:db8::50;
}

# Start DHCPv6 server
dhcpd -6 -cf /etc/dhcp/dhcpd6.conf -lf /var/lib/dhcp/dhcpd6.leases eth0

# Client configuration (dhclient)
dhclient -6 -v eth0`,
        explanation: "DHCPv6 server configuration with address pools, options, and reservations."
      }
    ],
    relatedProtocols: ["ipv6", "udp", "icmpv6"],
    resources: [
      {
        title: "RFC 8415 - DHCPv6 Specification",
        url: "https://tools.ietf.org/html/rfc8415",
        type: "RFC"
      },
      {
        title: "ISC DHCPv6 Server",
        url: "https://www.isc.org/dhcp/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "DHCPv6 authentication",
      "Secure neighbor discovery",
      "Rogue server prevention",
      "Client authentication",
      "Message authentication",
      "Network access control"
    ]
};
