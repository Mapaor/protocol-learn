import { Protocol } from "../../types/protocol";

export const SRTP: Protocol = {
    id: "srtp",
    name: "SRTP",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "Secure Real-time Transport Protocol for encrypted media streaming",
    fullDescription: "SRTP (Secure Real-time Transport Protocol) provides encryption, message authentication, and replay protection for RTP (Real-time Transport Protocol) data streams. It's designed to secure voice and video communications over IP networks.",
    port: "Variable (same as RTP)",
    advantages: [
      "End-to-end encryption",
      "Low latency overhead",
      "Replay protection",
      "Authentication",
      "Key management",
      "Scalable security"
    ],
    disadvantages: [
      "Complex key management",
      "Processing overhead",
      "Implementation complexity",
      "Debugging difficulties",
      "Compatibility issues",
      "Configuration complexity"
    ],
    useCases: [
      "VoIP communications",
      "Video conferencing",
      "Live streaming",
      "WebRTC applications",
      "Secure broadcasting",
      "Remote collaboration",
      "Telepresence systems",
      "Mobile communications",
      "IoT device streaming",
      "Gaming communications",
      "Emergency services",
      "Financial trading floors"
    ],
    examples: [
      {
        title: "SRTP Packet Structure",
        code: `# SRTP Packet Format
# [RTP Header][RTP Payload][SRTP MKI][SRTP Auth Tag]

# Original RTP Header (12 bytes minimum)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|X|  CC   |M|     PT      |       sequence number         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           timestamp                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           synchronization source (SSRC) identifier          |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
|            contributing source (CSRC) identifiers            |
|                             ....                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# SRTP Additions:
# - RTP payload is encrypted
# - MKI (Master Key Identifier) - optional
# - Authentication Tag - MAC for integrity

# SRTP Transforms:
# Encryption: AES-CTR (Counter Mode)
# Authentication: HMAC-SHA1 
# Key derivation: AES-CTR based

# Example SRTP Policy
{
  "crypto_suite": "AES_CM_128_HMAC_SHA1_80",
  "master_key": "0123456789ABCDEF0123456789ABCDEF",
  "master_salt": "0123456789ABCDEF01234567",
  "mki": null,
  "auth_tag_len": 10,
  "encryption_key_len": 16,
  "auth_key_len": 20
}`,
        explanation: "SRTP packet structure and encryption parameters."
      },
      {
        title: "SRTP Key Derivation",
        code: `# SRTP Key Derivation Function (KDF)
# Based on AES Counter Mode

# Master Key = 128 bits (16 bytes)
# Master Salt = 112 bits (14 bytes)  
# Packet Index = 48 bits (6 bytes)

# Key Derivation:
# Session Key = AES-CTR(Master Key, IV)
# where IV = Master Salt || Packet Index || 0x00

# Three session keys derived:
# 1. Session Encryption Key (for RTP payload)
# 2. Session Authentication Key (for HMAC)
# 3. Session Salt (for encryption IV)

# Python SRTP key derivation example
import hashlib
import hmac
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def derive_srtp_keys(master_key, master_salt, ssrc, roc=0):
    """Derive SRTP session keys from master key and salt"""
    
    # Key derivation rate (default: 0 = never re-key)
    kdr = 0
    
    # Calculate key_id based on ROC (rollover counter) and packet index
    key_id = roc >> kdr if kdr > 0 else 0
    
    # Derive encryption key
    enc_key = derive_key(master_key, master_salt, 0x00, key_id)
    
    # Derive authentication key  
    auth_key = derive_key(master_key, master_salt, 0x01, key_id)
    
    # Derive salt key
    salt_key = derive_key(master_key, master_salt, 0x02, key_id)
    
    return enc_key, auth_key, salt_key

def derive_key(master_key, master_salt, label, key_id):
    """PRF function for key derivation"""
    # Construct IV: master_salt || label || key_id || 0x00
    iv = master_salt + bytes([label]) + key_id.to_bytes(6, 'big') + b'\\x00'
    
    # AES-CTR to generate key material
    cipher = Cipher(algorithms.AES(master_key), modes.CTR(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    
    # Generate enough key material (simplified)
    key_material = encryptor.update(b'\\x00' * 32)
    return key_material[:16]  # Return first 16 bytes

# Example usage
master_key = b'\\x01\\x23\\x45\\x67\\x89\\xAB\\xCD\\xEF' * 2  # 16 bytes
master_salt = b'\\x01\\x23\\x45\\x67\\x89\\xAB\\xCD\\xEF\\x01\\x23\\x45\\x67\\x89\\xAB'  # 14 bytes
ssrc = 0x12345678

enc_key, auth_key, salt_key = derive_srtp_keys(master_key, master_salt, ssrc)
print(f"Encryption Key: {enc_key.hex()}")
print(f"Auth Key: {auth_key.hex()}")
print(f"Salt Key: {salt_key.hex()}")`,
        explanation: "SRTP key derivation process and implementation."
      },
      {
        title: "WebRTC SRTP Implementation",
        code: `// WebRTC SRTP configuration
const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// Get user media with audio/video
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});

// Add tracks to peer connection
stream.getTracks().forEach(track => {
  peerConnection.addTrack(track, stream);
});

// Handle incoming tracks
peerConnection.ontrack = (event) => {
  const remoteVideo = document.getElementById('remoteVideo');
  remoteVideo.srcObject = event.streams[0];
};

// Create offer with SRTP
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);

// SDP contains SRTP crypto parameters
console.log('SDP Offer:', offer.sdp);

// Example SDP with SRTP:
/*
m=video 9 UDP/TLS/RTP/SAVPF 96 97 98
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:abc123
a=ice-pwd:def456789
a=ice-options:trickle
a=fingerprint:sha-256 AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78
a=setup:actpass
a=mid:0
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=sendrecv
a=rtcp-mux
a=rtpmap:96 VP8/90000
a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:WVNfX19zZW1jdGwgKCkgewkyMjA7fQp9CnVubGVz
*/

// DTLS-SRTP key exchange (automatic in WebRTC)
peerConnection.ondatachannel = (event) => {
  console.log('DTLS handshake completed, SRTP keys exchanged');
};

// Manual SRTP configuration (lower level)
const srtp_config = {
  crypto_suite: 'AES_CM_128_HMAC_SHA1_80',
  keys: {
    local: {
      master_key: 'base64_encoded_key',
      master_salt: 'base64_encoded_salt'
    },
    remote: {
      master_key: 'base64_encoded_key', 
      master_salt: 'base64_encoded_salt'
    }
  },
  window_size: 64,  // Replay protection window
  auth_tag_len: 10  // Authentication tag length
};

// Node.js SRTP implementation
const srtp = require('node-srtp');

const session = srtp.createSession({
  localKey: Buffer.from('your_local_key', 'base64'),
  localSalt: Buffer.from('your_local_salt', 'base64'), 
  remoteKey: Buffer.from('remote_key', 'base64'),
  remoteSalt: Buffer.from('remote_salt', 'base64'),
  profile: srtp.Profile.AES_128_CM_SHA1_80
});

// Encrypt outgoing RTP
const encryptedRtp = session.protect(rtpPacket);

// Decrypt incoming SRTP
const decryptedRtp = session.unprotect(srtpPacket);`,
        explanation: "WebRTC and Node.js SRTP implementation examples."
      }
    ],
    relatedProtocols: ["rtp", "dtls", "tls", "webrtc", "sip"],
    resources: [
      {
        title: "RFC 3711 - SRTP Specification",
        url: "https://tools.ietf.org/html/rfc3711",
        type: "RFC"
      },
      {
        title: "RFC 5764 - DTLS-SRTP",
        url: "https://tools.ietf.org/html/rfc5764",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Key management",
      "Perfect forward secrecy",
      "Replay protection",
      "Authentication verification",
      "Side-channel attacks",
      "Implementation security"
    ]
};
