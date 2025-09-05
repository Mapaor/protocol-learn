import { Protocol } from "../../types/protocol";

export const BITTORRENT: Protocol = {
    id: "bittorrent",
    name: "BitTorrent",
    category: "Data",
    difficulty: "Advanced",
    shortDescription: "Peer-to-peer file sharing protocol for distributed content delivery",
    fullDescription: "BitTorrent is a peer-to-peer (P2P) file sharing protocol that enables efficient distribution of large files across networks. It breaks files into small pieces and allows users to download different pieces from multiple sources simultaneously, reducing server load and improving download speeds through distributed sharing.",
    port: "6881-6889 (default range)",
    advantages: [
      "Efficient bandwidth usage",
      "Scalable distribution",
      "Reduced server costs",
      "Fault tolerant",
      "Self-organizing network",
      "Resume capability"
    ],
    disadvantages: [
      "Copyright concerns",
      "Security risks",
      "Bandwidth consumption",
      "Slower for rare content",
      "Complex protocol",
      "ISP throttling"
    ],
    useCases: [
      "Large file distribution",
      "Software distribution",
      "Media content sharing",
      "Game updates",
      "Linux distributions",
      "Scientific data sharing",
      "Backup distribution",
      "Content delivery networks",
      "Decentralized storage",
      "Blockchain data sync",
      "Academic research sharing",
      "Open source projects"
    ],
    examples: [
      {
        title: "BitTorrent Protocol Flow",
        code: `# BitTorrent file sharing process

1. Create .torrent file (metadata)
   - File information (name, size, hash)
   - Tracker URL
   - Piece hashes for verification

2. Upload .torrent to tracker
   - Tracker maintains peer list
   - Coordinates peer discovery

3. Download process:
   - Parse .torrent file
   - Connect to tracker
   - Get peer list
   - Connect to peers
   - Exchange piece information
   - Download pieces from multiple peers
   - Verify piece integrity
   - Share downloaded pieces with others

# Example .torrent file structure (bencoded)
d8:announce27:http://tracker.example.com/13:creation datei1609459200e4:infod6:lengthi1048576e4:name12:example.txt12:piece lengthi32768e6:pieces60:[SHA1 hashes of pieces]ee

# Peer wire protocol messages
- handshake: Initial connection
- keep-alive: Maintain connection  
- choke/unchoke: Flow control
- interested/not interested: Request status
- have: Announce piece availability
- bitfield: Announce all available pieces
- request: Request piece data
- piece: Send piece data
- cancel: Cancel request`,
        explanation: "Overview of BitTorrent protocol operation and message types."
      },
      {
        title: "DHT and Magnet Links",
        code: `# Distributed Hash Table (DHT) for trackerless operation
# Kademlia-based DHT stores peer information

# Magnet link format
magnet:?xt=urn:btih:HASH&dn=FILENAME&tr=TRACKER_URL

# Example magnet link
magnet:?xt=urn:btih:c12fe1c06bba254a9dc9f519b335aa7c1367a88a&dn=Ubuntu%2020.04%20LTS&tr=http://tracker.ubuntu.com:6969/announce

# DHT operations
- ping: Check node availability
- find_node: Locate closest nodes to target
- get_peers: Find peers for specific torrent
- announce_peer: Announce presence for torrent

# BitTorrent over HTTP (BEP 19)
GET /announce?info_hash=...&peer_id=...&port=...&uploaded=...&downloaded=...&left=...
Response: bencoded peer list

# WebRTC support (WebTorrent)
- Enables BitTorrent in web browsers
- Uses WebRTC data channels
- Hybrid clients bridge TCP and WebRTC networks`,
        explanation: "Advanced BitTorrent features including DHT and modern implementations."
      },
      {
        title: "Python BitTorrent Implementation",
        code: `# Simple BitTorrent client example using libtorrent
import libtorrent as lt
import time

# Create session
session = lt.session()
session.listen_on(6881, 6891)

# Add torrent
torrent_info = lt.torrent_info('example.torrent')
torrent_handle = session.add_torrent({
    'ti': torrent_info,
    'save_path': './downloads'
})

print(f"Starting download: {torrent_info.name()}")

# Monitor progress
while not torrent_handle.is_seed():
    status = torrent_handle.status()
    
    print(f"Progress: {status.progress * 100:.1f}%")
    print(f"Download rate: {status.download_rate / 1000:.1f} kB/s")
    print(f"Upload rate: {status.upload_rate / 1000:.1f} kB/s")
    print(f"Peers: {status.num_peers}")
    print(f"Seeds: {status.num_seeds}")
    
    time.sleep(1)

print("Download completed!")

# Magnet link handling
magnet_link = "magnet:?xt=urn:btih:..."
add_torrent_params = lt.parse_magnet_uri(magnet_link)
add_torrent_params['save_path'] = './downloads'
torrent_handle = session.add_torrent(add_torrent_params)`,
        explanation: "Python implementation using libtorrent library."
      }
    ],
    relatedProtocols: ["dht", "tcp", "udp", "http"],
    resources: [
      {
        title: "BitTorrent Protocol Specification",
        url: "https://www.bittorrent.org/beps/bep_0003.html",
        type: "Specification"
      },
      {
        title: "DHT Protocol (BEP 5)",
        url: "https://www.bittorrent.org/beps/bep_0005.html",
        type: "Specification"
      }
    ],
    securityConsiderations: [
      "Malware distribution",
      "IP address exposure",
      "Traffic analysis",
      "Poisoning attacks",
      "Eclipse attacks on DHT",
      "Bandwidth exhaustion"
    ]
};
