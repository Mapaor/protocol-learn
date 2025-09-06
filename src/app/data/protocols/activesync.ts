import { Protocol } from "../../types/protocol";

export const ACTIVESYNC: Protocol = {
  id: "activesync",
  name: "Exchange ActiveSync (EAS)",
  category: "Application",
  difficulty: "Intermediate",
  shortDescription: "Microsoft protocol for synchronizing emails, contacts, calendars, and tasks with mobile devices.",
  fullDescription:
    "Exchange ActiveSync (EAS) is a proprietary protocol developed by Microsoft for synchronizing emails, contacts, calendar events, tasks, and notes between mail servers (such as Microsoft Exchange) and mobile devices. It uses HTTP/HTTPS as a transport and XML for data representation. ActiveSync enables push-based synchronization, allowing real-time updates of mailbox data on supported clients like Outlook and mobile email apps.",
  port: "TCP 443 (HTTPS), TCP 80 (HTTP, rarely used)",
  versions: [
    "Exchange ActiveSync 2.0",
    "Exchange ActiveSync 12.1",
    "Exchange ActiveSync 14.1",
    "Exchange ActiveSync 16.x"
  ],
  advantages: [
    "Real-time push synchronization",
    "Supports multiple data types (mail, calendar, contacts, tasks)",
    "Efficient over mobile networks",
    "Broad client support (Android, iOS, Outlook)",
    "Integration with Exchange policies (security, device management)"
  ],
  disadvantages: [
    "Proprietary Microsoft protocol",
    "Limited openness compared to IMAP/CalDAV/CardDAV",
    "Licensing restrictions historically",
    "Performance issues with large mailboxes",
    "Dependent on Exchange or compatible servers"
  ],
  useCases: [
    "Mobile email synchronization",
    "Enterprise email and calendar management",
    "BYOD (Bring Your Own Device) support",
    "Task and contact synchronization across devices",
    "Exchange server connectivity on smartphones"
  ],
  examples: [
    {
      title: "ActiveSync Autodiscover XML Example",
      code: `<?xml version="1.0" encoding="utf-8" ?>
<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/mobilesync/requestschema/2006">
  <Request>
    <EMailAddress>user@example.com</EMailAddress>
    <AcceptableResponseSchema>
      http://schemas.microsoft.com/exchange/autodiscover/mobilesync/responseschema/2006
    </AcceptableResponseSchema>
  </Request>
</Autodiscover>`,
      explanation: "Example of an ActiveSync Autodiscover request for configuring a mobile client."
    }
  ],
  diagrams: [
    {
      src: "/activesync_flow.png",
      alt: "ActiveSync synchronization flow",
      caption: "ActiveSync synchronization between mobile device and Exchange server"
    }
  ],
  relatedProtocols: ["http", "https", "xml", "imap", "caldav", "carddav"],
  resources: [
    {
      title: "Exchange ActiveSync Overview (Microsoft Docs)",
      url: "https://learn.microsoft.com/en-us/exchange/clients/exchange-activesync/exchange-activesync",
      type: "Documentation"
    }
  ],
  securityConsiderations: [
    "Requires SSL/TLS for secure transport",
    "Vulnerable to brute force if password policies are weak",
    "Potential data leakage on lost/stolen devices",
    "Device wipe and policy enforcement needed",
    "Past exploits in older Exchange versions"
  ]
};
