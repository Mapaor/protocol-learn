import { Protocol } from "../../types/protocol";

export const RSYNC: Protocol = {
    id: "rsync",
    name: "Rsync",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "Remote synchronization protocol for efficient file transfer and synchronization",
    fullDescription: "Rsync is a utility for efficiently transferring and synchronizing files between a computer and an external hard drive and across networked computers by comparing the modification times and sizes of files. It uses a delta-transfer algorithm to minimize data transfer.",
    port: "873 (rsync daemon), 22 (SSH)",
    advantages: [
      "Delta compression algorithm",
      "Incremental file transfers",
      "Preserves file attributes",
      "Bandwidth efficient",
      "Resume interrupted transfers",
      "Multiple transport options"
    ],
    disadvantages: [
      "Complex syntax",
      "Single-threaded operation",
      "Limited Windows support",
      "No built-in encryption",
      "Memory usage for large files",
      "Network dependency"
    ],
    useCases: [
      "File synchronization",
      "Backup operations",
      "Mirror creation",
      "Website deployment",
      "Data migration",
      "Distributed file systems",
      "Content distribution",
      "System administration",
      "Development workflows",
      "Archive maintenance",
      "Remote backups",
      "Disaster recovery"
    ],
    examples: [
      {
        title: "Common Rsync Commands",
        code: `# Basic sync (local to remote)
rsync -avz /local/path/ user@remote:/remote/path/

# Sync with progress and compression
rsync -avz --progress /source/ /destination/

# Sync over SSH
rsync -avz -e ssh /local/path/ user@host:/remote/path/

# Dry run (test without changes)
rsync -avz --dry-run /source/ /destination/

# Delete files not in source
rsync -avz --delete /source/ /destination/

# Exclude patterns
rsync -avz --exclude='*.tmp' --exclude='logs/' /source/ /destination/

# Common options:
# -a: archive mode (preserves permissions, times, etc.)
# -v: verbose output
# -z: compress data during transfer
# -r: recursive
# -u: update (skip newer files)
# -n: dry run`,
        explanation: "Common rsync command patterns for various synchronization scenarios."
      },
      {
        title: "Rsync Configuration File",
        code: `# /etc/rsyncd.conf
pid file = /var/run/rsyncd.pid
lock file = /var/run/rsync.lock
log file = /var/log/rsyncd.log

[backup]
    path = /backup
    comment = Backup area
    uid = backup
    gid = backup
    read only = false
    list = yes
    auth users = backupuser
    secrets file = /etc/rsyncd.secrets
    hosts allow = 192.168.1.0/24

[public]
    path = /public
    comment = Public files
    read only = yes
    list = yes

# /etc/rsyncd.secrets (mode 600)
backupuser:secretpassword

# Client usage
rsync -avz rsync://backupuser@server/backup/ /local/backup/`,
        explanation: "Rsync daemon configuration for creating shared modules with authentication."
      }
    ],
    relatedProtocols: ["ssh", "tcp", "ftp"],
    resources: [
      {
        title: "Rsync Manual",
        url: "https://rsync.samba.org/documentation.html",
        type: "Documentation"
      },
      {
        title: "Rsync Examples and Tips",
        url: "https://www.tecmint.com/rsync-local-remote-file-synchronization-commands/",
        type: "Tutorial"
      }
    ],
    securityConsiderations: [
      "Use SSH for transport",
      "Secure authentication",
      "File permission preservation",
      "Access control lists",
      "Network encryption",
      "Audit logging"
    ]
};
