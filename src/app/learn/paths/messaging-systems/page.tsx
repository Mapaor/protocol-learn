'use client';

import { Mail } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function MessagingSystemsPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Messaging");

  return (
    <LearningPathLayout
      title="Messaging Systems"
      description="AMQP, NATS, and message queuing protocols"
      protocols={protocols}
      icon={Mail}
      gradient="bg-gradient-to-r from-orange-600 to-orange-800"
    />
  );
}
