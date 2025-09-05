import { Protocol } from '../../types/protocol';

import { AJAX } from "./ajax"
import { AMQP } from "./ampq";
import { DHCP } from "./dhcp";
import { DNS } from "./dns";
import { FTP } from "./ftp";
import { FTPS } from "./ftps";
import { GRAPHQL } from "./graphql";
import { GRCP } from "./grcp";
import { HTTP } from "./http";
import { HTTPS } from "./https";
import { IMAP } from "./imap";
import { JSON } from "./json";
import { MQTT } from "./mqtt";
import { MTLS } from "./mtls";
import { NATS } from "./nats";
import { OAUTH2 } from "./oauth2";
import { POP3 } from "./pop3";
import { RADOS } from "./rados";
import { REST } from "./rest";
import { SCP } from "./scp";
import { SFTP } from "./sftp";
import { SMTP } from "./smtp";
import { SPIFFE } from "./spiffe";
import { SPIRE } from "./spire";
import { SSH } from "./ssh";
import { SSL } from "./ssl";
import { TCP } from "./tcp";
import { TLS } from "./tls";
import { WEBSOCKETS } from "./websockets";
import { XML } from "./xml";



export const PROTOCOLS: Protocol[] = [
  AJAX,
  AMQP,
  DHCP,
  DNS,
  FTP,
  FTPS,
  GRAPHQL,
  GRCP,
  HTTP,
  HTTPS,
  IMAP,
  JSON,
  MQTT,
  MTLS,
  NATS,
  OAUTH2,
  POP3,
  RADOS,
  REST,
  SCP,
  SFTP,
  SMTP,
  SPIFFE,
  SPIRE,
  SSH,
  SSL,
  TCP,
  TLS,
  WEBSOCKETS,
  XML
];
