import { Protocol } from "../../types/protocol";

export const NATS: Protocol = {
    id: "nats",
    name: "NATS",
    category: "Messaging",
    difficulty: "Intermediate",
    shortDescription: "High-performance messaging system for cloud native applications",
    fullDescription: "NATS is a simple, secure and performant communications system for digital systems, services and devices. It provides pub-sub, request-reply, and queue messaging patterns with features like clustering, auto-discovery, and security built-in.",
    port: "4222 (client), 8222 (monitoring), 6222 (routing)",
    advantages: [
      "High performance and low latency",
      "Simple and lightweight",
      "Multiple messaging patterns",
      "Built-in security",
      "Clustering support",
      "Language agnostic"
    ],
    disadvantages: [
      "At-most-once delivery (fire-and-forget)",
      "No built-in persistence",
      "Limited message ordering",
      "Memory-based storage",
      "No message replay without JetStream",
      "Single point of failure without clustering"
    ],
    useCases: [
      "Microservices communication",
      "Event-driven architectures",
      "Real-time messaging",
      "IoT device communication",
      "Gaming applications",
      "Financial trading systems",
      "Telemetry and monitoring",
      "Chat applications",
      "Notification systems",
      "Service discovery",
      "Load balancing",
      "Cloud-native applications"
    ],
    examples: [
      {
        title: "NATS Pub/Sub Pattern",
        code: `# Python NATS Publisher
import asyncio
import nats
import json

async def main():
    nc = await nats.connect("nats://localhost:4222")
    
    # Publish message
    await nc.publish("user.signup", json.dumps({
        "user_id": "12345",
        "email": "user@example.com",
        "timestamp": "2024-01-01T00:00:00Z"
    }).encode())
    
    await nc.close()

# Python NATS Subscriber
async def message_handler(msg):
    subject = msg.subject
    reply = msg.reply
    data = json.loads(msg.data.decode())
    print(f"Received on {subject}: {data}")

async def main():
    nc = await nats.connect("nats://localhost:4222")
    
    # Subscribe to subject
    await nc.subscribe("user.*", cb=message_handler)
    
    # Keep the connection alive
    await asyncio.sleep(60)
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())`,
        explanation: "NATS publish-subscribe pattern showing message publishing and subscription with wildcards."
      },
      {
        title: "NATS Request-Reply Pattern",
        code: `# Python NATS Service (Reply)
import asyncio
import nats
import json

async def request_handler(msg):
    try:
        request_data = json.loads(msg.data.decode())
        user_id = request_data.get("user_id")
        
        # Process request
        response = {
            "user_id": user_id,
            "name": "John Doe",
            "email": "john@example.com",
            "status": "active"
        }
        
        await msg.respond(json.dumps(response).encode())
    except Exception as e:
        error_response = {"error": str(e)}
        await msg.respond(json.dumps(error_response).encode())

async def main():
    nc = await nats.connect("nats://localhost:4222")
    await nc.subscribe("user.get", cb=request_handler)
    await asyncio.sleep(60)
    await nc.close()

# Python NATS Client (Request)
async def get_user(user_id):
    nc = await nats.connect("nats://localhost:4222")
    
    request = {"user_id": user_id}
    response = await nc.request("user.get", json.dumps(request).encode(), timeout=2.0)
    
    result = json.loads(response.data.decode())
    await nc.close()
    return result

# Go NATS Request-Reply
package main

import (
    "encoding/json"
    "log"
    "time"
    "github.com/nats-io/nats.go"
)

func main() {
    nc, err := nats.Connect(nats.DefaultURL)
    if err != nil {
        log.Fatal(err)
    }
    defer nc.Close()

    // Make request
    request := map[string]string{"user_id": "12345"}
    data, _ := json.Marshal(request)
    
    msg, err := nc.Request("user.get", data, 2*time.Second)
    if err != nil {
        log.Fatal(err)
    }
    
    var response map[string]interface{}
    json.Unmarshal(msg.Data, &response)
    log.Printf("Response: %+v", response)
}`,
        explanation: "NATS request-reply pattern for synchronous communication between services."
      },
      {
        title: "NATS JetStream (Persistence)",
        code: `# Enable JetStream
import asyncio
import nats
from nats.js.api import StreamConfig, ConsumerConfig

async def main():
    nc = await nats.connect("nats://localhost:4222")
    js = nc.jetstream()
    
    # Create stream
    await js.add_stream(StreamConfig(
        name="ORDERS",
        subjects=["orders.*"],
        retention="limits",
        max_msgs=1000000,
        max_age=86400  # 24 hours
    ))
    
    # Publish to stream
    ack = await js.publish("orders.created", b'{"order_id": "12345", "amount": 99.99}')
    print(f"Published message with sequence: {ack.seq}")
    
    # Create consumer
    await js.add_consumer("ORDERS", ConsumerConfig(
        durable_name="order-processor",
        deliver_subject="process.orders"
    ))
    
    # Subscribe to consumer
    sub = await js.subscribe("orders.*", durable="order-processor")
    
    async for msg in sub.messages:
        print(f"Received: {msg.data}")
        await msg.ack()
        
        if len(msg.data) == 0:
            break
    
    await nc.close()

# NATS Cluster Configuration
# nats-server.conf
port: 4222
http_port: 8222

cluster {
    name: "nats-cluster"
    listen: "0.0.0.0:6222"
    routes: [
        "nats://nats-1:6222"
        "nats://nats-2:6222"
        "nats://nats-3:6222"
    ]
}

jetstream: {
    store_dir: "/data/jetstream"
    max_memory_store: 1GB
    max_file_store: 10GB
}

accounts: {
    APP: {
        jetstream: enabled
        users: [
            {user: "app", password: "secret"}
        ]
    }
}`,
        explanation: "NATS JetStream configuration for persistent messaging with streams and consumers."
      }
    ],
    diagrams: [
      {
        src: "/nats.png",
        alt: "NATS messaging patterns",
        caption: "NATS pub-sub, request-reply, and queue messaging patterns"
      }
    ],
    relatedProtocols: ["amqp", "mqtt", "kafka"],
    commonCommands: [
      {
        command: "nats",
        description: "NATS CLI tool",
        example: "nats pub subject message"
      },
      {
        command: "nats-server",
        description: "NATS server",
        example: "nats-server -c nats.conf"
      }
    ],
    resources: [
      {
        title: "NATS Documentation",
        url: "https://docs.nats.io/",
        type: "Documentation"
      },
      {
        title: "NATS by Example",
        url: "https://natsbyexample.com/",
        type: "Tutorial"
      }
    ],
    securityConsiderations: [
      "Authentication and authorization",
      "TLS encryption",
      "Network segmentation",
      "Subject-based permissions",
      "Account isolation",
      "Audit logging"
    ]
  }