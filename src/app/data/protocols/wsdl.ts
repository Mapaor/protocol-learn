import { Protocol } from "../../types/protocol";

export const WSDL: Protocol = {
    id: "wsdl",
    name: "WSDL",
    category: "APIs",
    difficulty: "Advanced",
    shortDescription: "Web Services Description Language for describing web service interfaces",
    fullDescription: "WSDL (Web Services Description Language) is an XML-based interface description language used to describe the functionality offered by a web service. It provides a machine-readable description of how the service can be called, what parameters it expects, and what data structures it returns.",
    port: "80 (HTTP), 443 (HTTPS)",
    versions: ["WSDL 1.1", "WSDL 2.0"],
    advantages: [
      "Formal service contracts",
      "Code generation support",
      "Language independent",
      "Tool integration",
      "Service discovery",
      "Type safety"
    ],
    disadvantages: [
      "Complex XML structure",
      "Verbose format",
      "Steep learning curve",
      "Limited flexibility",
      "Tight coupling",
      "Performance overhead"
    ],
    useCases: [
      "SOAP web services",
      "Enterprise service integration",
      "B2B communications",
      "Legacy system interfaces",
      "Service registries",
      "Code generation tools",
      "Service documentation",
      "Contract-first development",
      "Government systems",
      "Financial services",
      "Healthcare integrations",
      "Supply chain systems"
    ],
    examples: [
      {
        title: "WSDL Document Structure",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<definitions name="CalculatorService"
    targetNamespace="http://example.com/calculator"
    xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:tns="http://example.com/calculator"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <!-- Types section -->
  <types>
    <xsd:schema targetNamespace="http://example.com/calculator">
      <xsd:element name="AddRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="a" type="xsd:int"/>
            <xsd:element name="b" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="AddResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="result" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>

  <!-- Message definitions -->
  <message name="AddSoapIn">
    <part name="parameters" element="tns:AddRequest"/>
  </message>
  <message name="AddSoapOut">
    <part name="parameters" element="tns:AddResponse"/>
  </message>

  <!-- Port type (interface) -->
  <portType name="CalculatorSoap">
    <operation name="Add">
      <input message="tns:AddSoapIn"/>
      <output message="tns:AddSoapOut"/>
    </operation>
  </portType>

  <!-- Binding -->
  <binding name="CalculatorSoapBinding" type="tns:CalculatorSoap">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="Add">
      <soap:operation soapAction="http://example.com/calculator/Add"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>

  <!-- Service -->
  <service name="CalculatorService">
    <port name="CalculatorSoap" binding="tns:CalculatorSoapBinding">
      <soap:address location="http://example.com/calculator.asmx"/>
    </port>
  </service>
</definitions>`,
        explanation: "Complete WSDL document defining a calculator web service."
      },
      {
        title: "WSDL Code Generation Example",
        code: `# Generate Java client from WSDL (using wsimport)
wsimport -keep -s src http://example.com/calculator.wsdl

# Generated Java client usage
CalculatorService service = new CalculatorService();
CalculatorSoap port = service.getCalculatorSoap();

AddRequest request = new AddRequest();
request.setA(10);
request.setB(20);

AddResponse response = port.add(request);
System.out.println("Result: " + response.getResult());

# Generate C# client (using svcutil)
svcutil http://example.com/calculator.wsdl /out:CalculatorClient.cs

# Python client using suds
from suds.client import Client

client = Client('http://example.com/calculator.wsdl')
result = client.service.Add(10, 20)
print(f"Result: {result}")`,
        explanation: "Code generation examples for different programming languages."
      }
    ],
    relatedProtocols: ["soap", "xml", "http", "https"],
    resources: [
      {
        title: "WSDL 1.1 Specification",
        url: "https://www.w3.org/TR/wsdl",
        type: "Specification"
      },
      {
        title: "WSDL 2.0 Specification",
        url: "https://www.w3.org/TR/wsdl20/",
        type: "Specification"
      }
    ],
    securityConsiderations: [
      "XML schema validation",
      "Input sanitization",
      "Access control",
      "Transport security",
      "Service endpoint protection",
      "XML external entity prevention"
    ]
};
