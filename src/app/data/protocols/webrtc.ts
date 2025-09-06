import { Protocol } from "../../types/protocol";

export const WEBRTC: Protocol = {
    id: "webrtc",
    name: "WebRTC",
    category: "Real Time",
    difficulty: "Advanced",
    shortDescription: "Web Real-Time Communication for peer-to-peer media streaming",
    fullDescription: "WebRTC (Web Real-Time Communication) is a free, open-source project that provides web browsers and mobile applications with real-time communication via simple APIs. It enables audio, video, and data sharing between peers without requiring plugins or native apps.",
    port: "Various (STUN: 3478, TURN: 3478-3481, RTP: dynamic)",
    versions: ["WebRTC 1.0", "WebRTC-NV"],
    advantages: [
      "Peer-to-peer communication",
      "Low latency",
      "No plugins required",
      "Cross-platform support",
      "Built-in encryption",
      "NAT traversal",
      "Adaptive bitrate",
      "Open source"
    ],
    disadvantages: [
      "Complex implementation",
      "Firewall challenges",
      "Browser compatibility",
      "Debugging difficulties",
      "Bandwidth intensive",
      "CPU consumption",
      "Limited codec support",
      "Scaling challenges"
    ],
    useCases: [
      "Video conferencing",
      "Voice calling",
      "Screen sharing",
      "Live streaming",
      "Gaming applications",
      "File sharing",
      "Remote collaboration",
      "IoT communication",
      "Telemedicine",
      "Online education",
      "Customer support",
      "Social applications"
    ],
    examples: [
      {
        title: "WebRTC Peer Connection Setup",
        code: `// WebRTC peer-to-peer connection
class WebRTCPeer {
    constructor() {
        this.localConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { 
                    urls: 'turn:turnserver.com:3478',
                    username: 'user',
                    credential: 'pass'
                }
            ]
        });
        
        this.setupEventHandlers();
    }
    
    setupEventHandlers() {
        // ICE candidate handling
        this.localConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendToRemotePeer({
                    type: 'ice-candidate',
                    candidate: event.candidate
                });
            }
        };
        
        // Remote stream handling
        this.localConnection.ontrack = (event) => {
            const remoteVideo = document.getElementById('remoteVideo');
            remoteVideo.srcObject = event.streams[0];
        };
        
        // Connection state monitoring
        this.localConnection.onconnectionstatechange = () => {
            console.log('Connection state:', this.localConnection.connectionState);
        };
    }
    
    async startCall() {
        try {
            // Get user media
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            
            // Add local stream
            stream.getTracks().forEach(track => {
                this.localConnection.addTrack(track, stream);
            });
            
            // Display local video
            document.getElementById('localVideo').srcObject = stream;
            
            // Create offer
            const offer = await this.localConnection.createOffer();
            await this.localConnection.setLocalDescription(offer);
            
            // Send offer to remote peer
            this.sendToRemotePeer({
                type: 'offer',
                sdp: offer
            });
            
        } catch (error) {
            console.error('Error starting call:', error);
        }
    }
    
    async handleOffer(offer) {
        await this.localConnection.setRemoteDescription(offer);
        
        const answer = await this.localConnection.createAnswer();
        await this.localConnection.setLocalDescription(answer);
        
        this.sendToRemotePeer({
            type: 'answer',
            sdp: answer
        });
    }
    
    async handleAnswer(answer) {
        await this.localConnection.setRemoteDescription(answer);
    }
    
    async handleIceCandidate(candidate) {
        await this.localConnection.addIceCandidate(candidate);
    }
    
    sendToRemotePeer(data) {
        // Implementation depends on signaling server
        // WebSocket, Socket.IO, etc.
        signalingSocket.emit('message', data);
    }
}`,
        explanation: "WebRTC peer connection setup with media handling and signaling."
      },
      {
        title: "WebRTC Data Channel",
        code: `// WebRTC data channel for file sharing
class WebRTCDataChannel {
    constructor() {
        this.peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        
        this.dataChannel = null;
        this.setupDataChannel();
    }
    
    setupDataChannel() {
        // Create data channel
        this.dataChannel = this.peerConnection.createDataChannel('fileTransfer', {
            ordered: true,
            maxRetransmits: 3
        });
        
        this.dataChannel.onopen = () => {
            console.log('Data channel opened');
        };
        
        this.dataChannel.onmessage = (event) => {
            this.handleDataChannelMessage(event.data);
        };
        
        this.dataChannel.onerror = (error) => {
            console.error('Data channel error:', error);
        };
        
        // Handle incoming data channels
        this.peerConnection.ondatachannel = (event) => {
            const channel = event.channel;
            channel.onmessage = (event) => {
                this.handleDataChannelMessage(event.data);
            };
        };
    }
    
    sendFile(file) {
        const chunkSize = 16384; // 16KB chunks
        const fileReader = new FileReader();
        let offset = 0;
        
        // Send file metadata
        this.dataChannel.send(JSON.stringify({
            type: 'file-metadata',
            name: file.name,
            size: file.size,
            type: file.type
        }));
        
        const readSlice = () => {
            const slice = file.slice(offset, offset + chunkSize);
            fileReader.readAsArrayBuffer(slice);
        };
        
        fileReader.onload = (event) => {
            this.dataChannel.send(event.target.result);
            offset += chunkSize;
            
            if (offset < file.size) {
                readSlice();
            } else {
                // File transfer complete
                this.dataChannel.send(JSON.stringify({
                    type: 'file-complete'
                }));
            }
        };
        
        readSlice();
    }
    
    handleDataChannelMessage(data) {
        if (typeof data === 'string') {
            const message = JSON.parse(data);
            
            switch (message.type) {
                case 'file-metadata':
                    this.currentFile = {
                        name: message.name,
                        size: message.size,
                        type: message.type,
                        data: [],
                        receivedBytes: 0
                    };
                    break;
                    
                case 'file-complete':
                    this.saveReceivedFile();
                    break;
            }
        } else {
            // Binary data (file chunk)
            this.currentFile.data.push(data);
            this.currentFile.receivedBytes += data.byteLength;
            
            const progress = (this.currentFile.receivedBytes / this.currentFile.size) * 100;
            this.updateProgress(progress);
        }
    }
    
    saveReceivedFile() {
        const blob = new Blob(this.currentFile.data, { type: this.currentFile.type });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = this.currentFile.name;
        a.click();
        
        URL.revokeObjectURL(url);
    }
}`,
        explanation: "WebRTC data channel implementation for peer-to-peer file transfer."
      },
      {
        title: "WebRTC Screen Sharing",
        code: `// WebRTC screen sharing implementation
class ScreenShare {
    constructor() {
        this.peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        
        this.isSharing = false;
        this.localStream = null;
    }
    
    async startScreenShare() {
        try {
            // Get screen capture stream
            this.localStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: 'always',
                    displaySurface: 'monitor'
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
            
            // Display local screen share
            document.getElementById('localScreen').srcObject = this.localStream;
            
            // Add tracks to peer connection
            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
                
                // Handle track ending (user stops sharing)
                track.onended = () => {
                    this.stopScreenShare();
                };
            });
            
            this.isSharing = true;
            
            // Create and send offer
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            
            this.sendSignalingMessage({
                type: 'screen-share-offer',
                sdp: offer
            });
            
        } catch (error) {
            console.error('Error starting screen share:', error);
        }
    }
    
    stopScreenShare() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        
        this.isSharing = false;
        document.getElementById('localScreen').srcObject = null;
        
        this.sendSignalingMessage({
            type: 'screen-share-stopped'
        });
    }
    
    async handleScreenShareOffer(offer) {
        await this.peerConnection.setRemoteDescription(offer);
        
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        
        this.sendSignalingMessage({
            type: 'screen-share-answer',
            sdp: answer
        });
    }
    
    // Handle remote screen stream
    handleRemoteStream(stream) {
        document.getElementById('remoteScreen').srcObject = stream;
    }
    
    sendSignalingMessage(message) {
        // Send via signaling server (WebSocket, etc.)
        signalingSocket.emit('message', message);
    }
}

// Usage
const screenShare = new ScreenShare();

// Start screen sharing
document.getElementById('shareButton').onclick = () => {
    screenShare.startScreenShare();
};

// Stop screen sharing
document.getElementById('stopButton').onclick = () => {
    screenShare.stopScreenShare();
};`,
        explanation: "WebRTC screen sharing implementation with display media capture."
      }
    ],
    diagrams: [
      {
        src: "/webrtc_architecture.png",
        alt: "WebRTC architecture",
        caption: "WebRTC protocol stack and peer-to-peer communication flow"
      },
      {
        src: "/webrtc_signaling.jpg",
        alt: "WebRTC signaling",
        caption: "WebRTC signaling process and ICE candidate exchange"
      }
    ],
    relatedProtocols: ["ice", "stun", "turn", "rtp", "srtp"],
    resources: [
      {
        title: "WebRTC Specification",
        url: "https://www.w3.org/TR/webrtc/",
        type: "Specification"
      },
      {
        title: "MDN WebRTC API",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API",
        type: "Documentation"
      },
      {
        title: "WebRTC Samples",
        url: "https://webrtc.github.io/samples/",
        type: "Examples"
      }
    ],
    securityConsiderations: [
      "DTLS encryption mandatory",
      "SRTP for media encryption",
      "Origin validation",
      "ICE consent freshness",
      "Certificate fingerprinting",
      "Secure signaling channel",
      "Permission prompts",
      "Network isolation"
    ]
  }