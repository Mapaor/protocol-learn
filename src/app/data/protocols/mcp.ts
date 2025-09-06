import { Protocol } from "../../types/protocol";

export const MCP: Protocol = {
  id: "mcp",
  name: "MCP",
  category: "AI",
  difficulty: "Intermediate",
  shortDescription: "Model Context Protocol for AI agent communication and tool integration",
  fullDescription: "MCP (Model Context Protocol) is an open standard for connecting AI assistants with external data sources and tools. It enables AI agents to securely access and interact with various services, databases, and APIs while maintaining context and ensuring secure communication between the AI model and external systems.",
  port: "Various (typically WebSocket or HTTP)",
  versions: ["MCP 1.0"],
  advantages: [
    "Standardized AI-tool integration",
    "Secure context sharing",
    "Extensible architecture",
    "Real-time communication",
    "Tool discovery mechanism",
    "Multi-modal support"
  ],
  disadvantages: [
    "Relatively new standard",
    "Limited ecosystem",
    "Implementation complexity",
    "Security considerations",
    "Performance overhead",
    "Requires specialized knowledge"
  ],
  useCases: [
    "AI assistant tool integration",
    "Agentic AI workflows",
    "External API access for LLMs",
    "Database query interfaces",
    "File system operations",
    "Real-time data feeds",
    "Multi-agent coordination",
    "Custom tool development",
    "Enterprise AI integrations",
    "Autonomous agent systems",
    "AI-powered automation",
    "Context-aware applications"
  ],
  examples: [
    {
      title: "MCP Server Implementation",
      code: `# Python MCP Server
import asyncio
import json
from typing import Dict, List, Any
from mcp import McpServer, Tool, Resource

class DatabaseMcpServer(McpServer):
    def __init__(self):
        super().__init__("database-server", "1.0.0")
        self.db_connection = None
    
    async def initialize(self):
        """Initialize the MCP server"""
        # Connect to database
        self.db_connection = await self.connect_database()
        
        # Register tools
        await self.register_tool(
            Tool(
                name="query_database",
                description="Execute SQL queries on the database",
                parameters={
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "SQL query to execute"
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Maximum number of rows to return",
                            "default": 100
                        }
                    },
                    "required": ["query"]
                }
            )
        )
        
        await self.register_tool(
            Tool(
                name="get_table_schema",
                description="Get schema information for a table",
                parameters={
                    "type": "object",
                    "properties": {
                        "table_name": {
                            "type": "string",
                            "description": "Name of the table"
                        }
                    },
                    "required": ["table_name"]
                }
            )
        )
        
        # Register resources
        await self.register_resource(
            Resource(
                uri="database://tables",
                name="Database Tables",
                description="List of all tables in the database",
                mime_type="application/json"
            )
        )
    
    async def handle_tool_call(self, tool_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """Handle tool calls from the AI agent"""
        try:
            if tool_name == "query_database":
                query = parameters["query"]
                limit = parameters.get("limit", 100)
                
                # Validate query (security check)
                if not self.is_safe_query(query):
                    return {
                        "error": "Query contains potentially unsafe operations",
                        "code": "UNSAFE_QUERY"
                    }
                
                # Execute query
                results = await self.execute_query(query, limit)
                return {
                    "results": results,
                    "row_count": len(results)
                }
            
            elif tool_name == "get_table_schema":
                table_name = parameters["table_name"]
                schema = await self.get_schema(table_name)
                return {"schema": schema}
            
            else:
                return {
                    "error": f"Unknown tool: {tool_name}",
                    "code": "UNKNOWN_TOOL"
                }
        
        except Exception as e:
            return {
                "error": str(e),
                "code": "EXECUTION_ERROR"
            }
    
    async def handle_resource_request(self, uri: str) -> Dict[str, Any]:
        """Handle resource requests"""
        if uri == "database://tables":
            tables = await self.list_tables()
            return {
                "content": json.dumps(tables),
                "mime_type": "application/json"
            }
        
        return {
            "error": f"Resource not found: {uri}",
            "code": "RESOURCE_NOT_FOUND"
        }
    
    def is_safe_query(self, query: str) -> bool:
        """Basic SQL injection prevention"""
        unsafe_keywords = ["DROP", "DELETE", "INSERT", "UPDATE", "ALTER", "CREATE"]
        query_upper = query.upper()
        return not any(keyword in query_upper for keyword in unsafe_keywords)
    
    async def execute_query(self, query: str, limit: int) -> List[Dict]:
        """Execute SQL query safely"""
        # Implementation depends on your database
        # This is a placeholder
        return [{"id": 1, "name": "Sample Data"}]

# Start the MCP server
async def main():
    server = DatabaseMcpServer()
    await server.initialize()
    await server.start(host="localhost", port=8765)

if __name__ == "__main__":
    asyncio.run(main())`,
      explanation: "MCP server implementation providing database access tools for AI agents with security controls."
    },
    {
      title: "MCP Client/Agent Integration",
      code: `# Python MCP Client
import asyncio
import json
from mcp import McpClient

class AiAgent:
    def __init__(self):
        self.mcp_client = McpClient()
        self.available_tools = {}
        self.context = []
    
    async def connect_to_mcp_server(self, uri: str):
        """Connect to an MCP server"""
        await self.mcp_client.connect(uri)
        
        # Discover available tools
        tools = await self.mcp_client.list_tools()
        for tool in tools:
            self.available_tools[tool.name] = tool
            print(f"Available tool: {tool.name} - {tool.description}")
    
    async def process_user_request(self, user_input: str):
        """Process user request and determine if tools are needed"""
        
        # Add user input to context
        self.context.append({"role": "user", "content": user_input})
        
        # Analyze if we need to use tools
        if "database" in user_input.lower() or "query" in user_input.lower():
            return await self.handle_database_request(user_input)
        
        # Regular LLM response for non-tool requests
        return await self.generate_response(user_input)
    
    async def handle_database_request(self, request: str):
        """Handle requests that require database access"""
        
        # Extract query intent from natural language
        if "show tables" in request.lower():
            # Get list of tables using MCP resource
            try:
                resource = await self.mcp_client.get_resource("database://tables")
                tables = json.loads(resource.content)
                
                response = f"Available tables: {', '.join(tables)}"
                self.context.append({"role": "assistant", "content": response})
                return response
            
            except Exception as e:
                return f"Error accessing database: {str(e)}"
        
        elif "users" in request.lower():
            # Query users table
            try:
                result = await self.mcp_client.call_tool(
                    "query_database",
                    {
                        "query": "SELECT * FROM users",
                        "limit": 10
                    }
                )
                
                if "error" in result:
                    return f"Database error: {result['error']}"
                
                # Format results for user
                users = result["results"]
                response = f"Found {len(users)} users:\\n"
                for user in users:
                    response += f"- {user.get('name', 'Unknown')} ({user.get('email', 'No email')})\\n"
                
                self.context.append({"role": "assistant", "content": response})
                return response
            
            except Exception as e:
                return f"Error querying database: {str(e)}"
        
        return "I can help you with database queries. Try asking to 'show tables' or 'list users'."
    
    async def generate_response(self, user_input: str):
        """Generate regular LLM response"""
        # This would integrate with your LLM of choice
        response = f"I understand you said: '{user_input}'. How can I help you further?"
        self.context.append({"role": "assistant", "content": response})
        return response

# JavaScript/Node.js MCP Client
const McpClient = require('@modelcontextprotocol/client');

class WebAiAgent {
    constructor() {
        this.mcpClient = new McpClient();
        this.tools = new Map();
    }
    
    async initialize() {
        // Connect to MCP server via WebSocket
        await this.mcpClient.connect('ws://localhost:8765');
        
        // Discover tools
        const tools = await this.mcpClient.listTools();
        tools.forEach(tool => {
            this.tools.set(tool.name, tool);
            console.log(\`Tool available: \${tool.name}\`);
        });
    }
    
    async handleUserMessage(message) {
        try {
            // Determine if we need to use tools
            if (this.needsFileAccess(message)) {
                return await this.handleFileOperation(message);
            }
            
            if (this.needsWebSearch(message)) {
                return await this.handleWebSearch(message);
            }
            
            // Default response
            return this.generateResponse(message);
        } catch (error) {
            return \`Error: \${error.message}\`;
        }
    }
    
    async handleFileOperation(message) {
        if (message.includes('read file')) {
            const filename = this.extractFilename(message);
            
            const result = await this.mcpClient.callTool('read_file', {
                path: filename
            });
            
            if (result.error) {
                return \`Cannot read file: \${result.error}\`;
            }
            
            return \`File content:\\n\${result.content}\`;
        }
        
        return "I can help you read files. Please specify a filename.";
    }
    
    needsFileAccess(message) {
        return message.includes('file') || message.includes('read');
    }
    
    needsWebSearch(message) {
        return message.includes('search') || message.includes('web');
    }
    
    extractFilename(message) {
        // Simple extraction - in practice, use NLP
        const match = message.match(/read file ([^\\s]+)/);
        return match ? match[1] : 'unknown.txt';
    }
}

// Usage
const agent = new WebAiAgent();
agent.initialize().then(() => {
    console.log('AI Agent with MCP ready!');
});`,
      explanation: "MCP client implementation showing how AI agents can discover and use tools through the protocol."
    },
    {
      title: "MCP Tool Definitions and Schema",
      code: `# MCP Tool Schema Definition
{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "result": {
    "tools": [
      {
        "name": "file_operations",
        "description": "Read, write, and manipulate files",
        "parameters": {
          "type": "object",
          "properties": {
            "operation": {
              "type": "string",
              "enum": ["read", "write", "delete", "list"],
              "description": "File operation to perform"
            },
            "path": {
              "type": "string",
              "description": "File or directory path"
            },
            "content": {
              "type": "string",
              "description": "Content to write (for write operations)"
            }
          },
          "required": ["operation", "path"]
        }
      },
      {
        "name": "web_search",
        "description": "Search the web for information",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Search query"
            },
            "num_results": {
              "type": "integer",
              "minimum": 1,
              "maximum": 20,
              "default": 5,
              "description": "Number of results to return"
            },
            "filter": {
              "type": "string",
              "enum": ["news", "images", "videos", "all"],
              "default": "all",
              "description": "Type of content to search for"
            }
          },
          "required": ["query"]
        }
      },
      {
        "name": "calculator",
        "description": "Perform mathematical calculations",
        "parameters": {
          "type": "object",
          "properties": {
            "expression": {
              "type": "string",
              "description": "Mathematical expression to evaluate"
            },
            "precision": {
              "type": "integer",
              "minimum": 1,
              "maximum": 15,
              "default": 10,
              "description": "Decimal precision for results"
            }
          },
          "required": ["expression"]
        }
      }
    ]
  }
}

# MCP Resource Schema
{
  "jsonrpc": "2.0",
  "method": "resources/list",
  "result": {
    "resources": [
      {
        "uri": "file:///home/user/documents",
        "name": "User Documents",
        "description": "Access to user's document folder",
        "mime_type": "inode/directory"
      },
      {
        "uri": "database://users",
        "name": "User Database",
        "description": "User management database",
        "mime_type": "application/json"
      },
      {
        "uri": "api://weather/current",
        "name": "Current Weather",
        "description": "Real-time weather information",
        "mime_type": "application/json"
      }
    ]
  }
}

# MCP Message Protocol Examples
# Tool Call Request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "web_search",
    "arguments": {
      "query": "latest AI developments",
      "num_results": 3,
      "filter": "news"
    }
  }
}

# Tool Call Response
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 3 recent articles about AI developments"
      },
      {
        "type": "text",
        "text": "1. OpenAI releases new language model..."
      }
    ],
    "is_error": false
  }
}

# Resource Access Request
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "resources/read",
  "params": {
    "uri": "file:///home/user/config.json"
  }
}

# Error Response
{
  "jsonrpc": "2.0",
  "id": 2,
  "error": {
    "code": -32000,
    "message": "Permission denied",
    "data": {
      "type": "PERMISSION_DENIED",
      "details": "Access to file requires elevated permissions"
    }
  }
}`,
      explanation: "MCP protocol schemas and message formats for tool definitions, resource access, and communication."
    },
    {
      title: "MCP Security and Authentication",
      code: `# MCP Authentication Configuration
import jwt
import time
from typing import Optional

class McpAuthenticator:
    def __init__(self, secret_key: str):
        self.secret_key = secret_key
        self.authorized_clients = set()
    
    def generate_token(self, client_id: str, permissions: list) -> str:
        """Generate JWT token for MCP client"""
        payload = {
            "client_id": client_id,
            "permissions": permissions,
            "issued_at": time.time(),
            "expires_at": time.time() + 3600,  # 1 hour
            "issuer": "mcp-server"
        }
        
        return jwt.encode(payload, self.secret_key, algorithm="HS256")
    
    def verify_token(self, token: str) -> Optional[dict]:
        """Verify and decode JWT token"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            
            # Check expiration
            if time.time() > payload.get("expires_at", 0):
                return None
            
            return payload
        except jwt.InvalidTokenError:
            return None
    
    def check_permission(self, token_payload: dict, required_permission: str) -> bool:
        """Check if client has required permission"""
        permissions = token_payload.get("permissions", [])
        return required_permission in permissions or "admin" in permissions

class SecureMcpServer(McpServer):
    def __init__(self, secret_key: str):
        super().__init__("secure-server", "1.0.0")
        self.authenticator = McpAuthenticator(secret_key)
        self.rate_limiter = {}
    
    async def authenticate_client(self, headers: dict) -> Optional[dict]:
        """Authenticate client from headers"""
        auth_header = headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return None
        
        token = auth_header[7:]  # Remove "Bearer " prefix
        return self.authenticator.verify_token(token)
    
    async def check_rate_limit(self, client_id: str) -> bool:
        """Simple rate limiting"""
        now = time.time()
        client_data = self.rate_limiter.get(client_id, {"count": 0, "window_start": now})
        
        # Reset window if needed (60 second window)
        if now - client_data["window_start"] > 60:
            client_data = {"count": 0, "window_start": now}
        
        # Check limit (100 requests per minute)
        if client_data["count"] >= 100:
            return False
        
        client_data["count"] += 1
        self.rate_limiter[client_id] = client_data
        return True
    
    async def handle_tool_call(self, tool_name: str, parameters: dict, 
                             client_context: dict) -> dict:
        """Secured tool call handler"""
        
        # Check authentication
        auth_payload = client_context.get("auth")
        if not auth_payload:
            return {"error": "Authentication required", "code": "AUTH_REQUIRED"}
        
        # Check rate limit
        client_id = auth_payload["client_id"]
        if not await self.check_rate_limit(client_id):
            return {"error": "Rate limit exceeded", "code": "RATE_LIMITED"}
        
        # Check permissions for specific tools
        required_permissions = {
            "query_database": "database_read",
            "execute_command": "system_admin",
            "read_file": "file_read",
            "write_file": "file_write"
        }
        
        required_perm = required_permissions.get(tool_name, "basic")
        if not self.authenticator.check_permission(auth_payload, required_perm):
            return {"error": "Insufficient permissions", "code": "PERMISSION_DENIED"}
        
        # Log the action
        await self.log_action(client_id, tool_name, parameters)
        
        # Execute the tool
        return await super().handle_tool_call(tool_name, parameters)
    
    async def log_action(self, client_id: str, action: str, parameters: dict):
        """Log client actions for audit"""
        log_entry = {
            "timestamp": time.time(),
            "client_id": client_id,
            "action": action,
            "parameters": parameters
        }
        # In practice, write to secure log storage
        print(f"AUDIT: {log_entry}")

# Client-side authentication
class AuthenticatedMcpClient(McpClient):
    def __init__(self, token: str):
        super().__init__()
        self.token = token
    
    async def connect(self, uri: str):
        """Connect with authentication headers"""
        headers = {
            "Authorization": f"Bearer {self.token}",
            "User-Agent": "MCP-Client/1.0"
        }
        
        await super().connect(uri, headers=headers)
    
    async def secure_tool_call(self, tool_name: str, parameters: dict):
        """Make authenticated tool call"""
        try:
            result = await self.call_tool(tool_name, parameters)
            
            if isinstance(result, dict) and result.get("code") == "AUTH_REQUIRED":
                raise AuthenticationError("Authentication token expired or invalid")
            
            return result
        except Exception as e:
            # Handle authentication errors
            if "AUTH" in str(e):
                await self.refresh_authentication()
                return await self.call_tool(tool_name, parameters)
            raise

class AuthenticationError(Exception):
    pass`,
      explanation: "MCP security implementation with JWT authentication, permission checking, rate limiting, and audit logging."
    }
  ],
  diagrams: [
    {
      src: "/mcp-architecture.png",
      alt: "MCP architecture diagram",
      caption: "Model Context Protocol architecture showing AI agents, MCP servers, and tool integrations"
    },
    {
      src: "/mcp-flow.jpg",
      alt: "MCP communication flow",
      caption: "MCP communication flow between AI agent, MCP client, and external tools"
    }
  ],
  relatedProtocols: ["websocket", "jsonrpc", "http", "grpc"],
  commonCommands: [
    {
      command: "mcp",
      description: "MCP CLI tool",
      example: "mcp list-servers"
    },
    {
      command: "mcp-server",
      description: "Start MCP server",
      example: "mcp-server --config config.json"
    }
  ],
  resources: [
    {
      title: "MCP Specification",
      url: "https://spec.modelcontextprotocol.io/",
      type: "Specification"
    },
    {
      title: "MCP GitHub Repository",
      url: "https://github.com/modelcontextprotocol/servers",
      type: "Repository"
    },
    {
      title: "MCP Python SDK",
      url: "https://pypi.org/project/mcp/",
      type: "Library"
    }
  ],
  securityConsiderations: [
    "Implement proper authentication",
    "Validate all tool parameters",
    "Rate limit client requests",
    "Audit tool usage",
    "Secure credential storage",
    "Sandbox tool execution"
  ],
  modernAlternatives: [
    "OpenAI Function Calling",
    "LangChain Tools",
    "AutoGPT Plugin System"
  ]
};