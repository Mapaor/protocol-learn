import { Protocol } from "../../types/protocol";

export const PKCS: Protocol = {
    id: "pkcs",
    name: "PKCS",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Public Key Cryptography Standards for digital signatures and encryption",
    fullDescription: "PKCS (Public Key Cryptography Standards) is a group of public key cryptography standards devised and published by RSA Security. These standards define data formats, procedures, and protocols for secure digital communications, including certificate requests, digital signatures, and encrypted data storage.",
    port: "N/A (Standards/Protocols)",
    advantages: [
      "Industry standard formats",
      "Interoperability across systems",
      "Strong cryptographic foundation",
      "Widely supported",
      "Comprehensive security coverage",
      "Flexible implementation"
    ],
    disadvantages: [
      "Complex implementation",
      "Performance overhead",
      "Key management complexity",
      "Version compatibility issues",
      "Potential vulnerabilities",
      "Requires expertise"
    ],
    useCases: [
      "Digital certificates",
      "SSL/TLS certificates",
      "Code signing",
      "Email encryption",
      "Document signing",
      "Smart card authentication",
      "Hardware security modules",
      "Certificate authorities",
      "Secure key storage",
      "Two-factor authentication",
      "Enterprise security",
      "Financial transactions"
    ],
    examples: [
      {
        title: "Common PKCS Standards",
        code: `# PKCS #1 - RSA Cryptography Standard
- RSA encryption and signature schemes
- Padding schemes (PKCS#1 v1.5, OAEP, PSS)
- Key format specifications

# PKCS #7 - Cryptographic Message Syntax (CMS)
- Digital signatures
- Digital envelopes  
- Signed and encrypted data
- Certificate chains

# PKCS #8 - Private Key Information Syntax
- Private key storage format
- Encrypted private keys
- Key derivation functions

# PKCS #10 - Certificate Request Syntax (CSR)
- Certificate signing requests
- Subject information
- Public key information

# PKCS #11 - Cryptographic Token Interface (PKCS#11)
- Hardware security module interface
- Smart card API
- Cryptographic operations

# PKCS #12 - Personal Information Exchange Syntax
- Certificate and private key storage
- Password-based encryption
- .p12/.pfx files

# Example PKCS#10 Certificate Request
-----BEGIN CERTIFICATE REQUEST-----
MIICvjCCAaYCAQAwejELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQH
DA1TYW4gRnJhbmNpc2NvMRIwEAYDVQQKDAlNeUNvbXBhbnkxEjAQBgNVBAMMCWxv
Y2FsaG9zdDEeMBwGCSqGSIb3DQEJARYPdGVzdEBleGFtcGxlLmNvbTCCASIwDQYJ
KoZIhvcNAQEBBQADggEPADCCAQoCggEBAL...
-----END CERTIFICATE REQUEST-----`,
        explanation: "Overview of major PKCS standards and example certificate request format."
      },
      {
        title: "PKCS#11 Usage Example",
        code: `// PKCS#11 JavaScript example (using node-pkcs11js)
const pkcs11js = require("pkcs11js");

// Initialize PKCS#11 library
const pkcs11 = new pkcs11js.PKCS11();
pkcs11.load("/usr/lib/softhsm/libsofthsm2.so");

try {
  // Initialize library
  pkcs11.C_Initialize();
  
  // Get slots
  const slots = pkcs11.C_GetSlotList(true);
  const slot = slots[0];
  
  // Open session
  const session = pkcs11.C_OpenSession(slot, 
    pkcs11js.CKF_SERIAL_SESSION | pkcs11js.CKF_RW_SESSION);
  
  // Login
  pkcs11.C_Login(session, pkcs11js.CKU_USER, "1234");
  
  // Generate key pair
  const publicKeyTemplate = [
    { type: pkcs11js.CKA_CLASS, value: pkcs11js.CKO_PUBLIC_KEY },
    { type: pkcs11js.CKA_KEY_TYPE, value: pkcs11js.CKK_RSA },
    { type: pkcs11js.CKA_MODULUS_BITS, value: 2048 },
    { type: pkcs11js.CKA_PUBLIC_EXPONENT, value: Buffer.from([1, 0, 1]) },
    { type: pkcs11js.CKA_VERIFY, value: true }
  ];
  
  const privateKeyTemplate = [
    { type: pkcs11js.CKA_CLASS, value: pkcs11js.CKO_PRIVATE_KEY },
    { type: pkcs11js.CKA_KEY_TYPE, value: pkcs11js.CKK_RSA },
    { type: pkcs11js.CKA_SIGN, value: true }
  ];
  
  const keys = pkcs11.C_GenerateKeyPair(session, 
    { mechanism: pkcs11js.CKM_RSA_PKCS_KEY_PAIR_GEN },
    publicKeyTemplate, privateKeyTemplate);
  
  console.log("Generated key pair:", keys);
  
  // Sign data
  const data = Buffer.from("Hello, PKCS#11!");
  pkcs11.C_SignInit(session, 
    { mechanism: pkcs11js.CKM_SHA256_RSA_PKCS }, keys.privateKey);
  const signature = pkcs11.C_Sign(session, data);
  
  console.log("Signature:", signature.toString('hex'));
  
} finally {
  pkcs11.C_Finalize();
}`,
        explanation: "PKCS#11 usage for hardware security module operations."
      },
      {
        title: "OpenSSL PKCS Operations",
        code: `# Generate private key (PKCS#8 format)
openssl genpkey -algorithm RSA -out private_key.pem -pkcs8

# Create certificate signing request (PKCS#10)
openssl req -new -key private_key.pem -out cert_request.csr \\
  -subj "/C=US/ST=CA/L=San Francisco/O=MyCompany/CN=example.com"

# View CSR details
openssl req -in cert_request.csr -text -noout

# Create PKCS#12 bundle (certificate + private key)
openssl pkcs12 -export -out certificate.p12 \\
  -inkey private_key.pem -in certificate.crt \\
  -certfile ca_chain.crt -name "My Certificate"

# Extract certificate from PKCS#12
openssl pkcs12 -in certificate.p12 -clcerts -nokeys -out cert.pem

# Extract private key from PKCS#12
openssl pkcs12 -in certificate.p12 -nocerts -nodes -out key.pem

# Convert PEM to PKCS#8 DER format
openssl pkcs8 -topk8 -inform PEM -outform DER \\
  -in private_key.pem -out private_key.der -nocrypt

# Verify PKCS#7 signature
openssl smime -verify -in signed_message.p7s \\
  -CAfile ca_certs.pem -out message.txt

# Create PKCS#7 signature
openssl smime -sign -in message.txt -out signed_message.p7s \\
  -signer cert.pem -inkey private_key.pem`,
        explanation: "Common OpenSSL commands for PKCS operations."
      }
    ],
    relatedProtocols: ["x509", "ssl", "tls", "mtls", "oauth2", "jwt"],
    resources: [
      {
        title: "PKCS Standards - RSA Laboratories",
        url: "https://www.rsa.com/en-us/company/standards",
        type: "Documentation"
      },
      {
        title: "RFC 3447 - PKCS #1 v2.1",
        url: "https://tools.ietf.org/html/rfc3447",
        type: "RFC"
      },
      {
        title: "RFC 5652 - CMS (PKCS #7)",
        url: "https://tools.ietf.org/html/rfc5652",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Key management",
      "Secure key storage",
      "Certificate validation",
      "Revocation checking",
      "Proper padding schemes",
      "Timing attack prevention",
      "Random number generation",
      "Hardware security modules"
    ]
};
