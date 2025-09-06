import { Protocol } from "../../types/protocol";

export const SIP: Protocol = {
    id: "sip",
    name: "SIP",
    category: "Real Time",
    difficulty: "Advanced",
    shortDescription: "Session Initiation Protocol for VoIP and multimedia communications",
    fullDescription: "SIP (Session Initiation Protocol) is a signaling protocol used for initiating, maintaining, and terminating real-time sessions that include voice, video and messaging applications. It's widely used in VoIP systems and is the foundation for many modern communication platforms.",
    port: "5060 (UDP/TCP), 5061 (TLS)",
    advantages: [
      "Text-based protocol",
      "Scalable architecture",
      "Extensible design",
      "NAT traversal support",
      "Integration capabilities",
      "Open standard"
    ],
    disadvantages: [
      "Complex implementation",
      "Security vulnerabilities",
      "NAT/Firewall issues",
      "Debugging complexity",
      "Interoperability challenges",
      "Performance overhead"
    ],
    useCases: [
      "VoIP phone systems",
      "Video conferencing",
      "Instant messaging",
      "Presence services",
      "Unified communications",
      "Contact centers",
      "WebRTC applications",
      "Mobile VoIP apps",
      "SIP trunking",
      "PBX systems",
      "Collaboration platforms",
      "Emergency services"
    ],
    examples: [
      {
        title: "SIP Message Structure and Methods",
        code: `# SIP Request Format
METHOD Request-URI SIP/2.0
Header-Name: Header-Value
Header-Name: Header-Value
...
[empty line]
[Message Body]

# SIP Response Format  
SIP/2.0 Status-Code Reason-Phrase
Header-Name: Header-Value
Header-Name: Header-Value
...
[empty line]
[Message Body]

# SIP Methods
INVITE    - Initiate a session
ACK       - Acknowledge a response  
BYE       - Terminate a session
CANCEL    - Cancel a pending request
REGISTER  - Register user location
OPTIONS   - Query server capabilities
INFO      - Send mid-session information
PRACK     - Provisional acknowledgment
UPDATE    - Modify session parameters
REFER     - Transfer/redirect requests
SUBSCRIBE - Subscribe to event notifications
NOTIFY    - Event notification
MESSAGE   - Instant messaging

# Example INVITE Request
INVITE sip:alice@example.com SIP/2.0
Via: SIP/2.0/UDP 192.168.1.100:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: Alice <sip:alice@example.com>
From: Bob <sip:bob@example.org>;tag=1928301774
Call-ID: a84b4c76e66710@192.168.1.100
CSeq: 314159 INVITE
Contact: <sip:bob@192.168.1.100:5060>
Content-Type: application/sdp
Content-Length: 142

v=0
o=bob 2890844526 2890844527 IN IP4 192.168.1.100
s=-
c=IN IP4 192.168.1.100
t=0 0
m=audio 49170 RTP/AVP 0
a=rtpmap:0 PCMU/8000

# SIP Response Codes
1xx - Provisional (100 Trying, 180 Ringing, 183 Progress)
2xx - Success (200 OK, 202 Accepted)
3xx - Redirection (301 Moved Permanently, 302 Moved Temporarily)
4xx - Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)
5xx - Server Error (500 Internal Error, 503 Service Unavailable)
6xx - Global Failure (600 Busy Everywhere, 603 Decline)

# Example 200 OK Response
SIP/2.0 200 OK
Via: SIP/2.0/UDP 192.168.1.100:5060;branch=z9hG4bK776asdhds
To: Alice <sip:alice@example.com>;tag=1410948204
From: Bob <sip:bob@example.org>;tag=1928301774
Call-ID: a84b4c76e66710@192.168.1.100
CSeq: 314159 INVITE
Contact: <sip:alice@192.168.1.200:5060>
Content-Type: application/sdp
Content-Length: 131

v=0
o=alice 2890844527 2890844528 IN IP4 192.168.1.200
s=-
c=IN IP4 192.168.1.200
t=0 0
m=audio 49171 RTP/AVP 0
a=rtpmap:0 PCMU/8000`,
        explanation: "SIP message structure, methods, and response codes with examples."
      },
      {
        title: "SIP Call Flow Example",
        code: `# Basic SIP Call Setup (INVITE Transaction)

Bob (192.168.1.100)                    Alice (192.168.1.200)
        |                                      |
        |          INVITE                      |
        |------------------------------------->|
        |                                      |
        |          100 Trying                  |
        |<-------------------------------------|
        |                                      |
        |          180 Ringing                 |
        |<-------------------------------------|
        |                                      |
        |          200 OK                      |
        |<-------------------------------------|
        |                                      |
        |          ACK                         |
        |------------------------------------->|
        |                                      |
        |===== RTP Media Stream ============== |
        |                                      |
        |          BYE                         |
        |------------------------------------->|
        |                                      |
        |          200 OK                      |
        |<-------------------------------------|

# SIP Registration Process
User Agent                             Registrar Server
        |                                      |
        |          REGISTER                    |
        |------------------------------------->|
        |                                      |
        |          401 Unauthorized            |
        |<-------------------------------------|
        |                                      |
        |      REGISTER (with Auth)            |
        |------------------------------------->|
        |                                      |
        |          200 OK                      |
        |<-------------------------------------|

# Example REGISTER Request
REGISTER sip:example.com SIP/2.0
Via: SIP/2.0/UDP 192.168.1.100:5060;branch=z9hG4bK623542
To: Alice <sip:alice@example.com>
From: Alice <sip:alice@example.com>;tag=1928301775
Call-ID: b84b4c76e66710@192.168.1.100
CSeq: 1 REGISTER
Contact: <sip:alice@192.168.1.100:5060>;expires=3600
Max-Forwards: 70
User-Agent: SIP Phone 1.0
Content-Length: 0

# Authentication Challenge (401 Response)
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 192.168.1.100:5060;branch=z9hG4bK623542
To: Alice <sip:alice@example.com>;tag=1410948205
From: Alice <sip:alice@example.com>;tag=1928301775
Call-ID: b84b4c76e66710@192.168.1.100
CSeq: 1 REGISTER
WWW-Authenticate: Digest realm="example.com", nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093"
Content-Length: 0

# Authenticated REGISTER Request
REGISTER sip:example.com SIP/2.0
Via: SIP/2.0/UDP 192.168.1.100:5060;branch=z9hG4bK623543
To: Alice <sip:alice@example.com>
From: Alice <sip:alice@example.com>;tag=1928301775
Call-ID: b84b4c76e66710@192.168.1.100
CSeq: 2 REGISTER
Contact: <sip:alice@192.168.1.100:5060>;expires=3600
Authorization: Digest username="alice", realm="example.com", 
               nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", 
               uri="sip:example.com", 
               response="6629fae49393a05397450978507c4ef1"
Max-Forwards: 70
User-Agent: SIP Phone 1.0
Content-Length: 0`,
        explanation: "Complete SIP call flow and registration process examples."
      },
      {
        title: "SIP Server Configuration and Programming",
        code: `# Asterisk SIP Configuration (/etc/asterisk/sip.conf)
[general]
context=default
bindport=5060
bindaddr=0.0.0.0
srvlookup=yes
allowguest=no
alwaysauthreject=yes
musiconhold=default
mohinterpret=default
mohsuggest=default

[1001]
type=friend
secret=password123
context=internal
host=dynamic
canreinvite=no
dtmfmode=rfc2833
disallow=all
allow=ulaw
allow=alaw
allow=gsm

[1002]  
type=friend
secret=password456
context=internal
host=dynamic
canreinvite=no
dtmfmode=rfc2833
disallow=all
allow=ulaw
allow=alaw

# Asterisk Dialplan (/etc/asterisk/extensions.conf)
[internal]
exten => 1001,1,Dial(SIP/1001,20)
exten => 1001,n,Voicemail(1001@default)
exten => 1001,n,Hangup()

exten => 1002,1,Dial(SIP/1002,20)
exten => 1002,n,Voicemail(1002@default)
exten => 1002,n,Hangup()

exten => *97,1,VoicemailMain()
exten => *97,n,Hangup()

# Python SIP Client using pjsua2
import pjsua2 as pj

class MyCall(pj.Call):
    def __init__(self, acc, call_id=pj.PJSUA_INVALID_ID):
        pj.Call.__init__(self, acc, call_id)
        
    def onCallState(self):
        ci = self.getInfo()
        print(f"Call state: {ci.stateText} ({ci.state})")
        
    def onCallMediaState(self):
        ci = self.getInfo()
        for mi in ci.media:
            if mi.type == pj.PJMEDIA_TYPE_AUDIO and mi.status == pj.PJSUA_CALL_MEDIA_ACTIVE:
                m = self.getMedia(mi.index)
                am = pj.AudioMedia.typecastFromMedia(m)
                am.startTransmit(pj.Endpoint.instance().audDevManager().getPlaybackDevMedia())
                pj.Endpoint.instance().audDevManager().getCaptureDevMedia().startTransmit(am)

class MyAccount(pj.Account):
    def __init__(self):
        pj.Account.__init__(self)
        
    def onRegState(self):
        ri = self.getInfo()
        print(f"Registration status: {ri.regStatusText} ({ri.regStatus})")
        
    def onIncomingCall(self, prm):
        call = MyCall(self, prm.callId)
        call.answer(pj.CallOpParam(True))

# Initialize SIP endpoint
ep = pj.Endpoint()
ep.libCreate()

ep_cfg = pj.EpConfig()
ep_cfg.logConfig.level = 4
ep.libInit(ep_cfg)

# Create transport
tcfg = pj.TransportConfig()
tcfg.port = 5060
transport = ep.transportCreate(pj.PJSIP_TRANSPORT_UDP, tcfg)

ep.libStart()

# Create account
acc_cfg = pj.AccountConfig()
acc_cfg.idUri = "sip:alice@example.com"
acc_cfg.regConfig.registrarUri = "sip:example.com"
acc_cfg.sipConfig.authCreds.append(pj.AuthCredInfo("digest", "*", "alice", 0, "password"))

acc = MyAccount()
acc.create(acc_cfg)

# Make a call
call = MyCall(acc)
call_prm = pj.CallOpParam(True)
call.makeCall("sip:bob@example.com", call_prm)

# Keep the program running
input("Press Enter to quit...")

ep.libDestroy()

# SIP.js Browser Example
const userAgent = new SIP.UA({
    uri: 'alice@example.com',
    wsServers: ['wss://example.com:8089/ws'],
    authorizationUser: 'alice',
    password: 'password',
    displayName: 'Alice'
});

// Make a call
const session = userAgent.invite('sip:bob@example.com', {
    sessionDescriptionHandlerOptions: {
        constraints: {
            audio: true,
            video: false
        }
    }
});

// Handle incoming calls
userAgent.on('invite', function(session) {
    session.accept();
});

// Handle call events
session.on('accepted', function() {
    console.log('Call accepted');
});

session.on('bye', function() {
    console.log('Call ended');
});

# OpenSIPS Configuration (opensips.cfg)
listen=udp:0.0.0.0:5060
children=4

loadmodule "db_mysql.so"
loadmodule "signaling.so"
loadmodule "sl.so"
loadmodule "tm.so"
loadmodule "rr.so"
loadmodule "maxfwd.so"
loadmodule "usrloc.so"
loadmodule "registrar.so"
loadmodule "textops.so"
loadmodule "mi_fifo.so"
loadmodule "uri.so"
loadmodule "acc.so"
loadmodule "auth.so"
loadmodule "auth_db.so"

modparam("mi_fifo", "fifo_name", "/tmp/opensips_fifo")
modparam("auth_db", "db_url", "mysql://opensips:password@localhost/opensips")
modparam("usrloc", "db_mode", 2)
modparam("usrloc", "db_url", "mysql://opensips:password@localhost/opensips")

route {
    if (!mf_process_maxfwd_header("10")) {
        sl_send_reply("483", "Too Many Hops");
        exit;
    }
    
    if (is_method("REGISTER")) {
        if (!www_authorize("", "subscriber")) {
            www_challenge("", "0");
            exit;
        }
        save("location");
        exit;
    }
    
    if (is_method("INVITE")) {
        if (!lookup("location")) {
            sl_send_reply("404", "User Not Found");
            exit;
        }
        t_relay();
    }
}`,
        explanation: "SIP server configuration and client programming examples."
      }
    ],
    relatedProtocols: ["rtp", "rtcp", "srtp", "sdp", "webrtc"],
    resources: [
      {
        title: "RFC 3261 - SIP Protocol",
        url: "https://tools.ietf.org/html/rfc3261",
        type: "RFC"
      },
      {
        title: "SIP Security Best Practices",
        url: "https://tools.ietf.org/html/rfc5626",
        type: "RFC"
      }
    ],
    securityConsiderations: [
      "Authentication and authorization",
      "TLS encryption",
      "DoS attack prevention",
      "SIP message validation",
      "Network access control",
      "Media encryption (SRTP)"
    ]
};
