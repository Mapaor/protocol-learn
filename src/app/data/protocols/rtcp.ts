import { Protocol } from "../../types/protocol";

export const RTCP: Protocol = {
    id: "rtcp",
    name: "RTCP",
    category: "Real Time",
    difficulty: "Advanced",
    shortDescription: "RTP Control Protocol for monitoring and controlling RTP sessions",
    fullDescription: "RTCP (RTP Control Protocol) is a sister protocol of RTP that provides out-of-band statistics and control information for RTP flows. It periodically transmits control packets to participants in a streaming multimedia session to provide feedback on transmission quality and membership information.",
    port: "RTP port + 1 (typically odd-numbered)",
    advantages: [
      "Quality feedback",
      "Session monitoring",
      "Bandwidth adaptation",
      "Participant identification",
      "Application-specific data",
      "Synchronization support"
    ],
    disadvantages: [
      "Additional overhead",
      "Complex implementation",
      "Limited bandwidth",
      "Security concerns",
      "NAT traversal issues",
      "Timing dependencies"
    ],
    useCases: [
      "VoIP quality monitoring",
      "Video conferencing control",
      "Live streaming analytics",
      "Network diagnostics",
      "Adaptive bitrate streaming",
      "Multi-party sessions",
      "Broadcast systems",
      "WebRTC statistics",
      "Media gateway control",
      "CDN optimization",
      "QoS management",
      "Session recording"
    ],
    examples: [
      {
        title: "RTCP Packet Types and Structure",
        code: `# RTCP Common Header (4 bytes)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|    RC   |       PT      |             length            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# RTCP Packet Types (PT field)
200 (SR)   - Sender Report
201 (RR)   - Receiver Report  
202 (SDES) - Source Description
203 (BYE)  - Goodbye
204 (APP)  - Application-defined
205 (RTPFB) - Generic RTP Feedback
206 (PSFB)  - Payload-specific Feedback

# Sender Report (SR) Packet
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|    RC   |   PT=SR=200   |             length            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         SSRC of sender                        |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
|              NTP timestamp, most significant word             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|             NTP timestamp, least significant word             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         RTP timestamp                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     sender's packet count                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      sender's octet count                     |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
|                 SSRC_1 (SSRC of first source)                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| fraction lost |       cumulative number of packets lost      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           extended highest sequence number received           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      interarrival jitter                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         last SR (LSR)                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                   delay since last SR (DLSR)                  |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

# Receiver Report (RR) Packet (similar to SR but without sender info)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|    RC   |   PT=RR=201   |             length            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     SSRC of packet sender                     |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
|                 SSRC_1 (SSRC of first source)                 |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| fraction lost |       cumulative number of packets lost      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           extended highest sequence number received           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      interarrival jitter                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         last SR (LSR)                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                   delay since last SR (DLSR)                  |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

# Source Description (SDES) Packet
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|    SC   |  PT=SDES=202  |             length            |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
|                          SSRC/CSRC_1                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           SDES items                          |
|                              ...                              |
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

# SDES Item Types
CNAME=1  - Canonical Name
NAME=2   - User Name
EMAIL=3  - Electronic Mail Address
PHONE=4  - Phone Number
LOC=5    - Geographic User Location
TOOL=6   - Application or Tool Name
NOTE=7   - Notice/Status
PRIV=8   - Private Extensions

# BYE Packet (Session Termination)
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P|    SC   |   PT=BYE=203  |             length            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           SSRC/CSRC                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
:                              ...                              :
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
|     length    |               reason for leaving            ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

# Application-Defined (APP) Packet
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|V=2|P| subtype |   PT=APP=204  |             length            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           SSRC/CSRC                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                          name (ASCII)                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                   application-dependent data                ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`,
        explanation: "RTCP packet types and structures with detailed field descriptions."
      },
      {
        title: "RTCP Implementation and Statistics",
        code: `# Python RTCP Implementation
import struct
import time
import socket
import threading
from typing import List, Dict, Optional

class RTCPPacket:
    SENDER_REPORT = 200
    RECEIVER_REPORT = 201
    SOURCE_DESCRIPTION = 202
    BYE = 203
    APPLICATION = 204
    
    def __init__(self, packet_type: int, ssrc: int):
        self.version = 2
        self.padding = 0
        self.count = 0
        self.packet_type = packet_type
        self.length = 0
        self.ssrc = ssrc

class SenderReport(RTCPPacket):
    def __init__(self, ssrc: int):
        super().__init__(RTCPPacket.SENDER_REPORT, ssrc)
        self.ntp_timestamp_msw = 0
        self.ntp_timestamp_lsw = 0
        self.rtp_timestamp = 0
        self.sender_packet_count = 0
        self.sender_octet_count = 0
        self.reception_reports = []
    
    def set_ntp_timestamp(self, timestamp: float):
        # Convert Unix timestamp to NTP timestamp
        ntp_epoch_offset = 2208988800  # Seconds between 1900 and 1970
        ntp_timestamp = int((timestamp + ntp_epoch_offset) * (2**32))
        self.ntp_timestamp_msw = (ntp_timestamp >> 32) & 0xFFFFFFFF
        self.ntp_timestamp_lsw = ntp_timestamp & 0xFFFFFFFF
    
    def add_reception_report(self, ssrc: int, fraction_lost: int, 
                           cumulative_lost: int, highest_seq: int, 
                           jitter: int, lsr: int, dlsr: int):
        report = {
            'ssrc': ssrc,
            'fraction_lost': fraction_lost,
            'cumulative_lost': cumulative_lost,
            'highest_seq': highest_seq,
            'jitter': jitter,
            'lsr': lsr,
            'dlsr': dlsr
        }
        self.reception_reports.append(report)
        self.count = len(self.reception_reports)
    
    def pack(self) -> bytes:
        # Pack SR header
        header = struct.pack('!BBHII',
            (self.version << 6) | (self.padding << 5) | self.count,
            self.packet_type,
            6 + (6 * self.count),  # Length in 32-bit words - 1
            self.ssrc,
            self.ntp_timestamp_msw
        )
        
        # Pack sender info
        sender_info = struct.pack('!IIII',
            self.ntp_timestamp_lsw,
            self.rtp_timestamp,
            self.sender_packet_count,
            self.sender_octet_count
        )
        
        # Pack reception reports
        reports_data = b''
        for report in self.reception_reports:
            reports_data += struct.pack('!IBBHIIII',
                report['ssrc'],
                report['fraction_lost'],
                (report['cumulative_lost'] >> 16) & 0xFF,
                report['cumulative_lost'] & 0xFFFF,
                report['highest_seq'],
                report['jitter'],
                report['lsr'],
                report['dlsr']
            )
        
        return header + sender_info + reports_data

class ReceiverReport(RTCPPacket):
    def __init__(self, ssrc: int):
        super().__init__(RTCPPacket.RECEIVER_REPORT, ssrc)
        self.reception_reports = []
    
    def add_reception_report(self, ssrc: int, fraction_lost: int, 
                           cumulative_lost: int, highest_seq: int, 
                           jitter: int, lsr: int, dlsr: int):
        report = {
            'ssrc': ssrc,
            'fraction_lost': fraction_lost,
            'cumulative_lost': cumulative_lost,
            'highest_seq': highest_seq,
            'jitter': jitter,
            'lsr': lsr,
            'dlsr': dlsr
        }
        self.reception_reports.append(report)
        self.count = len(self.reception_reports)
    
    def pack(self) -> bytes:
        # Pack RR header
        header = struct.pack('!BBHI',
            (self.version << 6) | (self.padding << 5) | self.count,
            self.packet_type,
            1 + (6 * self.count),  # Length in 32-bit words - 1
            self.ssrc
        )
        
        # Pack reception reports
        reports_data = b''
        for report in self.reception_reports:
            reports_data += struct.pack('!IBBHIIII',
                report['ssrc'],
                report['fraction_lost'],
                (report['cumulative_lost'] >> 16) & 0xFF,
                report['cumulative_lost'] & 0xFFFF,
                report['highest_seq'],
                report['jitter'],
                report['lsr'],
                report['dlsr']
            )
        
        return header + reports_data

class SourceDescription(RTCPPacket):
    def __init__(self, ssrc: int):
        super().__init__(RTCPPacket.SOURCE_DESCRIPTION, ssrc)
        self.items = []
        self.count = 1  # Number of SSRC/CSRC chunks
    
    def add_item(self, item_type: int, data: str):
        self.items.append((item_type, data))
    
    def pack(self) -> bytes:
        # Calculate total length
        items_length = sum(2 + len(data) for _, data in self.items) + 1  # +1 for null terminator
        padding = (4 - (items_length % 4)) % 4
        total_length = 2 + ((items_length + padding) // 4)
        
        # Pack header
        header = struct.pack('!BBHI',
            (self.version << 6) | (self.padding << 5) | self.count,
            self.packet_type,
            total_length,
            self.ssrc
        )
        
        # Pack items
        items_data = b''
        for item_type, data in self.items:
            items_data += struct.pack('!BB', item_type, len(data))
            items_data += data.encode('ascii')
        
        # Add null terminator and padding
        items_data += b'\\x00' * (1 + padding)
        
        return header + items_data

class RTCPStatistics:
    def __init__(self, ssrc: int):
        self.ssrc = ssrc
        self.packets_sent = 0
        self.octets_sent = 0
        self.packets_received = {}  # Per SSRC statistics
        self.last_sr_time = {}      # Last SR received time per SSRC
        self.rtp_stats = {}         # RTP reception statistics per SSRC
    
    def update_sender_stats(self, packet_count: int, octet_count: int):
        self.packets_sent = packet_count
        self.octets_sent = octet_count
    
    def update_receiver_stats(self, ssrc: int, sequence: int, timestamp: int):
        if ssrc not in self.rtp_stats:
            self.rtp_stats[ssrc] = {
                'highest_seq': sequence,
                'base_seq': sequence,
                'bad_seq': 0,
                'probation': 1,
                'received': 0,
                'expected_prior': 0,
                'received_prior': 0,
                'transit': 0,
                'jitter': 0
            }
        
        stats = self.rtp_stats[ssrc]
        
        # Update sequence number statistics
        udelta = sequence - stats['highest_seq']
        if udelta < 65536:  # In order, with permissible gap
            if sequence < stats['highest_seq']:
                # Sequence number wrapped
                stats['highest_seq'] = sequence + 65536
            else:
                stats['highest_seq'] = sequence
        
        stats['received'] += 1
    
    def calculate_reception_report(self, ssrc: int) -> Dict:
        if ssrc not in self.rtp_stats:
            return None
        
        stats = self.rtp_stats[ssrc]
        
        # Calculate packet loss
        extended_max = stats['highest_seq']
        expected = extended_max - stats['base_seq'] + 1
        lost = expected - stats['received']
        
        # Calculate fraction lost (8-bit fixed point)
        expected_interval = expected - stats['expected_prior']
        received_interval = stats['received'] - stats['received_prior']
        lost_interval = expected_interval - received_interval
        
        if expected_interval == 0 or lost_interval <= 0:
            fraction_lost = 0
        else:
            fraction_lost = min(255, (lost_interval << 8) // expected_interval)
        
        stats['expected_prior'] = expected
        stats['received_prior'] = stats['received']
        
        return {
            'ssrc': ssrc,
            'fraction_lost': fraction_lost,
            'cumulative_lost': max(0, lost),
            'highest_seq': extended_max,
            'jitter': int(stats['jitter']),
            'lsr': self.last_sr_time.get(ssrc, 0),
            'dlsr': 0  # Calculate based on current time - LSR time
        }

class RTCPSession:
    def __init__(self, local_ssrc: int, rtcp_port: int):
        self.local_ssrc = local_ssrc
        self.rtcp_port = rtcp_port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.socket.bind(('0.0.0.0', rtcp_port))
        self.statistics = RTCPStatistics(local_ssrc)
        self.running = False
        self.send_thread = None
        self.receive_thread = None
        self.remote_participants = set()
    
    def start(self):
        self.running = True
        self.send_thread = threading.Thread(target=self._send_loop)
        self.receive_thread = threading.Thread(target=self._receive_loop)
        self.send_thread.start()
        self.receive_thread.start()
    
    def _send_loop(self):
        while self.running:
            # Send RTCP reports every 5 seconds
            time.sleep(5.0)
            self.send_sender_report()
    
    def _receive_loop(self):
        while self.running:
            try:
                data, addr = self.socket.recvfrom(1500)
                self.process_rtcp_packet(data, addr)
            except Exception as e:
                if self.running:
                    print(f"RTCP receive error: {e}")
    
    def send_sender_report(self):
        sr = SenderReport(self.local_ssrc)
        sr.set_ntp_timestamp(time.time())
        sr.rtp_timestamp = int(time.time() * 8000)  # Assuming 8kHz
        sr.sender_packet_count = self.statistics.packets_sent
        sr.sender_octet_count = self.statistics.octets_sent
        
        # Add reception reports for all known SSRCs
        for ssrc in self.statistics.rtp_stats:
            report = self.statistics.calculate_reception_report(ssrc)
            if report:
                sr.add_reception_report(**report)
        
        packet_data = sr.pack()
        
        # Send to all known participants
        for participant in self.remote_participants:
            try:
                self.socket.sendto(packet_data, participant)
            except Exception as e:
                print(f"Failed to send SR to {participant}: {e}")
    
    def process_rtcp_packet(self, data: bytes, addr):
        if len(data) < 4:
            return
        
        # Parse RTCP header
        header = struct.unpack('!BBHI', data[:8])
        version = (header[0] >> 6) & 0x03
        packet_type = header[1]
        length = header[2]
        ssrc = header[3]
        
        if version != 2:
            return
        
        self.remote_participants.add(addr)
        
        if packet_type == RTCPPacket.SENDER_REPORT:
            self.process_sender_report(data, ssrc)
        elif packet_type == RTCPPacket.RECEIVER_REPORT:
            self.process_receiver_report(data, ssrc)
        elif packet_type == RTCPPacket.SOURCE_DESCRIPTION:
            self.process_source_description(data, ssrc)
        elif packet_type == RTCPPacket.BYE:
            self.process_bye(data, ssrc)
    
    def process_sender_report(self, data: bytes, ssrc: int):
        if len(data) < 28:
            return
        
        # Extract sender information
        sender_info = struct.unpack('!IIII', data[8:24])
        ntp_msw = sender_info[0]
        ntp_lsw = sender_info[1]
        rtp_timestamp = sender_info[2]
        packet_count = sender_info[3]
        octet_count = struct.unpack('!I', data[24:28])[0]
        
        print(f"Received SR from SSRC {ssrc:08x}:")
        print(f"  RTP Timestamp: {rtp_timestamp}")
        print(f"  Packet Count: {packet_count}")
        print(f"  Octet Count: {octet_count}")
        
        # Store LSR for future DLSR calculation
        lsr = ((ntp_msw & 0xFFFF) << 16) | ((ntp_lsw >> 16) & 0xFFFF)
        self.statistics.last_sr_time[ssrc] = lsr
    
    def process_receiver_report(self, data: bytes, ssrc: int):
        print(f"Received RR from SSRC {ssrc:08x}")
        # Process reception reports...
    
    def process_source_description(self, data: bytes, ssrc: int):
        print(f"Received SDES from SSRC {ssrc:08x}")
        # Process SDES items...
    
    def process_bye(self, data: bytes, ssrc: int):
        print(f"Received BYE from SSRC {ssrc:08x}")
        self.remote_participants.discard(ssrc)
    
    def stop(self):
        self.running = False
        if self.send_thread:
            self.send_thread.join()
        if self.receive_thread:
            self.receive_thread.join()
        self.socket.close()

# Example usage
if __name__ == "__main__":
    session = RTCPSession(0x12345678, 5005)
    session.start()
    
    try:
        # Simulate RTP reception for statistics
        for i in range(100):
            session.statistics.update_receiver_stats(0x87654321, i, i * 160)
            session.statistics.update_sender_stats(i + 1, (i + 1) * 160)
            time.sleep(0.1)
    except KeyboardInterrupt:
        pass
    
    session.stop()`,
        explanation: "Complete RTCP implementation with statistics tracking and packet handling."
      },
      {
        title: "RTCP Feedback and Extended Reports",
        code: `# RTCP Extended Reports (XR) - RFC 3611
class RTCPExtendedReport:
    # XR Block Types
    LOSS_RLE = 1         # Loss Run Length Encoding
    DUPLICATE_RLE = 2    # Duplicate Run Length Encoding  
    PACKET_RECEIPT_TIMES = 3  # Packet Receipt Times
    RECEIVER_REFERENCE_TIME = 4  # Receiver Reference Time
    DLRR = 5            # Delay since Last Receiver Report
    STATISTICS_SUMMARY = 6   # Statistics Summary
    VOIP_METRICS = 7    # VoIP Metrics

# RTCP Feedback Messages - RFC 4585
class RTCPFeedback:
    # Generic NACK (Negative Acknowledgment)
    def create_generic_nack(self, sender_ssrc: int, media_ssrc: int, 
                           lost_packets: List[int]) -> bytes:
        # Pack FCI (Feedback Control Information)
        fci_data = b''
        for packet_id in lost_packets:
            fci_data += struct.pack('!HH', packet_id, 0)
        
        length = 2 + (len(fci_data) // 4)
        
        header = struct.pack('!BBHII',
            0x81,  # V=2, P=0, FMT=1 (Generic NACK)
            205,   # PT=RTPFB
            length,
            sender_ssrc,
            media_ssrc
        )
        
        return header + fci_data
    
    # Picture Loss Indication (PLI)
    def create_pli(self, sender_ssrc: int, media_ssrc: int) -> bytes:
        header = struct.pack('!BBHII',
            0x81,  # V=2, P=0, FMT=1 (PLI)
            206,   # PT=PSFB
            2,     # Length
            sender_ssrc,
            media_ssrc
        )
        return header
    
    # Slice Loss Indication (SLI)
    def create_sli(self, sender_ssrc: int, media_ssrc: int, 
                   first_mb: int, number_mb: int, picture_id: int) -> bytes:
        # SLI FCI format
        sli_fci = (first_mb << 19) | (number_mb << 6) | (picture_id & 0x3F)
        
        header = struct.pack('!BBHIII',
            0x82,  # V=2, P=0, FMT=2 (SLI)
            206,   # PT=PSFB
            3,     # Length
            sender_ssrc,
            media_ssrc,
            sli_fci
        )
        return header
    
    # Full Intra Request (FIR)
    def create_fir(self, sender_ssrc: int, media_ssrc: int, 
                   seq_number: int) -> bytes:
        fir_fci = struct.pack('!IBB', media_ssrc, seq_number, 0)
        
        header = struct.pack('!BBHII',
            0x84,  # V=2, P=0, FMT=4 (FIR)
            206,   # PT=PSFB
            4,     # Length
            sender_ssrc,
            0      # Unused
        )
        return header + fir_fci

# WebRTC RTCP Statistics Integration
rtcp_stats_javascript = '''
// WebRTC RTCP Statistics Monitoring
function monitorRTCPStats(peerConnection) {
    setInterval(async () => {
        const stats = await peerConnection.getStats();
        
        stats.forEach(report => {
            if (report.type === 'inbound-rtp') {
                console.log('Inbound RTP Stats:');
                console.log('- SSRC:', report.ssrc);
                console.log('- Packets Received:', report.packetsReceived);
                console.log('- Packets Lost:', report.packetsLost);
                console.log('- Jitter:', report.jitter);
                console.log('- RTT:', report.roundTripTime);
                
                // Calculate loss rate
                const totalPackets = report.packetsReceived + report.packetsLost;
                const lossRate = totalPackets > 0 ? 
                    (report.packetsLost / totalPackets * 100).toFixed(2) : 0;
                console.log('- Loss Rate:', lossRate + '%');
            }
            
            if (report.type === 'outbound-rtp') {
                console.log('Outbound RTP Stats:');
                console.log('- SSRC:', report.ssrc);
                console.log('- Packets Sent:', report.packetsSent);
                console.log('- Bytes Sent:', report.bytesSent);
                console.log('- RTT:', report.roundTripTime);
                console.log('- Target Bitrate:', report.targetBitrate);
            }
            
            if (report.type === 'remote-inbound-rtp') {
                console.log('Remote Inbound Stats:');
                console.log('- SSRC:', report.ssrc);
                console.log('- Packets Lost:', report.packetsLost);
                console.log('- Jitter:', report.jitter);
                console.log('- RTT:', report.roundTripTime);
                console.log('- Fraction Lost:', report.fractionLost);
            }
        });
    }, 5000);
}

// RTCP Feedback Message Handling
peerConnection.addEventListener('icecandidateerror', event => {
    console.log('ICE candidate error:', event);
});

// Request keyframe (similar to FIR)
function requestKeyframe(sender) {
    const params = sender.getParameters();
    params.encodings.forEach(encoding => {
        encoding.requestKeyFrame = true;
    });
    sender.setParameters(params);
}
''';

# GStreamer RTCP Configuration
gstreamer_rtcp_config = '''
# GStreamer RTCP pipeline examples

# RTP/RTCP sender with statistics
gst-launch-1.0 videotestsrc ! x264enc ! rtph264pay ! \\
    rtpbin name=rtpbin ! udpsink host=192.168.1.100 port=5004 \\
    rtpbin.send_rtcp_src_0 ! udpsink host=192.168.1.100 port=5005 sync=false async=false

# RTP/RTCP receiver with feedback
gst-launch-1.0 rtpbin name=rtpbin latency=200 ! \\
    rtph264depay ! h264parse ! avdec_h264 ! videoconvert ! autovideosink \\
    udpsrc port=5004 caps="application/x-rtp,payload=96" ! rtpbin.recv_rtp_sink_0 \\
    udpsrc port=5005 ! rtpbin.recv_rtcp_sink_0 \\
    rtpbin.send_rtcp_src_0 ! udpsink host=192.168.1.100 port=5006 sync=false async=false

# RTCP statistics monitoring
gst-launch-1.0 videotestsrc ! x264enc ! rtph264pay ! \\
    rtpbin name=rtpbin do-retransmission=true ! \\
    udpsink host=192.168.1.100 port=5004 \\
    rtpbin.send_rtcp_src_0 ! udpsink host=192.168.1.100 port=5005 sync=false async=false
''';

# RTCP Compound Packet Example
def create_compound_rtcp_packet(ssrc: int) -> bytes:
    """Create a compound RTCP packet with SR and SDES."""
    
    # Create Sender Report
    sr = SenderReport(ssrc)
    sr.set_ntp_timestamp(time.time())
    sr.rtp_timestamp = int(time.time() * 8000)
    sr.sender_packet_count = 1000
    sr.sender_octet_count = 160000
    sr_data = sr.pack()
    
    # Create Source Description
    sdes = SourceDescription(ssrc)
    sdes.add_item(1, "user@example.com")  # CNAME
    sdes.add_item(2, "John Doe")          # NAME
    sdes.add_item(6, "MyApp 1.0")         # TOOL
    sdes_data = sdes.pack()
    
    return sr_data + sdes_data

# RTCP Bandwidth Calculation (RFC 3550)
def calculate_rtcp_interval(participants: int, senders: int, 
                          avg_rtcp_size: int, session_bandwidth: int) -> float:
    """Calculate RTCP transmission interval based on RFC 3550 algorithm."""
    
    # Constants from RFC 3550
    RTCP_MIN_TIME = 5.0      # Minimum interval (seconds)
    COMPENSATION = 2.71828   # e (Euler's number)
    
    # Calculate RTCP bandwidth (5% of session bandwidth)
    rtcp_bw = max(session_bandwidth * 0.05, 1000)  # At least 1 kbps
    
    # Divide RTCP bandwidth between senders and receivers
    if senders <= participants * 0.25:
        # Normal case: senders get 25% of RTCP bandwidth
        sender_bw = rtcp_bw * 0.25
        rcvr_bw = rtcp_bw * 0.75
    else:
        # Too many senders: divide equally
        sender_bw = rtcp_bw * senders / participants
        rcvr_bw = rtcp_bw * (participants - senders) / participants
    
    # Calculate interval
    interval = avg_rtcp_size * 8 * participants / rtcp_bw
    interval = max(interval, RTCP_MIN_TIME)
    
    # Add randomization factor (0.5 to 1.5 times calculated interval)
    import random
    interval *= (0.5 + random.random())
    
    return interval

# RTCP Quality Metrics
class RTCPQualityMetrics:
    def __init__(self):
        self.rtt_samples = []
        self.jitter_samples = []
        self.loss_samples = []
    
    def add_sample(self, rtt: float, jitter: float, loss_rate: float):
        self.rtt_samples.append(rtt)
        self.jitter_samples.append(jitter)
        self.loss_samples.append(loss_rate)
        
        # Keep only last 100 samples
        if len(self.rtt_samples) > 100:
            self.rtt_samples.pop(0)
            self.jitter_samples.pop(0)
            self.loss_samples.pop(0)
    
    def get_quality_score(self) -> float:
        """Calculate MOS-like quality score (1.0 to 5.0)."""
        if not self.rtt_samples:
            return 5.0
        
        avg_rtt = sum(self.rtt_samples) / len(self.rtt_samples)
        avg_jitter = sum(self.jitter_samples) / len(self.jitter_samples)
        avg_loss = sum(self.loss_samples) / len(self.loss_samples)
        
        # Simple quality scoring algorithm
        score = 5.0
        
        # RTT penalty
        if avg_rtt > 150:
            score -= min(2.0, (avg_rtt - 150) / 200)
        
        # Jitter penalty  
        if avg_jitter > 30:
            score -= min(1.0, (avg_jitter - 30) / 70)
        
        # Loss penalty
        if avg_loss > 1:
            score -= min(2.0, avg_loss / 5)
        
        return max(1.0, score)`,
        explanation: "Advanced RTCP features including feedback messages, extended reports, and quality metrics."
      }
    ],
    relatedProtocols: ["rtp", "sip", "srtp", "sdp", "webrtc"],
    resources: [
      {
        title: "RFC 3550 - RTP/RTCP Protocol",
        url: "https://tools.ietf.org/html/rfc3550",
        type: "RFC"
      },
      {
        title: "RFC 4585 - RTCP Feedback Messages",
        url: "https://tools.ietf.org/html/rfc4585",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "SRTCP encryption",
      "Authentication",
      "Replay protection",
      "DoS attack prevention",
      "Information disclosure",
      "Bandwidth consumption"
    ]
};
