import { Protocol } from "../../types/protocol";

export const THRIFT: Protocol = {
    id: "thrift",
    name: "Apache Thrift",
    category: "APIs",
    difficulty: "Intermediate",
    shortDescription: "Cross-language RPC framework for scalable services",
    fullDescription: "Apache Thrift is a software framework for scalable cross-language services development. It combines a software stack with a code generation engine to build services that work efficiently and seamlessly between different programming languages.",
    port: "Various (commonly 9090)",
    versions: ["Thrift 0.9", "Thrift 0.10", "Thrift 0.11", "Thrift 0.12+"],
    advantages: [
      "Cross-language support",
      "Code generation",
      "Multiple protocols",
      "Multiple transports",
      "High performance",
      "Compact binary format",
      "Versioning support",
      "Rich data types"
    ],
    disadvantages: [
      "Learning curve",
      "Code generation complexity",
      "Limited debugging tools",
      "Version compatibility",
      "Language-specific limitations",
      "Build process overhead",
      "Documentation gaps",
      "Error handling complexity"
    ],
    useCases: [
      "Microservices communication",
      "Cross-language APIs",
      "High-performance RPC",
      "Distributed systems",
      "Service-oriented architecture",
      "Data serialization",
      "Backend service integration",
      "Real-time applications",
      "Big data processing",
      "Cloud service APIs",
      "Inter-process communication",
      "Mobile backend services"
    ],
    examples: [
      {
        title: "Thrift IDL Definition",
        code: `// calculator.thrift
namespace java com.example.calculator
namespace py calculator
namespace js calculator

enum Operation {
  ADD = 1,
  SUBTRACT = 2,
  MULTIPLY = 3,
  DIVIDE = 4
}

exception InvalidOperation {
  1: i32 whatOp,
  2: string why
}

service Calculator {
  i32 add(1:i32 num1, 2:i32 num2),
  i32 subtract(1:i32 num1, 2:i32 num2),
  i32 multiply(1:i32 num1, 2:i32 num2),
  i32 divide(1:i32 num1, 2:i32 num2) throws (1:InvalidOperation ouch),
  void ping(),
  i32 calculate(1:i32 logid, 2:Operation op, 3:i32 num1, 4:i32 num2)
}`,
        explanation: "Thrift Interface Definition Language (IDL) for a calculator service."
      },
      {
        title: "Thrift Server (Java)",
        code: `// Generated Java server implementation
public class CalculatorHandler implements Calculator.Iface {
    
    @Override
    public int add(int num1, int num2) throws TException {
        return num1 + num2;
    }
    
    @Override
    public int subtract(int num1, int num2) throws TException {
        return num1 - num2;
    }
    
    @Override
    public int divide(int num1, int num2) throws InvalidOperation, TException {
        if (num2 == 0) {
            InvalidOperation io = new InvalidOperation();
            io.whatOp = 4;
            io.why = "Cannot divide by 0";
            throw io;
        }
        return num1 / num2;
    }
}

// Server setup
TServerTransport serverTransport = new TServerSocket(9090);
Calculator.Processor processor = new Calculator.Processor(new CalculatorHandler());
TServer server = new TSimpleServer(new Args(serverTransport).processor(processor));
server.serve();`,
        explanation: "Java server implementation using generated Thrift classes."
      },
      {
        title: "Thrift Client (Python)",
        code: `#!/usr/bin/env python
import sys
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from calculator import Calculator
from calculator.ttypes import InvalidOperation, Operation

try:
    # Create transport and protocol
    transport = TSocket.TSocket('localhost', 9090)
    transport = TTransport.TBufferedTransport(transport)
    protocol = TBinaryProtocol.TBinaryProtocol(transport)
    
    # Create client
    client = Calculator.Client(protocol)
    
    # Open connection
    transport.open()
    
    # Make calls
    print(f"ping(): {client.ping()}")
    print(f"add(1, 1): {client.add(1, 1)}")
    print(f"subtract(15, 10): {client.subtract(15, 10)}")
    
    try:
        client.divide(1, 0)
    except InvalidOperation as e:
        print(f"InvalidOperation: {e}")
        
    # Close connection
    transport.close()
    
except Exception as e:
    print(f"Error: {e}")`,
        explanation: "Python client connecting to Thrift calculator service."
      }
    ],
    diagrams: [
      {
        src: "/thrift_architecture.png",
        alt: "Thrift architecture",
        caption: "Thrift framework components and code generation flow"
      },
      {
        src: "/thrift_protocols.jpg",
        alt: "Thrift protocols and transports",
        caption: "Thrift protocol and transport layer options"
      }
    ],
    relatedProtocols: ["grpc", "protobuf", "rest", "tcp"],
    resources: [
      {
        title: "Apache Thrift Official Site",
        url: "https://thrift.apache.org/",
        type: "Documentation"
      },
      {
        title: "Thrift Tutorial",
        url: "https://thrift.apache.org/tutorial/",
        type: "Tutorial"
      },
      {
        title: "Thrift IDL Reference",
        url: "https://thrift.apache.org/docs/idl",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Transport layer security",
      "Authentication mechanisms",
      "Input validation",
      "Access control",
      "Rate limiting",
      "Error information exposure",
      "Network security",
      "Service isolation"
    ]
  }