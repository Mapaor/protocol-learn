import { Protocol } from "../../types/protocol";

export const LDAP: Protocol = {
  id: "ldap",
  name: "Lightweight Directory Access Protocol (LDAP)",
  category: "Application",
  difficulty: "Intermediate",
  shortDescription: "Protocol for accessing and managing directory information services.",
  fullDescription:
    "LDAP (Lightweight Directory Access Protocol) is an open, vendor-neutral protocol for accessing and managing directory services over a network. It is commonly used for centralized authentication, authorization, and user information storage. LDAP runs over TCP/UDP port 389, with LDAPS (LDAP over SSL/TLS) on port 636. Microsoft Active Directory and OpenLDAP are widely used LDAP implementations.",
  port: "TCP/UDP 389 (LDAP), TCP 636 (LDAPS)",
  versions: ["RFC 4511 (LDAPv3, current standard)"],
  advantages: [
    "Standard protocol for directory services",
    "Enables centralized authentication and access control",
    "Scalable for large enterprise environments",
    "Supports replication and distributed directories"
  ],
  disadvantages: [
    "Complex schema management",
    "Requires secure deployment (default LDAP is plaintext)",
    "Integration can be challenging with non-LDAP apps"
  ],
  useCases: [
    "Enterprise authentication and SSO",
    "Managing user accounts in Active Directory",
    "Centralized directory for email systems",
    "Access control in corporate networks"
  ],
  examples: [
    {
      title: "LDAP Search Example",
      code: `ldapsearch -x -b "dc=example,dc=com" "(uid=john)"`,
      explanation: "Command-line example to search for a user 'john' in the LDAP directory."
    }
  ],
  relatedProtocols: ["kerberos", "ntlm", "activesync"],
  resources: [
    {
      title: "RFC 4511 - LDAP v3",
      url: "https://datatracker.ietf.org/doc/html/rfc4511",
      type: "RFC"
    },
    {
      title: "LDAP Wikipedia",
      url: "https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol",
      type: "Reference"
    }
  ],
  securityConsiderations: [
    "Unencrypted LDAP transmits credentials in plaintext",
    "Should always use LDAPS or StartTLS",
    "Vulnerable to LDAP injection attacks",
    "Needs proper access controls to prevent data exposure"
  ]
};
