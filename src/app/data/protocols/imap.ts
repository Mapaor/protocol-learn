import { Protocol } from "../../types/protocol";

export const IMAP: Protocol = {
    id: "imap",
    name: "IMAP",
    category: "Email",
    difficulty: "Intermediate",
    shortDescription: "Internet Message Access Protocol for email retrieval and management",
    fullDescription: "IMAP (Internet Message Access Protocol) is an Internet standard protocol used by email clients to retrieve email messages from a mail server over a TCP/IP connection. IMAP allows multiple clients to access the same mailbox.",
    port: "143, 993 (IMAPS)",
    versions: ["IMAP4", "IMAP4rev1"],
    advantages: [
      "Multi-device synchronization",
      "Server-side email storage",
      "Folder management",
      "Selective downloading",
      "Search capabilities",
      "Shared mailboxes support"
    ],
    disadvantages: [
      "Requires constant connection",
      "Higher bandwidth usage",
      "Server storage dependency",
      "More complex than POP3"
    ],
    useCases: [
      "Multi-device email access",
      "Corporate email systems",
      "Shared mailboxes",
      "Email synchronization",
      "Server-side email management",
      "Large mailbox handling",
      "Collaborative email workflows",
      "Email archiving",
      "Mobile email applications",
      "Webmail interfaces",
      "Email backup solutions",
      "Team email management"
    ],
    examples: [
      {
        title: "IMAP Session Example",
        code: `* OK IMAP4rev1 Service Ready
A001 LOGIN username password
A001 OK LOGIN completed
A002 SELECT INBOX
* 172 EXISTS
* 1 RECENT
* OK [UNSEEN 12] Message 12 is first unseen
* FLAGS (\\Answered \\Flagged \\Deleted \\Seen \\Draft)
A002 OK [READ-WRITE] SELECT completed
A003 FETCH 12 (FLAGS BODY[HEADER.FIELDS (FROM TO SUBJECT DATE)])
* 12 FETCH (FLAGS (\\Seen) BODY[HEADER.FIELDS (FROM TO SUBJECT DATE)] {117}
From: sender@example.com
To: user@example.com
Subject: Important Message
Date: Mon, 7 Feb 2023 09:55:06 +0000
)
A003 OK FETCH completed
A004 LOGOUT
* BYE IMAP4rev1 Server logging out
A004 OK LOGOUT completed`,
        explanation: "IMAP session showing login, mailbox selection, and message retrieval."
      }
    ],
    diagrams: [
      {
        src: "/imap.jpg",
        alt: "IMAP protocol overview",
        caption: "IMAP email synchronization across multiple devices"
      },
      {
        src: "/imap-vs-pop3.jpg",
        alt: "IMAP vs POP3 comparison",
        caption: "Comparison between IMAP and POP3 email protocols"
      }
    ],
    relatedProtocols: ["smtp", "pop3", "tls"],
    commonCommands: [
      {
        command: "telnet",
        description: "Test IMAP connection",
        example: "telnet mail.example.com 143"
      },
      {
        command: "openssl",
        description: "Test IMAPS connection",
        example: "openssl s_client -connect mail.example.com:993"
      }
    ],
    resources: [
      {
        title: "RFC 3501 - IMAP4rev1",
        url: "https://tools.ietf.org/html/rfc3501",
        type: "RFC"
      },
      {
        title: "Dovecot IMAP Server",
        url: "https://www.dovecot.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use IMAPS (TLS encryption)",
      "Strong authentication",
      "Access control policies",
      "Regular security updates"
    ]
  }