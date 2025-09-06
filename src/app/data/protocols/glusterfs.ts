import { Protocol } from "../../types/protocol";

export const GLUSTERFS: Protocol = {
    id: "glusterfs",
    name: "GlusterFS",
    category: "Infrastructure",
    difficulty: "Advanced",
    shortDescription: "Scale-out distributed file system for cloud storage",
    fullDescription: "GlusterFS is a free and open-source scalable network filesystem. It aggregates disk storage resources from multiple servers into a single global namespace, providing high availability, scalability, and performance for large-scale data storage.",
    port: "24007 (management), 24008+ (bricks)",
    versions: ["GlusterFS 3.x", "GlusterFS 4.x", "GlusterFS 5.x", "GlusterFS 6.x+"],
    advantages: [
      "Scale-out architecture",
      "No metadata servers",
      "POSIX compliance",
      "High availability",
      "Elastic volume management",
      "Self-healing capabilities",
      "Multiple access methods",
      "Open source"
    ],
    disadvantages: [
      "Complex configuration",
      "Performance tuning required",
      "Network intensive",
      "Limited small file performance",
      "Healing overhead",
      "Split-brain scenarios",
      "Resource consumption",
      "Operational complexity"
    ],
    useCases: [
      "Cloud storage platforms",
      "Media and entertainment",
      "Big data analytics",
      "Backup and archiving",
      "Content distribution",
      "High-performance computing",
      "Container persistent storage",
      "Virtual machine storage",
      "Web scale applications",
      "Data lakes",
      "Scientific computing",
      "Disaster recovery"
    ],
    examples: [
      {
        title: "GlusterFS Volume Creation",
        code: `# Create a trusted storage pool
gluster peer probe server2
gluster peer probe server3
gluster peer probe server4

# Check peer status
gluster peer status

# Create distributed volume
gluster volume create dist-vol \\
    server1:/data/brick1 \\
    server2:/data/brick1 \\
    server3:/data/brick1 \\
    server4:/data/brick1

# Create replicated volume
gluster volume create repl-vol replica 2 \\
    server1:/data/brick2 \\
    server2:/data/brick2 \\
    server3:/data/brick3 \\
    server4:/data/brick3

# Create distributed-replicated volume
gluster volume create dist-repl-vol replica 2 \\
    server1:/data/brick4 server2:/data/brick4 \\
    server3:/data/brick5 server4:/data/brick5

# Start volume
gluster volume start dist-vol

# Volume information
gluster volume info
gluster volume status
gluster volume list`,
        explanation: "GlusterFS volume creation and management commands."
      },
      {
        title: "GlusterFS Client Mount",
        code: `# Native GlusterFS mount
mount -t glusterfs server1:/dist-vol /mnt/gluster

# With backup servers
mount -t glusterfs server1:/dist-vol /mnt/gluster \\
    -o backup-volfile-servers=server2:server3

# NFS mount (if NFS translator enabled)
mount -t nfs server1:/dist-vol /mnt/gluster-nfs

# FUSE mount with options
mount -t glusterfs server1:/dist-vol /mnt/gluster \\
    -o direct-io-mode=enable,use-readdirp=no

# /etc/fstab entry
server1:/dist-vol /mnt/gluster glusterfs defaults,_netdev,backup-volfile-servers=server2:server3 0 0

# Check mount status
mount | grep gluster
df -h /mnt/gluster

# Unmount
umount /mnt/gluster

# Client-side logging
mount -t glusterfs server1:/dist-vol /mnt/gluster \\
    -o log-level=INFO,log-file=/var/log/gluster.log`,
        explanation: "GlusterFS client mounting and configuration options."
      },
      {
        title: "GlusterFS Volume Management",
        code: `# Volume operations
gluster volume stop vol-name
gluster volume start vol-name
gluster volume delete vol-name

# Add bricks (expand)
gluster volume add-brick dist-vol \\
    server5:/data/brick1 server6:/data/brick1

# Remove bricks (shrink)
gluster volume remove-brick dist-vol \\
    server5:/data/brick1 server6:/data/brick1 start

# Check remove-brick status
gluster volume remove-brick dist-vol \\
    server5:/data/brick1 server6:/data/brick1 status

# Commit remove-brick
gluster volume remove-brick dist-vol \\
    server5:/data/brick1 server6:/data/brick1 commit

# Replace brick
gluster volume replace-brick vol-name \\
    server1:/old/path server1:/new/path commit force

# Volume healing
gluster volume heal vol-name
gluster volume heal vol-name info
gluster volume heal vol-name statistics

# Rebalance volume
gluster volume rebalance vol-name start
gluster volume rebalance vol-name status
gluster volume rebalance vol-name stop`,
        explanation: "Advanced GlusterFS volume management operations."
      }
    ],
    diagrams: [
      {
        src: "/glusterfs_architecture.png",
        alt: "GlusterFS architecture",
        caption: "GlusterFS distributed filesystem architecture and components"
      },
      {
        src: "/glusterfs_volumes.jpg",
        alt: "GlusterFS volume types",
        caption: "Different GlusterFS volume types and their characteristics"
      }
    ],
    relatedProtocols: ["nfs", "fuse", "tcp", "rdma"],
    resources: [
      {
        title: "GlusterFS Documentation",
        url: "https://docs.gluster.org/",
        type: "Documentation"
      },
      {
        title: "Red Hat Gluster Storage",
        url: "https://www.redhat.com/en/technologies/storage/gluster",
        type: "Product"
      },
      {
        title: "GlusterFS Community",
        url: "https://www.gluster.org/",
        type: "Community"
      }
    ],
    securityConsiderations: [
      "Network encryption",
      "Authentication mechanisms",
      "Access control lists",
      "Firewall configuration",
      "SSL/TLS for management",
      "Regular security updates",
      "Audit logging",
      "Network segmentation"
    ]
  }