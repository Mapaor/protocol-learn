import { Protocol } from "../../types/protocol";

export const SFTP: Protocol = {
    id: "sftp",
    name: "SFTP",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "SSH File Transfer Protocol for secure file transfers",
    fullDescription: "SFTP (SSH File Transfer Protocol) is a network protocol that provides file access, file transfer, and file management over any reliable data stream. It was designed as an extension of the Secure Shell protocol (SSH) version 2.0 to provide secure file transfer capability.",
    port: "22",
    versions: ["SFTP v3", "SFTP v4", "SFTP v5", "SFTP v6"],
    advantages: [
      "Encrypted file transfers",
      "Authentication through SSH",
      "Single connection for control and data",
      "Resume interrupted transfers",
      "Directory operations support",
      "File permission management"
    ],
    disadvantages: [
      "SSH overhead affects performance",
      "More complex setup than FTP",
      "Limited server software options",
      "Requires SSH knowledge"
    ],
    useCases: [
      "Secure file transfers",
      "Automated backup systems",
      "Remote server management",
      "Secure data exchange",
      "DevOps deployments",
      "Log file collection",
      "Configuration management",
      "Secure document sharing",
      "Enterprise file transfers",
      "Compliance-required transfers"
    ],
    examples: [
      {
        title: "SFTP Connection Example",
        code: `sftp user@example.com
Connected to example.com.
sftp> pwd
Remote working directory: /home/user
sftp> ls
Documents    Downloads    Pictures
sftp> put localfile.txt
Uploading localfile.txt to /home/user/localfile.txt
localfile.txt                    100%  1024   1.0KB/s   00:01
sftp> get remotefile.txt
Fetching /home/user/remotefile.txt to remotefile.txt
remotefile.txt                   100%  2048   2.0KB/s   00:01
sftp> quit`,
        explanation: "A typical SFTP session showing connection, directory listing, file upload and download operations."
      }
    ],
    relatedProtocols: ["ssh", "ftp", "scp"],
    commonCommands: [
      {
        command: "sftp",
        description: "Connect to SFTP server",
        example: "sftp user@server.com"
      },
      {
        command: "put",
        description: "Upload file to server",
        example: "put localfile.txt /remote/path/"
      },
      {
        command: "get",
        description: "Download file from server",
        example: "get /remote/file.txt localfile.txt"
      }
    ],
    resources: [
      {
        title: "RFC 4253 - SSH Transport Layer Protocol",
        url: "https://tools.ietf.org/html/rfc4253",
        type: "RFC"
      },
      {
        title: "WinSCP SFTP Client",
        url: "https://winscp.net/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Uses SSH encryption",
      "Key-based authentication recommended",
      "Host key verification important",
      "Regular security updates needed"
    ]
  }