'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Protocol } from '../../types/protocol';
import { useFavorites } from '../../hooks/useProtocol';
import { 
  Clock, 
  Star, 
  ArrowRight, 
  Globe,
  FileText,
  Mail,
  Lock,
  Server,
  Wifi,
  Database,
  Shield,
  Search
} from 'lucide-react';

interface ProtocolCardProps {
  protocol: Protocol;
  showDetails?: boolean;
}

const getIconForProtocol = (protocolId: string) => {
  switch (protocolId) {
    // Web
    case 'http':
    case 'https':
    case 'http2':
    case 'http3':
    case 'httpu':
    case 'ajax':
    case 'xhtml':
    case 'webdav':
    case 'webrtc':
    case 'websockets':
    case 'static':
      return <Globe className="w-6 h-6" />;
    // Files
    case 'ftp':
    case 'sftp':
    case 'ftps':
    case 'scp':
    case 'json':
    case 'xml':
    case 'nfs':
    case 'cifs':
    case 'smb':
    case 'afp':
    case 'cephfs':
    case 'glusterfs':
    case 'lustre':
    case 'iscsi':
    case 'nvmeof':
    case 'rbd':
    case 'rsync':
      return <FileText className="w-6 h-6" />;
    // Email & Messaging
    case 'smtp':
    case 'imap':
    case 'pop3':
    case 'mapi':
    case 'exchange':
    case 'ews':
    case 'caldav':
    case 'carddav':
    case 'activesync':
      return <Mail className="w-6 h-6" />;
    // Security & Authentication
    case 'ssh':
    case 'tls':
    case 'ssl':
    case 'mtls':
    case 'spiffe':
    case 'spire':
    case 'ipsec':
    case 'ike':
    case 'ah':
    case 'kerberos':
    case 'ntlm':
    case 'oauth1':
    case 'oauth2':
    case 'openid':
    case 'saml':
    case 'pkcs':
    case 'pki':
    case 'x509':
    case 'spnego':
      return <Lock className="w-6 h-6" />;
    // Network Infrastructure & Protocols
    case 'dns':
    case 'dhcp':
    case 'dhcpv6':
    case 'mdns':
    case 'dnssd':
    case 'dnssec':
    case 'bonjour':
    case 'upnp':
    case 'ssdp':
    case 'wins':
    case 'netbios':
    case 'nbt':
    case 'ncp':
    case 'ip':
    case 'ipv4':
    case 'ipv6':
    case 'icmp':
    case 'icmpv6':
    case 'igmp':
    case 'mld':
    case 'ndp':
    case 'slaac':
    case 'arp':
    case 'ethernet':
    case 'atm':
    case 'framerelay':
    case 'x25':
    case 'ipx':
    case 'spx':
    case 'clnp':
    case 'clns':
    case 'isis':
    case 'ospf':
    case 'eigrp':
    case 'bgp':
    case 'rip':
    case 'pim':
    case 'mpls':
    case 'ldp':
    case 'rsvp':
    case 'ldap':
    case 'ntp':
    case 'ptp':
    case 'snmp':
      return <Server className="w-6 h-6" />;
    // Transport & Real Time Communication
    case 'tcp':
    case 'udp':
    case 'sctp':
    case 'dccp':
    case 'quic':
    case 'websockets':
    case 'mqtt':
    case 'sse':
    case 'nats':
    case 'coap':
    case 'voip':
    case 'sip':
    case 'h323':
    case 'rtsp':
    case 'rtp':
    case 'rtcp':
    case 'srtp':
    case 'ice':
    case 'stun':
    case 'turn':
    case 'webrtc':
    case 'stomp':
    case 'jms':
    case 'amqp':
    case 'ampq':
    case 'kafka':
    case 'bittorrent':
    case 'dht':
    case 'spdy':
      return <Wifi className="w-6 h-6" />;
    // APIs & Data Formats
    case 'rest':
    case 'graphql':
    case 'grpc':
    case 'soap':
    case 'wsdl':
    case 'json':
    case 'xml':
    case 'avro':
    case 'protobuf':
    case 'thrift':
    case 'jwt':
    case 'rpc':
      return <Database className="w-6 h-6" />;
    // Storage & Distributed Systems
    case 'rados':
    case 'rbd':
    case 'cephfs':
    case 'glusterfs':
    case 'lustre':
    case 'ipfs':
    case 'rgw':
    case 'rdma':
    case 'roce':
    case 'iwarp':
    case 'infiniband':
    case 'fcoe':
    case 'iscsi':
    case 'nvmeof':
    case 'dcb':
    case 'esp':
    case 'sdp':
      return <Database className="w-6 h-6" />;
    default:
      return <Shield className="w-6 h-6" />;
  }
};

export const ProtocolCard: React.FC<ProtocolCardProps> = ({ 
  protocol, 
  showDetails = false 
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(protocol.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(protocol.id);
  };

  return (
    <Card hoverable className="group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              {getIconForProtocol(protocol.id)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {protocol.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {protocol.shortDescription}
              </p>
            </div>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-lg transition-all duration-200 ${
              favorited
                ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
            }`}
          >
            <Star className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-2 mb-3">
          <Badge variant="category" category={protocol.category}>
            {protocol.category}
          </Badge>
          <Badge variant="difficulty" difficulty={protocol.difficulty}>
            {protocol.difficulty}
          </Badge>
          {protocol.port && (
            <Badge>
              Port {protocol.port}
            </Badge>
          )}
        </div>

        {showDetails && (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Use Cases:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {protocol.useCases.slice(0, 3).map((useCase, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {protocol.diagrams && protocol.diagrams.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Diagram:</h4>
                <div className="relative h-32 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={protocol.diagrams[0].src}
                    alt={protocol.diagrams[0].alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>~15 min read</span>
          </div>
          <Link
            href={`/protocols/${protocol.id}`}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProtocolGridProps {
  protocols: Protocol[];
  showDetails?: boolean;
}

export const ProtocolGrid: React.FC<ProtocolGridProps> = ({ 
  protocols, 
  showDetails = false 
}) => {
  if (protocols.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No protocols found</h3>
        <p className="text-gray-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {protocols.map((protocol, index) => (
        <motion.div
          key={protocol.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProtocolCard protocol={protocol} showDetails={showDetails} />
        </motion.div>
      ))}
    </div>
  );
};
