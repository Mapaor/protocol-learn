'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PROTOCOLS } from '../data/protocols/_index';
import { useProgress } from '../hooks/useProtocol';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Globe,
  FileText,
  Mail,
  Lock,
  Database,
  Layers,
  Server,
  Wifi
} from 'lucide-react';

const LearningPath = ({ 
  title, 
  description, 
  protocols, 
  color,
  icon: Icon 
}: {
  title: string;
  description: string;
  protocols: typeof PROTOCOLS;
  color: string;
  icon: React.ElementType;
}) => {
  const { isCompleted } = useProgress();
  const completedCount = protocols.filter(p => isCompleted(p.id)).length;
  const progressPercentage = Math.round((completedCount / protocols.length) * 100);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-lg font-semibold text-gray-900">{progressPercentage}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${color.replace('bg-', 'bg-').replace('-600', '-500')}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {protocols.slice(0, 4).map((protocol) => (
              <Link
                key={protocol.id}
                href={`/protocols/${protocol.id}`}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group/item"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover/item:text-blue-700">
                      {protocol.name}
                    </h4>
                    <p className="text-xs text-gray-500">{protocol.difficulty}</p>
                  </div>
                  {isCompleted(protocol.id) ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Play className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600" />
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          {protocols.length > 4 && (
            <div className="text-center pt-2">
              <span className="text-sm text-gray-500">
                +{protocols.length - 4} more protocols
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function LearnPage() {
  const { getCompletionPercentage } = useProgress();
  const overallProgress = getCompletionPercentage();

  const learningPaths = [
    {
      title: "Web Fundamentals",
      description: "Start with HTTP, HTTPS, AJAX, and web protocols",
      protocols: PROTOCOLS.filter(p => p.category === "Web"),
      color: "bg-blue-600",
      icon: Globe
    },
    {
      title: "File Transfer",
      description: "Learn FTP, SFTP, SCP, and secure file sharing",
      protocols: PROTOCOLS.filter(p => p.category === "Files"),
      color: "bg-green-600",
      icon: FileText
    },
    {
      title: "Email Systems",
      description: "Master SMTP, IMAP, POP3, and email protocols",
      protocols: PROTOCOLS.filter(p => p.category === "Email"),
      color: "bg-purple-600",
      icon: Mail
    },
    {
      title: "Security Protocols",
      description: "Understand SSH, TLS, and security fundamentals",
      protocols: PROTOCOLS.filter(p => p.category === "Security"),
      color: "bg-red-600",
      icon: Lock
    },
    {
      title: "Network Foundations",
      description: "DNS, DHCP, and core networking protocols",
      protocols: PROTOCOLS.filter(p => p.category === "Network" || p.category === "Transport"),
      color: "bg-indigo-600",
      icon: Server
    },
    {
      title: "APIs & Services",
      description: "REST, GraphQL, and modern API design",
      protocols: PROTOCOLS.filter(p => p.category === "APIs"),
      color: "bg-gray-600",
      icon: Database
    },
    {
      title: "Data Formats",
      description: "JSON, XML, and data interchange formats",
      protocols: PROTOCOLS.filter(p => p.category === "Data"),
      color: "bg-teal-600",
      icon: FileText
    },
    {
      title: "Real-Time Communication",
      description: "WebSockets, MQTT, and real-time protocols",
      protocols: PROTOCOLS.filter(p => p.category === "Real Time"),
      color: "bg-pink-600",
      icon: Wifi
    },
    {
      title: "Advanced Topics",
      description: "Microservices and complex systems",
      protocols: PROTOCOLS.filter(p => 
        p.category === "Microservices" || 
        p.difficulty === "Advanced"
      ),
      color: "bg-orange-600",
      icon: Layers
    }
  ];

  const beginnerProtocols = PROTOCOLS.filter(p => p.difficulty === "Beginner");
  const nextProtocolToLearn = beginnerProtocols.find(p => !PROTOCOLS.some(completed => completed.id === p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Learning
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Structured learning paths to master network protocols and APIs
          </p>
          
          {/* Overall Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Progress</span>
              <span className="text-sm font-semibold text-gray-900">{overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Quick Start */}
        {nextProtocolToLearn && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Play className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Continue Learning
                    </h3>
                    <p className="text-gray-600">
                      Pick up where you left off with {nextProtocolToLearn.name}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/protocols/${nextProtocolToLearn.id}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Paths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Paths</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <LearningPath {...path} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Beginner Friendly */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h2 className="text-2xl font-semibold">Beginner Friendly</h2>
            </div>
            <p className="text-gray-600">
              Start with these foundational protocols if you&apos;re new to networking
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {beginnerProtocols.slice(0, 6).map((protocol) => (
                <Link
                  key={protocol.id}
                  href={`/protocols/${protocol.id}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-700">
                      {protocol.name}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{protocol.shortDescription}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="category" category={protocol.category}>
                      {protocol.category}
                    </Badge>
                    <Badge variant="difficulty" difficulty={protocol.difficulty}>
                      {protocol.difficulty}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
