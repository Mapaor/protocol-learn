import { Protocol } from '../../types/protocol';

import { AJAX } from "./ajax"
import { AMQP } from "./ampq";
import { ARP } from "./arp";
import { AVRO } from "./avro";
import { BITTORRENT } from "./bittorrent";
import { CEPHFS } from "./cephfs";
import { DHT } from "./dht";
import { DHCP } from "./dhcp";
import { DHCPV6 } from "./dhcpv6";
import { DNS } from "./dns";
import { FTP } from "./ftp";
import { FTPS } from "./ftps";
import { GRAPHQL } from "./graphql";
import { GRPC } from "./grpc";
import { HTTP } from "./http";
import { HTTP2 } from "./http2";
import { HTTPS } from "./https";
import { ICMP } from "./icmp";
import { ICMPV6 } from "./icmpv6";
import { IGMP } from "./igmp";
import { IMAP } from "./imap";
import { IPFS } from "./ipfs";
import { IPV4 } from "./ipv4";
import { IPV6 } from "./ipv6";
import { JMS } from "./jms";
import { JSON } from "./json";
import { JWT } from "./jwt";
import { KAFKA } from "./kafka";
import { MQTT } from "./mqtt";
import { MTLS } from "./mtls";
import { NATS } from "./nats";
import { NFS } from "./nfs";
import { OAUTH1 } from "./oauth1";
import { OAUTH2 } from "./oauth2";
import { OPENID } from "./openid";
import { PKCS } from "./pkcs";
import { POP3 } from "./pop3";
import { PROTOBUF } from "./protobuf";
import { RADOS } from "./rados";
import { RBD } from "./rbd";
import { REST } from "./rest";
import { RGW } from "./rgw";
import { RPC } from "./rpc";
import { RSYNC } from "./rsync";
import { SAML } from "./saml";
import { SCP } from "./scp";
import { SCTP } from "./sctp";
import { SFTP } from "./sftp";
import { SMTP } from "./smtp";
import { SOAP } from "./soap";
import { SPDY } from "./spdy";
import { SPIFFE } from "./spiffe";
import { SPIRE } from "./spire";
import { SRTP } from "./srtp";
import { SSH } from "./ssh";
import { SSE } from "./sse";
import { SSL } from "./ssl";
import { STOMP } from "./stomp";
import { TCP } from "./tcp";
import { TLS } from "./tls";
import { UDP } from "./udp";
import { WEBSOCKETS } from "./websockets";
import { WSDL } from "./wsdl";
import { X509 } from "./x509";
import { XHTML } from "./xhtml";
import { XML } from "./xml";



export const PROTOCOLS: Protocol[] = [
  AJAX,
  AMQP,
  ARP,
  AVRO,
  BITTORRENT,
  CEPHFS,
  DHT,
  DHCP,
  DHCPV6,
  DNS,
  FTP,
  FTPS,
  GRAPHQL,
  GRPC,
  HTTP,
  HTTP2,
  HTTPS,
  ICMP,
  ICMPV6,
  IGMP,
  IMAP,
  IPFS,
  IPV4,
  IPV6,
  JMS,
  JSON,
  JWT,
  KAFKA,
  MQTT,
  MTLS,
  NATS,
  NFS,
  OAUTH1,
  OAUTH2,
  OPENID,
  PKCS,
  POP3,
  PROTOBUF,
  RADOS,
  RBD,
  REST,
  RGW,
  RPC,
  RSYNC,
  SAML,
  SCP,
  SCTP,
  SFTP,
  SMTP,
  SOAP,
  SPDY,
  SPIFFE,
  SPIRE,
  SRTP,
  SSH,
  SSE,
  SSL,
  STOMP,
  TCP,
  TLS,
  UDP,
  WEBSOCKETS,
  WSDL,
  X509,
  XHTML,
  XML
];
