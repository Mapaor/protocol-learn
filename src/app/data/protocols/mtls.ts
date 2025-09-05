import { Protocol } from "../../types/protocol";

export const MTLS: Protocol = {
    id: "mtls",
    name: "mTLS",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Mutual TLS for bidirectional authentication",
    fullDescription: "mTLS (Mutual TLS) extends TLS by requiring both the client and server to authenticate each other using digital certificates. This provides stronger security than standard TLS by ensuring both parties in the communication are verified and trusted.",
    advantages: [
      "Bidirectional authentication",
      "Strong identity verification",
      "Zero-trust architecture support",
      "Encrypted communication",
      "Certificate-based security",
      "Service mesh compatibility"
    ],
    disadvantages: [
      "Complex certificate management",
      "Performance overhead",
      "Operational complexity",
      "Certificate rotation challenges",
      "Debugging difficulties",
      "Infrastructure requirements"
    ],
    useCases: [
      "Microservices communication",
      "Service mesh security",
      "API gateway authentication",
      "Zero-trust networks",
      "B2B API access",
      "Device authentication",
      "Banking systems",
      "Healthcare applications",
      "Government communications",
      "Financial trading systems",
      "Industrial IoT",
      "Cloud-native applications"
    ],
    examples: [
      {
        title: "mTLS Configuration",
        code: `# Generate CA certificate
openssl genrsa -out ca.key 4096
openssl req -new -x509 -key ca.key -sha256 -subj "/C=US/ST=CA/O=MyOrg/CN=MyCA" -days 3650 -out ca.crt

# Generate server certificate
openssl genrsa -out server.key 4096
openssl req -new -key server.key -out server.csr -subj "/C=US/ST=CA/O=MyOrg/CN=server"
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -sha256

# Generate client certificate
openssl genrsa -out client.key 4096
openssl req -new -key client.key -out client.csr -subj "/C=US/ST=CA/O=MyOrg/CN=client"
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365 -sha256

# Nginx mTLS configuration
server {
    listen 443 ssl;
    server_name example.com;
    
    ssl_certificate /path/to/server.crt;
    ssl_certificate_key /path/to/server.key;
    ssl_client_certificate /path/to/ca.crt;
    ssl_verify_client on;
    ssl_verify_depth 2;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header X-SSL-Client-Cert $ssl_client_cert;
        proxy_set_header X-SSL-Client-Verify $ssl_client_verify;
    }
}`,
        explanation: "mTLS certificate generation and Nginx configuration for mutual authentication."
      },
      {
        title: "mTLS Client Implementation",
        code: `# Python mTLS client
import requests
import ssl

# Configure mTLS session
session = requests.Session()
session.cert = ('client.crt', 'client.key')  # Client certificate and key
session.verify = 'ca.crt'  # CA certificate for server verification

# Make mTLS request
response = session.get('https://api.example.com/data')
print(response.status_code)
print(response.json())

# Go mTLS client
package main

import (
    "crypto/tls"
    "crypto/x509"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    // Load client certificate
    cert, err := tls.LoadX509KeyPair("client.crt", "client.key")
    if err != nil {
        panic(err)
    }

    // Load CA certificate
    caCert, err := ioutil.ReadFile("ca.crt")
    if err != nil {
        panic(err)
    }
    caCertPool := x509.NewCertPool()
    caCertPool.AppendCertsFromPEM(caCert)

    // Configure TLS
    tlsConfig := &tls.Config{
        Certificates: []tls.Certificate{cert},
        RootCAs:      caCertPool,
    }

    client := &http.Client{
        Transport: &http.Transport{
            TLSClientConfig: tlsConfig,
        },
    }

    resp, err := client.Get("https://api.example.com/data")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    fmt.Println("Status:", resp.Status)
}`,
        explanation: "mTLS client implementations in Python and Go showing certificate-based authentication."
      },
      {
        title: "Istio Service Mesh mTLS",
        code: `# Enable mTLS for entire mesh
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT

# Service-specific mTLS policy
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: payment-service
  namespace: default
spec:
  selector:
    matchLabels:
      app: payment-service
  mtls:
    mode: STRICT

# Authorization policy
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: payment-policy
  namespace: default
spec:
  selector:
    matchLabels:
      app: payment-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/frontend-service"]
  - to:
    - operation:
        methods: ["GET", "POST"]`,
        explanation: "Istio service mesh configuration for enabling mTLS between microservices."
      }
    ],
    diagrams: [
      {
        src: "/mtls.png",
        alt: "mTLS authentication flow",
        caption: "Mutual TLS authentication process with bidirectional certificate verification"
      }
    ],
    relatedProtocols: ["tls", "ssl", "x509"],
    resources: [
      {
        title: "Istio Security Documentation",
        url: "https://istio.io/latest/docs/concepts/security/",
        type: "Documentation"
      },
      {
        title: "mTLS Best Practices",
        url: "https://smallstep.com/blog/everything-pki/",
        type: "Blog"
      }
    ],
    securityConsiderations: [
      "Secure certificate storage",
      "Automated certificate rotation",
      "Certificate revocation lists",
      "Private key protection",
      "Certificate validation",
      "Monitor certificate expiry"
    ]
  }