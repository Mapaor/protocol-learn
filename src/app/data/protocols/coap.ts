import { Protocol } from "../../types/protocol";

export const COAP: Protocol = {
    id: "coap",
    name: "CoAP",
    category: "APIs",
    difficulty: "Intermediate",
    shortDescription: "Constrained Application Protocol for IoT and machine-to-machine communication",
    fullDescription: "CoAP (Constrained Application Protocol) is a specialized web transfer protocol for use with constrained nodes and constrained networks in the Internet of Things (IoT). It's designed to easily translate to HTTP for simplified integration with the web while meeting specialized requirements such as multicast support, very low overhead, and simplicity.",
    port: "5683 (UDP), 5684 (DTLS)",
    versions: ["CoAP-03", "CoAP-18", "RFC 7252"],
    advantages: [
      "Low overhead protocol",
      "UDP-based for efficiency",
      "RESTful architecture",
      "Multicast support",
      "Built-in discovery",
      "Observe pattern support",
      "DTLS security",
      "Web integration"
    ],
    disadvantages: [
      "Limited reliability (UDP)",
      "Constrained message size",
      "Limited caching",
      "Simple congestion control",
      "Battery impact",
      "Security complexity",
      "Limited debugging tools",
      "Network dependency"
    ],
    useCases: [
      "IoT device communication",
      "Smart home automation",
      "Industrial IoT",
      "Sensor networks",
      "Environmental monitoring",
      "Smart city infrastructure",
      "Wearable devices",
      "Automotive systems",
      "Energy management",
      "Healthcare devices",
      "Agricultural monitoring",
      "Asset tracking"
    ],
    examples: [
      {
        title: "CoAP Message Format",
        code: `# CoAP Message Structure
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Ver| T |  TKL  |      Code     |          Message ID           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Token (if any, TKL bytes) ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Options (if any) ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|1 1 1 1 1 1 1 1|    Payload (if any) ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# CoAP Methods
GET    - Retrieve resource
POST   - Create/Update resource
PUT    - Create/Replace resource
DELETE - Remove resource

# CoAP Response Codes
2.01 Created
2.02 Deleted
2.03 Valid
2.04 Changed
2.05 Content
4.00 Bad Request
4.04 Not Found
5.00 Internal Server Error`,
        explanation: "CoAP message structure and basic protocol elements."
      },
      {
        title: "CoAP Server (Python)",
        code: `#!/usr/bin/env python3
import asyncio
from aiocoap import *

class TemperatureResource(resource.Resource):
    def __init__(self):
        super().__init__()
        self.temperature = 22.5
        self.observers = set()

    async def render_get(self, request):
        payload = f'{{"temperature": {self.temperature}, "unit": "C"}}'
        return Message(payload=payload.encode('utf-8'),
                      content_format=0)  # text/plain

    async def render_post(self, request):
        try:
            payload = request.payload.decode('utf-8')
            data = json.loads(payload)
            self.temperature = data.get('temperature', self.temperature)
            
            # Notify observers
            self.updated_state()
            
            return Message(code=CHANGED,
                          payload=b'Temperature updated')
        except Exception as e:
            return Message(code=BAD_REQUEST,
                          payload=str(e).encode('utf-8'))

    async def render_observe(self, request):
        # Support for CoAP Observe pattern
        self.observers.add(request)
        payload = f'{{"temperature": {self.temperature}, "unit": "C"}}'
        return Message(payload=payload.encode('utf-8'),
                      content_format=0)

class CoAPServer:
    def __init__(self):
        self.root = resource.Site()
        self.root.add_resource(['temperature'], TemperatureResource())
        
    async def start(self):
        context = await Context.create_server_context(self.root, 
                                                     bind=('localhost', 5683))
        print("CoAP server running on localhost:5683")
        await asyncio.get_event_loop().create_future()  # run forever

# Run server
if __name__ == "__main__":
    server = CoAPServer()
    asyncio.run(server.start())`,
        explanation: "Python CoAP server implementation with temperature resource."
      },
      {
        title: "CoAP Client Examples",
        code: `#!/usr/bin/env python3
import asyncio
from aiocoap import *

class CoAPClient:
    def __init__(self):
        self.context = None
    
    async def connect(self):
        self.context = await Context.create_client_context()
    
    async def get_resource(self, uri):
        request = Message(code=GET, uri=uri)
        response = await self.context.request(request).response
        return response.payload.decode('utf-8')
    
    async def post_resource(self, uri, payload):
        request = Message(code=POST, uri=uri, payload=payload.encode('utf-8'))
        response = await self.context.request(request).response
        return response.code
    
    async def observe_resource(self, uri, callback):
        request = Message(code=GET, uri=uri, observe=0)
        observation = self.context.request(request)
        
        async for response in observation.observation:
            await callback(response.payload.decode('utf-8'))

# Usage examples
async def main():
    client = CoAPClient()
    await client.connect()
    
    # GET request
    temp_data = await client.get_resource('coap://localhost/temperature')
    print(f"Temperature: {temp_data}")
    
    # POST request
    new_temp = '{"temperature": 25.0}'
    result = await client.post_resource('coap://localhost/temperature', new_temp)
    print(f"Update result: {result}")
    
    # Observe pattern
    async def temp_callback(data):
        print(f"Temperature update: {data}")
    
    await client.observe_resource('coap://localhost/temperature', temp_callback)

# Command line client
# coap-client -m get coap://localhost/temperature
# coap-client -m post coap://localhost/temperature -e '{"temperature": 24.0}'`,
        explanation: "CoAP client implementation with GET, POST, and Observe patterns."
      }
    ],
    diagrams: [
      {
        src: "/coap_architecture.png",
        alt: "CoAP architecture",
        caption: "CoAP protocol stack and IoT communication architecture"
      },
      {
        src: "/coap_observe.jpg",
        alt: "CoAP observe pattern",
        caption: "CoAP observe pattern for real-time updates"
      }
    ],
    relatedProtocols: ["udp", "dtls", "http", "mqtt"],
    resources: [
      {
        title: "RFC 7252 - CoAP Protocol",
        url: "https://tools.ietf.org/html/rfc7252",
        type: "RFC"
      },
      {
        title: "CoAP.technology",
        url: "https://coap.technology/",
        type: "Documentation"
      },
      {
        title: "libcoap Library",
        url: "https://libcoap.net/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "DTLS encryption",
      "Certificate management",
      "Access control",
      "Message authentication",
      "Replay protection",
      "Key management",
      "Secure bootstrapping",
      "Network security"
    ]
  }