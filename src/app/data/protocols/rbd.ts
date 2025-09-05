import { Protocol } from "../../types/protocol";

export const RBD: Protocol = {
    id: "rbd",
    name: "RBD",
    category: "Infrastructure",
    difficulty: "Advanced",
    shortDescription: "RADOS Block Device for distributed block storage",
    fullDescription: "RBD (RADOS Block Device) provides reliable, distributed block storage built on top of the Ceph storage cluster. It delivers high performance with thin provisioning, resizing, and snapshotting capabilities for virtual machines and container workloads.",
    port: "6789 (monitors), 6800-7300 (OSDs)",
    advantages: [
      "Distributed block storage",
      "Thin provisioning",
      "Snapshots and cloning",
      "High availability",
      "Striping and replication",
      "Live migration support"
    ],
    disadvantages: [
      "Complex configuration",
      "Network dependent performance",
      "Requires Ceph cluster",
      "Resource intensive",
      "Learning curve",
      "Troubleshooting complexity"
    ],
    useCases: [
      "Virtual machine storage",
      "Container persistent volumes",
      "Database storage",
      "Boot volumes",
      "High-performance workloads",
      "Cloud storage backends",
      "Kubernetes storage classes",
      "OpenStack Cinder",
      "VMware integration",
      "Backup storage",
      "Disaster recovery",
      "Scale-out storage"
    ],
    examples: [
      {
        title: "RBD Basic Operations",
        code: `# Create RBD pool
ceph osd pool create rbd 128 128

# Initialize the pool for RBD
rbd pool init rbd

# Create RBD image
rbd create --size 10G mypool/myimage

# List RBD images
rbd ls mypool

# Get image information
rbd info mypool/myimage

# Map RBD image to block device
sudo rbd map mypool/myimage

# Check mapped devices
rbd showmapped

# Create filesystem and mount
sudo mkfs.ext4 /dev/rbd0
sudo mount /dev/rbd0 /mnt/rbd

# Unmap device
sudo rbd unmap /dev/rbd0`,
        explanation: "Basic RBD operations for creating, mapping, and using block devices."
      },
      {
        title: "RBD Snapshots and Cloning",
        code: `# Create snapshot
rbd snap create mypool/myimage@snapshot1

# List snapshots
rbd snap ls mypool/myimage

# Protect snapshot (required for cloning)
rbd snap protect mypool/myimage@snapshot1

# Clone from snapshot
rbd clone mypool/myimage@snapshot1 mypool/cloned-image

# List clones
rbd children mypool/myimage@snapshot1

# Flatten clone (remove dependency)
rbd flatten mypool/cloned-image

# Remove snapshot protection
rbd snap unprotect mypool/myimage@snapshot1

# Delete snapshot
rbd snap rm mypool/myimage@snapshot1

# Resize image
rbd resize --size 20G mypool/myimage`,
        explanation: "RBD snapshot and cloning operations for data management."
      }
    ],
    relatedProtocols: ["rados", "cephfs", "tcp"],
    resources: [
      {
        title: "RBD Documentation",
        url: "https://docs.ceph.com/en/latest/rbd/",
        type: "Documentation"
      },
      {
        title: "Ceph RBD Performance",
        url: "https://docs.ceph.com/en/latest/rbd/rbd-config-ref/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Authentication (cephx)",
      "Network encryption",
      "Access permissions",
      "Image encryption",
      "Client isolation",
      "Audit logging"
    ]
};
