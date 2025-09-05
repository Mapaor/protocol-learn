import { Protocol } from "../../types/protocol";

export const JMS: Protocol = {
    id: "jms",
    name: "JMS",
    category: "Messaging",
    difficulty: "Intermediate",
    shortDescription: "Java Message Service API for enterprise messaging",
    fullDescription: "JMS (Java Message Service) is a Java API that allows applications to create, send, receive, and read messages. It enables distributed communication that is loosely coupled, reliable, and asynchronous. JMS provides a common way for Java programs to create, send, receive and read an enterprise messaging system's messages.",
    port: "Provider-specific (e.g., 61616 for ActiveMQ)",
    versions: ["JMS 1.0", "JMS 1.1", "JMS 2.0", "JMS 3.0"],
    advantages: [
      "Vendor-neutral API",
      "Asynchronous communication",
      "Reliable message delivery",
      "Multiple messaging patterns",
      "Transaction support",
      "Message persistence"
    ],
    disadvantages: [
      "Java platform specific",
      "Complex configuration",
      "Performance overhead",
      "Learning curve for messaging concepts",
      "Vendor lock-in for implementations"
    ],
    useCases: [
      "Enterprise application integration",
      "Microservices communication",
      "Event-driven architectures",
      "Workflow management",
      "Order processing systems",
      "Financial transactions",
      "Real-time notifications",
      "Audit logging",
      "Batch processing coordination",
      "System decoupling",
      "Load balancing",
      "Message buffering"
    ],
    examples: [
      {
        title: "JMS Producer Example",
        code: `import javax.jms.*;
import javax.naming.*;

public class MessageProducer {
    public void sendMessage(String text) throws Exception {
        // JNDI lookup
        Context ctx = new InitialContext();
        ConnectionFactory factory = (ConnectionFactory) 
            ctx.lookup("ConnectionFactory");
        Destination destination = (Destination) 
            ctx.lookup("dynamicQueues/TestQueue");
        
        // Create connection and session
        Connection connection = factory.createConnection();
        Session session = connection.createSession(false, 
            Session.AUTO_ACKNOWLEDGE);
        
        // Create producer and send message
        javax.jms.MessageProducer producer = 
            session.createProducer(destination);
        TextMessage message = session.createTextMessage(text);
        producer.send(message);
        
        // Cleanup
        connection.close();
    }
}`,
        explanation: "JMS message producer example showing connection setup and message sending."
      },
      {
        title: "JMS Consumer with Message Listener",
        code: `import javax.jms.*;

public class MessageConsumer implements MessageListener {
    
    public void setupConsumer() throws Exception {
        Context ctx = new InitialContext();
        ConnectionFactory factory = (ConnectionFactory) 
            ctx.lookup("ConnectionFactory");
        Destination destination = (Destination) 
            ctx.lookup("dynamicQueues/TestQueue");
        
        Connection connection = factory.createConnection();
        Session session = connection.createSession(false, 
            Session.AUTO_ACKNOWLEDGE);
        
        javax.jms.MessageConsumer consumer = 
            session.createConsumer(destination);
        consumer.setMessageListener(this);
        
        connection.start();
    }
    
    @Override
    public void onMessage(Message message) {
        try {
            if (message instanceof TextMessage) {
                TextMessage textMessage = (TextMessage) message;
                System.out.println("Received: " + textMessage.getText());
            }
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}`,
        explanation: "JMS message consumer with asynchronous message listener implementation."
      }
    ],
    relatedProtocols: ["amqp", "mqtt", "stomp"],
    resources: [
      {
        title: "JMS 2.0 Specification",
        url: "https://jcp.org/en/jsr/detail?id=343",
        type: "Specification"
      },
      {
        title: "Apache ActiveMQ Documentation",
        url: "https://activemq.apache.org/components/classic/documentation",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Authentication and authorization",
      "Message encryption",
      "Secure transport (SSL/TLS)",
      "Access control lists",
      "Message signing",
      "Audit logging"
    ]
};
