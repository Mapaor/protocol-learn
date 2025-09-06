import { Protocol } from "../../types/protocol";

export const PKCS: Protocol = {
    id: "pkcs",
    name: "PKCS",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Public Key Cryptography Standards for cryptographic data structures",
    fullDescription: "PKCS (Public Key Cryptography Standards) are a group of public key cryptography standards devised and published by RSA Security LLC. These standards specify various cryptographic data structures, algorithms, and protocols for secure communications and data protection.",
    port: "N/A (File formats and standards)",
    versions: ["PKCS #1", "PKCS #7", "PKCS #8", "PKCS #10", "PKCS #11", "PKCS #12"],
    advantages: [
      "Standardized cryptography",
      "Interoperability",
      "Comprehensive coverage",
      "Industry adoption",
      "Security proven algorithms",
      "Multiple key formats",
      "Certificate management",
      "Hardware token support"
    ],
    disadvantages: [
      "Complex implementation",
      "Version compatibility",
      "Legacy security issues",
      "Performance overhead",
      "Key management complexity",
      "Format variations",
      "Dependency requirements",
      "Configuration challenges"
    ],
    useCases: [
      "Digital certificates",
      "Code signing",
      "Email encryption",
      "SSL/TLS certificates",
      "Smart card authentication",
      "Document signing",
      "Key storage",
      "Hardware security modules",
      "Identity management",
      "Secure communications",
      "PKI infrastructure",
      "Token-based authentication"
    ],
    examples: [
      {
        title: "PKCS Standards Overview",
        code: `# Major PKCS Standards

PKCS #1: RSA Cryptography Standard
- RSA public and private key structures
- RSA signature and encryption schemes
- OAEP and PSS padding

PKCS #7: Cryptographic Message Syntax (CMS)
- Digital envelopes
- Digital signatures
- Certificate transport
- Encrypted data structures

PKCS #8: Private-Key Information Syntax
- Encrypted and unencrypted private keys
- Algorithm identifiers
- Key derivation functions

PKCS #10: Certification Request Syntax
- Certificate signing requests (CSR)
- Subject information
- Public key information

PKCS #11: Cryptographic Token Interface
- Hardware security module API
- Smart card interface
- Token management functions

PKCS #12: Personal Information Exchange Syntax
- Password-protected key and certificate storage
- .pfx and .p12 file formats
- Integrity protection`,
        explanation: "Overview of major PKCS standards and their purposes."
      },
      {
        title: "PKCS File Operations",
        code: `#!/usr/bin/env python3
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives.serialization import pkcs12
from cryptography import x509
import base64

class PKCSHandler:
    def __init__(self):
        self.private_key = None
        self.certificate = None
    
    def generate_rsa_key(self, key_size=2048):
        """Generate RSA private key (PKCS #1)"""
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=key_size
        )
        return self.private_key
    
    def export_private_key_pkcs8(self, password=None):
        """Export private key in PKCS #8 format"""
        if password:
            encryption = serialization.BestAvailableEncryption(password.encode())
        else:
            encryption = serialization.NoEncryption()
        
        return self.private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=encryption
        )
    
    def load_private_key_pkcs8(self, pem_data, password=None):
        """Load private key from PKCS #8 format"""
        self.private_key = serialization.load_pem_private_key(
            pem_data,
            password=password.encode() if password else None
        )
        return self.private_key
    
    def create_csr_pkcs10(self, subject_name):
        """Create Certificate Signing Request (PKCS #10)"""
        subject = x509.Name([
            x509.NameAttribute(x509.NameOID.COUNTRY_NAME, subject_name.get('country', 'US')),
            x509.NameAttribute(x509.NameOID.STATE_OR_PROVINCE_NAME, subject_name.get('state', 'CA')),
            x509.NameAttribute(x509.NameOID.LOCALITY_NAME, subject_name.get('city', 'San Francisco')),
            x509.NameAttribute(x509.NameOID.ORGANIZATION_NAME, subject_name.get('org', 'Example Corp')),
            x509.NameAttribute(x509.NameOID.COMMON_NAME, subject_name.get('cn', 'example.com')),
        ])
        
        csr = x509.CertificateSigningRequestBuilder().subject_name(
            subject
        ).add_extension(
            x509.SubjectAlternativeName([
                x509.DNSName(subject_name.get('cn', 'example.com')),
            ]),
            critical=False,
        ).sign(self.private_key, hashes.SHA256())
        
        return csr.public_bytes(serialization.Encoding.PEM)
    
    def create_pkcs12(self, certificate_pem, password):
        """Create PKCS #12 bundle (.p12/.pfx)"""
        cert = x509.load_pem_x509_certificate(certificate_pem)
        
        p12_bytes = pkcs12.serialize_key_and_certificates(
            name=b"My Certificate",
            key=self.private_key,
            cert=cert,
            cas=None,  # Additional CA certificates
            encryption_algorithm=serialization.BestAvailableEncryption(password.encode())
        )
        
        return p12_bytes
    
    def load_pkcs12(self, p12_data, password):
        """Load PKCS #12 bundle"""
        private_key, certificate, additional_certs = pkcs12.load_key_and_certificates(
            p12_data, password.encode()
        )
        
        self.private_key = private_key
        self.certificate = certificate
        
        return {
            'private_key': private_key,
            'certificate': certificate,
            'additional_certs': additional_certs
        }

# Usage examples
def main():
    handler = PKCSHandler()
    
    # Generate RSA key
    print("Generating RSA key...")
    handler.generate_rsa_key(2048)
    
    # Export private key (PKCS #8)
    private_key_pem = handler.export_private_key_pkcs8(password="secret123")
    print("Private Key (PKCS #8):")
    print(private_key_pem.decode())
    
    # Create CSR (PKCS #10)
    subject = {
        'country': 'US',
        'state': 'California',
        'city': 'San Francisco',
        'org': 'Example Corporation',
        'cn': 'www.example.com'
    }
    
    csr_pem = handler.create_csr_pkcs10(subject)
    print("\\nCertificate Signing Request (PKCS #10):")
    print(csr_pem.decode())

# OpenSSL command equivalents:
# openssl genrsa -out private.key 2048
# openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private.key -out private_pkcs8.key
# openssl req -new -key private.key -out request.csr
# openssl pkcs12 -export -out certificate.p12 -inkey private.key -in certificate.crt`,
        explanation: "Python implementation for handling various PKCS formats."
      },
      {
        title: "PKCS #11 Token Interface",
        code: `#!/usr/bin/env python3
# Example using PyKCS11 library for hardware token access

import PyKCS11
import binascii

class PKCS11Manager:
    def __init__(self, library_path):
        self.library_path = library_path
        self.pkcs11 = PyKCS11.PyKCS11Lib()
        self.session = None
    
    def initialize(self):
        """Initialize PKCS #11 library"""
        self.pkcs11.load(self.library_path)
        return True
    
    def list_slots(self):
        """List available token slots"""
        slots = self.pkcs11.getSlotList(tokenPresent=True)
        slot_info = []
        
        for slot in slots:
            info = self.pkcs11.getSlotInfo(slot)
            token_info = self.pkcs11.getTokenInfo(slot)
            
            slot_info.append({
                'slot_id': slot,
                'description': info.slotDescription.strip(),
                'token_label': token_info.label.strip(),
                'manufacturer': token_info.manufacturerID.strip()
            })
        
        return slot_info
    
    def open_session(self, slot_id, pin):
        """Open session with token"""
        self.session = self.pkcs11.openSession(slot_id, PyKCS11.CKF_SERIAL_SESSION | PyKCS11.CKF_RW_SESSION)
        self.session.login(pin)
        return self.session
    
    def find_objects(self, template):
        """Find objects on token"""
        return self.session.findObjects(template)
    
    def list_certificates(self):
        """List certificates on token"""
        template = [
            (PyKCS11.CKA_CLASS, PyKCS11.CKO_CERTIFICATE),
            (PyKCS11.CKA_CERTIFICATE_TYPE, PyKCS11.CKC_X_509)
        ]
        
        certificates = self.session.findObjects(template)
        cert_list = []
        
        for cert in certificates:
            attrs = self.session.getAttributeValue(cert, [
                PyKCS11.CKA_LABEL,
                PyKCS11.CKA_VALUE,
                PyKCS11.CKA_SUBJECT
            ])
            
            cert_list.append({
                'handle': cert,
                'label': attrs[0],
                'der_data': bytes(attrs[1]),
                'subject': bytes(attrs[2])
            })
        
        return cert_list
    
    def list_private_keys(self):
        """List private keys on token"""
        template = [
            (PyKCS11.CKA_CLASS, PyKCS11.CKO_PRIVATE_KEY),
            (PyKCS11.CKA_KEY_TYPE, PyKCS11.CKK_RSA)
        ]
        
        keys = self.session.findObjects(template)
        key_list = []
        
        for key in keys:
            attrs = self.session.getAttributeValue(key, [
                PyKCS11.CKA_LABEL,
                PyKCS11.CKA_ID,
                PyKCS11.CKA_MODULUS
            ])
            
            key_list.append({
                'handle': key,
                'label': attrs[0],
                'id': binascii.hexlify(bytes(attrs[1])),
                'modulus_bits': len(attrs[2]) * 8
            })
        
        return key_list
    
    def sign_data(self, private_key_handle, data):
        """Sign data using private key on token"""
        mechanism = PyKCS11.Mechanism(PyKCS11.CKM_SHA256_RSA_PKCS, None)
        signature = self.session.sign(private_key_handle, data, mechanism)
        return bytes(signature)
    
    def close_session(self):
        """Close session and logout"""
        if self.session:
            self.session.logout()
            self.session.closeSession()

# Usage example (requires hardware token)
def main():
    # Common PKCS #11 library paths
    library_paths = [
        "/usr/lib/opensc-pkcs11.so",  # OpenSC
        "/usr/lib/libeTPkcs11.so",    # Gemalto
        "/usr/lib/libcryptoki.so"     # Generic
    ]
    
    for lib_path in library_paths:
        try:
            manager = PKCS11Manager(lib_path)
            manager.initialize()
            
            slots = manager.list_slots()
            if slots:
                print(f"Found {len(slots)} token(s)")
                for slot in slots:
                    print(f"  Slot {slot['slot_id']}: {slot['token_label']}")
                
                # Example: open session with first slot
                # manager.open_session(slots[0]['slot_id'], "1234")
                # certs = manager.list_certificates()
                # keys = manager.list_private_keys()
                # manager.close_session()
            
            break
        except Exception as e:
            continue`,
        explanation: "PKCS #11 interface for hardware security modules and smart cards."
      }
    ],
    diagrams: [
      {
        src: "/pkcs_standards.png",
        alt: "PKCS standards overview",
        caption: "PKCS family of cryptographic standards and their relationships"
      },
      {
        src: "/pkcs11_architecture.jpg",
        alt: "PKCS #11 architecture",
        caption: "PKCS #11 cryptographic token interface architecture"
      }
    ],
    relatedProtocols: ["x509", "ssl", "tls", "pki"],
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
        title: "OASIS PKCS #11 Specifications",
        url: "https://www.oasis-open.org/committees/pkcs11/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Secure key generation",
      "Proper random number generation",
      "Key storage protection",
      "Access control mechanisms",
      "Regular security updates",
      "Hardware security modules",
      "Certificate validation",
      "Secure communication channels"
    ]
  }