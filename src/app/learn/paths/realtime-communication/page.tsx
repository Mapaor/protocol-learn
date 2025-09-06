'use client';

import { Wifi } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function RealtimeCommunicationPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Real Time");

  return (
    <LearningPathLayout
      title="Real-Time Communication"
      description="WebSockets, MQTT, and real-time protocols"
      protocols={protocols}
      icon={Wifi}
      gradient="bg-gradient-to-r from-pink-600 to-pink-800"
    />
  );
}
