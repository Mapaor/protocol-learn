import { Protocol } from "../../types/protocol";

export const NTLM: Protocol = {
    id: "ntlm",
    name: "NTLM",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "NT LAN Manager authentication protocol suite for Windows networks",
    fullDescription: "NTLM (NT LAN Manager) is a suite of Microsoft security protocols intended to provide authentication, integrity, and confidentiality to users. NTLM is the successor to the authentication protocol in Microsoft LAN Manager (LANMAN), an older Microsoft product, and is used in Windows networks for authentication.",
    port: "Various (445 SMB, 139 NetBIOS, 80/443 HTTP)",
    versions: ["LM", "NTLMv1", "NTLMv2", "NTLM2 Session"],
    advantages: [
      "Wide Windows compatibility",
      "No third-party infrastructure",
      "Challenge-response mechanism",
      "Password never sent",
      "Integrated with Windows",
      "Fallback authentication",
      "Single sign-on support",
      "Domain authentication"
    ],
    disadvantages: [
      "Vulnerable to various attacks",
      "No mutual authentication",
      "Weak cryptography (older versions)",
      "Pass-the-hash vulnerability",
      "Relay attack susceptibility",
      "Limited cross-platform support",
      "No time synchronization",
      "Difficult to troubleshoot"
    ],
    useCases: [
      "Windows domain authentication",
      "File server access",
      "Web application authentication",
      "Legacy system integration",
      "Remote desktop access",
      "Database authentication",
      "Email server authentication",
      "Network printer access",
      "VPN authentication",
      "SharePoint authentication",
      "Exchange server access",
      "Backup software authentication"
    ],
    examples: [
      {
        title: "NTLM Authentication Flow",
        code: `# NTLM Authentication Process (3-way handshake)

# Type 1 Message (Negotiate)
Client -> Server: NTLM Type 1 Message
- Protocol: NTLMSSP
- Message Type: 1 (Negotiate)
- Flags: Negotiate flags
- Domain: Client domain (optional)
- Workstation: Client workstation (optional)

# Type 2 Message (Challenge)
Server -> Client: NTLM Type 2 Message  
- Protocol: NTLMSSP
- Message Type: 2 (Challenge)
- Target Name: Server/domain name
- Flags: Negotiated flags
- Challenge: 8-byte random challenge
- Target Info: Server information (NTLMv2)

# Type 3 Message (Authentication)
Client -> Server: NTLM Type 3 Message
- Protocol: NTLMSSP
- Message Type: 3 (Authentication)
- LM Response: LM/LMv2 response
- NTLM Response: NTLM/NTLMv2 response
- Domain: User domain
- Username: Username
- Workstation: Client workstation
- Session Key: Encrypted session key (optional)

# NTLM Hash Calculation
MD4(UTF-16LE(password)) = NTLM Hash

# NTLMv1 Response Calculation
DES(NTLM_Hash[0:7], challenge) + DES(NTLM_Hash[7:14], challenge) + DES(NTLM_Hash[14:16]+padding, challenge)

# NTLMv2 Response Calculation
HMAC-MD5(NTLMv2_Hash, challenge + client_challenge + timestamp + target_info)

# NTLM Message Format
struct NTLM_MESSAGE {
    char signature[8];     // "NTLMSSP\\0"
    uint32_t message_type; // 1, 2, or 3
    // Variable length fields follow
};`,
        explanation: "NTLM authentication protocol flow and message structure."
      },
      {
        title: "NTLM Configuration and Security",
        code: `# Windows NTLM Configuration

# Registry settings for NTLM
# HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Lsa

# LAN Manager Authentication Level
# 0: Send LM and NTLM responses
# 1: Send LM and NTLM - use NTLMv2 session if negotiated
# 2: Send NTLM response only
# 3: Send NTLMv2 response only
# 4: Send NTLMv2 response only, refuse LM
# 5: Send NTLMv2 response only, refuse LM and NTLM

# Set to most secure level
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa" /v LmCompatibilityLevel /t REG_DWORD /d 5

# Require NTLMv2 authentication
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\MSV1_0" /v NTLMMinClientSec /t REG_DWORD /d 0x20080000
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\MSV1_0" /v NTLMMinServerSec /t REG_DWORD /d 0x20080000

# Disable NTLM authentication (if possible)
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\MSV1_0" /v RestrictSendingNTLMTraffic /t REG_DWORD /d 2

# IIS NTLM Configuration
# web.config
<configuration>
  <system.web>
    <authentication mode="Windows" />
    <authorization>
      <deny users="?" />
    </authorization>
  </system.web>
  <system.webServer>
    <security>
      <authentication>
        <windowsAuthentication enabled="true">
          <providers>
            <clear />
            <add value="Negotiate" />
            <add value="NTLM" />
          </providers>
        </windowsAuthentication>
        <anonymousAuthentication enabled="false" />
      </authentication>
    </security>
  </system.webServer>
</configuration>

# Apache NTLM Configuration (mod_auth_ntlm_winbind)
<Location /secure>
    AuthName "NTLM Authentication"
    AuthType NTLM
    NTLMAuth on
    NtmlDomain DOMAIN
    NTLMServer 192.168.1.10
    require valid-user
</Location>

# Nginx NTLM Configuration (auth_request module)
location /auth {
    internal;
    proxy_pass http://ntlm-auth-server;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
}

location /secure {
    auth_request /auth;
    proxy_pass http://backend;
}

# PowerShell NTLM monitoring
# Check NTLM usage
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4624} | 
    Where-Object {$_.Message -like "*NTLM*"} | 
    Select-Object TimeCreated, Id, LevelDisplayName, Message

# Monitor NTLM authentication events
Get-WinEvent -FilterHashtable @{LogName='System'; ID=5805} |
    Format-Table TimeCreated, LevelDisplayName, Message -AutoSize`,
        explanation: "NTLM security configuration and monitoring across different platforms."
      },
      {
        title: "NTLM Security Testing and Mitigation",
        code: `# NTLM Security Assessment Tools

# Responder - NTLM hash capture tool
# Capture NTLM hashes on network
python Responder.py -I eth0 -A

# SMB relay attack
python ntlmrelayx.py -t 192.168.1.100 -smb2support

# NTLM brute force with hydra
hydra -l username -P passwords.txt smb://192.168.1.100

# John the Ripper NTLM hash cracking
john --format=NT ntlm_hashes.txt --wordlist=rockyou.txt

# Hashcat NTLM cracking
hashcat -m 1000 ntlm_hashes.txt rockyou.txt

# Python NTLM client implementation
import base64
import hashlib
import hmac
import struct
from Crypto.Cipher import DES

class NTLMClient:
    def __init__(self, username, password, domain=""):
        self.username = username
        self.password = password
        self.domain = domain
        self.ntlm_hash = self._ntlm_hash(password)
    
    def _ntlm_hash(self, password):
        return hashlib.new('md4', password.encode('utf-16le')).digest()
    
    def _lm_response(self, challenge):
        # Deprecated - should not be used
        pass
    
    def _ntlm_response(self, challenge):
        # NTLMv1 response (weak - avoid if possible)
        key1 = self.ntlm_hash[:7]
        key2 = self.ntlm_hash[7:14]
        key3 = self.ntlm_hash[14:] + b'\\x00' * 5
        
        resp1 = self._des_encrypt(key1, challenge)
        resp2 = self._des_encrypt(key2, challenge)
        resp3 = self._des_encrypt(key3, challenge)
        
        return resp1 + resp2 + resp3
    
    def _ntlmv2_response(self, challenge, server_challenge, timestamp, target_info):
        # NTLMv2 response (recommended)
        ntlmv2_hash = hmac.new(
            self.ntlm_hash,
            (self.username.upper() + self.domain).encode('utf-16le'),
            hashlib.md5
        ).digest()
        
        client_challenge = b'\\x01\\x01' + b'\\x00' * 6 + timestamp + server_challenge + b'\\x00' * 4 + target_info + b'\\x00' * 4
        
        response = hmac.new(ntlmv2_hash, challenge + client_challenge, hashlib.md5).digest()
        
        return response + client_challenge
    
    def create_type1_message(self):
        # NTLM Type 1 message
        signature = b'NTLMSSP\\x00'
        message_type = struct.pack('<I', 1)
        flags = struct.pack('<I', 0xb207)
        
        return signature + message_type + flags
    
    def process_type2_message(self, type2_data):
        # Parse Type 2 message and extract challenge
        challenge = type2_data[24:32]
        return challenge
    
    def create_type3_message(self, challenge):
        # NTLM Type 3 message with authentication response
        signature = b'NTLMSSP\\x00'
        message_type = struct.pack('<I', 3)
        
        # Calculate responses
        lm_response = b'\\x00' * 24  # Empty LM response
        ntlm_response = self._ntlm_response(challenge)
        
        # Build message (simplified)
        message = signature + message_type
        # Add domain, username, workstation, responses...
        
        return message

# NTLM detection and prevention
def detect_ntlm_attacks():
    # Monitor for NTLM relay attempts
    import subprocess
    
    # Check for suspicious SMB connections
    result = subprocess.run(['netstat', '-an'], capture_output=True, text=True)
    
    suspicious_ports = ['445', '139']
    connections = []
    
    for line in result.stdout.split('\\n'):
        for port in suspicious_ports:
            if f':{port}' in line and 'ESTABLISHED' in line:
                connections.append(line.strip())
    
    return connections

# NTLM hardening checklist
def ntlm_security_audit():
    checks = {
        'lm_compatibility_level': 'Check if LMCompatibilityLevel >= 3',
        'ntlmv2_required': 'Verify NTLMv2 is required',
        'ntlm_disabled': 'Check if NTLM is disabled where possible',
        'smb_signing': 'Verify SMB signing is enabled',
        'ldap_signing': 'Check LDAP signing requirements',
        'channel_binding': 'Verify channel binding is enabled'
    }
    
    return checks`,
        explanation: "NTLM security testing tools and mitigation strategies."
      }
    ],
    diagrams: [
      {
        src: "/ntlm_flow.png",
        alt: "NTLM authentication flow",
        caption: "NTLM three-way authentication handshake process"
      },
      {
        src: "/ntlm_attacks.jpg",
        alt: "NTLM attack vectors",
        caption: "Common NTLM attack methods and vulnerabilities"
      }
    ],
    relatedProtocols: ["kerberos", "smb", "http", "ldap"],
    resources: [
      {
        title: "Microsoft NTLM Documentation",
        url: "https://docs.microsoft.com/en-us/windows/win32/secauthn/microsoft-ntlm",
        type: "Documentation"
      },
      {
        title: "NTLM Security Guide",
        url: "https://docs.microsoft.com/en-us/windows-server/security/",
        type: "Guide"
      },
      {
        title: "NTLM Attacks and Defenses",
        url: "https://www.sans.org/white-papers/",
        type: "Whitepaper"
      }
    ],
    securityConsiderations: [
      "Disable LM and NTLMv1",
      "Require NTLMv2 authentication",
      "Enable SMB signing",
      "Implement LDAP signing",
      "Use Kerberos where possible",
      "Monitor for relay attacks",
      "Implement network segmentation",
      "Regular security assessments"
    ]
  }