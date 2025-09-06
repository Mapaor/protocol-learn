import { Protocol } from "../../types/protocol";

export const LUSTRE: Protocol = {
    id: "lustre",
    name: "Lustre",
    category: "Infrastructure",
    difficulty: "Advanced",
    shortDescription: "High-performance parallel distributed file system for large-scale computing",
    fullDescription: "Lustre is a type of parallel distributed file system, generally used for large-scale cluster computing. It provides high-performance file system access across large numbers of nodes and can scale to support thousands of clients and hundreds of servers with petabytes of storage capacity.",
    port: "988 (default), 1023+ (configurable)",
    advantages: [
      "High performance",
      "Massive scalability",
      "POSIX compliance",
      "High availability",
      "Fault tolerance",
      "Parallel I/O"
    ],
    disadvantages: [
      "Complex setup",
      "High maintenance overhead",
      "Expensive hardware requirements",
      "Single points of failure",
      "Learning curve",
      "Limited small file performance"
    ],
    useCases: [
      "High-performance computing",
      "Scientific computing clusters",
      "Research institutions",
      "Weather modeling",
      "Oil and gas exploration",
      "Financial modeling",
      "Machine learning clusters",
      "Big data analytics",
      "Genomics research",
      "Physics simulations",
      "Render farms",
      "Supercomputing centers"
    ],
    examples: [
      {
        title: "Lustre Architecture Components",
        code: `# Lustre File System Architecture

# Management Server (MGS)
# - Stores configuration information
# - Coordinates file system operations
# - Single MGS per file system

# Metadata Server (MDS)
# - Manages namespace operations
# - Stores file metadata and directory structure
# - Controls file access permissions
# - Can have multiple MDS for scaling

# Metadata Target (MDT)
# - Storage device that stores metadata
# - Attached to MDS
# - Typically uses fast storage (SSDs)

# Object Storage Server (OSS)
# - Serves file data to clients
# - Multiple OSS nodes for parallel I/O
# - Each OSS manages multiple OSTs

# Object Storage Target (OST)
# - Storage device that stores file data
# - Files striped across multiple OSTs
# - Provides actual data storage capacity

# Lustre Client
# - Mounts Lustre file system
# - Accesses data directly from OSTs
# - Communicates with MDS for metadata

# Network Topology
Client Nodes ←→ InfiniBand/Ethernet ←→ Lustre Servers

# Typical Configuration
MGS: 1 node
MDS: 1-2 nodes (HA pair)
OSS: 10-100+ nodes  
OST: 100-1000+ storage targets
Clients: 1000-10000+ nodes

# Lustre File Striping
File: /mnt/lustre/bigfile.dat
Stripe Size: 1MB
Stripe Count: 4
OSTs: OST0001, OST0002, OST0003, OST0004

Data Distribution:
Chunk 0 (0-1MB) → OST0001
Chunk 1 (1-2MB) → OST0002  
Chunk 2 (2-3MB) → OST0003
Chunk 3 (3-4MB) → OST0004
Chunk 4 (4-5MB) → OST0001
...continues cycling through OSTs

# Lustre Protocol Stack
Application
    ↓
VFS (Virtual File System)
    ↓
Lustre Client (llite)
    ↓
PTLRPC (Portal RPC)
    ↓
LNet (Lustre Networking)
    ↓
Network (InfiniBand/Ethernet)`,
        explanation: "Lustre file system architecture and component relationships."
      },
      {
        title: "Lustre Installation and Configuration",
        code: `# Lustre Server Installation (CentOS/RHEL)

# Install Lustre repository
yum install -y https://downloads.whamcloud.com/public/lustre/latest-release/el7/server/RPMS/x86_64/lustre-release-el7-1.0-1.noarch.rpm

# Install Lustre server packages
yum install -y lustre-dkms lustre-osd-ldiskfs-mount lustre

# Load Lustre modules
modprobe lustre
modprobe lnet

# Configure LNet (Lustre Networking)
echo 'net tcp0(eth0) 192.168.1.0/24' > /etc/modprobe.d/lustre.conf
echo 'options lnet networks=tcp0(eth0)' >> /etc/modprobe.d/lustre.conf

# Format MGS (Management Server)
mkfs.lustre --mgs /dev/sdb1

# Mount MGS
mkdir -p /mnt/mgs
mount -t lustre /dev/sdb1 /mnt/mgs

# Format MDS (Metadata Server)
mkfs.lustre --mdt --fsname=testfs --mgsnode=192.168.1.10@tcp0 --index=0 /dev/sdc1

# Mount MDS
mkdir -p /mnt/mdt
mount -t lustre /dev/sdc1 /mnt/mdt

# Format OST (Object Storage Target)
mkfs.lustre --ost --fsname=testfs --mgsnode=192.168.1.10@tcp0 --index=0 /dev/sdd1

# Mount OST
mkdir -p /mnt/ost0
mount -t lustre /dev/sdd1 /mnt/ost0

# Client Installation
yum install -y lustre-client-dkms lustre-client

# Mount Lustre file system on client
mkdir -p /mnt/lustre
mount -t lustre 192.168.1.10@tcp0:/testfs /mnt/lustre

# Verify mount
df -h /mnt/lustre
lfs df /mnt/lustre

# Lustre Configuration File (/etc/ldev.conf)
# Format: <hostname> <device> <mount_point> <type> <options>
mgs01 /dev/sdb1 /mnt/mgs mgs
mds01 /dev/sdc1 /mnt/mdt mdt
oss01 /dev/sdd1 /mnt/ost0 ost
oss01 /dev/sde1 /mnt/ost1 ost
oss02 /dev/sdd1 /mnt/ost2 ost
oss02 /dev/sde1 /mnt/ost3 ost

# Lustre Startup Script
#!/bin/bash
# Start Lustre services

# Load modules
modprobe lnet
modprobe lustre

# Start LNet
lnetctl lnet configure
lnetctl net add --net tcp0 --if eth0

# Mount file system components
mount -a -t lustre

# Verify services
lctl ping 192.168.1.10@tcp0
lfs check servers

echo "Lustre file system started successfully"`,
        explanation: "Lustre installation, configuration, and startup procedures."
      },
      {
        title: "Lustre Administration and Tuning",
        code: `# Lustre File System Administration

# Check Lustre status
lfs df -h                    # Show file system capacity
lfs check servers           # Check server connectivity
lctl get_param version      # Show Lustre version

# File striping operations
lfs getstripe /mnt/lustre/file.dat     # Show file striping info
lfs setstripe -c 4 /mnt/lustre/dir     # Set stripe count for directory
lfs setstripe -S 2M /mnt/lustre/dir    # Set stripe size to 2MB
lfs setstripe -c -1 /mnt/lustre/dir    # Use all available OSTs

# Advanced striping
lfs setstripe -c 8 -S 4M -i 2 /mnt/lustre/bigdata/
# -c 8: stripe across 8 OSTs
# -S 4M: 4MB stripe size  
# -i 2: start with OST index 2

# Pool management
lctl pool_new testfs.ssd_pool           # Create pool
lctl pool_add testfs.ssd_pool OST[0-3]  # Add OSTs to pool
lfs setstripe -p ssd_pool /mnt/lustre/fast_data/

# Quota management
lfs quotacheck -ug /mnt/lustre          # Check quotas
lfs setquota -u user1 100G 110G 1M 1.1M /mnt/lustre  # Set user quota
lfs quota -u user1 /mnt/lustre          # Show user quota
lfs setquota -g group1 500G 550G 5M 5.5M /mnt/lustre # Set group quota

# Performance monitoring
lctl get_param osc.*.stats              # Client-side stats
lctl get_param ost.*.stats              # OST stats  
lctl get_param mdt.*.stats              # MDT stats
lctl get_param ldlm.*.stats             # Lock manager stats

# Reset statistics
lctl set_param osc.*.stats=clear
lctl set_param ost.*.stats=clear

# Lustre tuning parameters
# Increase max_dirty_mb for better write performance
lctl set_param osc.*.max_dirty_mb=512

# Tune RPC size
lctl set_param osc.*.max_pages_per_rpc=1024

# Client-side read-ahead tuning
lctl set_param llite.*.max_read_ahead_mb=256
lctl set_param llite.*.max_read_ahead_per_file_mb=64

# Server-side tuning
# Increase thread count for OSS
echo 512 > /sys/module/ptlrpc/parameters/ptlrpcd_max_ptlrpcds

# MDT performance tuning
lctl set_param mdt.*.identity_expire=600
lctl set_param mdt.*.identity_acquire_expire=3600

# Backup and recovery
# Create file system backup
tar --xattrs -czf lustre_backup.tar.gz /mnt/lustre

# LVM snapshot for consistent backup
lvcreate -L 10G -s -n mdt_snap /dev/vg0/mdt_lv
mount /dev/vg0/mdt_snap /mnt/mdt_backup
rsync -avxHAX /mnt/mdt_backup/ /backup/mdt/

# Health monitoring script
#!/bin/bash
LUSTRE_MOUNT="/mnt/lustre"
LOG_FILE="/var/log/lustre_health.log"

check_lustre_health() {
    echo "$(date): Checking Lustre health" >> $LOG_FILE
    
    # Check mount status
    if ! mountpoint -q $LUSTRE_MOUNT; then
        echo "ERROR: Lustre not mounted" >> $LOG_FILE
        return 1
    fi
    
    # Check servers
    if ! lfs check servers > /dev/null 2>&1; then
        echo "ERROR: Server connectivity issues" >> $LOG_FILE
        return 1
    fi
    
    # Check OST status
    for ost in $(lctl get_param -n lov.*.target_obd | grep -v "INACTIVE"); do
        if [[ $ost == *"INACTIVE"* ]]; then
            echo "WARNING: OST $ost is inactive" >> $LOG_FILE
        fi
    done
    
    # Check free space
    USAGE=$(df $LUSTRE_MOUNT | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ $USAGE -gt 90 ]; then
        echo "WARNING: File system $USAGE% full" >> $LOG_FILE
    fi
    
    echo "$(date): Health check completed" >> $LOG_FILE
}

# Run health check
check_lustre_health

# Performance testing with IOR
mpirun -np 64 ior -a POSIX -t 1M -b 1G -s 1 -F -o /mnt/lustre/ior_test

# Lustre debugging
lctl set_param debug=+inode+dentry+page    # Enable debug messages
lctl debug_kernel /var/log/lustre_debug.log # Dump debug buffer
lctl clear                                   # Clear debug buffer`,
        explanation: "Lustre administration, tuning, and monitoring commands."
      }
    ],
    relatedProtocols: ["nfs", "cephfs", "tcp", "infiniband"],
    resources: [
      {
        title: "Lustre File System Documentation",
        url: "https://wiki.lustre.org/",
        type: "Documentation"
      },
      {
        title: "Lustre Administration Manual",
        url: "https://build.whamcloud.com/job/lustre-manual/lastSuccessfulBuild/artifact/lustre_manual.xhtml",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Network security",
      "Access control",
      "Data encryption",
      "Authentication mechanisms",
      "Audit logging",
      "Secure communication channels"
    ]
};
