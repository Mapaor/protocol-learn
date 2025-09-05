import { Protocol } from "../../types/protocol";

export const DHT: Protocol = {
    id: "dht",
    name: "DHT",
    category: "Network",
    difficulty: "Advanced",
    shortDescription: "Distributed Hash Table for decentralized key-value storage",
    fullDescription: "DHT (Distributed Hash Table) is a distributed system that provides a lookup service similar to a hash table. It distributes key-value pairs among participating nodes and enables efficient location of values given their corresponding keys, without requiring a central coordinator.",
    port: "Variable (application dependent)",
    advantages: [
      "Decentralized architecture",
      "Fault tolerance",
      "Self-organizing",
      "Scalable",
      "No single point of failure",
      "Efficient routing"
    ],
    disadvantages: [
      "Complex implementation",
      "Churn handling",
      "Security vulnerabilities",
      "Eventual consistency",
      "Bootstrap dependency",
      "Network partitioning issues"
    ],
    useCases: [
      "Peer-to-peer networks",
      "Content distribution",
      "Distributed storage",
      "BitTorrent trackerless mode",
      "Blockchain networks",
      "IoT device discovery",
      "Distributed databases",
      "Content-addressable networks",
      "Service discovery",
      "Distributed caching",
      "Overlay networks",
      "Decentralized applications"
    ],
    examples: [
      {
        title: "Kademlia DHT Algorithm",
        code: `# Kademlia DHT - most popular DHT implementation

# Node ID and Distance
- Each node has 160-bit ID (SHA-1 hash)
- Distance = XOR of two node IDs
- Nodes maintain routing table with k-buckets

# Routing Table Structure
k-buckets[0]   = nodes with distance 2^0 to 2^1-1
k-buckets[1]   = nodes with distance 2^1 to 2^2-1
...
k-buckets[159] = nodes with distance 2^159 to 2^160-1

# Four main operations:
1. PING - check if node is alive
2. STORE - store key-value pair
3. FIND_NODE - find k closest nodes to given ID
4. FIND_VALUE - find value for given key

# Example message format (simplified)
{
  "id": "sender_node_id",
  "method": "find_node", 
  "args": {
    "target": "target_node_id"
  }
}

# Response
{
  "id": "responder_node_id",
  "response": {
    "nodes": "compact_node_info"
  }
}

# Iterative lookup algorithm:
1. Start with k closest known nodes
2. Send FIND_NODE/FIND_VALUE to closest nodes
3. Add returned nodes to candidate list
4. Repeat with k closest unqueried nodes
5. Stop when no closer nodes found`,
        explanation: "Kademlia DHT implementation details and lookup algorithm."
      },
      {
        title: "DHT Node Implementation",
        code: `# Python DHT node example
import hashlib
import socket
import threading
import json
from typing import Dict, List, Tuple

class DHTNode:
    def __init__(self, node_id: str, host: str, port: int, k: int = 20):
        self.node_id = node_id
        self.host = host
        self.port = port
        self.k = k  # bucket size
        self.storage: Dict[str, str] = {}
        self.routing_table: List[List[Tuple[str, str, int]]] = [[] for _ in range(160)]
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        
    def distance(self, id1: str, id2: str) -> int:
        """Calculate XOR distance between two node IDs"""
        return int(id1, 16) ^ int(id2, 16)
    
    def bucket_index(self, target_id: str) -> int:
        """Find appropriate k-bucket for target ID"""
        dist = self.distance(self.node_id, target_id)
        return dist.bit_length() - 1 if dist > 0 else 0
    
    def add_node(self, node_id: str, host: str, port: int):
        """Add node to routing table"""
        bucket_idx = self.bucket_index(node_id)
        bucket = self.routing_table[bucket_idx]
        
        # Check if node already exists
        for i, (nid, _, _) in enumerate(bucket):
            if nid == node_id:
                # Move to end (most recently seen)
                bucket.append(bucket.pop(i))
                return
        
        # Add new node
        if len(bucket) < self.k:
            bucket.append((node_id, host, port))
        else:
            # Ping least recently seen node
            if self.ping_node(bucket[0][1], bucket[0][2]):
                bucket.append(bucket.pop(0))  # Move to end
            else:
                bucket.pop(0)  # Remove dead node
                bucket.append((node_id, host, port))
    
    def find_closest_nodes(self, target_id: str, count: int = None) -> List[Tuple[str, str, int]]:
        """Find closest nodes to target ID"""
        if count is None:
            count = self.k
            
        candidates = []
        for bucket in self.routing_table:
            candidates.extend(bucket)
        
        # Sort by distance to target
        candidates.sort(key=lambda x: self.distance(x[0], target_id))
        return candidates[:count]
    
    def store(self, key: str, value: str):
        """Store key-value pair"""
        self.storage[key] = value
        
        # Also store on closest nodes
        closest_nodes = self.find_closest_nodes(key)
        for node_id, host, port in closest_nodes:
            self.send_store(host, port, key, value)
    
    def find_value(self, key: str) -> str:
        """Find value for key using iterative lookup"""
        if key in self.storage:
            return self.storage[key]
        
        # Iterative lookup
        queried = set()
        candidates = self.find_closest_nodes(key)
        
        while candidates:
            # Query closest unqueried node
            for node_id, host, port in candidates:
                if node_id not in queried:
                    queried.add(node_id)
                    result = self.send_find_value(host, port, key)
                    if result:
                        return result
                    break
        
        return None`,
        explanation: "Python implementation of a basic DHT node with Kademlia routing."
      },
      {
        title: "DHT in BitTorrent",
        code: `# BitTorrent DHT (BEP 5) implementation

# Node ID generation
import hashlib
import random

def generate_node_id():
    return hashlib.sha1(str(random.random()).encode()).hexdigest()

# DHT query types in BitTorrent
{
  "t": "aa",           # transaction ID
  "y": "q",            # query
  "q": "ping",         # query type
  "a": {
    "id": "node_id"    # querying node's ID
  }
}

# find_node query
{
  "t": "aa",
  "y": "q", 
  "q": "find_node",
  "a": {
    "id": "querying_node_id",
    "target": "target_node_id"
  }
}

# get_peers query (BitTorrent specific)
{
  "t": "aa",
  "y": "q",
  "q": "get_peers", 
  "a": {
    "id": "querying_node_id",
    "info_hash": "torrent_info_hash"
  }
}

# announce_peer query
{
  "t": "aa",
  "y": "q",
  "q": "announce_peer",
  "a": {
    "id": "querying_node_id",
    "info_hash": "torrent_info_hash",
    "port": 6881,
    "token": "received_token"
  }
}

# Compact node info format (26 bytes per node)
# 20 bytes node ID + 4 bytes IP + 2 bytes port
def encode_node_info(nodes):
    result = b""
    for node_id, ip, port in nodes:
        result += bytes.fromhex(node_id)
        result += socket.inet_aton(ip)
        result += port.to_bytes(2, 'big')
    return result`,
        explanation: "DHT implementation specific to BitTorrent protocol."
      }
    ],
    relatedProtocols: ["bittorrent", "ipfs", "tcp", "udp"],
    resources: [
      {
        title: "Kademlia: A Peer-to-peer Information System",
        url: "https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf",
        type: "Documentation"
      },
      {
        title: "BitTorrent DHT Protocol",
        url: "https://www.bittorrent.org/beps/bep_0005.html",
        type: "Specification"
      }
    ],
    securityConsiderations: [
      "Sybil attacks",
      "Eclipse attacks", 
      "Poisoning attacks",
      "Routing table pollution",
      "DDoS amplification",
      "Privacy concerns"
    ]
};
