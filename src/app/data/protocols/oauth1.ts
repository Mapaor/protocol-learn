import { Protocol } from "../../types/protocol";

export const OAUTH1: Protocol = {
    id: "oauth1",
    name: "OAuth 1.0",
    category: "Authentication",
    difficulty: "Advanced",
    shortDescription: "OAuth 1.0 protocol for secure API authorization without password sharing",
    fullDescription: "OAuth 1.0 is an authorization protocol that enables applications to obtain limited access to user accounts on HTTP services. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account through cryptographic signatures.",
    port: "443 (HTTPS), 80 (HTTP)",
    advantages: [
      "No password sharing",
      "Cryptographic security",
      "Request signing",
      "Token-based access",
      "Granular permissions",
      "Revocable access"
    ],
    disadvantages: [
      "Complex implementation",
      "Signature overhead",
      "Poor mobile support",
      "User experience issues",
      "Limited scope support",
      "Superseded by OAuth 2.0"
    ],
    useCases: [
      "Twitter API access",
      "Legacy system integration",
      "Third-party applications",
      "API authorization",
      "Desktop applications",
      "Server-to-server auth",
      "Secure data access",
      "User consent flows",
      "Protected resource access",
      "Application permissions",
      "Cross-domain authentication",
      "Federated access control"
    ],
    examples: [
      {
        title: "OAuth 1.0 Flow Overview",
        code: `# OAuth 1.0 Three-Legged Flow

# Step 1: Request Token
# Client requests temporary credentials from server
POST /oauth/request_token HTTP/1.1
Host: api.example.com
Authorization: OAuth realm="Example",
    oauth_consumer_key="consumer_key",
    oauth_signature_method="HMAC-SHA1", 
    oauth_timestamp="1234567890",
    oauth_nonce="random_string",
    oauth_version="1.0",
    oauth_callback="http://client.example.com/callback",
    oauth_signature="signature_value"

# Response: 
oauth_token=request_token&oauth_token_secret=request_secret&oauth_callback_confirmed=true

# Step 2: User Authorization
# Redirect user to authorization URL
https://api.example.com/oauth/authorize?oauth_token=request_token

# User grants permission, redirected back with verifier
http://client.example.com/callback?oauth_token=request_token&oauth_verifier=verifier_code

# Step 3: Access Token Exchange  
POST /oauth/access_token HTTP/1.1
Host: api.example.com
Authorization: OAuth realm="Example",
    oauth_consumer_key="consumer_key",
    oauth_token="request_token",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="1234567890", 
    oauth_nonce="random_string2",
    oauth_version="1.0",
    oauth_verifier="verifier_code",
    oauth_signature="signature_value"

# Response:
oauth_token=access_token&oauth_token_secret=access_secret&user_id=12345

# Step 4: Protected Resource Access
GET /api/user/profile HTTP/1.1  
Host: api.example.com
Authorization: OAuth realm="Example",
    oauth_consumer_key="consumer_key",
    oauth_token="access_token",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="1234567890",
    oauth_nonce="random_string3", 
    oauth_version="1.0",
    oauth_signature="signature_value"`,
        explanation: "Complete OAuth 1.0 authorization flow with request/response examples."
      },
      {
        title: "OAuth 1.0 Signature Generation",
        code: `# OAuth 1.0 Signature Process

# 1. Collect parameters
oauth_consumer_key = "consumer_key"
oauth_nonce = "random_nonce_123"
oauth_signature_method = "HMAC-SHA1"
oauth_timestamp = "1234567890"
oauth_version = "1.0"
oauth_token = "access_token"

# 2. Normalize parameters (percent encode and sort)
params = [
    ("oauth_consumer_key", "consumer_key"),
    ("oauth_nonce", "random_nonce_123"),
    ("oauth_signature_method", "HMAC-SHA1"),
    ("oauth_timestamp", "1234567890"),
    ("oauth_token", "access_token"),
    ("oauth_version", "1.0"),
    ("q", "search_term"),  # Query parameters included
    ("count", "10")
]

# Sort and encode
normalized_params = "&".join([f"{k}={percent_encode(v)}" for k, v in sorted(params)])

# 3. Create signature base string
http_method = "GET"
base_url = "https://api.example.com/search"
signature_base = f"{http_method}&{percent_encode(base_url)}&{percent_encode(normalized_params)}"

# 4. Create signing key
consumer_secret = "consumer_secret"
token_secret = "token_secret"  # Empty for request token
signing_key = f"{percent_encode(consumer_secret)}&{percent_encode(token_secret)}"

# 5. Generate signature
import hmac
import hashlib
import base64

signature = base64.b64encode(
    hmac.new(
        signing_key.encode(),
        signature_base.encode(), 
        hashlib.sha1
    ).digest()
).decode()

# Python implementation
import urllib.parse
import secrets
import time

def percent_encode(value):
    return urllib.parse.quote(str(value), safe='')

def generate_nonce():
    return secrets.token_urlsafe(32)

def generate_signature(method, url, params, consumer_secret, token_secret=""):
    # Normalize parameters
    encoded_params = [(percent_encode(k), percent_encode(v)) for k, v in params.items()]
    encoded_params.sort()
    param_string = "&".join([f"{k}={v}" for k, v in encoded_params])
    
    # Create base string
    base_string = f"{method.upper()}&{percent_encode(url)}&{percent_encode(param_string)}"
    
    # Create signing key
    signing_key = f"{percent_encode(consumer_secret)}&{percent_encode(token_secret)}"
    
    # Generate signature
    signature = base64.b64encode(
        hmac.new(signing_key.encode(), base_string.encode(), hashlib.sha1).digest()
    ).decode()
    
    return signature`,
        explanation: "OAuth 1.0 signature generation algorithm and Python implementation."
      },
      {
        title: "OAuth 1.0 Client Implementation",
        code: `// JavaScript OAuth 1.0 client
class OAuth1Client {
  constructor(consumerKey, consumerSecret, baseUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.baseUrl = baseUrl;
    this.token = null;
    this.tokenSecret = null;
  }

  // Step 1: Get request token
  async getRequestToken(callbackUrl) {
    const params = {
      oauth_callback: callbackUrl,
      oauth_consumer_key: this.consumerKey,
      oauth_nonce: this.generateNonce(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_version: '1.0'
    };

    const signature = this.generateSignature('POST', 
      '/oauth/request_token', params, this.consumerSecret, '');
    params.oauth_signature = signature;

    const response = await fetch(\`\${this.baseUrl}/oauth/request_token\`, {
      method: 'POST',
      headers: {
        'Authorization': this.buildAuthHeader(params),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const body = await response.text();
    const tokenData = new URLSearchParams(body);
    
    return {
      token: tokenData.get('oauth_token'),
      tokenSecret: tokenData.get('oauth_token_secret'),
      callbackConfirmed: tokenData.get('oauth_callback_confirmed') === 'true'
    };
  }

  // Get authorization URL
  getAuthorizationUrl(requestToken) {
    return \`\${this.baseUrl}/oauth/authorize?oauth_token=\${requestToken}\`;
  }

  // Step 3: Exchange for access token
  async getAccessToken(requestToken, requestTokenSecret, verifier) {
    const params = {
      oauth_consumer_key: this.consumerKey,
      oauth_nonce: this.generateNonce(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_token: requestToken,
      oauth_verifier: verifier,
      oauth_version: '1.0'
    };

    const signature = this.generateSignature('POST',
      '/oauth/access_token', params, this.consumerSecret, requestTokenSecret);
    params.oauth_signature = signature;

    const response = await fetch(\`\${this.baseUrl}/oauth/access_token\`, {
      method: 'POST',
      headers: {
        'Authorization': this.buildAuthHeader(params)
      }
    });

    const body = await response.text();
    const tokenData = new URLSearchParams(body);
    
    this.token = tokenData.get('oauth_token');
    this.tokenSecret = tokenData.get('oauth_token_secret');
    
    return {
      token: this.token,
      tokenSecret: this.tokenSecret,
      userId: tokenData.get('user_id')
    };
  }

  // Make authenticated API request
  async apiRequest(method, path, params = {}) {
    const authParams = {
      oauth_consumer_key: this.consumerKey,
      oauth_nonce: this.generateNonce(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_token: this.token,
      oauth_version: '1.0'
    };

    // Include query parameters in signature
    const allParams = { ...authParams, ...params };
    const signature = this.generateSignature(method.toUpperCase(),
      path, allParams, this.consumerSecret, this.tokenSecret);
    authParams.oauth_signature = signature;

    const url = method === 'GET' && Object.keys(params).length > 0
      ? \`\${this.baseUrl}\${path}?\${new URLSearchParams(params)}\`
      : \`\${this.baseUrl}\${path}\`;

    return fetch(url, {
      method: method.toUpperCase(),
      headers: {
        'Authorization': this.buildAuthHeader(authParams),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: method !== 'GET' ? new URLSearchParams(params) : undefined
    });
  }

  generateNonce() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  buildAuthHeader(params) {
    const authString = Object.keys(params)
      .filter(key => key.startsWith('oauth_'))
      .sort()
      .map(key => \`\${this.percentEncode(key)}="\${this.percentEncode(params[key])}"\`)
      .join(', ');
    
    return \`OAuth \${authString}\`;
  }
}

// Usage example
const client = new OAuth1Client('consumer_key', 'consumer_secret', 'https://api.twitter.com');

// Three-legged OAuth flow
const requestToken = await client.getRequestToken('http://localhost:3000/callback');
window.location.href = client.getAuthorizationUrl(requestToken.token);

// After callback with verifier
const accessToken = await client.getAccessToken(
  requestToken.token, requestToken.tokenSecret, verifier);

// Make API calls
const response = await client.apiRequest('GET', '/1.1/account/verify_credentials.json');`,
        explanation: "Complete JavaScript OAuth 1.0 client implementation."
      }
    ],
    relatedProtocols: ["oauth2", "http", "https", "openid"],
    resources: [
      {
        title: "RFC 5849 - OAuth 1.0 Protocol",
        url: "https://tools.ietf.org/html/rfc5849",
        type: "RFC"
      },
      {
        title: "OAuth 1.0 Guide",
        url: "https://oauth.net/1/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Signature validation",
      "Nonce uniqueness",
      "Timestamp verification",
      "HTTPS enforcement",
      "Token storage security",
      "Replay attack prevention"
    ]
};
