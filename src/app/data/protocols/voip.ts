import { Protocol } from "../../types/protocol";

export const VOIP: Protocol = {
    id: "voip",
    name: "VoIP",
    category: "Real Time",
    difficulty: "Advanced",
    shortDescription: "Voice over Internet Protocol for digital voice communication",
    fullDescription: "VoIP (Voice over Internet Protocol) is a technology that allows voice communications and multimedia sessions over Internet Protocol networks. It converts analog voice signals into digital data packets that can be transmitted over IP networks, enabling cost-effective voice communication.",
    port: "5060 (SIP), 5004 (RTP), 1720 (H.323)",
    versions: ["H.323", "SIP", "MGCP", "Skinny", "IAX"],
    advantages: [
      "Cost-effective communication",
      "Scalability",
      "Feature-rich applications",
      "Integration capabilities",
      "Mobility support",
      "Unified communications",
      "Global connectivity",
      "Advanced call features"
    ],
    disadvantages: [
      "Network dependency",
      "Quality of service issues",
      "Security vulnerabilities",
      "Emergency services limitations",
      "Power dependency",
      "Bandwidth requirements",
      "Latency sensitivity",
      "Configuration complexity"
    ],
    useCases: [
      "Business phone systems",
      "Call centers",
      "Unified communications",
      "Video conferencing",
      "Mobile applications",
      "Residential phone service",
      "International calling",
      "Contact centers",
      "Remote work solutions",
      "Cloud communications",
      "IoT voice interfaces",
      "Emergency communication"
    ],
    examples: [
      {
        title: "SIP VoIP Call Flow",
        code: `# SIP-based VoIP call establishment

1. INVITE (Caller to Callee)
INVITE sip:bob@example.com SIP/2.0
Via: SIP/2.0/UDP alice.example.com:5060
From: Alice <sip:alice@example.com>;tag=1928301774
To: Bob <sip:bob@example.com>
Call-ID: a84b4c76e66710@alice.example.com
CSeq: 314159 INVITE
Contact: <sip:alice@alice.example.com:5060>
Content-Type: application/sdp
Content-Length: 142

v=0
o=alice 53655765 2353687637 IN IP4 alice.example.com
s=-
c=IN IP4 alice.example.com
t=0 0
m=audio 49170 RTP/AVP 0
a=rtpmap:0 PCMU/8000

2. 180 Ringing (Callee to Caller)
SIP/2.0 180 Ringing
Via: SIP/2.0/UDP alice.example.com:5060
From: Alice <sip:alice@example.com>;tag=1928301774
To: Bob <sip:bob@example.com>;tag=a6c85cf
Call-ID: a84b4c76e66710@alice.example.com
CSeq: 314159 INVITE

3. 200 OK (Callee to Caller)
SIP/2.0 200 OK
Via: SIP/2.0/UDP alice.example.com:5060
From: Alice <sip:alice@example.com>;tag=1928301774
To: Bob <sip:bob@example.com>;tag=a6c85cf
Call-ID: a84b4c76e66710@alice.example.com
CSeq: 314159 INVITE
Contact: <sip:bob@bob.example.com:5060>
Content-Type: application/sdp

4. ACK (Caller to Callee)
ACK sip:bob@bob.example.com:5060 SIP/2.0
Via: SIP/2.0/UDP alice.example.com:5060
From: Alice <sip:alice@example.com>;tag=1928301774
To: Bob <sip:bob@example.com>;tag=a6c85cf
Call-ID: a84b4c76e66710@alice.example.com
CSeq: 314159 ACK

# RTP media stream established
# Voice data flows using RTP protocol

5. BYE (End call)
BYE sip:bob@bob.example.com:5060 SIP/2.0
From: Alice <sip:alice@example.com>;tag=1928301774
To: Bob <sip:bob@example.com>;tag=a6c85cf
Call-ID: a84b4c76e66710@alice.example.com
CSeq: 231 BYE`,
        explanation: "Complete SIP-based VoIP call flow from initiation to termination."
      },
      {
        title: "Asterisk VoIP Configuration",
        code: `# Asterisk PBX configuration files

# /etc/asterisk/sip.conf
[general]
context=default
allowoverlap=no
udpbindaddr=0.0.0.0:5060
tcpenable=no
tcpbindaddr=0.0.0.0:5060
transport=udp
srvlookup=yes
disallow=all
allow=ulaw
allow=alaw
allow=gsm
allow=g729

[1001]
type=friend
secret=password123
host=dynamic
context=internal
canreinvite=no
dtmfmode=rfc2833
insecure=invite
nat=force_rport,comedia

[1002]
type=friend
secret=password456
host=dynamic
context=internal
canreinvite=no
dtmfmode=rfc2833

# /etc/asterisk/extensions.conf
[general]
static=yes
writeprotect=no

[internal]
exten => 1001,1,Dial(SIP/1001,20)
exten => 1001,n,Voicemail(1001@default)
exten => 1001,n,Hangup()

exten => 1002,1,Dial(SIP/1002,20)
exten => 1002,n,Voicemail(1002@default)
exten => 1002,n,Hangup()

exten => *97,1,VoicemailMain(\${CALLERID(num)}@default)

# Conference bridge
exten => 8000,1,ConfBridge(conference,default_bridge,default_user)

# External calls via SIP trunk
exten => _9NXXNXXXXXX,1,Dial(SIP/trunk/\${EXTEN:1})

[incoming]
exten => s,1,Answer()
exten => s,n,Background(welcome)
exten => s,n,WaitExten(10)

exten => 1,1,Dial(SIP/1001,20)
exten => 2,1,Dial(SIP/1002,20)
`,
        explanation: "Asterisk PBX configuration for VoIP phone system with extensions and routing."
      },
      {
        title: "WebRTC VoIP Client",
        code: `// WebRTC-based VoIP client
class VoIPClient {
    signalingServer: any;
    peerConnection: RTCPeerConnection | null;
    localStream: MediaStream | null;
    isInCall: boolean;

    constructor(signalingServer: any) {
        this.signalingServer = signalingServer;
        this.peerConnection = null;
        this.localStream = null;
        this.isInCall = false;
        
        this.setupSignaling();
    }
    
    setupSignaling() {
        this.signalingServer.on('call-offer', async (data: any) => {
            await this.handleCallOffer?.(data);
        });
        
        this.signalingServer.on('call-answer', async (data: any) => {
            await this.handleCallAnswer?.(data);
        });
        
        this.signalingServer.on('ice-candidate', async (data: any) => {
            await this.handleIceCandidate?.(data);
        });
    }
    
    async makeCall(targetUser: string) {
        try {
            await this.setupPeerConnection();
            await this.getUserMedia();
            
            const offer = await this.peerConnection!.createOffer();
            await this.peerConnection!.setLocalDescription(offer);
            
            this.signalingServer.emit('call-offer', {
                target: targetUser,
                offer: offer
            });
            
            this.isInCall = true;
            
        } catch (error) {
            console.error('Error making call:', error);
        }
    }
    
    async answerCall(callData: any) {
        try {
            await this.setupPeerConnection();
            await this.getUserMedia();
            
            await this.peerConnection!.setRemoteDescription(callData.offer);
            
            const answer = await this.peerConnection!.createAnswer();
            await this.peerConnection!.setLocalDescription(answer);
            
            this.signalingServer.emit('call-answer', {
                target: callData.caller,
                answer: answer
            });
            
            this.isInCall = true;
            
        } catch (error) {
            console.error('Error answering call:', error);
        }
    }
    
    async setupPeerConnection() {
        this.peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { 
                    urls: 'turn:turnserver.example.com:3478',
                    username: 'turnuser',
                    credential: 'turnpass'
                }
            ]
        });
        
        this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                this.signalingServer.emit('ice-candidate', {
                    candidate: event.candidate
                });
            }
        };
        
        this.peerConnection.ontrack = (event: RTCTrackEvent) => {
            const audioElement = document.getElementById('remoteAudio') as HTMLMediaElement | null;
            if (audioElement) {
                audioElement.srcObject = event.streams[0];
                audioElement.play();
            }
        };
        
        this.peerConnection.onconnectionstatechange = () => {
            console.log('Connection state:', this.peerConnection!.connectionState);
            
            if (this.peerConnection!.connectionState === 'disconnected') {
                this.endCall();
            }
        };
    }
    
    async getUserMedia() {
        this.localStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            },
            video: false
        });
        
        this.localStream.getTracks().forEach((track: MediaStreamTrack) => {
            this.peerConnection!.addTrack(track, this.localStream!);
        });
    }
    
    endCall() {
        if (this.localStream) {
            this.localStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }
        
        if (this.peerConnection) {
            this.peerConnection.close();
        }
        
        this.isInCall = false;
        this.signalingServer.emit('call-ended');
    }
    
    toggleMute() {
        if (!this.localStream) return false;
        const audioTrack = this.localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        return !audioTrack.enabled;
    }
}

// Usage
declare const signalingSocket: any;
const voipClient = new VoIPClient(signalingSocket);

document.getElementById('callButton')!.onclick = () => {
    const targetUser = (document.getElementById('targetUser') as HTMLInputElement | null)?.value;
    if (targetUser) {
        voipClient.makeCall(targetUser);
    }
};

document.getElementById('endCallButton')!.onclick = () => {
    voipClient.endCall();
};
`,
        explanation: "WebRTC-based VoIP client implementation with call management features."
      }
    ],
    diagrams: [
      {
        src: "/voip_architecture.png",
        alt: "VoIP architecture",
        caption: "VoIP system architecture and protocol stack"
      },
      {
        src: "/voip_call_flow.jpg",
        alt: "VoIP call flow",
        caption: "VoIP call establishment and media flow diagram"
      }
    ],
    relatedProtocols: ["sip", "rtp", "rtcp", "h323", "webrtc"],
    resources: [
      {
        title: "RFC 3261 - SIP Protocol",
        url: "https://tools.ietf.org/html/rfc3261",
        type: "RFC"
      },
      {
        title: "Asterisk PBX",
        url: "https://www.asterisk.org/",
        type: "Tool"
      },
      {
        title: "VoIP Security Guide",
        url: "https://www.nist.gov/publications/security-considerations-voice-over-ip-voip-systems",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Encryption for signaling and media",
      "Authentication mechanisms",
      "Network security policies",
      "Firewall configuration",
      "DoS attack prevention",
      "Call fraud prevention",
      "Privacy protection",
      "Compliance requirements"
    ]
};