import { Protocol } from "../../types/protocol";

export const CALDAV: Protocol = {
  id: "caldav",
  name: "CalDAV",
  category: "Application",
  difficulty: "Intermediate",
  shortDescription: "Open standard protocol for accessing and managing calendar data on a server.",
  fullDescription:
    "CalDAV is an Internet standard protocol that allows clients to access and manage calendar data stored on a server. It extends WebDAV (itself an extension of HTTP) and uses iCalendar format for representing events and tasks. CalDAV enables users to synchronize calendar events across multiple clients, providing interoperability between different platforms such as Apple Calendar, Thunderbird, and Google Calendar.",
  port: "TCP 443 (HTTPS), TCP 80 (HTTP)",
  versions: ["RFC 4791 (original)", "RFC 6638 (scheduling extensions)"],
  advantages: [
    "Open standard protocol (IETF)",
    "Cross-platform compatibility",
    "Supports recurring events, tasks, and scheduling",
    "Uses existing WebDAV/HTTP infrastructure",
    "Widely supported (Apple, Google, Mozilla, etc.)"
  ],
  disadvantages: [
    "More complex than proprietary alternatives",
    "Requires server setup and management",
    "Performance depends on HTTP/WebDAV efficiency",
    "Not universally supported by all calendar apps"
  ],
  useCases: [
    "Calendar synchronization across devices",
    "Enterprise group calendaring",
    "Shared calendars in organizations",
    "Personal calendar apps (Thunderbird, Apple Calendar)",
    "Integration with productivity suites"
  ],
  examples: [
    {
      title: "CalDAV PROPFIND Request Example",
      code: `PROPFIND /calendars/user/calendar/ HTTP/1.1
Host: calendar.example.com
Depth: 1
Content-Type: application/xml; charset="UTF-8"

<?xml version="1.0" encoding="UTF-8"?>
<C:calendar-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:prop>
    <D:getetag/>
    <C:calendar-data/>
  </D:prop>
</C:calendar-query>`,
      explanation: "Example of a CalDAV PROPFIND request to fetch calendar data."
    }
  ],
  diagrams: [
    {
      src: "/caldav_sync.png",
      alt: "CalDAV synchronization",
      caption: "Synchronization of calendar events via CalDAV protocol"
    }
  ],
  relatedProtocols: ["http", "https", "webdav", "carddav"],
  resources: [
    {
      title: "RFC 4791 - Calendaring Extensions to WebDAV (CalDAV)",
      url: "https://datatracker.ietf.org/doc/html/rfc4791",
      type: "RFC"
    },
    {
      title: "CalDAV Wikipedia",
      url: "https://en.wikipedia.org/wiki/CalDAV",
      type: "Reference"
    }
  ],
  securityConsiderations: [
    "Requires TLS to protect calendar data",
    "Authentication must be enforced (Basic, Digest, OAuth)",
    "Possible information leakage if calendars are shared improperly",
    "Server DoS risk from poorly optimized queries"
  ]
};
