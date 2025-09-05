import { Protocol } from "../../types/protocol";

export const KAFKA: Protocol = {
    id: "kafka",
    name: "Kafka",
    category: "Messaging",
    difficulty: "Advanced",
    shortDescription: "Apache Kafka distributed streaming platform for high-throughput messaging",
    fullDescription: "Apache Kafka is a distributed streaming platform that provides high-throughput, low-latency handling of real-time data feeds. It is designed to handle data streams from multiple sources and deliver them to multiple consumers, with fault tolerance and horizontal scalability.",
    port: "9092 (default), 9093 (SSL)",
    advantages: [
      "High throughput",
      "Low latency",
      "Horizontal scalability",
      "Fault tolerance",
      "Stream processing",
      "Data retention"
    ],
    disadvantages: [
      "Complex setup",
      "Memory intensive",
      "Network dependent",
      "Operational complexity",
      "Learning curve",
      "ZooKeeper dependency"
    ],
    useCases: [
      "Real-time analytics",
      "Event sourcing",
      "Log aggregation",
      "Stream processing",
      "Microservices communication",
      "Data integration",
      "Metrics collection",
      "Activity tracking",
      "IoT data pipelines",
      "Change data capture",
      "ETL processes",
      "Event-driven architectures"
    ],
    examples: [
      {
        title: "Kafka Producer (Java)",
        code: `import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class KafkaProducerExample {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", 
            "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", 
            "org.apache.kafka.common.serialization.StringSerializer");
        props.put("acks", "all");
        props.put("retries", 3);
        
        Producer<String, String> producer = new KafkaProducer<>(props);
        
        for (int i = 0; i < 100; i++) {
            ProducerRecord<String, String> record = 
                new ProducerRecord<>("my-topic", "key-" + i, "value-" + i);
                
            producer.send(record, (metadata, exception) -> {
                if (exception != null) {
                    exception.printStackTrace();
                } else {
                    System.out.printf("Sent record to partition %d with offset %d%n",
                        metadata.partition(), metadata.offset());
                }
            });
        }
        
        producer.close();
    }
}`,
        explanation: "Kafka producer example in Java with configuration and error handling."
      },
      {
        title: "Kafka Consumer (Java)",
        code: `import org.apache.kafka.clients.consumer.*;
import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class KafkaConsumerExample {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "my-consumer-group");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("key.deserializer", 
            "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", 
            "org.apache.kafka.common.serialization.StringDeserializer");
        
        Consumer<String, String> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Collections.singletonList("my-topic"));
        
        while (true) {
            ConsumerRecords<String, String> records = 
                consumer.poll(Duration.ofMillis(100));
                
            for (ConsumerRecord<String, String> record : records) {
                System.out.printf("Received: partition=%d, offset=%d, key=%s, value=%s%n",
                    record.partition(), record.offset(), record.key(), record.value());
            }
        }
    }
}`,
        explanation: "Kafka consumer example with subscription and message processing loop."
      }
    ],
    relatedProtocols: ["amqp", "mqtt", "tcp"],
    resources: [
      {
        title: "Apache Kafka Documentation",
        url: "https://kafka.apache.org/documentation/",
        type: "Documentation"
      },
      {
        title: "Confluent Kafka Platform",
        url: "https://www.confluent.io/",
        type: "Platform"
      }
    ],
    securityConsiderations: [
      "SSL/TLS encryption",
      "SASL authentication",
      "ACL authorization",
      "Network security",
      "Data encryption at rest",
      "Audit logging"
    ]
};
