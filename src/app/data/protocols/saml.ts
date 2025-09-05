import { Protocol } from "../../types/protocol";

export const SAML: Protocol = {
    id: "saml",
    name: "SAML",
    category: "Authentication",
    difficulty: "Advanced",
    shortDescription: "Security Assertion Markup Language for single sign-on and identity federation",
    fullDescription: "SAML (Security Assertion Markup Language) is an XML-based framework for exchanging authentication and authorization data between parties, particularly between an identity provider and a service provider. It enables single sign-on (SSO) and identity federation across different domains.",
    port: "443 (HTTPS), 80 (HTTP)",
    advantages: [
      "Single sign-on",
      "Identity federation",
      "Strong security",
      "Standardized protocol",
      "Cross-domain authentication",
      "Attribute exchange"
    ],
    disadvantages: [
      "Complex implementation",
      "XML overhead",
      "Poor mobile support",
      "Certificate management",
      "Debugging difficulties",
      "Large message sizes"
    ],
    useCases: [
      "Enterprise SSO",
      "Cloud service access",
      "Identity federation",
      "B2B authentication",
      "Government systems",
      "Educational platforms",
      "Healthcare systems",
      "Financial services",
      "SaaS applications",
      "Multi-tenant platforms",
      "Partner integration",
      "Workforce identity"
    ],
    examples: [
      {
        title: "SAML Authentication Flow",
        code: `# SAML 2.0 SSO Flow (SP-Initiated)

# 1. User accesses Service Provider (SP)
GET /protected-resource HTTP/1.1
Host: sp.example.com

# 2. SP redirects to Identity Provider (IdP) with AuthnRequest
HTTP/1.1 302 Found
Location: https://idp.example.com/sso?SAMLRequest=<encoded_request>

# 3. AuthnRequest (base64 encoded and URL encoded)
<samlp:AuthnRequest
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="_8e8dc5f69a98cc4c1ff3427e5ce34606fd672f91e6"
    Version="2.0"
    IssueInstant="2023-12-07T10:30:00Z"
    Destination="https://idp.example.com/sso"
    AssertionConsumerServiceURL="https://sp.example.com/acs"
    ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST">
    <saml:Issuer>https://sp.example.com</saml:Issuer>
    <samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:2.0:nameid-format:persistent"/>
</samlp:AuthnRequest>

# 4. User authenticates at IdP (login form)
POST /login HTTP/1.1
Host: idp.example.com
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=secret&SAMLRequest=...

# 5. IdP posts SAML Response to SP
POST /acs HTTP/1.1
Host: sp.example.com
Content-Type: application/x-www-form-urlencoded

SAMLResponse=<base64_encoded_response>&RelayState=original_url

# 6. SAML Response with Assertion
<samlp:Response
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="_8e8dc5f69a98cc4c1ff3427e5ce34606fd672f91e6"
    Version="2.0"
    IssueInstant="2023-12-07T10:32:00Z"
    Destination="https://sp.example.com/acs"
    InResponseTo="_8e8dc5f69a98cc4c1ff3427e5ce34606fd672f91e6">
    <saml:Issuer>https://idp.example.com</saml:Issuer>
    <samlp:Status>
        <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
    </samlp:Status>
    <saml:Assertion>
        <!-- Assertion details -->
    </saml:Assertion>
</samlp:Response>`,
        explanation: "SAML 2.0 SSO authentication flow with request/response structure."
      },
      {
        title: "SAML Assertion Structure",
        code: `<!-- Complete SAML Assertion -->
<saml:Assertion
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="_d71a3a8e9fcc45c9b9f5f7b5dc8c9c7a1a2a3a4a5"
    Version="2.0"
    IssueInstant="2023-12-07T10:32:00Z">
    
    <!-- Issuer (Identity Provider) -->
    <saml:Issuer>https://idp.example.com</saml:Issuer>
    
    <!-- Digital Signature -->
    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
            <ds:Reference URI="#_d71a3a8e9fcc45c9b9f5f7b5dc8c9c7a1a2a3a4a5">
                <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                <ds:DigestValue>digest_value_here</ds:DigestValue>
            </ds:Reference>
        </ds:SignedInfo>
        <ds:SignatureValue>signature_value_here</ds:SignatureValue>
        <ds:KeyInfo>
            <ds:X509Data>
                <ds:X509Certificate>certificate_data_here</ds:X509Certificate>
            </ds:X509Data>
        </ds:KeyInfo>
    </ds:Signature>
    
    <!-- Subject (User Identity) -->
    <saml:Subject>
        <saml:NameID Format="urn:oasis:names:tc:SAML:2.0:nameid-format:persistent">
            user@example.com
        </saml:NameID>
        <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
            <saml:SubjectConfirmationData
                NotOnOrAfter="2023-12-07T10:37:00Z"
                Recipient="https://sp.example.com/acs"
                InResponseTo="_8e8dc5f69a98cc4c1ff3427e5ce34606fd672f91e6"/>
        </saml:SubjectConfirmation>
    </saml:Subject>
    
    <!-- Conditions (Validity) -->
    <saml:Conditions
        NotBefore="2023-12-07T10:30:00Z"
        NotOnOrAfter="2023-12-07T10:37:00Z">
        <saml:AudienceRestriction>
            <saml:Audience>https://sp.example.com</saml:Audience>
        </saml:AudienceRestriction>
    </saml:Conditions>
    
    <!-- Authentication Statement -->
    <saml:AuthnStatement
        AuthnInstant="2023-12-07T10:32:00Z"
        SessionIndex="_be9967abd904ddcae3c0eb4189adbe3f71e327cf93">
        <saml:AuthnContext>
            <saml:AuthnContextClassRef>
                urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
            </saml:AuthnContextClassRef>
        </saml:AuthnContext>
    </saml:AuthnStatement>
    
    <!-- Attribute Statement (User Attributes) -->
    <saml:AttributeStatement>
        <saml:Attribute Name="email">
            <saml:AttributeValue>user@example.com</saml:AttributeValue>
        </saml:Attribute>
        <saml:Attribute Name="firstName">
            <saml:AttributeValue>John</saml:AttributeValue>
        </saml:Attribute>
        <saml:Attribute Name="lastName">
            <saml:AttributeValue>Doe</saml:AttributeValue>
        </saml:Attribute>
        <saml:Attribute Name="department">
            <saml:AttributeValue>Engineering</saml:AttributeValue>
        </saml:Attribute>
        <saml:Attribute Name="role">
            <saml:AttributeValue>Developer</saml:AttributeValue>
        </saml:Attribute>
    </saml:AttributeStatement>
</saml:Assertion>`,
        explanation: "Complete SAML assertion with signature, subject, conditions, and attributes."
      },
      {
        title: "SAML Service Provider Implementation",
        code: `// Node.js SAML Service Provider using passport-saml
const express = require('express');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const app = express();

// SAML Strategy Configuration
passport.use('saml', new SamlStrategy({
  // Identity Provider settings
  entryPoint: 'https://idp.example.com/sso',
  issuer: 'https://sp.example.com',
  callbackUrl: 'https://sp.example.com/acs',
  
  // Certificate for signature verification
  cert: 'idp_certificate_content',
  
  // Optional: private key for request signing
  privateKey: 'sp_private_key',
  
  // Attribute mapping
  attributeConsumingServiceIndex: false,
  identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
  
  // Security settings
  validateInResponseTo: true,
  requestIdExpirationPeriodMs: 28800000, // 8 hours
  cacheProvider: 'memory', // or redis
  
  // Logout settings
  logoutUrl: 'https://idp.example.com/logout',
  logoutCallbackUrl: 'https://sp.example.com/logout/callback',
  
}, (profile, done) => {
  // User profile processing
  const user = {
    id: profile.nameID,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    department: profile.department,
    roles: profile.role ? [profile.role] : []
  };
  
  return done(null, user);
}));

// Routes
app.get('/login', passport.authenticate('saml', {
  successRedirect: '/dashboard',
  failureRedirect: '/login-failed'
}));

// Assertion Consumer Service
app.post('/acs', passport.authenticate('saml', {
  successRedirect: '/dashboard',
  failureRedirect: '/login-failed'
}));

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Protected route
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// SAML Metadata endpoint
app.get('/metadata', (req, res) => {
  res.type('application/xml');
  res.status(200).send(passport._strategy('saml').generateServiceProviderMetadata());
});

// Python SAML with OneLogin
from onelogin.saml2.auth import OneLogin_Saml2_Auth
from onelogin.saml2.utils import OneLogin_Saml2_Utils

def init_saml_auth(req):
    saml_settings = {
        'sp': {
            'entityId': 'https://sp.example.com',
            'assertionConsumerService': {
                'url': 'https://sp.example.com/acs',
                'binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
            },
            'singleLogoutService': {
                'url': 'https://sp.example.com/sls',
                'binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
            }
        },
        'idp': {
            'entityId': 'https://idp.example.com',
            'singleSignOnService': {
                'url': 'https://idp.example.com/sso',
                'binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
            },
            'x509cert': 'idp_certificate_content'
        }
    }
    
    auth = OneLogin_Saml2_Auth(req, saml_settings)
    return auth

# Flask SAML endpoint
@app.route('/login')
def saml_login():
    req = prepare_flask_request(request)
    auth = init_saml_auth(req)
    return redirect(auth.login())

@app.route('/acs', methods=['POST'])
def saml_acs():
    req = prepare_flask_request(request)
    auth = init_saml_auth(req)
    auth.process_response()
    
    if not auth.is_authenticated():
        return "Authentication failed", 401
    
    # Get user attributes
    user_data = {
        'id': auth.get_nameid(),
        'attributes': auth.get_attributes()
    }
    
    # Store in session
    session['user'] = user_data
    return redirect('/dashboard')`,
        explanation: "SAML Service Provider implementation in Node.js and Python."
      }
    ],
    relatedProtocols: ["xml", "https", "oauth2", "openid"],
    resources: [
      {
        title: "SAML 2.0 Specification",
        url: "https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf",
        type: "Specification"
      },
      {
        title: "SAML Security Guidelines",
        url: "https://docs.oasis-open.org/security/saml/v2.0/saml-sec-consider-2.0-os.pdf",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "XML signature validation",
      "Certificate management",
      "Replay attack prevention",
      "Assertion encryption",
      "Time-based validation",
      "Audience restriction"
    ]
};
