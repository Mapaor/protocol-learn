import { Protocol } from "../../types/protocol";

export const RDMA: Protocol = {
  id: "rdma",
  name: "RDMA",
  category: "Network",
  difficulty: "Advanced",
  shortDescription: "Remote Direct Memory Access for high-performance, low-latency data transfer",
  fullDescription:
    "Remote Direct Memory Access (RDMA) is a network technology that allows one computer to directly read from or write to the memory of another computer without involving the operating system or CPU of either system. This enables very high throughput and low latency, making it ideal for high-performance computing (HPC), data centers, storage systems, and AI/ML workloads.",
  port: "Varies (depends on transport: InfiniBand, RoCE, iWARP)",
  versions: ["InfiniBand RDMA", "RoCE (RDMA over Converged Ethernet)", "iWARP (RDMA over TCP/IP)"],
  advantages: [
    "Ultra-low latency communication",
    "Bypasses CPU involvement",
    "High throughput data transfer",
    "Efficient memory-to-memory transfer",
    "Reduces overhead in distributed applications",
    "Ideal for HPC and large-scale data centers",
    "Scales across large clusters"
  ],
  disadvantages: [
    "Complex configuration",
    "Hardware dependency (specialized NICs)",
    "Limited support in commodity networks",
    "Troubleshooting is difficult",
    "Vendor-specific implementations",
    "Requires specialized knowledge"
  ],
  useCases: [
    "High-performance computing clusters",
    "Distributed AI/ML model training",
    "Low-latency financial trading systems",
    "Big data analytics (e.g., Hadoop, Spark acceleration)",
    "Distributed storage systems (e.g., Ceph, Lustre)",
    "Cloud-scale databases",
    "Real-time scientific simulations"
  ],
  examples: [
    {
      title: "RDMA Verbs API (C Example)",
      code: `#include <infiniband/verbs.h>

// Basic RDMA context setup (simplified)
struct ibv_context *ctx;
struct ibv_pd *pd;
struct ibv_cq *cq;
struct ibv_qp *qp;

// Open device and allocate resources
ctx = ibv_open_device(ibv_get_device_list(NULL)[0]);
pd = ibv_alloc_pd(ctx);
cq = ibv_create_cq(ctx, 16, NULL, NULL, 0);

// Create a queue pair for RDMA operations
struct ibv_qp_init_attr qp_attr = {
    .send_cq = cq,
    .recv_cq = cq,
    .cap     = {
        .max_send_wr  = 16,
        .max_recv_wr  = 16,
        .max_send_sge = 1,
        .max_recv_sge = 1
    },
    .qp_type = IBV_QPT_RC
};
qp = ibv_create_qp(pd, &qp_attr);

// Memory registration
char *buffer = malloc(4096);
struct ibv_mr *mr = ibv_reg_mr(pd, buffer, 4096, IBV_ACCESS_LOCAL_WRITE |
                                                IBV_ACCESS_REMOTE_WRITE |
                                                IBV_ACCESS_REMOTE_READ);

// Now the buffer can be used for zero-copy RDMA operations`,
      explanation: "A simplified RDMA Verbs API example showing context, queue pair, and memory registration setup in C."
    },
    {
      title: "RDMA over Converged Ethernet (RoCE) Network Configuration",
      code: `# Enable RoCE on Mellanox NIC
ethtool -i eth0   # Check NIC driver supports RoCE
mlxconfig -d /dev/mst/mt4119_pciconf0 set ROCE=1

# Configure priority flow control (PFC) for lossless Ethernet
dcbtool sc eth0 pfc e:1 a:1 w:1

# Verify RoCE functionality
ibv_devinfo`,
      explanation: "Example of enabling and verifying RDMA over Converged Ethernet (RoCE) on a Mellanox adapter."
    },
    {
      title: "RDMA Python Example with pyverbs",
      code: `from pyverbs.device import Context
from pyverbs.pd import PD
from pyverbs.cq import CQ
from pyverbs.qp import QPCap, QPInitAttr, QP

# Open RDMA device
ctx = Context(name='mlx5_0')
pd = PD(ctx)
cq = CQ(ctx, 16)

# Create Queue Pair
cap = QPCap(max_send_wr=16, max_recv_wr=16, max_send_sge=1, max_recv_sge=1)
attr = QPInitAttr(qp_type=2, cap=cap, scq=cq, rcq=cq)
qp = QP(pd, attr)

print("RDMA Queue Pair created:", qp.qp_num)`,
      explanation: "A Python example using pyverbs library to create an RDMA queue pair."
    }
  ],
  diagrams: [
    {
      src: "/rdma_architecture.png",
      alt: "RDMA architecture",
      caption: "RDMA architecture showing direct memory-to-memory data transfer bypassing CPUs and OS."
    },
    {
      src: "/rdma_transports.png",
      alt: "RDMA transport types",
      caption: "RDMA transport implementations: InfiniBand, RoCE, and iWARP."
    }
  ],
  relatedProtocols: ["infiniband", "roce", "iwarp", "ethernet", "tcp", "ip"],
  resources: [
    {
      title: "RDMA Consortium",
      url: "https://www.rdmaconsortium.org/",
      type: "Reference"
    },
    {
      title: "Introduction to InfiniBand and RDMA Programming",
      url: "https://www.rdmamojo.com/",
      type: "Tutorial"
    },
    {
      title: "RoCE Overview - Mellanox",
      url: "https://community.mellanox.com/s/article/what-is-roce",
      type: "Article"
    }
  ],
  securityConsiderations: [
    "Access control for remote memory operations",
    "Mitigation of unauthorized memory access",
    "Network isolation for RDMA-enabled clusters",
    "Traffic encryption when running over Ethernet/IP",
    "Protection against resource exhaustion attacks",
    "Driver and firmware security updates"
  ]
};
