import { Protocol } from "../../types/protocol";

export const CEPHFS: Protocol = {
    id: "cephfs",
    name: "CephFS",
    category: "Infrastructure",
    difficulty: "Advanced",
    shortDescription: "Ceph distributed file system for scalable storage",
    fullDescription: "CephFS is a POSIX-compliant distributed file system that uses a Ceph storage cluster to store its data. It provides a traditional file system interface with seamless scaling, high availability, and strong consistency guarantees.",
    port: "6789 (monitors), 6800-7300 (OSDs), 6800-6900 (MDS)",
    advantages: [
      "POSIX compliance",
      "Horizontal scalability",
      "High availability",
      "Strong consistency",
      "Self-healing",
      "No single point of failure"
    ],
    disadvantages: [
      "Complex setup and management",
      "High resource requirements",
      "Network intensive",
      "Learning curve",
      "Metadata server bottlenecks",
      "Performance tuning complexity"
    ],
    useCases: [
      "Distributed storage systems",
      "Cloud storage backends",
      "High-performance computing",
      "Content repositories",
      "Backup and archival",
      "Multi-site deployments",
      "Container storage",
      "Scientific computing",
      "Media storage",
      "Big data analytics",
      "Kubernetes storage",
      "Research data management"
    ],
    examples: [
      {
        title: "CephFS Mount Commands",
        code: `# Mount CephFS using kernel client
sudo mount -t ceph monitor1:6789,monitor2:6789:/ /mnt/cephfs \\
    -o name=admin,secret=AQD...

# Mount using ceph-fuse
ceph-fuse -m monitor1:6789,monitor2:6789 /mnt/cephfs

# Mount with authentication keyring
sudo mount -t ceph monitor1:6789:/ /mnt/cephfs \\
    -o name=myuser,secretfile=/etc/ceph/myuser.secret

# /etc/fstab entry
monitor1:6789,monitor2:6789:/ /mnt/cephfs ceph \\
    name=admin,secretfile=/etc/ceph/admin.secret,noatime,_netdev 0 2

# Check filesystem status
ceph fs status
ceph mds stat
ceph fs ls`,
        explanation: "Various methods to mount and manage CephFS filesystems."
      },
      {
        title: "CephFS Configuration",
        code: `# ceph.conf
[global]
    fsid = 12345678-1234-1234-1234-123456789012
    mon initial members = node1, node2, node3
    mon host = 192.168.1.10, 192.168.1.11, 192.168.1.12
    auth cluster required = cephx
    auth service required = cephx
    auth client required = cephx

[mds]
    mds cache size = 100000
    mds cache memory limit = 4294967296

# Create filesystem
ceph osd pool create cephfs_data 128
ceph osd pool create cephfs_metadata 64
ceph fs new mycephfs cephfs_metadata cephfs_data

# Create user with limited permissions
ceph auth get-or-create client.myuser \\
    mon 'allow r' \\
    mds 'allow rw path=/home/myuser' \\
    osd 'allow rw pool=cephfs_data'`,
        explanation: "CephFS configuration and filesystem creation with user permissions."
      }
    ],
    relatedProtocols: ["rados", "tcp", "nfs"],
    resources: [
      {
        title: "CephFS Documentation",
        url: "https://docs.ceph.com/en/latest/cephfs/",
        type: "Documentation"
      },
      {
        title: "Ceph Storage Cluster",
        url: "https://ceph.io/",
        type: "Platform"
      }
    ],
    securityConsiderations: [
      "Authentication (cephx)",
      "Network encryption",
      "Access control paths",
      "User permissions",
      "Monitor security",
      "Client isolation"
    ]
};
