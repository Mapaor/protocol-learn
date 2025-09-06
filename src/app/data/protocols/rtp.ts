import { Protocol } from "../../types/protocol";

export const RTP: Protocol = {
    id: "rtp",
    name: "RTP",
    category: "Real Time",
    difficulty: "Advanced",
    shortDescription: "Real-time Transport Protocol for audio and video streaming",
    fullDescription: "RTP (Real-time Transport Protocol) is a network protocol for delivering audio and video over IP networks. It's used in communication and entertainment systems that involve streaming media, such as telephony, video teleconference applications, television services and web-based push-to-talk features.",
    port: "Dynamic (typically 16384-32767), controlled by RTCP",
    advantages: [
      "Low latency",
      "Payload flexibility",
      "Timestamp synchronization",
      "Sequence numbering",
      "Multi-party support",
      "Quality monitoring"
    ],
    disadvantages: [
      "No delivery guarantee",
      "No flow control",
      "Overhead complexity",
      "Security limitations",
      "NAT traversal issues",
      "Jitter sensitivity"
    ],
    useCases: [
      "VoIP systems",
      "Video conferencing",
      "Live streaming",
      "IPTV broadcasts",
      "WebRTC applications",
      "Audio streaming",
      "Gaming voice chat",
      "Remote presentations",
      "Security cameras",
      "Digital radio",
      "Video surveillance",
      "Telemedicine"
    ],
    examples: [
      {
        title: "RTP Packet Structure and Headers",
        code: `# RTP Header Format (12 bytes minimum)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|X|  CC   |M|     PT      |       Sequence Number         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           Timestamp                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Synchronization Source (SSRC) identifier           |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
|            Contributing Source (CSRC) identifiers            |
|                             ....                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# Field Descriptions:
V (Version): 2 bits - RTP version (always 2)
P (Padding): 1 bit - Padding flag
X (Extension): 1 bit - Extension header present
CC (CSRC Count): 4 bits - Number of CSRC identifiers
M (Marker): 1 bit - Application-specific marker
PT (Payload Type): 7 bits - Format of RTP payload
Sequence Number: 16 bits - Increments by one for each packet
Timestamp: 32 bits - Sampling instant of first octet
SSRC: 32 bits - Synchronization source identifier
CSRC: 32 bits each - Contributing source identifiers

# Common Payload Types (PT Values)
PT   Encoding    Media Type  Clock Rate  Channels
0    PCMU        Audio       8000        1
3    GSM         Audio       8000        1  
4    G723        Audio       8000        1
5    DVI4        Audio       8000        1
6    DVI4        Audio       16000       1
7    LPC         Audio       8000        1
8    PCMA        Audio       8000        1
9    G722        Audio       8000        1
10   L16         Audio       44100       2
11   L16         Audio       44100       1
14   MPA         Audio       90000       -
25   CelB        Video       90000       -
26   JPEG        Video       90000       -
31   H261        Video       90000       -
32   MPV         Video       90000       -
33   MP2T        AV          90000       -
34   H263        Video       90000       -

# Dynamic Payload Types (96-127)
96-127: Dynamic assignment via SDP

# RTP Packet Example (Hexadecimal)
80 08 00 01 00 00 03 E8 AB CD EF 12 FF FF 00 00 CE FA ED FE
|  |  |     |           |           |  
|  |  |     |           |           +-- Payload data
|  |  |     |           +-------------- SSRC (0xABCDEF12)
|  |  |     +-------------------------- Timestamp (0x000003E8 = 1000)
|  |  +-------------------------------- Sequence number (0x0001 = 1)
|  +----------------------------------- PT=8 (PCMA), M=0
+------------------------------------- V=2, P=0, X=0, CC=0

# RTP Extension Header (when X=1)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      Defined by Profile       |           Length              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Extension Data                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# RTP Padding (when P=1)
Last octet contains padding length`,
        explanation: "RTP packet structure, header fields, and payload type definitions."
      },
      {
        title: "RTP Session Management and Implementation",
        code: `# Python RTP Implementation using socket
import socket
import struct
import time
import threading

class RTPPacket:
    def __init__(self, payload_type=0, sequence=0, timestamp=0, ssrc=0x12345678):
        self.version = 2
        self.padding = 0
        self.extension = 0
        self.cc = 0
        self.marker = 0
        self.payload_type = payload_type
        self.sequence = sequence
        self.timestamp = timestamp
        self.ssrc = ssrc
        self.payload = b''
    
    def pack(self):
        # Pack RTP header (12 bytes)
        header = struct.pack('!BBHII',
            (self.version << 6) | (self.padding << 5) | (self.extension << 4) | self.cc,
            (self.marker << 7) | self.payload_type,
            self.sequence,
            self.timestamp,
            self.ssrc
        )
        return header + self.payload
    
    @classmethod
    def unpack(cls, data):
        if len(data) < 12:
            return None
        
        header = struct.unpack('!BBHII', data[:12])
        
        packet = cls()
        first_byte = header[0]
        packet.version = (first_byte >> 6) & 0x03
        packet.padding = (first_byte >> 5) & 0x01
        packet.extension = (first_byte >> 4) & 0x01
        packet.cc = first_byte & 0x0F
        
        second_byte = header[1]
        packet.marker = (second_byte >> 7) & 0x01
        packet.payload_type = second_byte & 0x7F
        
        packet.sequence = header[2]
        packet.timestamp = header[3]
        packet.ssrc = header[4]
        packet.payload = data[12:]
        
        return packet

class RTPSender:
    def __init__(self, dest_ip, dest_port, payload_type=0):
        self.dest_ip = dest_ip
        self.dest_port = dest_port
        self.payload_type = payload_type
        self.sequence = 0
        self.timestamp = 0
        self.ssrc = 0x12345678
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    
    def send_packet(self, payload_data, marker=False):
        packet = RTPPacket(
            payload_type=self.payload_type,
            sequence=self.sequence,
            timestamp=self.timestamp,
            ssrc=self.ssrc
        )
        packet.marker = 1 if marker else 0
        packet.payload = payload_data
        
        data = packet.pack()
        self.socket.sendto(data, (self.dest_ip, self.dest_port))
        
        self.sequence = (self.sequence + 1) % 65536
        
    def update_timestamp(self, samples):
        self.timestamp = (self.timestamp + samples) % (2**32)
    
    def close(self):
        self.socket.close()

class RTPReceiver:
    def __init__(self, listen_port):
        self.listen_port = listen_port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.socket.bind(('0.0.0.0', listen_port))
        self.running = False
        self.receive_thread = None
        self.packet_handler = None
    
    def set_packet_handler(self, handler):
        self.packet_handler = handler
    
    def start(self):
        self.running = True
        self.receive_thread = threading.Thread(target=self._receive_loop)
        self.receive_thread.start()
    
    def _receive_loop(self):
        while self.running:
            try:
                data, addr = self.socket.recvfrom(1500)
                packet = RTPPacket.unpack(data)
                if packet and self.packet_handler:
                    self.packet_handler(packet, addr)
            except Exception as e:
                if self.running:
                    print(f"Receive error: {e}")
    
    def stop(self):
        self.running = False
        if self.receive_thread:
            self.receive_thread.join()
        self.socket.close()

# Example Usage - Audio Streaming
def audio_packet_handler(packet, addr):
    print(f"Received RTP packet from {addr}")
    print(f"  Sequence: {packet.sequence}")
    print(f"  Timestamp: {packet.timestamp}")
    print(f"  Payload Type: {packet.payload_type}")
    print(f"  Payload Size: {len(packet.payload)}")

# Start receiver
receiver = RTPReceiver(5004)
receiver.set_packet_handler(audio_packet_handler)
receiver.start()

# Start sender
sender = RTPSender('127.0.0.1', 5004, payload_type=8)  # PCMA

# Send audio data (simulated)
audio_data = b'\\x80\\x00\\x80\\x00' * 160  # 160 samples for 20ms at 8kHz
for i in range(100):
    sender.send_packet(audio_data, marker=(i==0))
    sender.update_timestamp(160)  # 160 samples for 20ms
    time.sleep(0.02)  # 20ms

sender.close()
receiver.stop()

# C++ RTP Implementation (header)
#include <cstdint>
#include <vector>
#include <arpa/inet.h>

class RTPPacket {
private:
    struct RTPHeader {
        uint8_t vpxcc;      // Version, Padding, Extension, CSRC Count
        uint8_t mpt;        // Marker, Payload Type  
        uint16_t sequence;  // Sequence Number
        uint32_t timestamp; // Timestamp
        uint32_t ssrc;      // SSRC
    } __attribute__((packed));
    
    RTPHeader header;
    std::vector<uint8_t> payload;

public:
    RTPPacket(uint8_t payloadType = 0) {
        header.vpxcc = 0x80;  // Version 2, no padding/extension/CSRC
        header.mpt = payloadType;
        header.sequence = 0;
        header.timestamp = 0;
        header.ssrc = 0x12345678;
    }
    
    void setSequence(uint16_t seq) {
        header.sequence = htons(seq);
    }
    
    void setTimestamp(uint32_t ts) {
        header.timestamp = htonl(ts);
    }
    
    void setMarker(bool marker) {
        if (marker) {
            header.mpt |= 0x80;
        } else {
            header.mpt &= 0x7F;
        }
    }
    
    void setPayload(const uint8_t* data, size_t size) {
        payload.assign(data, data + size);
    }
    
    std::vector<uint8_t> serialize() const {
        std::vector<uint8_t> packet(sizeof(RTPHeader) + payload.size());
        memcpy(packet.data(), &header, sizeof(RTPHeader));
        memcpy(packet.data() + sizeof(RTPHeader), payload.data(), payload.size());
        return packet;
    }
    
    bool deserialize(const uint8_t* data, size_t size) {
        if (size < sizeof(RTPHeader)) return false;
        
        memcpy(&header, data, sizeof(RTPHeader));
        payload.assign(data + sizeof(RTPHeader), data + size);
        return true;
    }
    
    uint16_t getSequence() const { return ntohs(header.sequence); }
    uint32_t getTimestamp() const { return ntohl(header.timestamp); }
    uint8_t getPayloadType() const { return header.mpt & 0x7F; }
    bool getMarker() const { return (header.mpt & 0x80) != 0; }
};`,
        explanation: "Complete RTP implementation in Python and C++ with packet handling."
      },
      {
        title: "RTP Jitter Buffer and Quality Management",
        code: `# RTP Jitter Buffer Implementation
import heapq
import threading
import time
from collections import deque

class JitterBuffer:
    def __init__(self, capacity=50, target_delay=3):
        self.capacity = capacity
        self.target_delay = target_delay  # Target delay in packets
        self.buffer = []  # Priority queue by sequence number
        self.lock = threading.Lock()
        self.base_sequence = None
        self.expected_sequence = 0
        self.last_played_sequence = -1
        self.arrival_times = {}
        
    def put_packet(self, packet):
        with self.lock:
            if self.base_sequence is None:
                self.base_sequence = packet.sequence
                self.expected_sequence = packet.sequence
            
            # Store arrival time for jitter calculation
            self.arrival_times[packet.sequence] = time.time()
            
            # Add to priority queue
            heapq.heappush(self.buffer, (packet.sequence, packet))
            
            # Remove old packets if buffer is full
            if len(self.buffer) > self.capacity:
                _, old_packet = heapq.heappop(self.buffer)
                if old_packet.sequence in self.arrival_times:
                    del self.arrival_times[old_packet.sequence]
    
    def get_packet(self):
        with self.lock:
            if not self.buffer:
                return None
            
            # Check if we have enough buffered packets
            if len(self.buffer) < self.target_delay:
                return None
            
            # Get next expected packet
            next_sequence = self.last_played_sequence + 1
            
            # Look for the next packet in sequence
            for i, (seq, packet) in enumerate(self.buffer):
                if seq == next_sequence:
                    del self.buffer[i]
                    heapq.heapify(self.buffer)
                    self.last_played_sequence = seq
                    return packet
            
            # If next packet not found, return oldest packet
            if self.buffer:
                _, packet = heapq.heappop(self.buffer)
                self.last_played_sequence = packet.sequence
                return packet
            
            return None
    
    def calculate_jitter(self):
        with self.lock:
            if len(self.arrival_times) < 2:
                return 0
            
            # Calculate interarrival jitter (RFC 3550)
            sequences = sorted(self.arrival_times.keys())
            jitter = 0
            
            for i in range(1, len(sequences)):
                prev_seq = sequences[i-1]
                curr_seq = sequences[i]
                
                arrival_diff = self.arrival_times[curr_seq] - self.arrival_times[prev_seq]
                expected_diff = (curr_seq - prev_seq) * 0.02  # 20ms per packet
                
                jitter += abs(arrival_diff - expected_diff)
            
            return jitter / (len(sequences) - 1) if len(sequences) > 1 else 0

# RTP Statistics and Quality Monitoring
class RTPStatistics:
    def __init__(self):
        self.packets_sent = 0
        self.packets_received = 0
        self.bytes_sent = 0
        self.bytes_received = 0
        self.packets_lost = 0
        self.duplicate_packets = 0
        self.out_of_order_packets = 0
        self.last_sequence = -1
        self.sequence_gaps = []
        self.jitter_buffer = JitterBuffer()
        self.lock = threading.Lock()
    
    def packet_sent(self, packet):
        with self.lock:
            self.packets_sent += 1
            self.bytes_sent += len(packet.payload)
    
    def packet_received(self, packet):
        with self.lock:
            self.packets_received += 1
            self.bytes_received += len(packet.payload)
            
            # Check for sequence issues
            if self.last_sequence >= 0:
                expected = (self.last_sequence + 1) % 65536
                if packet.sequence != expected:
                    if packet.sequence < expected:
                        self.out_of_order_packets += 1
                    else:
                        # Packet loss detected
                        lost_count = packet.sequence - expected
                        self.packets_lost += lost_count
                        self.sequence_gaps.append((expected, packet.sequence - 1))
            
            self.last_sequence = packet.sequence
            self.jitter_buffer.put_packet(packet)
    
    def get_loss_rate(self):
        with self.lock:
            total_expected = self.packets_received + self.packets_lost
            return self.packets_lost / total_expected if total_expected > 0 else 0
    
    def get_jitter(self):
        return self.jitter_buffer.calculate_jitter()
    
    def get_summary(self):
        with self.lock:
            return {
                'packets_sent': self.packets_sent,
                'packets_received': self.packets_received,
                'packets_lost': self.packets_lost,
                'loss_rate': self.get_loss_rate(),
                'jitter': self.get_jitter(),
                'out_of_order': self.out_of_order_packets,
                'duplicate': self.duplicate_packets
            }

# WebRTC RTP Configuration (JavaScript)
const rtpConfiguration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

const peerConnection = new RTCPeerConnection(rtpConfiguration);

// Add audio track
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const audioTrack = stream.getAudioTracks()[0];
        const sender = peerConnection.addTrack(audioTrack, stream);
        
        // Configure RTP parameters
        const params = sender.getParameters();
        params.encodings[0].maxBitrate = 64000;  // 64 kbps
        params.encodings[0].priority = 'high';
        
        sender.setParameters(params);
    });

// Handle RTP statistics
setInterval(() => {
    peerConnection.getStats().then(stats => {
        stats.forEach(report => {
            if (report.type === 'outbound-rtp') {
                console.log('RTP Outbound Stats:');
                console.log('- Packets sent:', report.packetsSent);
                console.log('- Bytes sent:', report.bytesSent);
                console.log('- RTT:', report.roundTripTime);
            }
            
            if (report.type === 'inbound-rtp') {
                console.log('RTP Inbound Stats:');
                console.log('- Packets received:', report.packetsReceived);
                console.log('- Packets lost:', report.packetsLost);
                console.log('- Jitter:', report.jitter);
            }
        });
    });
}, 5000);

# GStreamer RTP Pipeline Examples
# Send H.264 video over RTP
gst-launch-1.0 videotestsrc ! x264enc ! rtph264pay ! udpsink host=192.168.1.100 port=5004

# Receive H.264 video from RTP  
gst-launch-1.0 udpsrc port=5004 caps="application/x-rtp,payload=96" ! rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! autovideosink

# Send audio over RTP
gst-launch-1.0 audiotestsrc ! audioconvert ! audioresample ! alawenc ! rtppcmapay ! udpsink host=192.168.1.100 port=5006

# Receive audio from RTP
gst-launch-1.0 udpsrc port=5006 caps="application/x-rtp,payload=8" ! rtppcmadepay ! alawdec ! audioconvert ! autoaudiosink

# FFmpeg RTP Streaming
# Stream video file over RTP
ffmpeg -re -i input.mp4 -c:v libx264 -preset ultrafast -tune zerolatency -f rtp rtp://192.168.1.100:5004

# Receive RTP stream and save to file
ffmpeg -i rtp://0.0.0.0:5004 -c copy output.mp4

# SDP file for RTP session (session.sdp)
v=0
o=- 0 0 IN IP4 192.168.1.100
s=RTP Video Session
c=IN IP4 192.168.1.100
t=0 0
m=video 5004 RTP/AVP 96
a=rtpmap:96 H264/90000
a=fmtp:96 profile-level-id=42e01e`,
        explanation: "Advanced RTP features including jitter buffer, statistics monitoring, and streaming examples."
      }
    ],
    relatedProtocols: ["rtcp", "sip", "srtp", "sdp", "webrtc"],
    resources: [
      {
        title: "RFC 3550 - RTP Protocol",
        url: "https://tools.ietf.org/html/rfc3550",
        type: "RFC"
      },
      {
        title: "RFC 3551 - RTP Audio/Video Profiles",
        url: "https://tools.ietf.org/html/rfc3551",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "SRTP encryption",
      "Authentication",
      "Key management",
      "DoS attack prevention",
      "Bandwidth limiting",
      "Access control"
    ]
};
