import { Protocol } from "../../types/protocol";

export const IPFS: Protocol = {
    id: "ipfs",
    name: "IPFS",
    category: "Data",
    difficulty: "Advanced",
    shortDescription: "Peer-to-peer distributed file system using content addressing",
    fullDescription: "IPFS (InterPlanetary File System) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. It uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices, creating a decentralized web.",
    port: "4001 (default P2P), 5001 (API), 8080 (Gateway)",
    advantages: [
      "Content addressing",
      "Deduplication",
      "Distributed storage",
      "Censorship resistance",
      "Version control",
      "Offline capability"
    ],
    disadvantages: [
      "Complex setup",
      "Performance variability",
      "Storage persistence",
      "Discovery challenges",
      "Learning curve",
      "Network effects"
    ],
    useCases: [
      "Decentralized websites",
      "Content distribution",
      "Data archiving",
      "Blockchain storage",
      "Scientific data sharing",
      "Media streaming",
      "Software distribution",
      "Documentation hosting",
      "NFT metadata storage",
      "Decentralized applications",
      "Version control systems",
      "IoT data storage"
    ],
    examples: [
      {
        title: "IPFS Content Addressing",
        code: `# IPFS uses content-based addressing (CID - Content Identifier)

# CID Structure (v1):
# <multibase><version><multicodec><multihash>

# Example CID:
QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG

# CID breakdown:
- Qm: Base58 encoding prefix
- Hash: SHA-256 of content
- Multihash: Self-describing hash format

# Adding files to IPFS
$ ipfs add hello.txt
added QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG hello.txt

# Retrieving files
$ ipfs cat QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG
Hello, IPFS World!

# Directory structure (UnixFS)
{
  "Data": "CAE=",  // UnixFS protobuf data
  "Links": [
    {
      "Hash": "QmHash1...",
      "Name": "file1.txt", 
      "Size": 15
    },
    {
      "Hash": "QmHash2...",
      "Name": "file2.txt",
      "Size": 23
    }
  ]
}

# IPFS Gateway URLs
https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG
https://gateway.pinata.cloud/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG`,
        explanation: "IPFS content addressing system and basic operations."
      },
      {
        title: "IPFS Node Operations",
        code: `# Initialize IPFS node
$ ipfs init
initializing IPFS node at /Users/user/.ipfs
generating 2048-bit RSA keypair...done
peer identity: QmPeerID...

# Start IPFS daemon
$ ipfs daemon
Initializing daemon...
go-ipfs version: 0.12.0
Repo version: 12
System version: amd64/darwin
Golang version: go1.17.6
Swarm listening on /ip4/127.0.0.1/tcp/4001
Swarm listening on /ip6/::1/tcp/4001
API server listening on /ip4/127.0.0.1/tcp/5001
WebUI: http://127.0.0.1:5001/webui
Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080

# Pin content (prevent garbage collection)
$ ipfs pin add QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG
pinned QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG recursively

# Publish to IPNS (InterPlanetary Name System)
$ ipfs name publish QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG
Published to k51qzi5uqu5dg4...

# Create and publish website
$ ipfs add -r website/
added QmHash1... website/index.html
added QmHash2... website/style.css
added QmHash3... website

$ ipfs name publish QmHash3
Published to k51qzi5uqu5dg4...

# Access via: https://k51qzi5uqu5dg4....ipns.dweb.link/`,
        explanation: "IPFS node setup and content publishing workflow."
      },
      {
        title: "IPFS JavaScript API",
        code: `// Using js-ipfs or ipfs-http-client
import { create } from 'ipfs-http-client'

// Connect to local IPFS node
const ipfs = create({ url: 'http://localhost:5001' })

// Add content
async function addContent() {
  const content = 'Hello IPFS from JavaScript!'
  const result = await ipfs.add(content)
  console.log('Added:', result.path)
  return result.path
}

// Retrieve content
async function getContent(hash) {
  const chunks = []
  for await (const chunk of ipfs.cat(hash)) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString()
}

// Add JSON object
async function addJSON() {
  const data = { 
    message: 'Hello World',
    timestamp: Date.now()
  }
  const result = await ipfs.add(JSON.stringify(data))
  return result.path
}

// List files in directory
async function listDirectory(hash) {
  const files = []
  for await (const file of ipfs.ls(hash)) {
    files.push({
      name: file.name,
      hash: file.cid.toString(),
      size: file.size
    })
  }
  return files
}

// Pin content
async function pinContent(hash) {
  await ipfs.pin.add(hash)
  console.log('Pinned:', hash)
}

// IPNS operations
async function publishToIPNS(hash) {
  const result = await ipfs.name.publish(hash)
  console.log('Published to IPNS:', result.name)
  return result.name
}

// Subscribe to pubsub
async function subscribeTopic(topic) {
  await ipfs.pubsub.subscribe(topic, (message) => {
    console.log('Received:', message.data.toString())
  })
}

// Publish to pubsub
async function publishMessage(topic, message) {
  await ipfs.pubsub.publish(topic, message)
}

// Example usage
(async () => {
  const hash = await addContent()
  const content = await getContent(hash)
  console.log('Retrieved:', content)
  
  const ipnsName = await publishToIPNS(hash)
  console.log('IPNS:', ipnsName)
})()`,
        explanation: "JavaScript client for interacting with IPFS nodes."
      }
    ],
    relatedProtocols: ["dht", "bittorrent", "http", "websockets"],
    resources: [
      {
        title: "IPFS Documentation",
        url: "https://docs.ipfs.io/",
        type: "Documentation"
      },
      {
        title: "IPFS Whitepaper",
        url: "https://ipfs.io/ipfs/QmR7GSQM93Cx5eAg6a6yRzNde1FQv7uL6X1o4k7zrJa3LX/ipfs.draft3.pdf",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Content verification",
      "Node authentication",
      "Privacy protection",
      "Malicious content",
      "DDoS resistance",
      "Gateway security"
    ]
};
