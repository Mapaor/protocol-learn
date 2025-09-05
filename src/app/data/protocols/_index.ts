import { Protocol } from '../../types/protocol';

import { AJAX } from "./ajax"
import { DHCP } from "./dhcp";
import { DNS } from "./dns";
import { FTP } from "./ftp";
import { FTPS } from "./ftps";
import { GRAPHQL } from "./graphql";
import { HTTP } from "./http";
import { HTTPS } from "./https";
import { IMAP } from "./imap";
import { JSON } from "./json";
import { MQTT } from "./mqtt";
import { POP3 } from "./pop3";
import { REST } from "./rest";
import { SCP } from "./scp";
import { SFTP } from "./sftp";
import { SMTP } from "./smtp";
import { SSH } from "./ssh";
import { TCP } from "./tcp";
import { TLS } from "./tls";
import { WEBSOCKETS } from "./websockets";
import { XML } from "./xml";



export const PROTOCOLS: Protocol[] = [
  AJAX,
  DHCP,
  DNS,
  FTP,
  FTPS,
  GRAPHQL,
  HTTP,
  HTTPS,
  IMAP,
  JSON,
  MQTT,
  POP3,
  REST,
  SCP,
  SFTP,
  SMTP,
  SSH,
  TCP,
  TLS,
  WEBSOCKETS,
  XML
];
