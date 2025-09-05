import { Protocol } from "../../types/protocol";

export const PROTOBUF: Protocol = {
    id: "protobuf",
    name: "Protocol Buffers",
    category: "Data",
    difficulty: "Intermediate",
    shortDescription: "Protocol Buffers for efficient binary serialization and data exchange",
    fullDescription: "Protocol Buffers (protobuf) is a language-neutral, platform-neutral extensible mechanism for serializing structured data. It's useful for developing programs to communicate with each other over a wire or for storing data, offering better performance than XML and JSON.",
    port: "N/A (Serialization format)",
    versions: ["Proto2", "Proto3"],
    advantages: [
      "Compact binary format",
      "Fast serialization/deserialization",
      "Language agnostic",
      "Schema evolution support",
      "Strong typing",
      "Code generation"
    ],
    disadvantages: [
      "Binary format (not human-readable)",
      "Requires schema definition",
      "Limited dynamic typing",
      "Compilation step needed",
      "Learning curve",
      "Tool dependency"
    ],
    useCases: [
      "gRPC communication",
      "Microservices data exchange",
      "API data serialization",
      "Database storage",
      "Message queuing",
      "Configuration files",
      "Network protocols",
      "Cache serialization",
      "Inter-process communication",
      "Mobile applications",
      "Game development",
      "IoT data transmission"
    ],
    examples: [
      {
        title: "Protocol Buffer Definition",
        code: `// person.proto
syntax = "proto3";

package tutorial;

option java_multiple_files = true;
option java_package = "com.example.tutorial.protos";
option java_outer_classname = "PersonProtos";

message Person {
  string name = 1;
  int32 id = 2;
  string email = 3;
  
  enum PhoneType {
    MOBILE = 0;
    HOME = 1;
    WORK = 2;
  }
  
  message PhoneNumber {
    string number = 1;
    PhoneType type = 2;
  }
  
  repeated PhoneNumber phones = 4;
  
  google.protobuf.Timestamp last_updated = 5;
}

message AddressBook {
  repeated Person people = 1;
}`,
        explanation: "Protocol Buffer schema definition with messages, enums, and nested types."
      },
      {
        title: "Protocol Buffer Usage (Python)",
        code: `import person_pb2
from google.protobuf.timestamp_pb2 import Timestamp
import time

# Create a new person
person = person_pb2.Person()
person.name = "John Doe"
person.id = 1234
person.email = "jdoe@example.com"

# Add phone number
phone = person.phones.add()
phone.number = "555-1234"
phone.type = person_pb2.Person.HOME

# Set timestamp
timestamp = Timestamp()
timestamp.GetCurrentTime()
person.last_updated.CopyFrom(timestamp)

# Serialize to binary
serialized_data = person.SerializeToString()
print(f"Serialized size: {len(serialized_data)} bytes")

# Deserialize from binary
new_person = person_pb2.Person()
new_person.ParseFromString(serialized_data)

print(f"Name: {new_person.name}")
print(f"ID: {new_person.id}")
print(f"Email: {new_person.email}")

# Create address book
address_book = person_pb2.AddressBook()
address_book.people.extend([person])

# Serialize address book
book_data = address_book.SerializeToString()`,
        explanation: "Protocol Buffer usage in Python showing serialization and deserialization."
      }
    ],
    relatedProtocols: ["grpc", "http", "json"],
    resources: [
      {
        title: "Protocol Buffers Documentation",
        url: "https://developers.google.com/protocol-buffers",
        type: "Documentation"
      },
      {
        title: "Protocol Buffer Compiler",
        url: "https://github.com/protocolbuffers/protobuf",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Input validation",
      "Message size limits",
      "Schema validation",
      "Deserialization safety",
      "Version compatibility",
      "Access control"
    ]
};
