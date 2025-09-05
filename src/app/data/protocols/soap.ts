import { Protocol } from "../../types/protocol";

export const SOAP: Protocol = {
    id: "soap",
    name: "SOAP",
    category: "APIs",
    difficulty: "Advanced",
    shortDescription: "Simple Object Access Protocol for web service communication",
    fullDescription: "SOAP (Simple Object Access Protocol) is a messaging protocol specification for exchanging structured information in web services. It uses XML for message format and relies on application layer protocols like HTTP for message negotiation and transmission.",
    port: "80 (HTTP), 443 (HTTPS)",
    advantages: [
      "Language and platform independent",
      "Built-in error handling",
      "Security standards (WS-Security)",
      "Transaction support",
      "Formal contracts (WSDL)",
      "Enterprise-grade features"
    ],
    disadvantages: [
      "Verbose XML format",
      "Performance overhead",
      "Complex implementation",
      "Limited browser support",
      "Steep learning curve",
      "Heavyweight compared to REST"
    ],
    useCases: [
      "Enterprise web services",
      "Financial services",
      "Healthcare systems",
      "Government applications",
      "Legacy system integration",
      "B2B communications",
      "Secure transactions",
      "Complex business processes",
      "Mission-critical applications",
      "Formal service contracts",
      "Enterprise service bus",
      "Payment processing"
    ],
    examples: [
      {
        title: "SOAP Request Example",
        code: `POST /calculator HTTP/1.1
Host: www.example.com
Content-Type: text/xml; charset=utf-8
SOAPAction: "http://example.com/calculator/Add"

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:calc="http://example.com/calculator">
  <soap:Header>
    <calc:Authentication>
      <calc:Username>user123</calc:Username>
      <calc:Password>pass456</calc:Password>
    </calc:Authentication>
  </soap:Header>
  <soap:Body>
    <calc:Add>
      <calc:a>10</calc:a>
      <calc:b>20</calc:b>
    </calc:Add>
  </soap:Body>
</soap:Envelope>`,
        explanation: "SOAP request with authentication header and method call."
      },
      {
        title: "SOAP Response Example",
        code: `HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:calc="http://example.com/calculator">
  <soap:Body>
    <calc:AddResponse>
      <calc:result>30</calc:result>
    </calc:AddResponse>
  </soap:Body>
</soap:Envelope>

<!-- SOAP Fault Example -->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>Client</faultcode>
      <faultstring>Invalid input parameters</faultstring>
      <detail>
        <error>Parameter 'a' must be a number</error>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`,
        explanation: "SOAP response with successful result and error handling example."
      }
    ],
    relatedProtocols: ["http", "https", "wsdl", "xml"],
    resources: [
      {
        title: "SOAP 1.2 Specification",
        url: "https://www.w3.org/TR/soap12/",
        type: "Specification"
      },
      {
        title: "Apache CXF SOAP Framework",
        url: "https://cxf.apache.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "WS-Security standards",
      "Message encryption",
      "Digital signatures",
      "Authentication tokens",
      "HTTPS transport",
      "Input validation"
    ]
};
