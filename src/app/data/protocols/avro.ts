import { Protocol } from "../../types/protocol";

export const AVRO: Protocol = {
    id: "avro",
    name: "Avro",
    category: "Data",
    difficulty: "Intermediate",
    shortDescription: "Data serialization system with rich data structures and schema evolution",
    fullDescription: "Apache Avro is a data serialization system that provides rich data structures, a compact binary data format, and schema evolution capabilities. It supports dynamic typing and is designed for use in Apache Hadoop and other data processing systems.",
    port: "N/A (Data format/protocol)",
    advantages: [
      "Schema evolution",
      "Compact binary format",
      "Rich data structures",
      "Dynamic typing",
      "Cross-language support",
      "Fast serialization"
    ],
    disadvantages: [
      "Schema overhead",
      "Learning curve",
      "Limited ecosystem",
      "Debugging complexity",
      "Version management",
      "Performance overhead"
    ],
    useCases: [
      "Data pipelines",
      "Message queues",
      "Data lakes",
      "Stream processing",
      "Database serialization",
      "API data exchange",
      "Log aggregation",
      "ETL processes",
      "Data archival",
      "Configuration management",
      "Service communication",
      "Data warehousing"
    ],
    examples: [
      {
        title: "Avro Schema Definition",
        code: `// User schema (user.avsc)
{
  "type": "record",
  "name": "User",
  "namespace": "com.example",
  "fields": [
    {
      "name": "id", 
      "type": "long"
    },
    {
      "name": "username",
      "type": "string"
    },
    {
      "name": "email",
      "type": ["null", "string"],
      "default": null
    },
    {
      "name": "created_at",
      "type": "long",
      "logicalType": "timestamp-millis"
    },
    {
      "name": "tags",
      "type": {
        "type": "array",
        "items": "string"
      },
      "default": []
    },
    {
      "name": "metadata",
      "type": {
        "type": "map", 
        "values": "string"
      },
      "default": {}
    }
  ]
}

// Complex nested schema
{
  "type": "record",
  "name": "Order",
  "fields": [
    {"name": "order_id", "type": "string"},
    {"name": "customer", "type": "User"},
    {
      "name": "items",
      "type": {
        "type": "array",
        "items": {
          "type": "record",
          "name": "Item",
          "fields": [
            {"name": "product_id", "type": "string"},
            {"name": "quantity", "type": "int"},
            {"name": "price", "type": "double"}
          ]
        }
      }
    },
    {
      "name": "status",
      "type": {
        "type": "enum",
        "name": "OrderStatus", 
        "symbols": ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"]
      }
    }
  ]
}

// Union types (equivalent to Optional/Nullable)
{"type": ["null", "string"]}  // Optional string
{"type": ["int", "string"]}   // Either int or string`,
        explanation: "Avro schema definition with various data types and structures."
      },
      {
        title: "Java Avro Implementation",
        code: `// Java code generation from schema
// Generated User class will have getters/setters

import org.apache.avro.Schema;
import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.*;
import org.apache.avro.specific.SpecificDatumReader;
import org.apache.avro.specific.SpecificDatumWriter;

// Using generated classes (specific)
User user = User.newBuilder()
    .setId(123L)
    .setUsername("john_doe")
    .setEmail("john@example.com")
    .setCreatedAt(System.currentTimeMillis())
    .setTags(Arrays.asList("admin", "premium"))
    .setMetadata(Map.of("source", "web", "region", "us-east"))
    .build();

// Serialize to bytes
ByteArrayOutputStream out = new ByteArrayOutputStream();
DatumWriter<User> writer = new SpecificDatumWriter<>(User.class);
Encoder encoder = EncoderFactory.get().binaryEncoder(out, null);
writer.write(user, encoder);
encoder.flush();
byte[] serializedData = out.toByteArray();

// Deserialize from bytes  
DatumReader<User> reader = new SpecificDatumReader<>(User.class);
Decoder decoder = DecoderFactory.get().binaryDecoder(serializedData, null);
User deserializedUser = reader.read(null, decoder);

// Using generic records (no code generation)
Schema schema = new Schema.Parser().parse(new File("user.avsc"));
GenericRecord genericUser = new GenericData.Record(schema);
genericUser.put("id", 123L);
genericUser.put("username", "john_doe");
genericUser.put("email", "john@example.com");

// Schema evolution example
// Original schema has fields: id, username
// New schema adds: email (with default), phone (optional)
// Reader with new schema can read old data
// Writer with old schema data can be read by new reader`,
        explanation: "Java implementation using both specific and generic approaches."
      },
      {
        title: "Python Avro Usage",
        code: `import avro.schema
import avro.io
import io
import json

# Load schema
schema = avro.schema.parse(open("user.avsc", "rb").read())

# Create record
user_data = {
    "id": 123,
    "username": "john_doe", 
    "email": "john@example.com",
    "created_at": 1609459200000,
    "tags": ["admin", "premium"],
    "metadata": {"source": "web", "region": "us-east"}
}

# Serialize
writer = avro.io.DatumWriter(schema)
bytes_writer = io.BytesIO()
encoder = avro.io.BinaryEncoder(bytes_writer)
writer.write(user_data, encoder)
raw_bytes = bytes_writer.getvalue()

# Deserialize
bytes_reader = io.BytesIO(raw_bytes)
decoder = avro.io.BinaryDecoder(bytes_reader)
reader = avro.io.DatumReader(schema)
user = reader.read(decoder)

print(user)
# {'id': 123, 'username': 'john_doe', 'email': 'john@example.com', ...}

# Schema evolution - adding field with default
evolved_schema_json = {
    "type": "record",
    "name": "User", 
    "fields": [
        {"name": "id", "type": "long"},
        {"name": "username", "type": "string"},
        {"name": "email", "type": ["null", "string"], "default": None},
        {"name": "phone", "type": ["null", "string"], "default": None}  # New field
    ]
}

evolved_schema = avro.schema.parse(json.dumps(evolved_schema_json))

# Read old data with new schema
reader_evolved = avro.io.DatumReader(schema, evolved_schema)
bytes_reader = io.BytesIO(raw_bytes)  # Old serialized data
decoder = avro.io.BinaryDecoder(bytes_reader)
evolved_user = reader_evolved.read(decoder)
print(evolved_user["phone"])  # None (default value)

# Kafka integration
from kafka import KafkaProducer, KafkaConsumer

# Producer with Avro serialization
def avro_serializer(data):
    writer = avro.io.DatumWriter(schema)
    bytes_writer = io.BytesIO()
    encoder = avro.io.BinaryEncoder(bytes_writer)
    writer.write(data, encoder)
    return bytes_writer.getvalue()

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=avro_serializer
)
producer.send('user-events', user_data)`,
        explanation: "Python Avro usage with schema evolution and Kafka integration."
      }
    ],
    relatedProtocols: ["kafka", "protobuf", "json", "http"],
    resources: [
      {
        title: "Apache Avro Documentation",
        url: "https://avro.apache.org/docs/current/",
        type: "Documentation"
      },
      {
        title: "Avro Specification", 
        url: "https://avro.apache.org/docs/current/spec.html",
        type: "Specification"
      }
    ],
    securityConsiderations: [
      "Schema validation",
      "Input sanitization", 
      "Schema injection",
      "Resource consumption",
      "Access control",
      "Data integrity"
    ]
};
