'use client';

import { FileText } from 'lucide-react';
import { PROTOCOLS } from '../../../data/protocols/_index';
import LearningPathLayout from '../../components/LearningPathLayout';

export default function FileTransferPage() {
  const protocols = PROTOCOLS.filter(p => p.category === "Files");

  return (
    <LearningPathLayout
      title="File Transfer"
      description="Learn FTP, SFTP, SCP, and secure file sharing"
      protocols={protocols}
      icon={FileText}
      gradient="bg-gradient-to-r from-green-600 to-green-800"
    />
  );
}
