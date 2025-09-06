'use client';

import { Lock } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function SecurityProtocolsPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Security");

  return (
    <LearningPathLayout
      title="Security Protocols"
      description="Understand SSH, TLS, SSL, mTLS, and security fundamentals"
      protocols={protocols}
      icon={Lock}
      gradient="bg-gradient-to-r from-red-600 to-red-800"
    />
  );
}
