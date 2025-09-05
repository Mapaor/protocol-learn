import { Protocol } from "../../types/protocol";

export const SCP: Protocol =  {
    id: "scp",
    name: "SCP",
    category: "Files",
    difficulty: "Beginner",
    shortDescription: "Secure Copy Protocol for simple secure file transfers",
    fullDescription: "SCP (Secure Copy Protocol) is a means of securely transferring computer files between a local host and a remote host or between two remote hosts. It is based on the Secure Shell (SSH) protocol.",
    port: "22",
    advantages: [
      "Simple command-line interface",
      "Uses SSH encryption",
      "Lightweight and fast",
      "Preserves file permissions",
      "Recursive directory copying"
    ],
    disadvantages: [
      "No resume capability",
      "Limited to file copying",
      "No directory listing",
      "Less flexible than SFTP",
      "Deprecated in OpenSSH"
    ],
    useCases: [
      "Quick file transfers",
      "Script automation",
      "Server deployment",
      "Configuration file copying",
      "Log file retrieval",
      "Backup single files",
      "DevOps operations",
      "System administration"
    ],
    examples: [
      {
        title: "SCP Command Examples",
        code: `# Copy file to remote server
scp localfile.txt user@server.com:/remote/path/

# Copy file from remote server
scp user@server.com:/remote/file.txt ./local/

# Copy directory recursively
scp -r /local/directory/ user@server.com:/remote/

# Copy with specific SSH key
scp -i ~/.ssh/mykey.pem file.txt user@server.com:~/

# Copy between two remote servers
scp user1@server1.com:file.txt user2@server2.com:~/`,
        explanation: "Common SCP commands for various file transfer scenarios."
      }
    ],
    relatedProtocols: ["ssh", "sftp", "rsync"],
    commonCommands: [
      {
        command: "scp",
        description: "Secure copy files",
        example: "scp file.txt user@host:/path/"
      },
      {
        command: "scp -r",
        description: "Recursive copy directories",
        example: "scp -r directory/ user@host:/path/"
      },
      {
        command: "scp -P",
        description: "Specify SSH port",
        example: "scp -P 2222 file.txt user@host:/"
      }
    ],
    resources: [
      {
        title: "OpenSSH Manual Pages",
        url: "https://man.openbsd.org/scp",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Uses SSH encryption",
      "Host key verification",
      "Consider using SFTP instead",
      "Key-based authentication recommended"
    ]
  }