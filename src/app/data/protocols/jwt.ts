import { Protocol } from "../../types/protocol";

export const JWT: Protocol = {
    id: "jwt",
    name: "JWT",
    category: "Authentication",
    difficulty: "Intermediate",
    shortDescription: "JSON Web Token for secure information transmission and authentication",
    fullDescription: "JWT (JSON Web Token) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.",
    port: "N/A (Token format)",
    advantages: [
      "Compact and URL-safe",
      "Self-contained tokens",
      "Cross-domain/CORS friendly",
      "No server-side storage needed",
      "Stateless authentication",
      "Mobile-friendly"
    ],
    disadvantages: [
      "Token size overhead",
      "Cannot revoke easily",
      "Sensitive data exposure risk",
      "No built-in encryption",
      "Token theft vulnerability",
      "Clock synchronization issues"
    ],
    useCases: [
      "Authentication tokens",
      "Authorization claims",
      "Information exchange",
      "Single sign-on (SSO)",
      "API authentication",
      "Mobile app authentication",
      "Microservices security",
      "Session management",
      "Password reset tokens",
      "Email verification",
      "OAuth implementations",
      "Federated identity"
    ],
    examples: [
      {
        title: "JWT Structure and Example",
        code: `JWT Structure: header.payload.signature

# Example JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

# Decoded Header
{
  "alg": "HS256",
  "typ": "JWT"
}

# Decoded Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622,
  "aud": "myapp.com",
  "iss": "auth.myapp.com"
}

# Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)`,
        explanation: "JWT structure breakdown showing header, payload, and signature components."
      },
      {
        title: "JWT Implementation (Node.js)",
        code: `const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';

// Generate JWT
function generateToken(user) {
    const payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    };
    
    return jwt.sign(payload, secret, { algorithm: 'HS256' });
}

// Verify JWT
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return { valid: true, payload: decoded };
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

// Middleware for Express
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);
    }
    
    const result = verifyToken(token);
    if (!result.valid) {
        return res.sendStatus(403);
    }
    
    req.user = result.payload;
    next();
}`,
        explanation: "JWT generation, verification, and middleware implementation in Node.js."
      }
    ],
    relatedProtocols: ["oauth2", "https", "json"],
    resources: [
      {
        title: "RFC 7519 - JWT Specification",
        url: "https://tools.ietf.org/html/rfc7519",
        type: "RFC"
      },
      {
        title: "JWT.io Debugger",
        url: "https://jwt.io/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use HTTPS for transmission",
      "Implement token expiration",
      "Secure key management",
      "Avoid sensitive data in payload",
      "Implement token refresh",
      "Validate all claims"
    ]
};
