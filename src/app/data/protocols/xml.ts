import { Protocol } from "../../types/protocol";

export const XML: Protocol = {
    id: "xml",
    name: "XML",
    category: "Data",
    difficulty: "Intermediate",
    shortDescription: "Extensible Markup Language for structured data",
    fullDescription: "XML (Extensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable. It is designed to store and transport data with focus on what data is.",
    advantages: [
      "Self-documenting format",
      "Schema validation (XSD)",
      "Namespace support",
      "Extensible structure",
      "Platform independent",
      "Industry standard"
    ],
    disadvantages: [
      "Verbose syntax",
      "Larger file sizes",
      "Complex parsing",
      "No native data types",
      "Processing overhead"
    ],
    useCases: [
      "Web services (SOAP)",
      "Configuration files",
      "Document storage",
      "Data exchange between systems",
      "RSS/Atom feeds",
      "Enterprise applications",
      "Legacy system integration",
      "Scientific data formats",
      "Publishing industry",
      "Banking and finance",
      "Healthcare data (HL7)",
      "Government data exchange"
    ],
    examples: [
      {
        title: "XML Document Structure",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="1">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <genre>Classic Literature</genre>
    <price currency="USD">12.99</price>
    <published>1925</published>
    <available>true</available>
  </book>
  <book id="2">
    <title>To Kill a Mockingbird</title>
    <author>Harper Lee</author>
    <genre>Fiction</genre>
    <price currency="USD">14.99</price>
    <published>1960</published>
    <available>false</available>
  </book>
</catalog>`,
        explanation: "XML document showing hierarchical structure with elements, attributes, and text content."
      },
      {
        title: "XML with Namespace",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:web="http://example.com/webservice">
  <soap:Header>
    <web:Authentication>
      <web:Username>user123</web:Username>
      <web:Password>pass456</web:Password>
    </web:Authentication>
  </soap:Header>
  <soap:Body>
    <web:GetUserRequest>
      <web:UserId>12345</web:UserId>
    </web:GetUserRequest>
  </soap:Body>
</soap:Envelope>`,
        explanation: "SOAP XML message showing namespace usage and typical web service structure."
      }
    ],
    relatedProtocols: ["soap", "http", "xhtml"],
    resources: [
      {
        title: "W3C XML Specification",
        url: "https://www.w3.org/XML/",
        type: "Specification"
      },
      {
        title: "XML Schema (XSD) Tutorial",
        url: "https://www.w3schools.com/xml/schema_intro.asp",
        type: "Tutorial"
      }
    ]
  }