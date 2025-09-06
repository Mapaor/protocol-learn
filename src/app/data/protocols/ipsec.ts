import { Protocol } from "../../types/protocol";

export const IPSEC: Protocol = {
    id: "ipsec",
    name: "IPSec",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Internet Protocol Security for encrypted IP communications",
    fullDescription: "IPSec (Internet Protocol Security) is a secure network protocol suite that authenticates and encrypts packets of data to provide secure encrypted communication between two computers over an Internet Protocol network. It's used in virtual private networks (VPNs).",
    port: "500 (IKE), 4500 (NAT-T), 50 (ESP), 51 (AH)",
    versions: ["IKEv1", "IKEv2", "ESP", "AH"],
    advantages: [
      "Strong encryption",
      "Authentication and integrity",
      "Transparent to applications",
      "Network-layer security",
      "Perfect forward secrecy",
      "Standardized protocol",
      "Scalable architecture",
      "Multiple cipher support"
    ],
    disadvantages: [
      "Complex configuration",
      "Performance overhead",
      "NAT traversal issues",
      "Firewall complications",
      "Key management complexity",
      "Debugging difficulties",
      "Compatibility issues",
      "CPU intensive"
    ],
    useCases: [
      "Site-to-site VPNs",
      "Remote access VPNs",
      "Secure communications",
      "Government networks",
      "Enterprise security",
      "Cloud connectivity",
      "Mobile device security",
      "IoT device protection",
      "Network segmentation",
      "Compliance requirements",
      "Financial transactions",
      "Healthcare data protection"
    ],
    examples: [
      {
        title: "IPSec Configuration (StrongSwan)",
        code: `# /etc/ipsec.conf - StrongSwan configuration
config setup
    charondebug="ike 1, knl 1, cfg 0"
    uniqueids=no

conn %default
    ikelifetime=60m
    keylife=20m
    rekeymargin=3m
    keyingtries=1
    keyexchange=ikev2
    authby=secret

conn site-to-site
    left=192.168.1.1
    leftsubnet=192.168.1.0/24
    leftid=@office1
    leftfirewall=yes
    right=203.0.113.12
    rightsubnet=10.0.0.0/16
    rightid=@office2
    auto=start

conn roadwarrior
    left=203.0.113.12
    leftsubnet=10.0.0.0/16
    leftcert=serverCert.pem
    leftid=@vpn.example.com
    leftfirewall=yes
    right=%any
    rightauth=eap-mschapv2
    rightsourceip=10.0.1.0/24
    auto=add

# /etc/ipsec.secrets
@office1 @office2 : PSK "very-secret-key"
@vpn.example.com : RSA serverKey.pem
user1 : EAP "password123"
user2 : EAP "password456"`,
        explanation: "StrongSwan IPSec configuration for site-to-site and road warrior VPN."
      },
      {
        title: "IPSec Packet Structure",
        code: `# IPSec ESP (Encapsulating Security Payload) Structure

Original IP Packet:
+---------------+---------------+
| IP Header     | Payload       |
+---------------+---------------+

ESP Tunnel Mode:
+--------+--------+--------+--------+--------+--------+
| New IP | ESP    | IP     | TCP/   | ESP    | ESP    |
| Header | Header | Header | UDP    | Trailer| Auth   |
+--------+--------+--------+--------+--------+--------+
         |<------- Encrypted ------>|
         |<------------- Authenticated ----------->|

ESP Transport Mode:
+--------+--------+--------+--------+--------+
| IP     | ESP    | TCP/   | Data   | ESP    |
| Header | Header | UDP    |        | Trailer|
+--------+--------+--------+--------+--------+
         |<--- Encrypted --->|
         |<----- Authenticated ----->|

# IPSec AH (Authentication Header) Structure
+--------+--------+--------+--------+
| IP     | AH     | TCP/   | Data   |
| Header | Header | UDP    |        |
+--------+--------+--------+--------+
|<-------- Authenticated -------->|

# IKE (Internet Key Exchange) Phase Structure
Phase 1 (ISAKMP SA):
1. Initiator -> Responder: SA proposal
2. Responder -> Initiator: SA response
3. Initiator -> Responder: Key exchange
4. Responder -> Initiator: Key exchange
5. Initiator -> Responder: Identity/Auth
6. Responder -> Initiator: Identity/Auth

Phase 2 (IPSec SA):
1. Initiator -> Responder: Hash/SA/Nonce/ID
2. Responder -> Initiator: Hash/SA/Nonce/ID
3. Initiator -> Responder: Hash
4. Responder -> Initiator: Hash`,
        explanation: "IPSec packet structure and IKE key exchange phases."
      },
      {
        title: "Linux IPSec Commands",
        code: `# Linux IPSec management with ip and ipsec commands

# Show IPSec status
ipsec status
ipsec statusall

# Start/stop IPSec
ipsec start
ipsec stop
ipsec restart

# Reload configuration
ipsec reload
ipsec rereadall

# Show Security Associations (SAs)
ip xfrm state
ip xfrm policy

# Manual SA configuration
ip xfrm state add src 192.168.1.1 dst 192.168.2.1 \\
    proto esp spi 0x12345678 \\
    enc aes 0x1234567890abcdef1234567890abcdef \\
    auth sha256 0xabcdef1234567890abcdef1234567890abcdef12

# Manual policy configuration
ip xfrm policy add src 192.168.1.0/24 dst 192.168.2.0/24 \\
    dir out tmpl src 192.168.1.1 dst 192.168.2.1 \\
    proto esp mode tunnel

# Delete SA/policy
ip xfrm state delete src 192.168.1.1 dst 192.168.2.1 proto esp spi 0x12345678
ip xfrm policy delete src 192.168.1.0/24 dst 192.168.2.0/24 dir out

# Show encryption/authentication algorithms
cat /proc/crypto
ip xfrm state allocspi src 192.168.1.1 dst 192.168.2.1 proto esp min 0x100 max 0x1ff

# Debugging
ipsec auto --status
ipsec auto --up connectionname
ipsec auto --down connectionname

# Log monitoring
tail -f /var/log/auth.log | grep -i ipsec
journalctl -u strongswan -f`,
        explanation: "Linux IPSec management commands for configuration and troubleshooting."
      }
    ],
    diagrams: [
      {
        src: "/ipsec_architecture.png",
        alt: "IPSec architecture",
        caption: "IPSec protocol architecture and security associations"
      },
      {
        src: "/ipsec_modes.jpg",
        alt: "IPSec modes",
        caption: "IPSec tunnel mode vs transport mode comparison"
      }
    ],
    relatedProtocols: ["ike", "esp", "ah", "x509", "pki"],
    resources: [
      {
        title: "RFC 4301 - IPSec Architecture",
        url: "https://tools.ietf.org/html/rfc4301",
        type: "RFC"
      },
      {
        title: "StrongSwan Documentation",
        url: "https://docs.strongswan.org/",
        type: "Documentation"
      },
      {
        title: "IPSec VPN Guide",
        url: "https://www.nist.gov/publications/guide-ipsec-vpns",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Strong encryption algorithms",
      "Proper key management",
      "Certificate validation",
      "Perfect forward secrecy",
      "Regular key rotation",
      "Secure IKE configuration",
      "Anti-replay protection",
      "Dead peer detection"
    ]
  }