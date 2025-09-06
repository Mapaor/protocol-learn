'use client';

import { FileText } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function DataFormatsPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Data");

  return (
    <LearningPathLayout
      title="Data Formats"
      description="JSON, XML, and data interchange formats"
      protocols={protocols}
      icon={FileText}
      gradient="bg-gradient-to-r from-teal-600 to-teal-800"
    />
  );
}
