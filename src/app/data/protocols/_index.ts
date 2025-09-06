import { Protocol } from '../../types/protocol';

import { ACTIVESYNC } from "./activesync";
import { AFP } from "./afp";
import { AH } from "./ah";
import { AJAX } from "./ajax";
import { AMQP } from "./amqp";
import { ARP } from "./arp";
import { ATM } from "./atm";
import { AVRO } from "./avro";
import { BGP } from "./bgp";
import { BITTORRENT } from "./bittorrent";
import { BONJOUR } from "./bonjour";
import { CALDAV } from "./caldav";
import { CARDDAV } from "./carddav";
import { CEPHFS } from "./cephfs";
import { CIFS } from "./cifs";
import { CLNP } from "./clnp";
import { CLNS } from "./clns";
import { COAP } from "./coap";
import { DCB } from "./dcb";
import { DCCP } from "./dccp";
import { DHCP } from "./dhcp";
import { DHCPV6 } from "./dhcpv6";
import { DHT } from "./dht";
import { DNS } from "./dns";
import { DNSSD } from "./dnssd";
import { DNSSEC } from "./dnssec";
import { EIGRP } from "./eigrp";
import { ESP } from "./esp";
import { ETHERNET } from "./ethernet";
import { EWS } from "./ews";
import { EXCHANGE } from "./exchange";
import { FCOE } from "./fcoe";
import { FRAMERELAY } from "./frame-relay";
import { FTP } from "./ftp";
import { FTPS } from "./ftps";
import { GLUSTERFS } from "./glusterfs";
import { GRAPHQL } from "./graphql";
import { GRPC } from "./grpc";
import { H323 } from "./h323";
import { HTTP } from "./http";
import { HTTP2 } from "./http2";
import { HTTP3 } from "./http3";
import { HTTPS } from "./https";
import { HTTPU } from "./httpu";
import { ICE } from "./ice";
import { ICMP } from "./icmp";
import { ICMPV6 } from "./icmpv6";
import { IGMP } from "./igmp";
import { IKE } from "./ike";
import { IMAP } from "./imap";
import { INFINIBAND } from "./infiniband";
import { IP } from "./ip";
import { IPFS } from "./ipfs";
import { IPSEC } from "./ipsec";
import { IPV4 } from "./ipv4";
import { IPV6 } from "./ipv6";
import { IPX } from "./ipx";
import { ISCSI } from "./iscsi";
import { ISIS } from "./isis";
import { IWARP } from "./iwarp";
import { JMS } from "./jms";
import { JSON } from "./json";
import { JWT } from "./jwt";
import { KAFKA } from "./kafka";
import { KERBEROS } from "./kerberos";
import { LDAP } from "./ldap";
import { LDP } from "./ldp";
import { LUSTRE } from "./lustre";
import { MAPI } from "./mapi";
import { MDNS } from "./mdns";
import { MLD } from "./mld";
import { MPLS } from "./mpls";
import { MQTT } from "./mqtt";
import { MTLS } from "./mtls";
import { NATS } from "./nats";
import { NBT } from "./nbt";
import { NCP } from "./ncp";
import { NDP } from "./ndp";
import { NETBIOS } from "./netbios";
import { NFS } from "./nfs";
import { NTLM } from "./ntlm";
import { NTP } from "./ntp";
import { NVMEOF } from "./nvmeof";
import { OAUTH1 } from "./oauth1";
import { OAUTH2 } from "./oauth2";
import { OPENID } from "./openid";
import { OSPF } from "./ospf";
import { PIM } from "./pim";
import { PKCS } from "./pkcs";
import { PKI } from "./pki";
import { POP3 } from "./pop3";
import { PROTOBUF } from "./protobuf";
import { PTP } from "./ptp";
import { QUIC } from "./quic";
import { RADOS } from "./rados";
import { RBD } from "./rbd";
import { RDMA } from "./rdma";
import { REST } from "./rest";
import { RGW } from "./rgw";
import { RIP } from "./rip";
import { ROCE } from "./roce";
import { RPC } from "./rpc";
import { RSVP } from "./rsvp";
import { RSYNC } from "./rsync";
import { RTCP } from "./rtcp";
import { RTP } from "./rtp";
import { RTSP } from "./rtsp";
import { SAML } from "./saml";
import { SCP } from "./scp";
import { SCTP } from "./sctp";
import { SDP } from "./sdp";
import { SFTP } from "./sftp";
import { SIP } from "./sip";
import { SLAAC } from "./slaac";
import { SMB } from "./smb";
import { SMTP } from "./smtp";
import { SNMP } from "./snmp";
import { SOAP } from "./soap";
import { SPDY } from "./spdy";
import { SPIFFE } from "./spiffe";
import { SPIRE } from "./spire";
import { SPNEGO } from "./spnego";
import { SPX } from "./spx";
import { SRTP } from "./srtp";
import { SSH } from "./ssh";
import { SSL } from "./ssl";
import { SSE } from "./sse";
import { SSDP } from "./ssdp";
import { STATIC } from "./static";
import { STOMP } from "./stomp";
import { STUN } from "./stun";
import { TCP } from "./tcp";
import { THRIFT } from "./thrift";
import { TLS } from "./tls";
import { TURN } from "./turn";
import { UDP } from "./udp";
import { UPNP } from "./upnp";
import { VOIP } from "./voip";
import { WEBDAV } from "./webdav";
import { WEBRTC } from "./webrtc";
import { WEBSOCKETS } from "./websockets";
import { WINS } from "./wins";
import { WSDL } from "./wsdl";
import { X25 } from "./x25";
import { X509 } from "./x509";
import { XHTML } from "./xhtml";
import { XML } from "./xml";
import { MCP } from './mcp';


export const PROTOCOLS: Protocol[] = [
  ACTIVESYNC,
  AFP,
  AH,
  AJAX,
  AMQP,
  ARP,
  ATM,
  AVRO,
  BGP,
  BITTORRENT,
  BONJOUR,
  CALDAV,
  CARDDAV,
  CEPHFS,
  CIFS,
  CLNP,
  CLNS,
  COAP,
  DCB,
  DCCP,
  DHCP,
  DHCPV6,
  DHT,
  DNS,
  DNSSD,
  DNSSEC,
  EIGRP,
  ESP,
  ETHERNET,
  EWS,
  EXCHANGE,
  FCOE,
  FRAMERELAY,
  FTP,
  FTPS,
  GLUSTERFS,
  GRAPHQL,
  GRPC,
  H323,
  HTTP,
  HTTP2,
  HTTP3,
  HTTPS,
  HTTPU,
  ICE,
  ICMP,
  ICMPV6,
  IGMP,
  IKE,
  IMAP,
  INFINIBAND,
  IP,
  IPFS,
  IPSEC,
  IPV4,
  IPV6,
  IPX,
  ISCSI,
  ISIS,
  IWARP,
  JMS,
  JSON,
  JWT,
  KAFKA,
  KERBEROS,
  LDAP,
  LDP,
  LUSTRE,
  MAPI,
  MDNS,
  MLD,
  MPLS,
  MQTT,
  MTLS,
  NATS,
  NBT,
  NCP,
  NDP,
  NETBIOS,
  NFS,
  NTLM,
  NTP,
  NVMEOF,
  OAUTH1,
  OAUTH2,
  OPENID,
  OSPF,
  PIM,
  PKCS,
  PKI,
  POP3,
  PROTOBUF,
  PTP,
  QUIC,
  RADOS,
  RBD,
  RDMA,
  REST,
  RGW,
  RIP,
  ROCE,
  RPC,
  RSVP,
  RSYNC,
  RTCP,
  RTP,
  RTSP,
  SAML,
  SCP,
  SCTP,
  SDP,
  SFTP,
  SIP,
  SLAAC,
  SMB,
  SMTP,
  SNMP,
  SOAP,
  SPDY,
  SPIFFE,
  SPIRE,
  SPNEGO,
  SPX,
  SRTP,
  SSH,
  SSL,
  SSE,
  SSDP,
  STATIC,
  STOMP,
  STUN,
  TCP,
  THRIFT,
  TLS,
  TURN,
  UDP,
  UPNP,
  VOIP,
  WEBDAV,
  WEBRTC,
  WEBSOCKETS,
  WINS,
  WSDL,
  X25,
  X509,
  XHTML,
  XML,
  MCP
];
