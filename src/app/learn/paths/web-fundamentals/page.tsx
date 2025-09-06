'use client';

import { Globe } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function WebFundamentalsPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Web");

  return (
    <LearningPathLayout
      title="Web Fundamentals"
      description="Start with HTTP, HTTPS, AJAX, and web protocols"
      protocols={protocols}
      icon={Globe}
      gradient="bg-gradient-to-r from-blue-600 to-blue-800"
    />
  );
}
