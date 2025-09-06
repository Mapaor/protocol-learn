'use client';

import { Mail } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function EmailSystemsPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Email");

  return (
    <LearningPathLayout
      title="Email Systems"
      description="Master SMTP, IMAP, POP3, and email protocols"
      protocols={protocols}
      icon={Mail}
      gradient="bg-gradient-to-r from-purple-600 to-purple-800"
    />
  );
}
