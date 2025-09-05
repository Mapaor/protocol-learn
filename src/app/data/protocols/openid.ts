import { Protocol } from "../../types/protocol";

export const OPENID: Protocol = {
    id: "openid",
    name: "OpenID",
    category: "Authentication",
    difficulty: "Advanced",
    shortDescription: "OpenID Connect for decentralized authentication and single sign-on",
    fullDescription: "OpenID Connect is an identity layer built on top of OAuth 2.0. It allows clients to verify the identity of users based on authentication performed by an authorization server, and to obtain basic profile information about users in an interoperable and REST-like manner.",
    port: "443 (HTTPS), 80 (HTTP)",
    versions: ["OpenID 1.0", "OpenID 2.0", "OpenID Connect 1.0"],
    advantages: [
      "Single sign-on (SSO)",
      "Decentralized identity",
      "User-controlled identity",
      "Cross-domain authentication",
      "Standards-based",
      "Privacy protection"
    ],
    disadvantages: [
      "Complex implementation",
      "Provider dependency",
      "User experience challenges",
      "Security vulnerabilities",
      "Limited adoption",
      "Configuration complexity"
    ],
    useCases: [
      "Single sign-on systems",
      "Social login integration",
      "Enterprise authentication",
      "Mobile app authentication",
      "Federated identity",
      "Multi-tenant applications",
      "API access control",
      "Third-party integrations",
      "Cloud service authentication",
      "Identity federation",
      "Zero-trust architectures",
      "Microservices security"
    ],
    examples: [
      {
        title: "OpenID Connect Flow",
        code: `# Authorization Request
GET /auth?
    response_type=code&
    client_id=12345&
    redirect_uri=https://app.example.com/callback&
    scope=openid%20profile%20email&
    state=random_state_value HTTP/1.1
Host: auth.provider.com

# Authorization Response
HTTP/1.1 302 Found
Location: https://app.example.com/callback?
    code=AUTH_CODE&
    state=random_state_value

# Token Request
POST /token HTTP/1.1
Host: auth.provider.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE&
redirect_uri=https://app.example.com/callback&
client_id=12345&
client_secret=SECRET`,
        explanation: "OpenID Connect authorization code flow sequence."
      },
      {
        title: "OpenID Connect Implementation (Node.js)",
        code: `const express = require('express');
const { Issuer, Strategy } = require('openid-client');
const passport = require('passport');

// Discover OpenID provider
const issuer = await Issuer.discover('https://auth.provider.com');

// Create client
const client = new issuer.Client({
    client_id: 'your-client-id',
    client_secret: 'your-client-secret',
    redirect_uris: ['http://localhost:3000/auth/callback'],
    response_types: ['code']
});

// Configure Passport strategy
passport.use('oidc', new Strategy({ client }, (tokenSet, userinfo, done) => {
    return done(null, userinfo);
}));

const app = express();

// Initiate authentication
app.get('/auth', passport.authenticate('oidc'));

// Handle callback
app.get('/auth/callback', 
    passport.authenticate('oidc', { 
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
);

// Protected route
app.get('/profile', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    res.json(req.user);
});`,
        explanation: "OpenID Connect integration using Node.js and Passport.js."
      }
    ],
    relatedProtocols: ["oauth2", "https", "jwt"],
    resources: [
      {
        title: "OpenID Connect Specification",
        url: "https://openid.net/specs/openid-connect-core-1_0.html",
        type: "Specification"
      },
      {
        title: "OpenID Connect Debugger",
        url: "https://oidcdebugger.com/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "HTTPS requirement",
      "State parameter validation",
      "Token validation",
      "PKCE for public clients",
      "Nonce validation",
      "ID token verification"
    ]
};
