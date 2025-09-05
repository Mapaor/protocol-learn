import { Protocol } from "../../types/protocol";

export const POP3: Protocol = {
    id: "pop3",
    name: "POP3",
    category: "Email",
    difficulty: "Beginner",
    shortDescription: "Post Office Protocol for downloading emails to local devices",
    fullDescription: "POP3 (Post Office Protocol version 3) is an application-layer Internet standard protocol used by email clients to retrieve email from a mail server. POP3 downloads emails to the local device and typically removes them from the server.",
    port: "110, 995 (POP3S)",
    versions: ["POP3"],
    advantages: [
      "Simple protocol",
      "Works offline",
      "Minimal server storage",
      "Fast email download",
      "Low bandwidth for sync",
      "Good for single device access"
    ],
    disadvantages: [
      "No multi-device sync",
      "Limited server-side features",
      "Email loss risk",
      "No folder support",
      "Difficult to back up"
    ],
    useCases: [
      "Single device email access",
      "Offline email reading",
      "Low storage servers",
      "Simple email setups",
      "Bandwidth-limited connections",
      "Legacy email systems",
      "Personal email accounts",
      "Backup email retrieval",
      "Email archiving",
      "Simple mail clients",
      "Resource-constrained environments",
      "Temporary email access"
    ],
    examples: [
      {
        title: "POP3 Session Example",
        code: `+OK POP3 server ready
USER username
+OK
PASS password
+OK Logged in
STAT
+OK 2 320
LIST
+OK 2 messages:
1 120
2 200
.
RETR 1
+OK 120 octets
From: sender@example.com
To: user@example.com
Subject: Test Message

This is a test message.
.
DELE 1
+OK Marked to be deleted
QUIT
+OK Logging out`,
        explanation: "POP3 session showing authentication, message listing, retrieval, and deletion."
      }
    ],
    diagrams: [
      {
        src: "/pop3.jpg",
        alt: "POP3 protocol overview",
        caption: "POP3 email download and local storage process"
      }
    ],
    relatedProtocols: ["smtp", "imap", "tls"],
    commonCommands: [
      {
        command: "telnet",
        description: "Test POP3 connection",
        example: "telnet mail.example.com 110"
      },
      {
        command: "openssl",
        description: "Test POP3S connection",
        example: "openssl s_client -connect mail.example.com:995"
      }
    ],
    resources: [
      {
        title: "RFC 1939 - POP3 Protocol",
        url: "https://tools.ietf.org/html/rfc1939",
        type: "RFC"
      },
      {
        title: "Thunderbird Email Client",
        url: "https://www.thunderbird.net/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use POP3S (TLS encryption)",
      "Secure password authentication",
      "Regular client updates",
      "Local email security"
    ]
  }