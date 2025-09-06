import { Protocol } from "../../types/protocol";

export const RTSP: Protocol = {
    id: "rtsp",
    name: "RTSP",
    category: "Real Time",
    difficulty: "Advanced",
    shortDescription: "Real Time Streaming Protocol for multimedia streaming control",
    fullDescription: "RTSP (Real Time Streaming Protocol) is a network control protocol designed for use in entertainment and communications systems to control streaming media servers. It establishes and controls media sessions between endpoints and is used for streaming audio and video content.",
    port: "554",
    versions: ["RTSP 1.0", "RTSP 2.0"],
    advantages: [
      "Real-time media control",
      "Bidirectional communication",
      "Session management",
      "Multiple transport support",
      "Scalable streaming",
      "Quality of service control",
      "Security extensions",
      "Firewall traversal"
    ],
    disadvantages: [
      "Complex implementation",
      "Firewall complications",
      "NAT traversal issues",
      "Limited web browser support",
      "Protocol overhead",
      "State management complexity",
      "Security vulnerabilities",
      "Codec dependencies"
    ],
    useCases: [
      "Video surveillance systems",
      "Live streaming services",
      "Video conferencing",
      "IP cameras",
      "Media servers",
      "Educational streaming",
      "Entertainment systems",
      "Broadcast applications",
      "Security monitoring",
      "Remote monitoring",
      "Digital signage",
      "IoT video devices"
    ],
    examples: [
      {
        title: "RTSP Protocol Flow",
        code: `# RTSP Session Establishment
Client -> Server: OPTIONS rtsp://server/stream RTSP/1.0
Server -> Client: RTSP/1.0 200 OK
                  Public: DESCRIBE, SETUP, TEARDOWN, PLAY, PAUSE

Client -> Server: DESCRIBE rtsp://server/stream RTSP/1.0
                  Accept: application/sdp
Server -> Client: RTSP/1.0 200 OK
                  Content-Type: application/sdp
                  Content-Length: 460
                  
                  [SDP Content describing media streams]

Client -> Server: SETUP rtsp://server/stream/track1 RTSP/1.0
                  Transport: RTP/UDP;unicast;client_port=8000-8001
Server -> Client: RTSP/1.0 200 OK
                  Transport: RTP/UDP;unicast;client_port=8000-8001;
                            server_port=9000-9001;ssrc=1234ABCD
                  Session: 12345678

Client -> Server: PLAY rtsp://server/stream RTSP/1.0
                  Session: 12345678
                  Range: npt=0-
Server -> Client: RTSP/1.0 200 OK
                  Session: 12345678
                  Range: npt=0-
                  RTP-Info: url=rtsp://server/stream/track1;seq=9810092;rtptime=3450012

# Media flows via RTP
[RTP packets with audio/video data]

Client -> Server: TEARDOWN rtsp://server/stream RTSP/1.0
                  Session: 12345678
Server -> Client: RTSP/1.0 200 OK`,
        explanation: "Complete RTSP session flow from setup to teardown."
      },
      {
        title: "RTSP Server Implementation",
        code: `#!/usr/bin/env python3
import asyncio
import socket
from datetime import datetime

class RTSPServer:
    def __init__(self, host='0.0.0.0', port=8554):
        self.host = host
        self.port = port
        self.sessions = {}
        
    async def handle_client(self, reader, writer):
        """Handle RTSP client connection"""
        addr = writer.get_extra_info('peername')
        print(f"Client connected: {addr}")
        
        try:
            while True:
                data = await reader.read(1024)
                if not data:
                    break
                
                request = data.decode('utf-8')
                response = await self.process_request(request, addr)
                
                writer.write(response.encode('utf-8'))
                await writer.drain()
                
        except Exception as e:
            print(f"Error handling client {addr}: {e}")
        finally:
            writer.close()
            await writer.wait_closed()
    
    async def process_request(self, request, addr):
        """Process RTSP request and generate response"""
        lines = request.strip().split('\\r\\n')
        if not lines:
            return self.error_response(400, "Bad Request")
        
        request_line = lines[0]
        method, url, version = request_line.split(' ', 2)
        
        headers = {}
        for line in lines[1:]:
            if ':' in line:
                key, value = line.split(':', 1)
                headers[key.strip()] = value.strip()
        
        if method == 'OPTIONS':
            return self.options_response(headers.get('CSeq', '1'))
        elif method == 'DESCRIBE':
            return self.describe_response(url, headers.get('CSeq', '1'))
        elif method == 'SETUP':
            return self.setup_response(url, headers)
        elif method == 'PLAY':
            return self.play_response(headers)
        elif method == 'PAUSE':
            return self.pause_response(headers)
        elif method == 'TEARDOWN':
            return self.teardown_response(headers)
        else:
            return self.error_response(501, "Not Implemented")
    
    def options_response(self, cseq):
        return f"""RTSP/1.0 200 OK\\r
CSeq: {cseq}\\r
Public: OPTIONS, DESCRIBE, SETUP, PLAY, PAUSE, TEARDOWN\\r
Server: Python-RTSP-Server/1.0\\r
\\r
"""
    
    def describe_response(self, url, cseq):
        sdp_content = f"""v=0\\r
o=- 123456 654321 IN IP4 {self.host}\\r
s=Python RTSP Stream\\r
c=IN IP4 {self.host}\\r
t=0 0\\r
m=video 0 RTP/AVP 96\\r
a=rtpmap:96 H264/90000\\r
a=control:track1\\r
"""
        
        return f"""RTSP/1.0 200 OK\\r
CSeq: {cseq}\\r
Content-Type: application/sdp\\r
Content-Length: {len(sdp_content)}\\r
\\r
{sdp_content}"""
    
    def setup_response(self, url, headers):
        session_id = f"{datetime.now().timestamp():.0f}"
        transport = headers.get('Transport', '')
        
        return f"""RTSP/1.0 200 OK\\r
CSeq: {headers.get('CSeq', '1')}\\r
Transport: {transport};server_port=5004-5005;ssrc=1234ABCD\\r
Session: {session_id}\\r
\\r
"""
    
    def play_response(self, headers):
        return f"""RTSP/1.0 200 OK\\r
CSeq: {headers.get('CSeq', '1')}\\r
Session: {headers.get('Session', '')}\\r
Range: npt=0-\\r
RTP-Info: url=track1;seq=12345;rtptime=2902017233\\r
\\r
"""
    
    async def start(self):
        server = await asyncio.start_server(
            self.handle_client, self.host, self.port)
        
        print(f"RTSP Server running on {self.host}:{self.port}")
        
        async with server:
            await server.serve_forever()

# Usage
if __name__ == "__main__":
    server = RTSPServer()
    asyncio.run(server.start())`,
        explanation: "Python RTSP server implementation with session management."
      },
      {
        title: "RTSP Client Example",
        code: `#!/usr/bin/env python3
import socket
import re

class RTSPClient:
    def __init__(self, server_url):
        self.server_url = server_url
        self.socket = None
        self.session_id = None
        self.cseq = 1
        
        # Parse URL
        if '://' in server_url:
            self.host = server_url.split('://')[1].split('/')[0]
        else:
            self.host = server_url.split('/')[0]
            
        if ':' in self.host:
            self.host, port = self.host.split(':')
            self.port = int(port)
        else:
            self.port = 554
    
    def connect(self):
        """Connect to RTSP server"""
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.host, self.port))
        print(f"Connected to {self.host}:{self.port}")
    
    def send_request(self, method, headers=None):
        """Send RTSP request and receive response"""
        if headers is None:
            headers = {}
        
        headers['CSeq'] = str(self.cseq)
        self.cseq += 1
        
        request = f"{method} {self.server_url} RTSP/1.0\\r\\n"
        for key, value in headers.items():
            request += f"{key}: {value}\\r\\n"
        request += "\\r\\n"
        
        self.socket.send(request.encode())
        
        # Receive response
        response = b""
        while b"\\r\\n\\r\\n" not in response:
            response += self.socket.recv(1024)
        
        return response.decode()
    
    def options(self):
        """Send OPTIONS request"""
        response = self.send_request("OPTIONS")
        print("OPTIONS Response:")
        print(response)
        return response
    
    def describe(self):
        """Send DESCRIBE request"""
        headers = {'Accept': 'application/sdp'}
        response = self.send_request("DESCRIBE", headers)
        print("DESCRIBE Response:")
        print(response)
        return response
    
    def setup(self, track_url, client_port=8000):
        """Send SETUP request"""
        headers = {
            'Transport': f'RTP/UDP;unicast;client_port={client_port}-{client_port+1}'
        }
        response = self.send_request(f"SETUP {track_url}", headers)
        
        # Extract session ID
        session_match = re.search(r'Session: ([^\\r\\n;]+)', response)
        if session_match:
            self.session_id = session_match.group(1)
        
        print("SETUP Response:")
        print(response)
        return response
    
    def play(self):
        """Send PLAY request"""
        headers = {
            'Session': self.session_id,
            'Range': 'npt=0-'
        }
        response = self.send_request("PLAY", headers)
        print("PLAY Response:")
        print(response)
        return response
    
    def teardown(self):
        """Send TEARDOWN request"""
        if self.session_id:
            headers = {'Session': self.session_id}
            response = self.send_request("TEARDOWN", headers)
            print("TEARDOWN Response:")
            print(response)
        
        if self.socket:
            self.socket.close()

# Usage example
client = RTSPClient("rtsp://192.168.1.100:8554/stream")
client.connect()
client.options()
client.describe()
client.setup("rtsp://192.168.1.100:8554/stream/track1")
client.play()
# ... receive RTP stream ...
client.teardown()`,
        explanation: "Python RTSP client implementation with full session control."
      }
    ],
    diagrams: [
      {
        src: "/rtsp_architecture.png",
        alt: "RTSP architecture",
        caption: "RTSP streaming architecture with RTP media delivery"
      },
      {
        src: "/rtsp_session.jpg",
        alt: "RTSP session flow",
        caption: "RTSP session establishment and media control flow"
      }
    ],
    relatedProtocols: ["rtp", "rtcp", "sdp", "tcp"],
    resources: [
      {
        title: "RFC 2326 - RTSP 1.0",
        url: "https://tools.ietf.org/html/rfc2326",
        type: "RFC"
      },
      {
        title: "RFC 7826 - RTSP 2.0",
        url: "https://tools.ietf.org/html/rfc7826",
        type: "RFC"
      },
      {
        title: "Live555 Streaming Media",
        url: "http://www.live555.com/",
        type: "Tool"
      }
    ],
    securityConsiderations: [
      "Authentication mechanisms",
      "Encryption for sensitive streams",
      "Access control lists",
      "Rate limiting",
      "Input validation",
      "Secure transport (RTSPS)",
      "Session management",
      "DDoS protection"
    ]
  }