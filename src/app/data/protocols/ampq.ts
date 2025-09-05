import { Protocol } from "../../types/protocol";

export const AMQP: Protocol = {
    id: "amqp",
    name: "AMQP",
    category: "Messaging",
    difficulty: "Advanced",
    shortDescription: "Advanced Message Queuing Protocol for reliable messaging",
    fullDescription: "AMQP (Advanced Message Queuing Protocol) is an open standard application layer protocol for message-oriented middleware. It provides reliable messaging with features like message persistence, routing, security, and delivery guarantees across different platforms and vendors.",
    port: "5672 (AMQP), 5671 (AMQPS)",
    versions: ["AMQP 0.9.1", "AMQP 1.0"],
    advantages: [
      "Reliable message delivery",
      "Message persistence",
      "Flexible routing",
      "Transaction support",
      "Vendor neutrality",
      "Rich feature set"
    ],
    disadvantages: [
      "Complex protocol",
      "Higher overhead",
      "Steep learning curve",
      "Resource intensive",
      "Configuration complexity",
      "Performance vs features tradeoff"
    ],
    useCases: [
      "Enterprise messaging",
      "Financial systems",
      "E-commerce platforms",
      "Workflow orchestration",
      "Event-driven architectures",
      "System integration",
      "Audit trails",
      "Task queues",
      "Notification systems",
      "Data pipeline coordination",
      "Healthcare systems",
      "Government applications"
    ],
    examples: [
      {
        title: "RabbitMQ AMQP Producer/Consumer",
        code: `# Python AMQP Producer (pika library)
import pika
import json

# Establish connection
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare exchange and queue
channel.exchange_declare(exchange='orders', exchange_type='topic', durable=True)
channel.queue_declare(queue='order_processing', durable=True)
channel.queue_bind(exchange='orders', queue='order_processing', routing_key='order.created')

# Publish message
message = {
    "order_id": "12345",
    "customer_id": "67890",
    "items": [{"sku": "ABC123", "quantity": 2}],
    "total": 99.99
}

channel.basic_publish(
    exchange='orders',
    routing_key='order.created',
    body=json.dumps(message),
    properties=pika.BasicProperties(
        delivery_mode=2,  # Make message persistent
        content_type='application/json'
    )
)

print("Message published")
connection.close()

# Python AMQP Consumer
def process_order(ch, method, properties, body):
    try:
        order = json.loads(body)
        print(f"Processing order: {order['order_id']}")
        
        # Process the order
        # ... business logic here ...
        
        # Acknowledge message
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print(f"Order {order['order_id']} processed successfully")
        
    except Exception as e:
        print(f"Error processing order: {e}")
        # Reject and requeue message
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

# Setup consumer
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.basic_qos(prefetch_count=1)  # Process one message at a time
channel.basic_consume(queue='order_processing', on_message_callback=process_order)

print("Waiting for messages. To exit press CTRL+C")
channel.start_consuming()`,
        explanation: "AMQP producer and consumer example using RabbitMQ with message persistence and acknowledgments."
      },
      {
        title: "AMQP Exchange Types and Routing",
        code: `# Direct Exchange - Exact routing key match
channel.exchange_declare(exchange='direct_logs', exchange_type='direct')
channel.basic_publish(exchange='direct_logs', routing_key='error', body='Error message')
channel.basic_publish(exchange='direct_logs', routing_key='info', body='Info message')

# Topic Exchange - Pattern matching
channel.exchange_declare(exchange='topic_logs', exchange_type='topic')
channel.basic_publish(exchange='topic_logs', routing_key='user.signup.email', body='User signed up')
channel.basic_publish(exchange='topic_logs', routing_key='user.login.web', body='User logged in')

# Queue binding with patterns
channel.queue_bind(exchange='topic_logs', queue='email_queue', routing_key='*.*.email')
channel.queue_bind(exchange='topic_logs', queue='user_queue', routing_key='user.*')

# Fanout Exchange - Broadcast to all queues
channel.exchange_declare(exchange='broadcast', exchange_type='fanout')
channel.basic_publish(exchange='broadcast', routing_key='', body='Broadcast message')

# Headers Exchange - Route based on headers
channel.exchange_declare(exchange='headers_exchange', exchange_type='headers')
channel.basic_publish(
    exchange='headers_exchange',
    routing_key='',
    body='Header-based message',
    properties=pika.BasicProperties(headers={'type': 'notification', 'priority': 'high'})
)

# Complex routing example
# Route high priority orders to fast processing queue
channel.queue_bind(
    exchange='orders',
    queue='fast_processing',
    routing_key='order.*',
    arguments={'x-match': 'all', 'priority': 'high', 'type': 'order'}
)`,
        explanation: "Different AMQP exchange types and routing patterns for flexible message distribution."
      },
      {
        title: "AMQP Transactions and Dead Letter Queues",
        code: `# AMQP Transactions
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Start transaction
channel.tx_select()

try:
    # Publish messages within transaction
    channel.basic_publish(exchange='', queue='queue1', body='Message 1')
    channel.basic_publish(exchange='', queue='queue2', body='Message 2')
    
    # Commit transaction
    channel.tx_commit()
    print("Transaction committed")
    
except Exception as e:
    # Rollback transaction
    channel.tx_rollback()
    print(f"Transaction rolled back: {e}")

# Dead Letter Queue Configuration
channel.queue_declare(
    queue='main_queue',
    durable=True,
    arguments={
        'x-message-ttl': 60000,  # 60 seconds TTL
        'x-dead-letter-exchange': 'dlx',
        'x-dead-letter-routing-key': 'failed'
    }
)

# Dead letter exchange and queue
channel.exchange_declare(exchange='dlx', exchange_type='direct')
channel.queue_declare(queue='dead_letter_queue', durable=True)
channel.queue_bind(exchange='dlx', queue='dead_letter_queue', routing_key='failed')

# Consumer with retry logic
def process_with_retry(ch, method, properties, body):
    retry_count = 0
    if hasattr(properties, 'headers') and properties.headers:
        retry_count = properties.headers.get('x-retry-count', 0)
    
    try:
        # Process message
        process_message(body)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        if retry_count < 3:
            # Republish with retry count
            ch.basic_publish(
                exchange='',
                routing_key='main_queue',
                body=body,
                properties=pika.BasicProperties(headers={'x-retry-count': retry_count + 1})
            )
            ch.basic_ack(delivery_tag=method.delivery_tag)
        else:
            # Max retries reached, let it go to DLQ
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

connection.close()`,
        explanation: "AMQP transactions and dead letter queue configuration for reliable message processing."
      }
    ],
    diagrams: [
      {
        src: "/amqp.png",
        alt: "AMQP architecture",
        caption: "AMQP messaging architecture with exchanges, queues, and routing"
      }
    ],
    relatedProtocols: ["mqtt", "nats", "jms"],
    commonCommands: [
      {
        command: "rabbitmqctl",
        description: "RabbitMQ management",
        example: "rabbitmqctl list_queues"
      },
      {
        command: "rabbitmq-plugins",
        description: "Plugin management",
        example: "rabbitmq-plugins enable rabbitmq_management"
      }
    ],
    resources: [
      {
        title: "AMQP 0.9.1 Specification",
        url: "https://www.rabbitmq.com/resources/specs/amqp0-9-1.pdf",
        type: "Specification"
      },
      {
        title: "RabbitMQ Tutorials",
        url: "https://www.rabbitmq.com/getstarted.html",
        type: "Tutorial"
      }
    ],
    securityConsiderations: [
      "Authentication and authorization",
      "TLS encryption",
      "Virtual host isolation",
      "Access control policies",
      "Message encryption",
      "Audit logging"
    ]
  }