import { Protocol } from "../../types/protocol";

export const SPNEGO: Protocol = {
    id: "spnego",
    name: "SPNEGO",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Simple and Protected GSSAPI Negotiation Mechanism for authentication protocol selection",
    fullDescription: "SPNEGO (Simple and Protected GSSAPI Negotiation Mechanism) is a security protocol that allows clients and servers to negotiate which authentication mechanism to use. It's commonly used in web browsers and web servers to automatically select between multiple authentication protocols like Kerberos and NTLM.",
    port: "Various (depends on underlying protocol)",
    versions: ["SPNEGO v1", "SPNEGO v2"],
    advantages: [
      "Automatic protocol negotiation",
      "Multiple authentication support",
      "Single sign-on capability",
      "Cross-platform compatibility",
      "Transparent to applications",
      "Fallback mechanism support",
      "Standards-based approach",
      "Enterprise integration"
    ],
    disadvantages: [
      "Complex implementation",
      "Protocol overhead",
      "Dependency on underlying mechanisms",
      "Limited browser support variations",
      "Configuration complexity",
      "Debugging difficulties",
      "Security depends on chosen mechanism",
      "Compatibility issues"
    ],
    useCases: [
      "Web-based authentication",
      "Enterprise SSO systems",
      "Active Directory integration",
      "Cross-domain authentication",
      "API authentication",
      "Service-to-service auth",
      "Mobile application security",
      "Cloud service integration",
      "Federated identity systems",
      "Legacy system integration",
      "Multi-protocol environments",
      "Browser-based applications"
    ],
    examples: [
      {
        title: "SPNEGO Negotiation Flow",
        code: `# 1. Initial Request
Client -> Server: HTTP Request
Server -> Client: 401 Unauthorized
WWW-Authenticate: Negotiate

# 2. SPNEGO Token Exchange
Client -> Server: Authorization: Negotiate <base64-token>
# Token contains: SPNEGO wrapper + auth mechanism list

# 3. Mechanism Selection
Server: Selects preferred mechanism (e.g., Kerberos)
Server -> Client: 401 with specific mechanism

# 4. Authentication
Client -> Server: Authorization: Negotiate <kerberos-token>
Server -> Client: 200 OK (authenticated)`,
        explanation: "SPNEGO protocol negotiation and authentication flow."
      },
      {
        title: "SPNEGO Configuration (Apache)",
        code: `# Apache mod_auth_gssapi configuration
LoadModule auth_gssapi_module modules/mod_auth_gssapi.so

<Location "/secure">
    AuthType GSSAPI
    AuthName "GSSAPI Single Sign On Login"
    GssapiCredStore keytab:/etc/httpd/conf/httpd.keytab
    GssapiCredStore client_keytab:/etc/httpd/conf/httpd.keytab
    GssapiDelegCcacheDir /var/run/httpd/clientcaches
    GssapiUseS4U2Proxy on
    GssapiBasicAuth on
    GssapiAllowedMech krb5
    GssapiAllowedMech ntlmssp
    Require valid-user
</Location>`,
        explanation: "Apache configuration for SPNEGO authentication with multiple mechanisms."
      },
      {
        title: "SPNEGO Client Implementation",
        code: `// JavaScript SPNEGO client example
const spnegoAuth = {
    async authenticate(url) {
        try {
            // Initial request
            let response = await fetch(url);
            
            if (response.status === 401) {
                const authHeader = response.headers.get('WWW-Authenticate');
                
                if (authHeader && authHeader.startsWith('Negotiate')) {
                    // Generate SPNEGO token
                    const token = await this.generateSPNEGOToken();
                    
                    // Retry with token
                    response = await fetch(url, {
                        headers: {
                            'Authorization': \`Negotiate \${token}\`
                        }
                    });
                }
            }
            
            return response;
        } catch (error) {
            console.error('SPNEGO authentication failed:', error);
            throw error;
        }
    },
    
    async generateSPNEGOToken() {
        // Browser's built-in SPNEGO support
        // This would typically be handled by the browser
        return btoa('spnego-token-data');
    }
};`,
        explanation: "JavaScript client implementation for SPNEGO authentication."
      }
    ],
    diagrams: [
      {
        src: "/spnego_flow.png",
        alt: "SPNEGO negotiation flow",
        caption: "SPNEGO protocol negotiation and authentication sequence"
      },
      {
        src: "/spnego_architecture.jpg",
        alt: "SPNEGO architecture",
        caption: "SPNEGO components and mechanism selection"
      }
    ],
    relatedProtocols: ["kerberos", "ntlm", "http", "tls"],
    resources: [
      {
        title: "RFC 4559 - SPNEGO HTTP Authentication",
        url: "https://tools.ietf.org/html/rfc4559",
        type: "RFC"
      },
      {
        title: "RFC 2478 - GSS-API Negotiation Mechanism",
        url: "https://tools.ietf.org/html/rfc2478",
        type: "RFC"
      },
      {
        title: "Microsoft SPNEGO Documentation",
        url: "https://docs.microsoft.com/en-us/windows/win32/secauthn/microsoft-negotiate",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Secure mechanism selection",
      "Token validation",
      "Replay attack prevention",
      "Downgrade attack protection",
      "Proper error handling",
      "Session management",
      "Key material protection",
      "Network security requirements"
    ]
  }