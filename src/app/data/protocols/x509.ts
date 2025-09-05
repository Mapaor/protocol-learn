import { Protocol } from "../../types/protocol";

export const X509: Protocol = {
    id: "x509",
    name: "X.509",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "X.509 digital certificate standard for public key infrastructure",
    fullDescription: "X.509 is a standard defining the format of public key certificates. X.509 certificates are used in many Internet protocols, including TLS/SSL, which is the basis for HTTPS. They are also used in offline applications, like electronic signatures.",
    port: "N/A (Certificate standard)",
    versions: ["X.509v1", "X.509v2", "X.509v3"],
    advantages: [
      "Standardized certificate format",
      "Hierarchical trust model",
      "Extensible structure",
      "Wide industry adoption",
      "Strong cryptographic foundation",
      "Revocation mechanisms"
    ],
    disadvantages: [
      "Complex certificate management",
      "Certificate authority dependencies",
      "Revocation checking overhead",
      "Certificate chain validation complexity",
      "Storage and distribution challenges"
    ],
    useCases: [
      "HTTPS/TLS certificates",
      "Code signing certificates",
      "Email encryption (S/MIME)",
      "VPN authentication",
      "Digital signatures",
      "Client authentication",
      "Document signing",
      "IoT device identity",
      "Enterprise PKI",
      "Government systems",
      "Banking and finance",
      "Healthcare systems"
    ],
    examples: [
      {
        title: "X.509 Certificate Structure",
        code: `Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 12345678
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, O=Example CA, CN=Example Root CA
        Validity:
            Not Before: Jan  1 00:00:00 2024 GMT
            Not After : Jan  1 00:00:00 2025 GMT
        Subject: C=US, O=Example Corp, CN=www.example.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                RSA Public-Key: (2048 bit)
        X509v3 extensions:
            X509v3 Subject Alternative Name:
                DNS:www.example.com, DNS:example.com
            X509v3 Key Usage:
                Digital Signature, Key Encipherment
    Signature Algorithm: sha256WithRSAEncryption`,
        explanation: "Structure of an X.509 certificate showing key components and extensions."
      },
      {
        title: "Certificate Verification (OpenSSL)",
        code: `# View certificate details
openssl x509 -in certificate.pem -text -noout

# Verify certificate chain
openssl verify -CAfile ca-bundle.pem certificate.pem

# Check certificate against private key
openssl x509 -noout -modulus -in certificate.pem | openssl md5
openssl rsa -noout -modulus -in private-key.pem | openssl md5

# Extract public key
openssl x509 -pubkey -noout -in certificate.pem

# Check certificate expiration
openssl x509 -enddate -noout -in certificate.pem`,
        explanation: "Common OpenSSL commands for X.509 certificate management and verification."
      }
    ],
    relatedProtocols: ["tls", "ssl", "https", "pkcs"],
    resources: [
      {
        title: "RFC 5280 - X.509 Certificate Profile",
        url: "https://tools.ietf.org/html/rfc5280",
        type: "RFC"
      },
      {
        title: "X.509 Certificate Guide",
        url: "https://www.ssl.com/guide/x509-certificate-guide/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Certificate validation",
      "Revocation checking (CRL/OCSP)",
      "Certificate pinning",
      "Chain of trust verification",
      "Key storage security",
      "Certificate transparency"
    ]
};
