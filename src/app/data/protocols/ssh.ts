import { Protocol } from "../../types/protocol";

export const SSH: Protocol =   {
    id: "ssh",
    name: "SSH",
    category: "Security",
    difficulty: "Intermediate",
    shortDescription: "Secure Shell for encrypted remote access and file transfers",
    fullDescription: "SSH (Secure Shell) is a cryptographic network protocol for operating network services securely over an unsecured network. It provides a secure channel over an unsecured network by using a client-server architecture.",
    port: "22",
    versions: ["SSH-1", "SSH-2"],
    advantages: [
      "Strong encryption",
      "Authentication methods",
      "Port forwarding capabilities",
      "Secure file transfers",
      "Cross-platform support",
      "Key-based authentication"
    ],
    disadvantages: [
      "Initial setup complexity",
      "Key management overhead",
      "Potential for misconfigurations",
      "Performance overhead"
    ],
    useCases: [
      "Remote server administration",
      "Secure file transfers",
      "Port forwarding/tunneling",
      "Remote command execution",
      "Git repository access",
      "Database connections",
      "DevOps automation",
      "System monitoring",
      "Backup operations",
      "Network troubleshooting",
      "Secure shell access",
      "Container management"
    ],
    examples: [
      {
        title: "SSH Connection Commands",
        code: `# Basic SSH connection
ssh username@hostname

# SSH with specific port
ssh -p 2222 username@hostname

# SSH with private key
ssh -i ~/.ssh/private_key username@hostname

# SSH with port forwarding
ssh -L 8080:localhost:80 username@hostname

# SSH with X11 forwarding
ssh -X username@hostname

# SSH command execution
ssh username@hostname 'ls -la /home'`,
        explanation: "Common SSH commands for various connection scenarios and operations."
      },
      {
        title: "SSH Key Generation",
        code: `# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Generate ED25519 key (recommended)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id username@hostname

# Manual key copy
cat ~/.ssh/id_rsa.pub | ssh username@hostname 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'`,
        explanation: "SSH key generation and deployment for secure authentication."
      }
    ],
    relatedProtocols: ["sftp", "scp", "tls"],
    commonCommands: [
      {
        command: "ssh",
        description: "Connect to remote server",
        example: "ssh user@example.com"
      },
      {
        command: "ssh-keygen",
        description: "Generate SSH key pair",
        example: "ssh-keygen -t ed25519"
      },
      {
        command: "ssh-copy-id",
        description: "Copy public key to server",
        example: "ssh-copy-id user@example.com"
      }
    ],
    resources: [
      {
        title: "RFC 4251 - SSH Protocol Architecture",
        url: "https://tools.ietf.org/html/rfc4251",
        type: "RFC"
      },
      {
        title: "OpenSSH Documentation",
        url: "https://www.openssh.com/manual.html",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Use strong key algorithms",
      "Disable password authentication",
      "Regular key rotation",
      "Restrict user access",
      "Monitor access logs"
    ]
  }