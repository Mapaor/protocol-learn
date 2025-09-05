import { Protocol } from "../../types/protocol";

export const RPC: Protocol = {
    id: "rpc",
    name: "RPC",
    category: "APIs",
    difficulty: "Intermediate",
    shortDescription: "Remote Procedure Call protocol for distributed computing",
    fullDescription: "RPC (Remote Procedure Call) is a protocol that allows a program to execute a procedure (subroutine) in another address space (commonly on another computer on a shared network) without the programmer explicitly coding the details for the remote interaction.",
    port: "111 (portmapper), Variable",
    advantages: [
      "Transparent remote calls",
      "Language agnostic",
      "Automatic serialization",
      "Strong typing",
      "Code generation",
      "Efficient binary protocols"
    ],
    disadvantages: [
      "Network dependency",
      "Latency overhead",
      "Failure complexity",
      "Debugging challenges",
      "Versioning issues",
      "Security concerns"
    ],
    useCases: [
      "Distributed systems",
      "Microservices communication",
      "Client-server applications",
      "Service-oriented architecture",
      "Database replication",
      "Grid computing",
      "Cloud services",
      "Inter-process communication",
      "Network file systems",
      "Distributed databases",
      "API development",
      "Cross-platform integration"
    ],
    examples: [
      {
        title: "Traditional RPC Flow",
        code: `# RPC Call Flow

1. Client Call
   - Client calls local stub procedure
   - Stub marshals parameters
   - Sends request to server

2. Network Transport
   - Request travels over network
   - Server receives request

3. Server Processing  
   - Server stub unmarshals parameters
   - Calls actual procedure
   - Marshals return values

4. Response
   - Response sent back to client
   - Client stub unmarshals results
   - Returns to calling program

# Example RPC Interface Definition (IDL)
program CALCULATOR {
    version CALC_VERS {
        int ADD(int, int) = 1;
        int SUBTRACT(int, int) = 2;
        int MULTIPLY(int, int) = 3;
        float DIVIDE(int, int) = 4;
    } = 1;
} = 0x20000001;

# Generated Client Stub (C)
int* add_1(int *arg1, int *arg2, CLIENT *clnt) {
    static int result;
    if (clnt_call(clnt, ADD, xdr_int, arg1, 
                  xdr_int, arg2, xdr_int, &result,
                  TIMEOUT) != RPC_SUCCESS) {
        return NULL;
    }
    return &result;
}

# Client Usage
CLIENT *clnt = clnt_create("server", CALCULATOR, 
                          CALC_VERS, "tcp");
int a = 5, b = 3;
int *result = add_1(&a, &b, clnt);
printf("Result: %d\\n", *result);`,
        explanation: "Traditional RPC architecture and interface definition."
      },
      {
        title: "JSON-RPC Implementation",
        code: `# JSON-RPC 2.0 Protocol

# Request format
{
  "jsonrpc": "2.0",
  "method": "calculate.add",
  "params": [5, 3],
  "id": 1
}

# Response format
{
  "jsonrpc": "2.0", 
  "result": 8,
  "id": 1
}

# Error response
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32601,
    "message": "Method not found"
  },
  "id": 1
}

# JavaScript JSON-RPC Client
class JSONRPCClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.id = 1;
  }

  async call(method, params = []) {
    const request = {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: this.id++
    };

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return result.result;
  }

  // Notification (no response expected)
  async notify(method, params = []) {
    const request = {
      jsonrpc: "2.0",
      method: method,
      params: params
    };

    await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
  }
}

# Usage
const client = new JSONRPCClient('http://api.example.com/rpc');
const result = await client.call('math.add', [5, 3]);
console.log(result); // 8`,
        explanation: "JSON-RPC 2.0 protocol implementation in JavaScript."
      },
      {
        title: "gRPC Example",
        code: `// Protocol Buffers definition (calculator.proto)
syntax = "proto3";

package calculator;

service Calculator {
  rpc Add(AddRequest) returns (AddResponse);
  rpc Subtract(SubtractRequest) returns (SubtractResponse);
  rpc StreamNumbers(NumberRequest) returns (stream NumberResponse);
}

message AddRequest {
  int32 a = 1;
  int32 b = 2;
}

message AddResponse {
  int32 result = 1;
}

message SubtractRequest {
  int32 a = 1;
  int32 b = 2;
}

message SubtractResponse {
  int32 result = 1;
}

message NumberRequest {
  int32 count = 1;
}

message NumberResponse {
  int32 number = 1;
}

// Go Server Implementation
package main

import (
    "context"
    "net"
    "google.golang.org/grpc"
    pb "path/to/calculator"
)

type server struct {
    pb.UnimplementedCalculatorServer
}

func (s *server) Add(ctx context.Context, req *pb.AddRequest) (*pb.AddResponse, error) {
    result := req.A + req.B
    return &pb.AddResponse{Result: result}, nil
}

func (s *server) StreamNumbers(req *pb.NumberRequest, stream pb.Calculator_StreamNumbersServer) error {
    for i := int32(0); i < req.Count; i++ {
        if err := stream.Send(&pb.NumberResponse{Number: i}); err != nil {
            return err
        }
    }
    return nil
}

func main() {
    lis, _ := net.Listen("tcp", ":50051")
    s := grpc.NewServer()
    pb.RegisterCalculatorServer(s, &server{})
    s.Serve(lis)
}

// Client usage
conn, _ := grpc.Dial("localhost:50051", grpc.WithInsecure())
client := pb.NewCalculatorClient(conn)
response, _ := client.Add(context.Background(), &pb.AddRequest{A: 5, B: 3})
fmt.Printf("Result: %d\\n", response.Result)`,
        explanation: "gRPC implementation with Protocol Buffers and streaming."
      }
    ],
    relatedProtocols: ["grpc", "http", "tcp", "json", "protobuf"],
    resources: [
      {
        title: "RFC 5531 - RPC Protocol Specification",
        url: "https://tools.ietf.org/html/rfc5531",
        type: "RFC"
      },
      {
        title: "JSON-RPC 2.0 Specification",
        url: "https://www.jsonrpc.org/specification",
        type: "Specification"
      }
    ],
    securityConsiderations: [
      "Authentication",
      "Authorization",
      "Input validation",
      "Encryption in transit",
      "Rate limiting",
      "Error information leakage"
    ]
};
