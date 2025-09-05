import { Protocol } from "../../types/protocol";

export const SPIFFE: Protocol = {
    id: "spiffe",
    name: "SPIFFE",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Secure Production Identity Framework for workload identity",
    fullDescription: "SPIFFE (Secure Production Identity Framework For Everyone) is a set of open-source standards for securely identifying software systems in dynamic and heterogeneous environments. It provides a foundation for zero-trust architectures by enabling workloads to obtain cryptographic identities.",
    advantages: [
      "Universal workload identity",
      "Zero-trust architecture",
      "Cross-platform compatibility",
      "Automatic identity issuance",
      "Dynamic environments support",
      "Open source standard"
    ],
    disadvantages: [
      "Complex initial setup",
      "Learning curve",
      "Infrastructure overhead",
      "Implementation complexity",
      "Requires SPIRE or similar",
      "Operational challenges"
    ],
    useCases: [
      "Microservices identity",
      "Service mesh security",
      "Zero-trust networks",
      "Multi-cloud deployments",
      "Container orchestration",
      "API authentication",
      "Workload attestation",
      "Service-to-service auth",
      "Dynamic scaling environments",
      "Cloud-native security",
      "DevOps automation",
      "Hybrid cloud architectures"
    ],
    examples: [
      {
        title: "SPIFFE ID Structure",
        code: `# SPIFFE ID format
spiffe://trust-domain/path

# Examples of SPIFFE IDs
spiffe://example.com/myservice
spiffe://prod.company.com/frontend
spiffe://staging.company.com/database
spiffe://k8s-cluster.com/ns/default/sa/web-service

# SPIFFE ID components
Trust Domain: example.com (security boundary)
Path: /myservice (workload identifier)

# Trust domain represents:
- Administrative domain
- Security boundary
- Root of trust
- Certificate authority scope

# Path represents:
- Specific workload
- Service instance
- Container/process
- Kubernetes service account`,
        explanation: "SPIFFE ID structure and examples showing workload identity format."
      },
      {
        title: "SPIFFE Verifiable Identity Document (SVID)",
        code: `# X.509-SVID Certificate Structure
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number: 1234567890
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: O=SPIRE, C=US
        Validity
            Not Before: Jan  1 00:00:00 2024 GMT
            Not After : Jan  1 00:00:00 2025 GMT
        Subject: (empty - identity in SAN)
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
        X509v3 extensions:
            X509v3 Subject Alternative Name: critical
                URI:spiffe://example.com/myservice
            X509v3 Key Usage: critical
                Digital Signature, Key Encipherment
            X509v3 Extended Key Usage:
                TLS Web Server Authentication, TLS Web Client Authentication

# JWT-SVID Structure
{
  "alg": "RS256",
  "kid": "key-id-123",
  "typ": "JWT"
}
{
  "aud": ["spiffe://example.com/audience"],
  "exp": 1640995200,
  "iat": 1640908800,
  "iss": "spiffe://example.com",
  "sub": "spiffe://example.com/myservice"
}`,
        explanation: "SPIFFE Verifiable Identity Document formats showing X.509 and JWT-based identity tokens."
      },
      {
        title: "Workload API Usage",
        code: `# Python SPIFFE Workload API client
from spiffe import SpiffeSocket, SpiffeWorkloadApiClient
import ssl

# Create SPIFFE-enabled socket
def create_spiffe_socket():
    client = SpiffeWorkloadApiClient()
    
    # Get X.509 SVID
    x509_svid = client.fetch_x509_svid()
    print(f"SPIFFE ID: {x509_svid.spiffe_id}")
    
    # Create SSL context with SVID
    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    context.load_cert_chain(
        certfile=x509_svid.cert_chain(),
        keyfile=x509_svid.private_key()
    )
    
    # Get trust bundle for peer verification
    trust_bundle = client.fetch_x509_bundles()
    context.load_verify_locations(cadata=trust_bundle.get_bundle_for_trust_domain("example.com"))
    
    return context

# Go SPIFFE Workload API
package main

import (
    "context"
    "log"
    "github.com/spiffe/go-spiffe/v2/spiffeid"
    "github.com/spiffe/go-spiffe/v2/workloadapi"
)

func main() {
    ctx := context.Background()
    
    // Connect to Workload API
    source, err := workloadapi.NewX509Source(ctx)
    if err != nil {
        log.Fatal(err)
    }
    defer source.Close()
    
    // Get SVID
    svid, err := source.GetX509SVID()
    if err != nil {
        log.Fatal(err)
    }
    
    log.Printf("SPIFFE ID: %s", svid.ID)
    log.Printf("Certificate: %v", svid.Certificates)
}`,
        explanation: "SPIFFE Workload API usage examples for obtaining and using workload identities."
      }
    ],
    diagrams: [
      {
        src: "/spiffe.png",
        alt: "SPIFFE architecture",
        caption: "SPIFFE architecture showing workload identity issuance and verification"
      }
    ],
    relatedProtocols: ["spire", "mtls", "jwt"],
    resources: [
      {
        title: "SPIFFE Specification",
        url: "https://github.com/spiffe/spiffe/blob/main/standards/SPIFFE.md",
        type: "Specification"
      },
      {
        title: "SPIFFE Documentation",
        url: "https://spiffe.io/docs/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Secure Workload API socket",
      "Trust domain management",
      "Certificate rotation",
      "Attestation policy security",
      "SVID validation",
      "Trust bundle distribution"
    ]
  }