import { Protocol } from "../../types/protocol";

export const FTP: Protocol = {
    id: "ftp",
    name: "FTP",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "File Transfer Protocol for exchanging files over networks",
    fullDescription: "FTP is a standard network protocol used for transferring files between a client and server. It uses separate control and data connections, making it efficient for large file transfers.",
    port: "20 (data), 21 (control)",
    versions: ["FTP", "FTPS", "SFTP"],
    advantages: [
      "Efficient for large file transfers",
      "Resume interrupted transfers",
      "Directory listing capabilities",
      "Multiple transfer modes",
      "Widely supported"
    ],
    disadvantages: [
      "Not secure by default",
      "Complex firewall configuration",
      "Passive/Active mode complications",
      "Plain text authentication",
      "Separate data connection required"
    ],
    useCases: [
      "Website deployment",
      "Backup operations",
      "Large file distribution",
      "Legacy system integration",
      "Bulk data transfer",
      "Content management systems",
      "Media file uploads",
      "Log file collection",
      "Software distribution",
      "Database backups",
      "Server maintenance",
      "Configuration file sync"
    ],
    examples: [
      {
        title: "FTP Session Example",
        code: `220 Welcome to FTP server
USER anonymous
331 Please specify the password
PASS guest@example.com
230 Login successful
PWD
257 "/" is current directory
LIST
150 Opening data connection
226 Transfer complete
QUIT
221 Goodbye`,
        explanation: "A typical FTP session showing login, directory listing, and logout commands."
      }
    ],
    diagrams: [
      {
        src: "/ftp.gif",
        alt: "FTP protocol communication",
        caption: "FTP control and data channel communication flow"
      }
    ],
    relatedProtocols: ["sftp", "ftps", "scp"],
    commonCommands: [
      {
        command: "ftp",
        description: "Connect to FTP server",
        example: "ftp ftp.example.com"
      },
      {
        command: "put",
        description: "Upload file to server",
        example: "put localfile.txt remotefile.txt"
      },
      {
        command: "get",
        description: "Download file from server",
        example: "get remotefile.txt localfile.txt"
      }
    ],
    resources: [
      {
        title: "RFC 959 - File Transfer Protocol",
        url: "https://tools.ietf.org/html/rfc959",
        type: "RFC"
      },
      {
        title: "FileZilla FTP Client",
        url: "https://filezilla-project.org/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Credentials transmitted in plain text",
      "Data not encrypted",
      "Use FTPS or SFTP for security",
      "Firewall configuration challenges"
    ],
    modernAlternatives: ["SFTP", "FTPS", "SCP", "HTTPS file upload"]
  }