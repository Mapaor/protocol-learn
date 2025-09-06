import { Protocol } from "../../types/protocol";

export const CIFS: Protocol = {
    id: "cifs",
    name: "CIFS",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "Common Internet File System for network file sharing",
    fullDescription: "CIFS (Common Internet File System) is a network filesystem protocol and the predecessor to SMB. It's an implementation of the Server Message Block (SMB) protocol that allows applications and users to access files and directories on remote computers over a network.",
    port: "445 (direct), 139 (NetBIOS)",
    versions: ["CIFS 1.0", "Enhanced CIFS"],
    advantages: [
      "Cross-platform support",
      "Internet-ready protocol",
      "File and print sharing",
      "Authentication support",
      "Caching mechanisms",
      "Unicode support",
      "Large file support",
      "Network browsing"
    ],
    disadvantages: [
      "Security vulnerabilities",
      "Performance limitations",
      "Complex implementation",
      "Legacy protocol issues",
      "Limited encryption",
      "Firewall complications",
      "Version compatibility",
      "Bandwidth overhead"
    ],
    useCases: [
      "Legacy file sharing",
      "Cross-platform access",
      "Network storage",
      "Application data sharing",
      "Backup systems",
      "Media file access",
      "Document collaboration",
      "Home directory services",
      "Printer sharing",
      "Database file access",
      "Virtual machine storage",
      "Cloud storage gateways"
    ],
    examples: [
      {
        title: "CIFS Protocol Structure",
        code: `# CIFS Message Format
+------------------+
| NetBIOS Header   | (4 bytes)
+------------------+
| SMB Header       | (32 bytes)
+------------------+
| Parameter Block  | (variable)
+------------------+
| Data Block       | (variable)
+------------------+

# CIFS Commands
- SMB_COM_NEGOTIATE: Protocol negotiation
- SMB_COM_SESSION_SETUP_ANDX: Authentication
- SMB_COM_TREE_CONNECT_ANDX: Share connection
- SMB_COM_OPEN_ANDX: File open
- SMB_COM_READ_ANDX: File read
- SMB_COM_WRITE_ANDX: File write
- SMB_COM_CLOSE: File close
- SMB_COM_TREE_DISCONNECT: Share disconnect
- SMB_COM_LOGOFF_ANDX: Session termination

# CIFS Transaction Types
- Trans2: Extended file operations
- NT Trans: Windows NT specific operations
- Mailslot: Connectionless messaging
- Named Pipe: IPC mechanism`,
        explanation: "CIFS protocol structure and command overview."
      },
      {
        title: "CIFS Mount Options",
        code: `# Linux CIFS mount options
mount -t cifs //server/share /mnt/point -o options

# Common mount options:
username=user          # Authentication username
password=pass          # Authentication password
domain=DOMAIN         # Windows domain
workgroup=WORKGROUP   # Workgroup name
uid=1000              # Local user ID mapping
gid=1000              # Local group ID mapping
iocharset=utf8        # Character encoding
file_mode=0644        # File permissions
dir_mode=0755         # Directory permissions
vers=1.0              # CIFS version
sec=ntlm              # Security mechanism
cache=strict          # Caching mode
rsize=16384           # Read buffer size
wsize=16384           # Write buffer size

# Example fstab entry
//server/share /mnt/cifs cifs username=user,password=pass,uid=1000,gid=1000,iocharset=utf8 0 0

# Credentials file approach
//server/share /mnt/cifs cifs credentials=/etc/cifs-credentials,uid=1000,gid=1000 0 0

# /etc/cifs-credentials
username=myuser
password=mypassword
domain=MYDOMAIN`,
        explanation: "CIFS mount configuration and credential management."
      },
      {
        title: "CIFS Client Programming",
        code: `# Python CIFS client using pysmb
from smb.SMBConnection import SMBConnection
import tempfile

class CIFSClient:
    def __init__(self, server_ip, username, password, domain=''):
        self.server_ip = server_ip
        self.username = username
        self.password = password
        self.domain = domain
        self.conn = None
    
    def connect(self, server_name, client_name='client'):
        self.conn = SMBConnection(
            self.username, 
            self.password,
            client_name,
            server_name,
            domain=self.domain,
            use_ntlm_v2=True
        )
        
        return self.conn.connect(self.server_ip, 139)
    
    def list_shares(self):
        if self.conn:
            return self.conn.listShares()
        return []
    
    def list_files(self, share_name, path='/'):
        if self.conn:
            return self.conn.listPath(share_name, path)
        return []
    
    def download_file(self, share_name, remote_path, local_path):
        if self.conn:
            with open(local_path, 'wb') as file:
                self.conn.retrieveFile(share_name, remote_path, file)
                return True
        return False
    
    def upload_file(self, share_name, local_path, remote_path):
        if self.conn:
            with open(local_path, 'rb') as file:
                self.conn.storeFile(share_name, remote_path, file)
                return True
        return False
    
    def disconnect(self):
        if self.conn:
            self.conn.close()

# Usage example
client = CIFSClient('192.168.1.100', 'user', 'password')
if client.connect('SERVER'):
    shares = client.list_shares()
    files = client.list_files('Documents')
    client.download_file('Documents', '/file.txt', './local_file.txt')
    client.disconnect()`,
        explanation: "Python CIFS client implementation using pysmb library."
      }
    ],
    diagrams: [
      {
        src: "/cifs_architecture.png",
        alt: "CIFS architecture",
        caption: "CIFS protocol architecture and network file system structure"
      },
      {
        src: "/cifs_vs_smb.jpg",
        alt: "CIFS vs SMB comparison",
        caption: "Comparison between CIFS and modern SMB versions"
      }
    ],
    relatedProtocols: ["smb", "netbios", "ntlm", "tcp"],
    resources: [
      {
        title: "CIFS Technical Reference",
        url: "https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-cifs/",
        type: "Documentation"
      },
      {
        title: "Samba CIFS Documentation",
        url: "https://www.samba.org/cifs/",
        type: "Documentation"
      },
      {
        title: "CIFS Utils",
        url: "https://wiki.samba.org/index.php/LinuxCIFS_utils",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Upgrade to modern SMB versions",
      "Strong authentication mechanisms",
      "Network encryption",
      "Access control implementation",
      "Regular security patches",
      "Network segmentation",
      "Monitor file access",
      "Disable legacy features"
    ]
  }