import { Protocol } from "../../types/protocol";

export const DNSSEC: Protocol = {
    id: "dnssec",
    name: "DNSSEC",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "DNS Security Extensions for authenticated domain name resolution",
    fullDescription: "DNSSEC (Domain Name System Security Extensions) is a suite of Internet Engineering Task Force (IETF) specifications for securing certain kinds of information provided by the Domain Name System (DNS) as used on Internet Protocol (IP) networks. It provides cryptographic authentication of DNS data, authenticated denial of existence, and data integrity, but not availability or confidentiality.",
    port: "53 (same as DNS)",
    versions: ["DNSSEC (RFC 4033-4035)", "NSEC3 (RFC 5155)", "Elliptic Curve DNSSEC (RFC 6605)"],
    advantages: [
      "DNS data authentication",
      "Data integrity protection",
      "Authenticated denial of existence",
      "Protection against cache poisoning",
      "Hierarchical trust model",
      "Backward compatibility",
      "Cryptographic signatures",
      "Chain of trust verification"
    ],
    disadvantages: [
      "Increased complexity",
      "Larger DNS responses",
      "Key management overhead",
      "Performance impact",
      "Amplification attack potential",
      "Configuration complexity",
      "Limited adoption",
      "Operational challenges"
    ],
    useCases: [
      "Secure domain resolution",
      "Email security (DANE)",
      "Certificate validation",
      "Preventing DNS poisoning",
      "Secure service discovery",
      "Domain authentication",
      "PKI integration",
      "Government domains",
      "Financial services",
      "Critical infrastructure",
      "Anti-phishing protection",
      "Trusted communications"
    ],
    examples: [
      {
        title: "DNSSEC Record Types",
        code: `# DNSSEC Resource Record Types

RRSIG (Resource Record Signature)
- Contains cryptographic signature for RRset
- Signed by zone's private key
- Includes signature expiration times

DNSKEY (DNS Public Key)
- Contains public key for DNSSEC validation
- Zone Signing Key (ZSK) and Key Signing Key (KSK)
- Algorithm and key material

DS (Delegation Signer)
- Hash of child zone's DNSKEY
- Stored in parent zone
- Creates chain of trust

NSEC (Next Secure)
- Proves non-existence of domain names
- Links to next domain in zone
- Contains type bitmap

NSEC3 (Next Secure 3)
- Hashed version of NSEC
- Prevents zone enumeration
- Salt and iteration parameters

# Example DNSSEC records
example.com.    3600    IN    DNSKEY    256 3 8 AwEAAb...
example.com.    3600    IN    DNSKEY    257 3 8 AwEAAc...
example.com.    3600    IN    RRSIG     DNSKEY 8 2 3600 20250201...
www.example.com. 3600   IN    A         192.0.2.1
www.example.com. 3600   IN    RRSIG     A 8 3 3600 20250201...`,
        explanation: "DNSSEC resource record types and their purposes."
      },
      {
        title: "DNSSEC Validation Process",
        code: `# DNSSEC Chain of Trust Validation

1. Root Zone Trust Anchor
   - Root DNSKEY is pre-configured trust anchor
   - Validates .com DS record signature

2. TLD Validation (.com)
   - Use .com DNSKEY to validate example.com DS record
   - Verify RRSIG for DS record

3. Zone Validation (example.com)
   - Use example.com DNSKEY to validate records
   - Verify RRSIG for each RRset

4. Record Validation
   - Validate A record for www.example.com
   - Check RRSIG signature matches DNSKEY

# dig command for DNSSEC validation
dig +dnssec +cd www.example.com A

# Response with DNSSEC
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
;; ANSWER SECTION:
www.example.com. 3600 IN A     192.0.2.1
www.example.com. 3600 IN RRSIG A 8 3 3600 20250201000000...

# Validation status flags:
# ad (Authenticated Data) - DNSSEC validation successful
# cd (Checking Disabled) - Skip DNSSEC validation`,
        explanation: "DNSSEC validation process and chain of trust verification."
      },
      {
        title: "DNSSEC Zone Signing",
        code: `#!/bin/bash
# DNSSEC zone signing process

ZONE="example.com"
ZONEFILE="$ZONE.zone"

# 1. Generate Zone Signing Key (ZSK)
dnssec-keygen -a RSASHA256 -b 1024 -n ZONE $ZONE
ZSK=\`ls K$ZONE.*.key | head -1 | cut -d. -f1-2\`

# 2. Generate Key Signing Key (KSK)
dnssec-keygen -a RSASHA256 -b 2048 -f KSK -n ZONE $ZONE
KSK=\`ls K$ZONE.*+*.key | grep KSK | cut -d. -f1-2\`

# 3. Add keys to zone file
cat K$ZONE.*.key >> $ZONEFILE

# 4. Sign the zone
dnssec-signzone -o $ZONE -k $KSK $ZONEFILE $ZSK
# Creates: example.com.zone.signed

# 5. Extract DS record for parent zone
dnssec-dsfromkey -2 $KSK.key > ds-record.txt

# 6. Verify signatures
dig @localhost +dnssec +cd $ZONE SOA

# Key rollover process
# 1. Pre-publish new key
# 2. Start signing with new key
# 3. Remove old signatures
# 4. Remove old key

echo "DNSSEC signing completed"
echo "DS record for parent zone:"
cat ds-record.txt`,
        explanation: "Complete DNSSEC zone signing and key management process."
      }
    ],
    diagrams: [
      {
        src: "/dnssec_chain_of_trust.png",
        alt: "DNSSEC chain of trust",
        caption: "DNSSEC hierarchical trust model from root to authoritative zones"
      },
      {
        src: "/dnssec_validation.jpg",
        alt: "DNSSEC validation process",
        caption: "Step-by-step DNSSEC signature validation and verification"
      }
    ],
    relatedProtocols: ["dns", "tls", "x509", "https"],
    resources: [
      {
        title: "RFC 4033 - DNSSEC Introduction",
        url: "https://tools.ietf.org/html/rfc4033",
        type: "RFC"
      },
      {
        title: "RFC 4034 - DNSSEC Resource Records",
        url: "https://tools.ietf.org/html/rfc4034",
        type: "RFC"
      },
      {
        title: "RFC 4035 - DNSSEC Protocol Modifications",
        url: "https://tools.ietf.org/html/rfc4035",
        type: "RFC"
      },
      {
        title: "DNSSEC Deployment Guide",
        url: "https://www.icann.org/resources/pages/dnssec-qaa-2014-01-29-en",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Secure key generation and storage",
      "Regular key rollover procedures",
      "Time synchronization for signatures",
      "Monitoring signature expiration",
      "Protecting against amplification attacks",
      "Secure key signing ceremonies",
      "Backup and recovery procedures",
      "Algorithm agility planning"
    ]
  }