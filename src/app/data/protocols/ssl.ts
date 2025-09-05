import { Protocol } from "../../types/protocol";

export const SSL: Protocol = {
    id: "ssl",
    name: "SSL",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Secure Sockets Layer for encrypted communications (deprecated)",
    fullDescription: "SSL (Secure Sockets Layer) is a cryptographic protocol designed to provide communications security over a computer network. Although SSL has been deprecated in favor of TLS, the term is still commonly used to refer to TLS connections. SSL/TLS provides authentication, integrity, and confidentiality.",
    port: "443 (HTTPS), 993 (IMAPS), 995 (POP3S)",
    versions: ["SSLv2 (deprecated)", "SSLv3 (deprecated)", "TLS 1.0", "TLS 1.1", "TLS 1.2", "TLS 1.3"],
    advantages: [
      "Data encryption in transit",
      "Server authentication",
      "Data integrity protection",
      "Wide browser support",
      "Industry standard",
      "Certificate-based trust"
    ],
    disadvantages: [
      "Performance overhead",
      "Certificate management complexity",
      "Older versions vulnerable",
      "Implementation pitfalls",
      "Configuration complexity",
      "Cost of certificates"
    ],
    useCases: [
      "HTTPS websites",
      "Email encryption",
      "VPN connections",
      "API security",
      "Database connections",
      "File transfers",
      "Instant messaging",
      "IoT device communication",
      "Banking applications",
      "E-commerce platforms",
      "Healthcare systems",
      "Government services"
    ],
    examples: [
      {
        title: "SSL/TLS Handshake Process",
        code: `# TLS Handshake Steps:
1. Client Hello
   - TLS version, cipher suites, random number
   
2. Server Hello
   - Selected TLS version, cipher suite, random number
   - Server certificate
   - Server key exchange (if needed)
   - Certificate request (if client auth required)
   - Server hello done

3. Client Response
   - Certificate (if requested)
   - Client key exchange
   - Certificate verify (if client cert sent)
   - Change cipher spec
   - Finished message

4. Server Finish
   - Change cipher spec
   - Finished message

5. Application Data Exchange
   - Encrypted communication begins

# OpenSSL command to view handshake
openssl s_client -connect google.com:443 -showcerts`,
        explanation: "TLS handshake process showing the steps for establishing a secure connection."
      },
      {
        title: "Certificate Management",
        code: `# Generate private key
openssl genrsa -out private.key 2048

# Generate certificate signing request (CSR)
openssl req -new -key private.key -out certificate.csr

# Generate self-signed certificate
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365

# View certificate details
openssl x509 -in certificate.pem -text -noout

# Verify certificate chain
openssl verify -CAfile ca-bundle.pem certificate.pem

# Check certificate expiration
openssl x509 -in certificate.pem -enddate -noout

# Test SSL connection
openssl s_client -connect example.com:443 -servername example.com`,
        explanation: "Certificate management commands for generating, viewing, and validating SSL/TLS certificates."
      },
      {
        title: "SSL/TLS Configuration",
        code: `# Apache SSL configuration
<VirtualHost *:443>
    ServerName example.com
    DocumentRoot /var/www/html
    
    SSLEngine on
    SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256
    SSLHonorCipherOrder on
    
    SSLCertificateFile /path/to/certificate.pem
    SSLCertificateKeyFile /path/to/private.key
    SSLCertificateChainFile /path/to/chain.pem
</VirtualHost>

# Nginx SSL configuration
server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /path/to/certificate.pem;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;
    
    # HSTS header
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}`,
        explanation: "SSL/TLS configuration examples for Apache and Nginx web servers with security best practices."
      }
    ],
    diagrams: [
      {
        src: "/tls-handshake.png",
        alt: "TLS handshake diagram",
        caption: "TLS handshake process showing client-server communication steps"
      }
    ],
    relatedProtocols: ["tls", "https", "x509"],
    commonCommands: [
      {
        command: "openssl",
        description: "SSL/TLS toolkit",
        example: "openssl s_client -connect host:443"
      },
      {
        command: "curl",
        description: "Test SSL connections",
        example: "curl -vI https://example.com"
      }
    ],
    resources: [
      {
        title: "RFC 8446 - TLS 1.3",
        url: "https://tools.ietf.org/html/rfc8446",
        type: "RFC"
      },
      {
        title: "SSL Labs SSL Test",
        url: "https://www.ssllabs.com/ssltest/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Use TLS 1.2 or higher only",
      "Strong cipher suites",
      "Regular certificate renewal",
      "HSTS implementation",
      "Certificate pinning",
      "Monitor for vulnerabilities"
    ]
  }