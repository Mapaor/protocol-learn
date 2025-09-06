import { Protocol } from "../../types/protocol";

export const PKI: Protocol = {
  id: "pki",
  name: "Public Key Infrastructure (PKI)",
  category: "Security",
  difficulty: "Advanced",
  shortDescription: "Framework for digital certificates and asymmetric key management.",
  fullDescription:
    "PKI is a system for managing public-key encryption, digital certificates, and identity verification. It enables secure communication by providing authentication, data integrity, and confidentiality. PKI consists of certificate authorities (CAs), registration authorities (RAs), and certificate management systems that issue, revoke, and validate digital certificates.",
  port: "N/A",
  versions: ["X.509 Certificates", "PKIX RFC 5280"],
  advantages: [
    "Enables secure authentication and encryption",
    "Supports digital signatures and integrity verification",
    "Scalable and widely adopted",
    "Foundation for TLS/SSL and many secure protocols"
  ],
  disadvantages: [
    "Requires careful key and certificate management",
    "Complex to deploy and maintain",
    "Certificate revocation and trust management can be challenging"
  ],
  useCases: [
    "TLS/HTTPS certificate management",
    "Email signing and encryption (S/MIME)",
    "VPN authentication",
    "Secure code signing and identity verification"
  ],
  examples: [
    {
      title: "Generating a Certificate with OpenSSL",
      code: `# Generate private key
openssl genrsa -out private.key 2048

# Generate certificate signing request (CSR)
openssl req -new -key private.key -out request.csr

# Self-signed certificate
openssl x509 -req -days 365 -in request.csr -signkey private.key -out certificate.crt`,
      explanation: "Shows basic PKI operations: key generation, CSR creation, and certificate issuance."
    }
  ],
  relatedProtocols: ["tls", "ssl", "esp", "ah", "ike", "x509"],
  resources: [
    {
      title: "RFC 5280 - PKI X.509 Certificate and CRL Profile",
      url: "https://datatracker.ietf.org/doc/html/rfc5280",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "Proper CA trust chain management is critical",
    "Private keys must be securely stored",
    "Certificate revocation mechanisms should be implemented"
  ]
};
