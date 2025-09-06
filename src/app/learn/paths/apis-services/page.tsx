'use client';

import { Database } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function ApisServicesPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "APIs");

  return (
    <LearningPathLayout
      title="APIs & Services"
      description="REST, GraphQL, gRPC, and modern API design"
      protocols={protocols}
      icon={Database}
      gradient="bg-gradient-to-r from-gray-600 to-gray-800"
    />
  );
}
