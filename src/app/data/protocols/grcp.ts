import { Protocol } from "../../types/protocol";

export const GRCP: Protocol = {
    id: "grpc",
    name: "gRPC",
    category: "APIs",
    difficulty: "Advanced",
    shortDescription: "High-performance RPC framework using Protocol Buffers",
    fullDescription: "gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It efficiently connects services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication.",
    port: "Various (typically 443 for gRPC-Web)",
    versions: ["gRPC 1.x"],
    advantages: [
      "High performance and efficiency",
      "Strong typing with Protocol Buffers",
      "Streaming support",
      "Multiple language support",
      "Built-in authentication",
      "HTTP/2 based"
    ],
    disadvantages: [
      "Limited browser support",
      "Learning curve",
      "Binary protocol",
      "Debugging complexity",
      "Network firewall issues",
      "Tooling ecosystem maturity"
    ],
    useCases: [
      "Microservices communication",
      "High-performance APIs",
      "Real-time streaming",
      "Mobile applications",
      "IoT communications",
      "Distributed systems",
      "Service mesh architectures",
      "Cloud-native applications",
      "Gaming backends",
      "Financial trading systems",
      "Machine learning pipelines",
      "Enterprise integrations"
    ],
    examples: [
      {
        title: "Protocol Buffer Definition",
        code: `// user.proto
syntax = "proto3";

package user;

// User service definition
service UserService {
  // Unary RPC
  rpc GetUser(GetUserRequest) returns (User);
  
  // Server streaming RPC
  rpc ListUsers(ListUsersRequest) returns (stream User);
  
  // Client streaming RPC
  rpc CreateUsers(stream CreateUserRequest) returns (CreateUsersResponse);
  
  // Bidirectional streaming RPC
  rpc ChatWithUsers(stream ChatMessage) returns (stream ChatMessage);
}

// Message definitions
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4;
  google.protobuf.Timestamp created_at = 5;
}

message GetUserRequest {
  int32 user_id = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
  string filter = 3;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
  repeated string roles = 3;
}

message CreateUsersResponse {
  repeated User users = 1;
  int32 total_created = 2;
}

message ChatMessage {
  int32 user_id = 1;
  string message = 2;
  google.protobuf.Timestamp timestamp = 3;
}

// Import common types
import "google/protobuf/timestamp.proto";`,
        explanation: "Protocol Buffer definition file showing service methods and message types for gRPC."
      },
      {
        title: "gRPC Server Implementation",
        code: `# Python gRPC Server
import grpc
from concurrent import futures
import user_pb2
import user_pb2_grpc
import time

class UserServiceServicer(user_pb2_grpc.UserServiceServicer):
    def __init__(self):
        self.users = {
            1: user_pb2.User(id=1, name="John Doe", email="john@example.com", roles=["admin"]),
            2: user_pb2.User(id=2, name="Jane Smith", email="jane@example.com", roles=["user"])
        }
    
    def GetUser(self, request, context):
        user_id = request.user_id
        if user_id in self.users:
            return self.users[user_id]
        else:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f"User {user_id} not found")
            return user_pb2.User()
    
    def ListUsers(self, request, context):
        # Server streaming - yield users one by one
        for user in self.users.values():
            yield user
            time.sleep(1)  # Simulate processing delay
    
    def CreateUsers(self, request_iterator, context):
        # Client streaming - receive multiple users
        created_users = []
        for request in request_iterator:
            new_id = max(self.users.keys()) + 1 if self.users else 1
            user = user_pb2.User(
                id=new_id,
                name=request.name,
                email=request.email,
                roles=request.roles
            )
            self.users[new_id] = user
            created_users.append(user)
        
        return user_pb2.CreateUsersResponse(
            users=created_users,
            total_created=len(created_users)
        )
    
    def ChatWithUsers(self, request_iterator, context):
        # Bidirectional streaming
        for message in request_iterator:
            # Echo message back with timestamp
            response = user_pb2.ChatMessage(
                user_id=message.user_id,
                message=f"Echo: {message.message}",
                timestamp=message.timestamp
            )
            yield response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserServiceServicer(), server)
    
    # Enable server reflection for debugging
    from grpc_reflection.v1alpha import reflection
    SERVICE_NAMES = (
        user_pb2.DESCRIPTOR.services_by_name['UserService'].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)
    
    listen_addr = '[::]:50051'
    server.add_insecure_port(listen_addr)
    server.start()
    print(f"Server started on {listen_addr}")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()`,
        explanation: "Python gRPC server implementation with unary, streaming, and bidirectional methods."
      },
      {
        title: "gRPC Client Implementation",
        code: `# Python gRPC Client
import grpc
import user_pb2
import user_pb2_grpc
import time

def run_client():
    # Create channel and stub
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = user_pb2_grpc.UserServiceStub(channel)
        
        # Unary call
        try:
            user = stub.GetUser(user_pb2.GetUserRequest(user_id=1))
            print(f"Got user: {user.name} ({user.email})")
        except grpc.RpcError as e:
            print(f"Error: {e.code()} - {e.details()}")
        
        # Server streaming
        print("\\nListing users (server streaming):")
        for user in stub.ListUsers(user_pb2.ListUsersRequest()):
            print(f"User: {user.name}")
        
        # Client streaming
        def generate_users():
            users_to_create = [
                {"name": "Alice Brown", "email": "alice@example.com", "roles": ["user"]},
                {"name": "Bob Wilson", "email": "bob@example.com", "roles": ["moderator"]}
            ]
            for user_data in users_to_create:
                yield user_pb2.CreateUserRequest(**user_data)
        
        response = stub.CreateUsers(generate_users())
        print(f"\\nCreated {response.total_created} users")
        
        # Bidirectional streaming
        def generate_messages():
            messages = ["Hello", "How are you?", "Goodbye"]
            for msg in messages:
                yield user_pb2.ChatMessage(user_id=1, message=msg)
                time.sleep(1)
        
        print("\\nChat (bidirectional streaming):")
        for response in stub.ChatWithUsers(generate_messages()):
            print(f"Server: {response.message}")

# Go gRPC Client Example
package main

import (
    "context"
    "io"
    "log"
    "time"
    "google.golang.org/grpc"
    pb "path/to/user"
)

func main() {
    conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
    if err != nil {
        log.Fatalf("Failed to connect: %v", err)
    }
    defer conn.Close()
    
    client := pb.NewUserServiceClient(conn)
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    defer cancel()
    
    // Unary call
    user, err := client.GetUser(ctx, &pb.GetUserRequest{UserId: 1})
    if err != nil {
        log.Fatalf("GetUser failed: %v", err)
    }
    log.Printf("User: %s (%s)", user.Name, user.Email)
    
    // Server streaming
    stream, err := client.ListUsers(ctx, &pb.ListUsersRequest{})
    if err != nil {
        log.Fatalf("ListUsers failed: %v", err)
    }
    
    for {
        user, err := stream.Recv()
        if err == io.EOF {
            break
        }
        if err != nil {
            log.Fatalf("Stream error: %v", err)
        }
        log.Printf("Streamed user: %s", user.Name)
    }
}`,
        explanation: "gRPC client implementations in Python and Go showing different RPC call types."
      },
      {
        title: "gRPC-Web Configuration",
        code: `// JavaScript gRPC-Web Client
const {UserServiceClient} = require('./user_grpc_web_pb.js');
const {GetUserRequest} = require('./user_pb.js');

const client = new UserServiceClient('http://localhost:8080');

// Unary call
const request = new GetUserRequest();
request.setUserId(1);

client.getUser(request, {}, (err, response) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('User:', response.getName(), response.getEmail());
  }
});

// Envoy proxy configuration for gRPC-Web
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 8080 }
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match: { prefix: "/" }
                route: { cluster: grpc_service }
              cors:
                allow_origin_string_match:
                - prefix: "*"
                allow_methods: GET, PUT, DELETE, POST, OPTIONS
                allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                max_age: "1728000"
                expose_headers: custom-header-1,grpc-status,grpc-message
          http_filters:
          - name: envoy.filters.http.grpc_web
          - name: envoy.filters.http.cors
          - name: envoy.filters.http.router
  clusters:
  - name: grpc_service
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    load_assignment:
      cluster_name: grpc_service
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_value: 50051`,
        explanation: "gRPC-Web client setup and Envoy proxy configuration for browser support."
      }
    ],
    diagrams: [
      {
        src: "/grpc-architecture.png",
        alt: "gRPC architecture",
        caption: "gRPC architecture with Protocol Buffers and HTTP/2"
      },
      {
        src: "/grpc-streaming.jpg",
        alt: "gRPC streaming patterns",
        caption: "Different gRPC streaming patterns: unary, server, client, and bidirectional"
      }
    ],
    relatedProtocols: ["http2", "protobuf", "tls"],
    commonCommands: [
      {
        command: "protoc",
        description: "Generate code from proto files",
        example: "protoc --go_out=. --go-grpc_out=. user.proto"
      },
      {
        command: "grpcurl",
        description: "Command-line gRPC client",
        example: "grpcurl -plaintext localhost:50051 list"
      },
      {
        command: "evans",
        description: "Interactive gRPC client",
        example: "evans --host localhost --port 50051"
      }
    ],
    resources: [
      {
        title: "gRPC Official Documentation",
        url: "https://grpc.io/docs/",
        type: "Documentation"
      },
      {
        title: "Protocol Buffers Guide",
        url: "https://developers.google.com/protocol-buffers",
        type: "Documentation"
      },
      {
        title: "gRPC-Go Tutorial",
        url: "https://grpc.io/docs/languages/go/quickstart/",
        type: "Tutorial"
      }
    ],
    securityConsiderations: [
      "Use TLS for production",
      "Implement proper authentication",
      "Validate all input messages",
      "Rate limiting recommended",
      "Monitor for DoS attacks",
      "Secure metadata handling"
    ],
    modernAlternatives: [
      "GraphQL for flexible queries",
      "REST with HTTP/2 for simplicity",
      "WebSockets for real-time communication"
    ]
}