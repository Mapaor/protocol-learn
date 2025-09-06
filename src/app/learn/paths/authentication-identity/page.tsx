'use client';

import { Lock } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function AuthenticationIdentityPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Authentication");

  return (
    <LearningPathLayout
      title="Authentication & Identity"
      description="OAuth 2.0, SPIFFE, SPIRE, and identity protocols"
      protocols={protocols}
      icon={Lock}
      gradient="bg-gradient-to-r from-yellow-600 to-yellow-800"
    />
  );
}
