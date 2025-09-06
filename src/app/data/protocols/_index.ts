import { Protocol } from '../../types/protocol';

import { AJAX } from "./ajax"
import { AMQP } from "./ampq";
import { ARP } from "./arp";
import { AVRO } from "./avro";
import { BGP } from "./bgp";
import { BITTORRENT } from "./bittorrent";
import { CEPHFS } from "./cephfs";
import { DHT } from "./dht";
import { DHCP } from "./dhcp";
import { DHCPV6 } from "./dhcpv6";
import { DNS } from "./dns";
import { EIGRP } from "./eigrp";
import { FTP } from "./ftp";
import { FTPS } from "./ftps";
import { GRAPHQL } from "./graphql";
import { GRPC } from "./grpc";
import { HTTP } from "./http";
import { HTTP2 } from "./http2";
import { HTTP3 } from "./http3";
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
import { LUSTRE } from "./lustre";
import { MAPI } from "./mapi";
import { MQTT } from "./mqtt";
import { MTLS } from "./mtls";
import { NATS } from "./nats";
import { NDP } from "./ndp";
import { NFS } from "./nfs";
import { OAUTH1 } from "./oauth1";
import { OAUTH2 } from "./oauth2";
import { OPENID } from "./openid";
import { OSPF } from "./ospf";
import { PKCS } from "./pkcs";
import { POP3 } from "./pop3";
import { PROTOBUF } from "./protobuf";



export const PROTOCOLS: Protocol[] = [
  AJAX,
  AMQP,
  ARP,
  AVRO,
  BGP,
  BITTORRENT,
  CEPHFS,
  DHT,
  DHCP,
  DHCPV6,
  DNS,
  EIGRP,
  FTP,
  FTPS,
  GRAPHQL,
  GRPC,
  HTTP,
  HTTP2,
  HTTP3,
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
  LUSTRE,
  MAPI,
  MQTT,
  MTLS,
  NATS,
  NDP,
  NFS,
  OAUTH1,
  OAUTH2,
  OPENID,
  OSPF,
  PKCS,
  POP3,
  PROTOBUF
];
