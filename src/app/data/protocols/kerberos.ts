import { Protocol } from "../../types/protocol";

export const KERBEROS: Protocol = {
    id: "kerberos",
    name: "Kerberos",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Network authentication protocol using secret-key cryptography",
    fullDescription: "Kerberos is a computer network authentication protocol that works on the basis of tickets to allow nodes communicating over a non-secure network to prove their identity to one another in a secure manner. It was designed to provide strong authentication for client/server applications by using secret-key cryptography.",
    port: "88",
    versions: ["Kerberos v4", "Kerberos v5"],
    advantages: [
      "Strong mutual authentication",
      "Single sign-on (SSO) capability",
      "No passwords sent over network",
      "Ticket-based authentication",
      "Time-stamped tickets prevent replay attacks",
      "Scalable to large networks",
      "Cross-realm authentication",
      "Delegation support"
    ],
    disadvantages: [
      "Requires synchronized clocks",
      "Single point of failure (KDC)",
      "Complex to configure and manage",
      "Vulnerable to password attacks",
      "Requires trust relationships",
      "Limited lifetime of tickets",
      "Network dependency",
      "Difficult troubleshooting"
    ],
    useCases: [
      "Active Directory authentication",
      "Enterprise SSO systems",
      "Secure file sharing",
      "Database authentication",
      "Web application security",
      "Email server authentication",
      "Cross-domain authentication",
      "Cloud service integration",
      "Network service access",
      "Distributed system security",
      "LDAP authentication",
      "SSH key management"
    ],
    examples: [
      {
        title: "Kerberos Authentication Flow",
        code: `# 1. Initial Authentication
Client -> AS: Authentication Request
AS -> Client: TGT (Ticket Granting Ticket)

# 2. Service Request
Client -> TGS: Service Ticket Request + TGT
TGS -> Client: Service Ticket

# 3. Service Access
Client -> Service: Service Request + Service Ticket
Service -> Client: Service Response

# Key Components:
- AS (Authentication Server)
- TGS (Ticket Granting Server)
- KDC (Key Distribution Center) = AS + TGS
- Principal (User/Service identifier)`,
        explanation: "Complete Kerberos authentication process with ticket exchange."
      },
      {
        title: "Kerberos Configuration (krb5.conf)",
        code: `[libdefaults]
    default_realm = EXAMPLE.COM
    dns_lookup_realm = false
    dns_lookup_kdc = false
    ticket_lifetime = 24h
    renew_lifetime = 7d
    forwardable = true

[realms]
    EXAMPLE.COM = {
        kdc = kerberos.example.com
        admin_server = kerberos.example.com
        default_domain = example.com
    }

[domain_realm]
    .example.com = EXAMPLE.COM
    example.com = EXAMPLE.COM

[logging]
    default = FILE:/var/log/krb5libs.log
    kdc = FILE:/var/log/krb5kdc.log
    admin_server = FILE:/var/log/kadmind.log`,
        explanation: "Kerberos client configuration file with realm settings."
      },
      {
        title: "Kerberos Commands",
        code: `# Get initial ticket
kinit username@REALM
Password for username@REALM:

# List current tickets
klist
Ticket cache: FILE:/tmp/krb5cc_1000
Default principal: username@REALM

Valid starting     Expires            Service principal
01/15/25 10:00:00  01/16/25 10:00:00  krbtgt/REALM@REALM

# Get service ticket
kvno service/hostname@REALM

# Destroy tickets
kdestroy

# Renew tickets
kinit -R`,
        explanation: "Common Kerberos command-line operations for ticket management."
      }
    ],
    diagrams: [
      {
        src: "/kerberos_flow.png",
        alt: "Kerberos authentication flow",
        caption: "Complete Kerberos authentication process with AS and TGS"
      },
      {
        src: "/kerberos_architecture.jpg",
        alt: "Kerberos architecture",
        caption: "Kerberos components and their relationships"
      }
    ],
    relatedProtocols: ["ldap", "ssh", "tls", "x509"],
    resources: [
      {
        title: "RFC 4120 - Kerberos V5",
        url: "https://tools.ietf.org/html/rfc4120",
        type: "RFC"
      },
      {
        title: "MIT Kerberos Documentation",
        url: "https://web.mit.edu/kerberos/",
        type: "Documentation"
      },
      {
        title: "Active Directory and Kerberos",
        url: "https://docs.microsoft.com/en-us/windows-server/security/kerberos/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Time synchronization critical",
      "Protect KDC from attacks",
      "Strong password policies",
      "Regular key rotation",
      "Monitor ticket usage",
      "Secure key storage",
      "Network traffic encryption",
      "Prevent replay attacks"
    ]
  }