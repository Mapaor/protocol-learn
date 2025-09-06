'use client';

import { Server } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function InfrastructureCloudPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Infrastructure");

  return (
    <LearningPathLayout
      title="Infrastructure & Cloud"
      description="RADOS and distributed system protocols"
      protocols={protocols}
      icon={Server}
      gradient="bg-gradient-to-r from-slate-600 to-slate-800"
    />
  );
}
