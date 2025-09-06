import { Protocol } from "../../types/protocol";

export const CARDDAV: Protocol = {
  id: "carddav",
  name: "CardDAV",
  category: "Application",
  difficulty: "Intermediate",
  shortDescription: "Open standard protocol for synchronizing contact information.",
  fullDescription:
    "CardDAV is an open standard protocol for accessing and managing contact data stored on a server. It is based on WebDAV and uses the vCard format for representing contact information. CardDAV allows users to synchronize address books across multiple devices and applications, providing interoperability between different clients and services such as Apple Contacts, Thunderbird, and Google Contacts.",
  port: "TCP 443 (HTTPS), TCP 80 (HTTP)",
  versions: ["RFC 6352"],
  advantages: [
    "Open standard (IETF)",
    "Cross-platform and cross-application compatibility",
    "Based on widely used vCard format",
    "Leverages WebDAV/HTTP infrastructure",
    "Used by major vendors (Apple, Google, Mozilla)"
  ],
  disadvantages: [
    "Setup requires WebDAV-capable server",
    "More complex compared to proprietary sync methods",
    "Not supported by all contact management applications",
    "Performance limited by HTTP/WebDAV"
  ],
  useCases: [
    "Contact synchronization across devices",
    "Enterprise address book sharing",
    "Personal contact management",
    "Integration into productivity and collaboration tools",
    "Cross-platform mobile contact sync"
  ],
  examples: [
    {
      title: "CardDAV Address Book Request",
      code: `REPORT /addressbooks/user/contacts/ HTTP/1.1
Host: contacts.example.com
Depth: 1
Content-Type: application/xml; charset="UTF-8"

<?xml version="1.0" encoding="UTF-8"?>
<C:addressbook-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:carddav">
  <D:prop>
    <D:getetag/>
    <C:address-data/>
  </D:prop>
</C:addressbook-query>`,
      explanation: "Example CardDAV REPORT request for retrieving contact data."
    }
  ],
  diagrams: [
    {
      src: "/carddav_sync.png",
      alt: "CardDAV synchronization",
      caption: "CardDAV synchronization of contact data across devices"
    }
  ],
  relatedProtocols: ["http", "https", "webdav", "caldav"],
  resources: [
    {
      title: "RFC 6352 - CardDAV: vCard Extensions to WebDAV",
      url: "https://datatracker.ietf.org/doc/html/rfc6352",
      type: "RFC"
    },
    {
      title: "CardDAV Wikipedia",
      url: "https://en.wikipedia.org/wiki/CardDAV",
      type: "Reference"
    }
  ],
  securityConsiderations: [
    "TLS required to protect sensitive contact data",
    "Authentication necessary (Basic, Digest, OAuth)",
    "Risk of data leakage if address books are shared improperly",
    "Server must mitigate DoS attempts from abusive queries"
  ]
};
