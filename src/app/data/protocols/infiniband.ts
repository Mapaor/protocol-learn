import { Protocol } from "../../types/protocol";

export const INFINIBAND: Protocol = {
    id: "infiniband",
    name: "InfiniBand",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "High-performance interconnect architecture for high-performance computing and data centers",
    fullDescription: "InfiniBand is a computer networking communications standard used in high-performance computing that features very high throughput and very low latency. It is used for data interconnect both among and within computers.",
    port: "N/A (Physical layer)",
    versions: ["IBA 1.0", "IBA 1.1", "IBA 1.2", "IBA 1.3", "IBA 1.4", "IBA 1.5"],
    advantages: [
      "Ultra-low latency",
      "High bandwidth",
      "Hardware-based transport",
      "RDMA support",
      "Quality of Service",
      "Scalable fabric architecture",
      "CPU offload capabilities",
      "Reliable transport protocols"
    ],
    disadvantages: [
      "High implementation cost",
      "Specialized hardware required",
      "Complex configuration",
      "Limited adoption outside HPC",
      "Vendor-specific features",
      "Power consumption",
      "Cable length limitations",
      "Skill requirements"
    ],
    useCases: [
      "High-performance computing clusters",
      "Data center interconnects",
      "Storage area networks",
      "Financial trading systems",
      "Scientific computing",
      "Machine learning clusters",
      "Database clusters",
      "Virtualization infrastructure",
      "Cloud computing backends",
      "Real-time analytics",
      "Distributed storage systems",
      "Supercomputing applications"
    ],
    examples: [
      {
        title: "InfiniBand Architecture Stack",
        code: `# InfiniBand Protocol Stack

Application Layer
├── MPI, RDMA Applications
├── Storage Protocols (SRP, iSER)
└── Network Protocols (IPoIB)

Upper Layer Protocols (ULP)
├── Reliable Connected (RC)
├── Unreliable Connected (UC)
├── Reliable Datagram (RD)
└── Unreliable Datagram (UD)

Transport Layer
├── Queue Pairs (QP)
├── Work Queues (Send/Receive)
├── Completion Queues (CQ)
└── Memory Registration

Network Layer
├── Subnet Management
├── Routing (LID-based)
├── Virtual Lanes (VL)
└── Service Levels (SL)

Link Layer
├── Flow Control
├── Error Detection/Correction
├── Packet Formatting
└── Virtual Lane Arbitration

Physical Layer
├── 1x (2.5 Gbps per direction)
├── 4x (10 Gbps per direction)
├── 8x (20 Gbps per direction)
└── 12x (30 Gbps per direction)

# InfiniBand Speeds (per direction)
SDR: 2.5 Gbps (Single Data Rate)
DDR: 5 Gbps (Double Data Rate)
QDR: 10 Gbps (Quad Data Rate)
FDR: 14 Gbps (Fourteen Data Rate)
EDR: 25 Gbps (Enhanced Data Rate)
HDR: 50 Gbps (High Data Rate)
NDR: 100 Gbps (Next Data Rate)`,
        explanation: "InfiniBand protocol stack and data rate specifications."
      },
      {
        title: "InfiniBand RDMA Programming",
        code: `// C RDMA verbs example
#include <infiniband/verbs.h>
#include <rdma/rdma_cma.h>

struct rdma_context {
    struct ibv_context *ctx;
    struct ibv_pd *pd;
    struct ibv_cq *cq;
    struct ibv_qp *qp;
    struct ibv_mr *mr;
    void *buffer;
};

int setup_rdma_resources(struct rdma_context *rdma_ctx) {
    // Get device list
    struct ibv_device **device_list = ibv_get_device_list(NULL);
    if (!device_list) {
        return -1;
    }
    
    // Open device context
    rdma_ctx->ctx = ibv_open_device(device_list[0]);
    if (!rdma_ctx->ctx) {
        return -1;
    }
    
    // Allocate protection domain
    rdma_ctx->pd = ibv_alloc_pd(rdma_ctx->ctx);
    if (!rdma_ctx->pd) {
        return -1;
    }
    
    // Create completion queue
    rdma_ctx->cq = ibv_create_cq(rdma_ctx->ctx, 10, NULL, NULL, 0);
    if (!rdma_ctx->cq) {
        return -1;
    }
    
    // Allocate buffer
    rdma_ctx->buffer = malloc(4096);
    
    // Register memory region
    rdma_ctx->mr = ibv_reg_mr(rdma_ctx->pd, rdma_ctx->buffer, 4096,
                              IBV_ACCESS_LOCAL_WRITE | IBV_ACCESS_REMOTE_WRITE);
    
    // Create queue pair
    struct ibv_qp_init_attr qp_attr = {0};
    qp_attr.send_cq = rdma_ctx->cq;
    qp_attr.recv_cq = rdma_ctx->cq;
    qp_attr.qp_type = IBV_QPT_RC;
    qp_attr.cap.max_send_wr = 10;
    qp_attr.cap.max_recv_wr = 10;
    qp_attr.cap.max_send_sge = 1;
    qp_attr.cap.max_recv_sge = 1;
    
    rdma_ctx->qp = ibv_create_qp(rdma_ctx->pd, &qp_attr);
    
    return 0;
}

int rdma_write(struct rdma_context *rdma_ctx, uint64_t remote_addr, uint32_t rkey) {
    struct ibv_send_wr wr = {0};
    struct ibv_send_wr *bad_wr;
    struct ibv_sge sge = {0};
    
    // Setup scatter-gather entry
    sge.addr = (uintptr_t)rdma_ctx->buffer;
    sge.length = 4096;
    sge.lkey = rdma_ctx->mr->lkey;
    
    // Setup work request
    wr.wr_id = 1;
    wr.opcode = IBV_WR_RDMA_WRITE;
    wr.send_flags = IBV_SEND_SIGNALED;
    wr.sg_list = &sge;
    wr.num_sge = 1;
    wr.wr.rdma.remote_addr = remote_addr;
    wr.wr.rdma.rkey = rkey;
    
    // Post send
    return ibv_post_send(rdma_ctx->qp, &wr, &bad_wr);
}`,
        explanation: "InfiniBand RDMA programming using verbs API."
      },
      {
        title: "InfiniBand Configuration",
        code: `# InfiniBand subnet manager configuration (OpenSM)

# /etc/opensm/opensm.conf
guid 0x0002c903004e9abc
sm_priority 15
lmc 1
subnet_timeout 18
packet_life_time 18
vl_stall_count 7
leaf_vl_stall_count 7
head_of_queue_lifetime 19
local_phy_errors_threshold 8
overrun_errors_threshold 8

# Partition configuration
# /etc/opensm/partitions.conf
Default=0x7fff,ipoib : ALL=full ;
Test=0x8001 : ALL=limited, 0x0002c903004e9abc=full ;

# Virtual Lane Arbitration
# /etc/opensm/qos-policy.conf
qos-level-name: low
  sl: 0
  vl: 0

qos-level-name: high  
  sl: 1
  vl: 1

# Start OpenSM subnet manager
sudo opensm -D

# InfiniBand utilities
# Show HCA information
ibstat

# Show port information  
ibstatus

# Network discovery
ibnetdiscover

# Performance monitoring
ibqueryerrors
perfquery

# IP over InfiniBand configuration
# Load IPoIB kernel module
modprobe ib_ipoib

# Configure IPoIB interface
ifconfig ib0 192.168.100.1/24 up

# Connected mode for higher performance
echo connected > /sys/class/net/ib0/mode

# Set MTU for better performance
ifconfig ib0 mtu 65520

# Python InfiniBand monitoring
import subprocess
import re

def get_ib_devices():
    result = subprocess.run(['ibstat'], capture_output=True, text=True)
    devices = []
    
    current_device = None
    for line in result.stdout.split('\\n'):
        if line.startswith('CA '):
            if current_device:
                devices.append(current_device)
            current_device = {'name': line.split("'")[1]}
        elif current_device and 'State:' in line:
            current_device['state'] = line.split(':')[1].strip()
        elif current_device and 'Physical state:' in line:
            current_device['physical_state'] = line.split(':')[1].strip()
    
    if current_device:
        devices.append(current_device)
    
    return devices

def monitor_ib_performance():
    result = subprocess.run(['perfquery'], capture_output=True, text=True)
    
    metrics = {}
    for line in result.stdout.split('\\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            metrics[key.strip()] = value.strip()
    
    return metrics

# Usage
devices = get_ib_devices()
perf = monitor_ib_performance()

print(f"InfiniBand devices: {len(devices)}")
for device in devices:
    print(f"  {device['name']}: {device.get('state', 'Unknown')}")`,
        explanation: "InfiniBand subnet management and performance monitoring configuration."
      }
    ],
    diagrams: [
      {
        src: "/infiniband_architecture.png",
        alt: "InfiniBand architecture",
        caption: "InfiniBand fabric architecture and switching hierarchy"
      },
      {
        src: "/infiniband_stack.jpg",
        alt: "InfiniBand protocol stack",
        caption: "InfiniBand protocol layers and RDMA operations"
      }
    ],
    relatedProtocols: ["rdma", "ethernet", "roce", "iwarp"],
    resources: [
      {
        title: "InfiniBand Architecture Specification",
        url: "https://www.infinibandta.org/",
        type: "Specification"
      },
      {
        title: "RDMA Programming Guide",
        url: "https://www.kernel.org/doc/Documentation/infiniband/",
        type: "Documentation"
      },
      {
        title: "OpenFabrics Alliance",
        url: "https://www.openfabrics.org/",
        type: "Organization"
      }
    ],
    securityConsiderations: [
      "Partition key management",
      "Physical network security",
      "Subnet manager protection",
      "Access control lists",
      "Fabric isolation",
      "Key distribution",
      "Monitoring and auditing",
      "Firmware security updates"
    ]
  }