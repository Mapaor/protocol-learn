import { Protocol } from "../../types/protocol";

export const NFS: Protocol = {
    id: "nfs",
    name: "NFS",
    category: "Files",
    difficulty: "Advanced",
    shortDescription: "Network File System for distributed file sharing",
    fullDescription: "NFS (Network File System) is a distributed file system protocol that allows users on client computers to access files over a computer network in a manner similar to how local storage is accessed. It enables transparent access to remote files and directories.",
    port: "2049 (NFS), 111 (portmapper)",
    versions: ["NFSv2", "NFSv3", "NFSv4", "NFSv4.1", "NFSv4.2"],
    advantages: [
      "Transparent file access",
      "POSIX compliance",
      "Cross-platform support",
      "Mature and stable",
      "Good performance",
      "Centralized storage"
    ],
    disadvantages: [
      "Network dependent",
      "Security limitations (v2/v3)",
      "Single point of failure",
      "Complexity",
      "Performance over WAN",
      "File locking issues"
    ],
    useCases: [
      "Shared file storage",
      "Home directories",
      "Application data sharing",
      "Backup storage",
      "Content distribution",
      "Development environments",
      "Virtualization storage",
      "Media storage",
      "Document management",
      "Database storage",
      "Log file centralization",
      "Configuration management"
    ],
    examples: [
      {
        title: "NFS Server Configuration",
        code: `# /etc/exports (NFS server exports)
/home/shared    192.168.1.0/24(rw,sync,no_root_squash,no_subtree_check)
/data           *(ro,sync,root_squash)
/backup         client1.example.com(rw,async,no_root_squash)

# Export options explained:
# rw/ro: read-write or read-only
# sync/async: synchronous or asynchronous writes
# root_squash/no_root_squash: map root user to nobody or preserve
# subtree_check/no_subtree_check: verify file in exported subtree

# Start NFS services
systemctl start nfs-server
systemctl enable nfs-server

# Export the filesystems
exportfs -arv

# Show current exports
exportfs -v

# Check NFS status
systemctl status nfs-server
showmount -e localhost`,
        explanation: "NFS server configuration with exports and service management."
      },
      {
        title: "NFS Client Mount Operations",
        code: `# Mount NFS share
mount -t nfs server.example.com:/home/shared /mnt/shared

# Mount with specific NFS version
mount -t nfs -o vers=4 server:/data /mnt/data

# Mount with performance options
mount -t nfs -o vers=4,rsize=8192,wsize=8192,timeo=14,intr server:/backup /mnt/backup

# /etc/fstab entry for permanent mount
server.example.com:/home/shared /mnt/shared nfs defaults,_netdev 0 0

# Show mounted NFS filesystems
mount | grep nfs
df -h -t nfs

# Unmount NFS share
umount /mnt/shared

# Force unmount (if hung)
umount -f /mnt/shared

# Check NFS client status
nfsstat -c

# Show NFS server shares
showmount -e server.example.com`,
        explanation: "NFS client mounting operations and management commands."
      }
    ],
    relatedProtocols: ["tcp", "udp", "rpc"],
    resources: [
      {
        title: "RFC 7530 - NFSv4 Protocol",
        url: "https://tools.ietf.org/html/rfc7530",
        type: "RFC"
      },
      {
        title: "Linux NFS-HOWTO",
        url: "https://nfs.sourceforge.net/nfs-howto/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Kerberos authentication",
      "NFSv4 security",
      "Firewall configuration",
      "Export restrictions",
      "User mapping",
      "Network encryption"
    ]
};
