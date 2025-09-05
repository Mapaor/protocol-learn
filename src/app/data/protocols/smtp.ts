import { Protocol } from "../../types/protocol";

export const SMTP: Protocol = {
    id: "smtp",
    name: "SMTP",
    category: "Email",
    difficulty: "Intermediate",
    shortDescription: "Simple Mail Transfer Protocol for sending emails",
    fullDescription: "SMTP (Simple Mail Transfer Protocol) is an Internet standard communication protocol for electronic mail transmission. Mail servers and other message transfer agents use SMTP to send and receive mail messages.",
    port: "25, 587 (submission), 465 (SMTPS)",
    versions: ["SMTP", "ESMTP"],
    advantages: [
      "Reliable email delivery",
      "Standardized protocol",
      "Authentication support",
      "Encryption capabilities",
      "Wide compatibility",
      "Store-and-forward mechanism"
    ],
    disadvantages: [
      "No built-in encryption (basic SMTP)",
      "Spam vulnerabilities",
      "Complex configuration",
      "Authentication required for modern use"
    ],
    useCases: [
      "Email sending",
      "Automated notifications",
      "Newsletter delivery",
      "System alerts",
      "Application emails",
      "Bulk email campaigns",
      "Transactional emails",
      "Password reset emails",
      "E-commerce confirmations",
      "Marketing communications",
      "System monitoring alerts",
      "User registration confirmations"
    ],
    examples: [
      {
        title: "SMTP Session Example",
        code: `220 mail.example.com ESMTP Postfix
EHLO client.example.com
250-mail.example.com Hello client.example.com
250-SIZE 10240000
250-AUTH PLAIN LOGIN
250 STARTTLS
STARTTLS
220 Ready to start TLS
AUTH LOGIN
334 VXNlcm5hbWU6
dGVzdEBleGFtcGxlLmNvbQ==
334 UGFzc3dvcmQ6
cGFzc3dvcmQ=
235 Authentication successful
MAIL FROM:<sender@example.com>
250 Ok
RCPT TO:<recipient@example.com>
250 Ok
DATA
354 End data with <CR><LF>.<CR><LF>
Subject: Test Email
From: sender@example.com
To: recipient@example.com

This is a test email.
.
250 Message accepted
QUIT
221 Bye`,
        explanation: "Complete SMTP session showing authentication, TLS, and email sending."
      }
    ],
    diagrams: [
      {
        src: "/smtp.gif",
        alt: "SMTP email flow",
        caption: "SMTP email transmission process from sender to recipient"
      },
      {
        src: "/smtp.jpg",
        alt: "SMTP protocol overview",
        caption: "SMTP protocol components and email delivery flow"
      }
    ],
    relatedProtocols: ["imap", "pop3", "tls"],
    commonCommands: [
      {
        command: "telnet",
        description: "Test SMTP connection",
        example: "telnet mail.example.com 25"
      },
      {
        command: "openssl",
        description: "Test SMTP with TLS",
        example: "openssl s_client -connect mail.example.com:465"
      }
    ],
    resources: [
      {
        title: "RFC 5321 - SMTP Protocol",
        url: "https://tools.ietf.org/html/rfc5321",
        type: "RFC"
      },
      {
        title: "Postfix Mail Server",
        url: "http://www.postfix.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use TLS encryption",
      "Implement authentication",
      "Configure SPF/DKIM/DMARC",
      "Rate limiting",
      "Spam filtering"
    ]
  }