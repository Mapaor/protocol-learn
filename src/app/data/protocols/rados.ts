import { Protocol } from "../../types/protocol";

export const RADOS: Protocol =  {
    id: "rados",
    name: "RADOS",
    category: "Infrastructure",
    difficulty: "Advanced",
    shortDescription: "Reliable Autonomic Distributed Object Store for Ceph storage",
    fullDescription: "RADOS (Reliable Autonomic Distributed Object Store) is the foundation of the Ceph distributed storage system. It provides a scalable, reliable object storage service that automatically manages data distribution, replication, failure detection, and recovery across a cluster of storage devices.",
    port: "6789 (monitors), 6800+ (OSDs)",
    versions: ["Luminous", "Mimic", "Nautilus", "Octopus", "Pacific", "Quincy"],
    advantages: [
      "Self-healing and self-managing",
      "No single point of failure",
      "Scalable to exabyte levels",
      "Strong consistency guarantees",
      "Automatic data replication",
      "Dynamic load balancing"
    ],
    disadvantages: [
      "Complex architecture",
      "High learning curve",
      "Resource intensive",
      "Network bandwidth requirements",
      "Initial setup complexity",
      "Requires multiple nodes"
    ],
    useCases: [
      "Cloud storage infrastructure",
      "Big data analytics storage",
      "Backup and archival systems",
      "Content delivery networks",
      "Virtual machine storage",
      "Container persistent volumes",
      "Scientific computing storage",
      "Media streaming storage",
      "Database storage backends",
      "Disaster recovery systems",
      "High-performance computing",
      "Software-defined storage"
    ],
    examples: [
      {
        title: "RADOS Cluster Architecture",
        code: `# Ceph cluster components
[global]
fsid = 12345678-1234-1234-1234-123456789012
mon_initial_members = ceph-mon1, ceph-mon2, ceph-mon3
mon_host = 10.0.1.10, 10.0.1.11, 10.0.1.12
public_network = 10.0.1.0/24
cluster_network = 10.0.2.0/24

# Monitor daemon configuration
[mon]
mon_allow_pool_delete = false
mon_max_pg_per_osd = 300

# OSD daemon configuration
[osd]
osd_journal_size = 10240
osd_pool_default_size = 3
osd_pool_default_min_size = 2
osd_pool_default_pg_num = 128
osd_pool_default_pgp_num = 128
osd_crush_chooseleaf_type = 1

# Client configuration
[client]
rbd_cache = true
rbd_cache_writethrough_until_flush = true`,
        explanation: "Ceph cluster configuration showing monitors, OSDs, and client settings for RADOS."
      },
      {
        title: "RADOS Object Operations",
        code: `# Python librados example
import rados

# Connect to RADOS cluster
cluster = rados.Rados(conffile='/etc/ceph/ceph.conf')
cluster.connect()

# Open I/O context for a pool
ioctx = cluster.open_ioctx('mypool')

# Write object
object_name = 'my-object'
data = b'Hello, RADOS world!'
ioctx.write_full(object_name, data)

# Read object
read_data = ioctx.read(object_name)
print(f"Read: {read_data.decode()}")

# Object metadata operations
ioctx.set_xattr(object_name, 'user.description', b'My test object')
attrs = ioctx.get_xattrs(object_name)
for key, value in attrs:
    print(f"Attribute {key}: {value}")

# List objects in pool
object_iterator = ioctx.list_objects()
for obj in object_iterator:
    print(f"Object: {obj.key}")

# Delete object
ioctx.remove_object(object_name)

# Close connections
ioctx.close()
cluster.shutdown()

# C++ librados example
#include <rados/librados.hpp>

int main() {
    librados::Rados cluster;
    
    // Initialize cluster connection
    int ret = cluster.init("client.admin");
    if (ret < 0) {
        std::cerr << "Failed to initialize cluster" << std::endl;
        return EXIT_FAILURE;
    }
    
    // Read configuration
    ret = cluster.conf_read_file("/etc/ceph/ceph.conf");
    if (ret < 0) {
        std::cerr << "Failed to read config file" << std::endl;
        return EXIT_FAILURE;
    }
    
    // Connect to cluster
    ret = cluster.connect();
    if (ret < 0) {
        std::cerr << "Failed to connect to cluster" << std::endl;
        return EXIT_FAILURE;
    }
    
    // Create I/O context
    librados::IoCtx io_ctx;
    ret = cluster.ioctx_create("mypool", io_ctx);
    if (ret < 0) {
        std::cerr << "Failed to create I/O context" << std::endl;
        return EXIT_FAILURE;
    }
    
    // Write object
    std::string object_name = "my-cpp-object";
    std::string data = "Hello from C++!";
    ret = io_ctx.write_full(object_name, data);
    
    // Read object
    librados::bufferlist read_buf;
    ret = io_ctx.read(object_name, read_buf, 0, 0);
    std::string read_data = read_buf.to_str();
    std::cout << "Read: " << read_data << std::endl;
    
    cluster.shutdown();
    return 0;
}`,
        explanation: "RADOS object storage operations using Python and C++ librados libraries."
      },
      {
        title: "RADOS Pool Management",
        code: `# Create a new pool
ceph osd pool create mypool 128 128

# Set pool parameters
ceph osd pool set mypool size 3
ceph osd pool set mypool min_size 2
ceph osd pool set mypool pg_num 128
ceph osd pool set mypool pgp_num 128

# Enable application on pool
ceph osd pool application enable mypool rbd

# Create pool snapshots
ceph osd pool mksnap mypool snap1

# List pool snapshots
ceph osd pool ls detail

# Pool statistics
ceph df
ceph osd pool stats mypool

# CRUSH rule management
ceph osd crush rule create-replicated myrule default host
ceph osd pool set mypool crush_rule myrule

# Pool deletion (requires confirmation)
ceph tell mon.* injectargs '--mon-allow-pool-delete=true'
ceph osd pool delete mypool mypool --yes-i-really-really-mean-it

# Object placement groups
ceph pg dump
ceph pg ls-by-pool mypool
ceph pg repair 1.0

# Health and status
ceph health detail
ceph status
ceph osd tree`,
        explanation: "RADOS pool management commands for creating, configuring, and monitoring storage pools."
      },
      {
        title: "CRUSH Map Configuration",
        code: `# CRUSH map hierarchy
# root default (contains all storage)
root default {
    id -1        # do not change unnecessarily
    alg straw2
    hash 0       # rjenkins1
    
    # Datacenter level
    datacenter dc1 {
        id -2
        alg straw2
        hash 0
        
        # Rack level
        rack rack1 {
            id -3
            alg straw2
            hash 0
            
            # Host level
            host ceph-osd1 {
                id -4
                alg straw2
                hash 0
                item osd.0 weight 1.000
                item osd.1 weight 1.000
            }
            
            host ceph-osd2 {
                id -5
                alg straw2
                hash 0
                item osd.2 weight 1.000
                item osd.3 weight 1.000
            }
        }
        
        rack rack2 {
            id -6
            alg straw2
            hash 0
            
            host ceph-osd3 {
                id -7
                alg straw2
                hash 0
                item osd.4 weight 1.000
                item osd.5 weight 1.000
            }
        }
    }
}

# CRUSH rules
rule replicated_rule {
    id 0
    type replicated
    min_size 1
    max_size 10
    step take default
    step chooseleaf firstn 0 type host
    step emit
}

rule erasure_rule {
    id 1
    type erasure
    min_size 3
    max_size 20
    step set_chooseleaf_tries 5
    step take default
    step chooseleaf indep 0 type host
    step emit
}

# Manipulate CRUSH map
ceph osd getcrushmap -o crushmap.bin
crushtool -d crushmap.bin -o crushmap.txt
# Edit crushmap.txt
crushtool -c crushmap.txt -o crushmap-new.bin
ceph osd setcrushmap -i crushmap-new.bin`,
        explanation: "CRUSH map configuration defining the cluster hierarchy and data placement rules."
      }
    ],
    diagrams: [
      {
        src: "/rados-architecture.png",
        alt: "RADOS architecture",
        caption: "RADOS cluster architecture with monitors, OSDs, and clients"
      },
      {
        src: "/ceph-stack.jpg",
        alt: "Ceph storage stack",
        caption: "Complete Ceph storage stack built on RADOS foundation"
      },
      {
        src: "/crush-hierarchy.png",
        alt: "CRUSH map hierarchy",
        caption: "CRUSH map hierarchical structure for data placement"
      }
    ],
    relatedProtocols: ["tcp", "cephfs", "rbd", "rgw"],
    commonCommands: [
      {
        command: "ceph",
        description: "Main Ceph administration tool",
        example: "ceph status"
      },
      {
        command: "rados",
        description: "RADOS object manipulation",
        example: "rados -p mypool ls"
      },
      {
        command: "ceph-deploy",
        description: "Ceph deployment tool",
        example: "ceph-deploy new node1"
      }
    ],
    resources: [
      {
        title: "Ceph Documentation",
        url: "https://docs.ceph.com/",
        type: "Documentation"
      },
      {
        title: "RADOS Paper",
        url: "https://ceph.io/assets/pdfs/weil-rados-pdsw07.pdf",
        type: "Documentation"
      },
      {
        title: "Ceph Developer Guide",
        url: "https://docs.ceph.com/en/latest/dev/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "CephX authentication system",
      "Network encryption with msgr2",
      "Access control with capabilities",
      "Monitor key management",
      "Client certificate validation",
      "Secure cluster networks"
    ],
    modernAlternatives: [
      "MinIO for S3-compatible storage",
      "GlusterFS for distributed file systems",
      "OpenStack Swift for object storage"
    ]
  }