import { Protocol } from "../../types/protocol";

export const MQTT: Protocol = {
    id: "mqtt",
    name: "MQTT",
    category: "Real Time",
    difficulty: "Intermediate",
    shortDescription: "Message Queuing Telemetry Transport for IoT and lightweight messaging",
    fullDescription: "MQTT (Message Queuing Telemetry Transport) is a lightweight, publish-subscribe, machine to machine network protocol for message queue/message queuing service. It is designed for connections with remote locations that have devices with resource constraints or limited network bandwidth.",
    port: "1883, 8883 (MQTTS)",
    versions: ["MQTT 3.1", "MQTT 3.1.1", "MQTT 5.0"],
    advantages: [
      "Lightweight protocol",
      "Low bandwidth usage",
      "Quality of Service levels",
      "Persistent connections",
      "Last Will and Testament",
      "Retained messages"
    ],
    disadvantages: [
      "No built-in security",
      "Limited message format",
      "Broker dependency",
      "Scalability challenges",
      "No message ordering guarantee"
    ],
    useCases: [
      "IoT device communication",
      "Sensor data collection",
      "Home automation",
      "Industrial monitoring",
      "Mobile applications",
      "Real-time messaging",
      "Telemetry data",
      "Remote monitoring",
      "Smart city applications",
      "Connected vehicles",
      "Healthcare devices",
      "Energy management"
    ],
    examples: [
      {
        title: "MQTT Publish/Subscribe",
        code: `# Publisher
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("broker.hivemq.com", 1883, 60)
client.publish("sensor/temperature", "25.6")

# Subscriber
def on_message(client, userdata, message):
    print(f"Received: {message.payload.decode()}")
    
client = mqtt.Client()
client.on_message = on_message
client.connect("broker.hivemq.com", 1883, 60)
client.subscribe("sensor/temperature")
client.loop_forever()`,
        explanation: "MQTT publisher and subscriber example showing basic message exchange."
      },
      {
        title: "MQTT Quality of Service",
        code: `# QoS 0 - At most once (fire and forget)
client.publish("topic/qos0", "message", qos=0)

# QoS 1 - At least once (acknowledged delivery)
client.publish("topic/qos1", "message", qos=1)

# QoS 2 - Exactly once (assured delivery)
client.publish("topic/qos2", "message", qos=2)

# Retained message
client.publish("status/device1", "online", retain=True)`,
        explanation: "MQTT Quality of Service levels and retained message examples."
      }
    ],
    diagrams: [
      {
        src: "/mqtt.jpg",
        alt: "MQTT architecture",
        caption: "MQTT publish-subscribe architecture with broker and clients"
      }
    ],
    relatedProtocols: ["tcp", "websockets", "tls"],
    resources: [
      {
        title: "MQTT Specification",
        url: "https://mqtt.org/mqtt-specification/",
        type: "Specification"
      },
      {
        title: "Eclipse Mosquitto Broker",
        url: "https://mosquitto.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use MQTTS (TLS encryption)",
      "Authentication mechanisms",
      "Access control lists",
      "Topic-based permissions",
      "Secure broker configuration"
    ]
  }