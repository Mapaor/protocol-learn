import { Protocol } from "../../types/protocol";

export const SMB: Protocol = {
    id: "smb",
    name: "SMB",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "Server Message Block protocol for file and printer sharing",
    fullDescription: "SMB (Server Message Block) is a network communication protocol for providing shared access to files, printers, and serial ports between nodes on a network. It's primarily used by Microsoft Windows systems but has been implemented on other platforms.",
    port: "445 (SMB), 139 (NetBIOS over TCP)",
    versions: ["SMB1/CIFS", "SMB2", "SMB2.1", "SMB3.0", "SMB3.1.1"],
    advantages: [
      "Wide platform support",
      "Integrated with Windows",
      "File and printer sharing",
      "Authentication integration",
      "Performance optimizations",
      "Encryption support",
      "Opportunistic locking",
      "Directory change notifications"
    ],
    disadvantages: [
      "Security vulnerabilities",
      "Protocol complexity",
      "Performance over WAN",
      "Legacy version issues",
      "Configuration complexity",
      "Firewall complications",
      "Bandwidth intensive",
      "Platform dependencies"
    ],
    useCases: [
      "Windows file sharing",
      "Network attached storage",
      "Printer sharing",
      "Home directories",
      "Shared applications",
      "Backup solutions",
      "Media streaming",
      "Cross-platform file access",
      "Domain-based sharing",
      "Cluster file systems",
      "Virtual machine storage",
      "Database file access"
    ],
    examples: [
      {
        title: "SMB Connection Process",
        code: `# SMB Connection Establishment
1. TCP Connection (Port 445)
Client -> Server: TCP SYN
Server -> Client: TCP SYN-ACK
Client -> Server: TCP ACK

2. SMB Negotiate Protocol
Client -> Server: SMB2 NEGOTIATE Request
   - Dialects: SMB2.0, SMB2.1, SMB3.0
   - Security Mode: Signing Required
   - Capabilities: DFS, LEASING, LARGE_MTU

Server -> Client: SMB2 NEGOTIATE Response
   - Dialect: SMB3.0
   - Security Mode: Signing Required
   - Server GUID: ...

3. Session Setup
Client -> Server: SMB2 SESSION_SETUP Request
   - Security Buffer: NTLMSSP/Kerberos

Server -> Client: SMB2 SESSION_SETUP Response
   - Session ID: 0x12345
   - Security Buffer: Challenge/Response

4. Tree Connect
Client -> Server: SMB2 TREE_CONNECT Request
   - Path: \\\\server\\share

Server -> Client: SMB2 TREE_CONNECT Response
   - Tree ID: 0x67890`,
        explanation: "SMB protocol connection and authentication process."
      },
      {
        title: "Samba Configuration",
        code: `# /etc/samba/smb.conf
[global]
    workgroup = WORKGROUP
    server string = Samba Server
    security = user
    encrypt passwords = yes
    
    # SMB Protocol versions
    min protocol = SMB2
    max protocol = SMB3
    
    # Security settings
    server signing = mandatory
    client signing = mandatory
    
    # Performance tuning
    socket options = TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072
    read size = 16384
    max xmit = 32768
    
    # Logging
    log file = /var/log/samba/log.%m
    log level = 2

[homes]
    comment = Home Directories
    browseable = no
    writable = yes
    valid users = %S

[shared]
    comment = Shared Documents
    path = /srv/samba/shared
    browseable = yes
    writable = yes
    valid users = @users
    create mask = 0664
    directory mask = 0775`,
        explanation: "Samba server configuration for SMB file sharing."
      },
      {
        title: "SMB Client Commands",
        code: `# Linux SMB client operations

# Mount SMB share
sudo mount -t cifs //server/share /mnt/smb \\
    -o username=user,password=pass,iocharset=utf8,vers=3.0

# List shares
smbclient -L //server -U username

# Interactive SMB session
smbclient //server/share -U username
smb: \\> ls
smb: \\> get file.txt
smb: \\> put localfile.txt
smb: \\> mkdir newfolder
smb: \\> cd newfolder

# Copy files with authentication
smbclient //server/share -U username -c "put file.txt"

# Windows SMB access
net use Z: \\\\server\\share /user:domain\\username password

# Show SMB connections
net use

# Disconnect SMB share
net use Z: /delete

# PowerShell SMB cmdlets
New-SmbMapping -LocalPath "Z:" -RemotePath "\\\\server\\share"
Get-SmbMapping
Remove-SmbMapping -LocalPath "Z:"`,
        explanation: "SMB client commands for Linux and Windows systems."
      }
    ],
    diagrams: [
      {
        src: "/smb_architecture.png",
        alt: "SMB architecture",
        caption: "SMB protocol stack and network file sharing architecture"
      },
      {
        src: "/smb_versions.jpg",
        alt: "SMB versions comparison",
        caption: "Evolution and features of SMB protocol versions"
      }
    ],
    relatedProtocols: ["cifs", "netbios", "tcp", "kerberos"],
    resources: [
      {
        title: "SMB Protocol Documentation",
        url: "https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-smb2/",
        type: "Documentation"
      },
      {
        title: "Samba Project",
        url: "https://www.samba.org/",
        type: "Tool"
      },
      {
        title: "SMB Security Best Practices",
        url: "https://docs.microsoft.com/en-us/windows-server/storage/file-server/",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Disable SMBv1 protocol",
      "Use SMB encryption",
      "Strong authentication",
      "Network segmentation",
      "Access control lists",
      "Regular security updates",
      "Monitor SMB traffic",
      "Implement signing"
    ]
  }