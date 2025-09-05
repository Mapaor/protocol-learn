import { Protocol } from "../../types/protocol";

export const OAUTH2: Protocol = {
    id: "oauth2",
    name: "OAuth 2.0",
    category: "Authentication",
    difficulty: "Advanced",
    shortDescription: "Authorization framework for secure API access delegation",
    fullDescription: "OAuth 2.0 is the industry-standard protocol for authorization. It enables applications to obtain limited access to user accounts on an HTTP service, such as Facebook, GitHub, or Google. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account.",
    port: "443 (HTTPS)",
    versions: ["OAuth 2.0", "OAuth 2.1 (Draft)"],
    advantages: [
      "Secure token-based authorization",
      "No password sharing with third parties",
      "Granular access control (scopes)",
      "Revocable access tokens",
      "Widely adopted standard",
      "Supports multiple client types"
    ],
    disadvantages: [
      "Complex implementation",
      "Multiple grant types confusion",
      "Bearer token vulnerabilities",
      "No standardized user info",
      "Potential for misuse",
      "Requires HTTPS"
    ],
    useCases: [
      "Social media login",
      "API access delegation",
      "Mobile app authentication",
      "Third-party integrations",
      "Single Sign-On (SSO)",
      "Service-to-service auth",
      "Resource server protection",
      "Microservices security",
      "Cloud service access",
      "IoT device authorization",
      "Developer API access",
      "Enterprise applications"
    ],
    examples: [
      {
        title: "Authorization Code Flow",
        code: `# Step 1: Authorization Request
GET /oauth/authorize?
    response_type=code&
    client_id=CLIENT_ID&
    redirect_uri=REDIRECT_URI&
    scope=read%20write&
    state=RANDOM_STATE

# Step 2: Authorization Grant (redirect)
HTTP/1.1 302 Found
Location: REDIRECT_URI?code=AUTH_CODE&state=RANDOM_STATE

# Step 3: Access Token Request
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE&
redirect_uri=REDIRECT_URI&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET

# Step 4: Access Token Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200...",
  "scope": "read write"
}`,
        explanation: "OAuth 2.0 Authorization Code flow for web applications with secure token exchange."
      },
      {
        title: "Client Credentials Flow",
        code: `# Service-to-service authentication
POST /oauth/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic BASE64(CLIENT_ID:CLIENT_SECRET)

grant_type=client_credentials&
scope=api:read%20api:write

# Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 7200,
  "scope": "api:read api:write"
}

# Using the token
GET /api/resource
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        explanation: "Client Credentials flow for machine-to-machine authentication without user interaction."
      },
      {
        title: "PKCE (Proof Key for Code Exchange)",
        code: `# Generate code verifier and challenge
import hashlib
import base64
import secrets

code_verifier = base64.urlsafe_b64encode(secrets.token_bytes(32)).decode('utf-8').rstrip('=')
code_challenge = base64.urlsafe_b64encode(
    hashlib.sha256(code_verifier.encode('utf-8')).digest()
).decode('utf-8').rstrip('=')

# Authorization request with PKCE
GET /oauth/authorize?
    response_type=code&
    client_id=CLIENT_ID&
    redirect_uri=REDIRECT_URI&
    scope=openid%20profile&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    state=RANDOM_STATE

# Token exchange with code verifier
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE&
redirect_uri=REDIRECT_URI&
client_id=CLIENT_ID&
code_verifier=CODE_VERIFIER`,
        explanation: "PKCE extension for OAuth 2.0 providing additional security for public clients."
      }
    ],
    diagrams: [
      {
        src: "/oauth2-flow.png",
        alt: "OAuth 2.0 authorization flow",
        caption: "OAuth 2.0 authorization code flow with client and resource server"
      }
    ],
    relatedProtocols: ["https", "jwt", "openid"],
    resources: [
      {
        title: "RFC 6749 - OAuth 2.0 Framework",
        url: "https://tools.ietf.org/html/rfc6749",
        type: "RFC"
      },
      {
        title: "OAuth 2.0 Security Best Practices",
        url: "https://tools.ietf.org/html/draft-ietf-oauth-security-topics",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Use PKCE for public clients",
      "Validate redirect URIs",
      "Implement proper state validation",
      "Use short-lived access tokens",
      "Secure token storage",
      "HTTPS required for all communications"
    ]
  }