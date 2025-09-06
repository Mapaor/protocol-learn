'use client';

import { Server } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function NetworkFoundationsPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Network" || p.category === "Transport");

  return (
    <LearningPathLayout
      title="Network Foundations"
      description="DNS, DHCP, TCP, and core networking protocols"
      protocols={protocols}
      icon={Server}
      gradient="bg-gradient-to-r from-indigo-600 to-indigo-800"
    />
  );
}
