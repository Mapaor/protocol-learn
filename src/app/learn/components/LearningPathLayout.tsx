'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useProgress } from '../../hooks/useProtocol';
import { 
  ArrowLeft,
  CheckCircle, 
  Play, 
  Clock,
  Target,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Protocol } from '../../types/protocol';

interface LearningPathLayoutProps {
  title: string;
  description: string;
  protocols: Protocol[];
  icon: React.ElementType;
  gradient: string;
}

export default function LearningPathLayout({
  title,
  description,
  protocols,
  icon: Icon,
  gradient
}: LearningPathLayoutProps) {
  const { isCompleted } = useProgress();
  const completedCount = protocols.filter(p => isCompleted(p.id)).length;
  const progressPercentage = Math.round((completedCount / protocols.length) * 100);

  const beginnerProtocols = protocols.filter(p => p.difficulty === "Beginner");
  const intermediateProtocols = protocols.filter(p => p.difficulty === "Intermediate");
  const advancedProtocols = protocols.filter(p => p.difficulty === "Advanced");

  const nextProtocolToLearn = protocols.find(p => !isCompleted(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/learn"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Learning Paths</span>
          </Link>

          <div className={`${gradient} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{title}</h1>
                  <p className="text-white/90 text-lg">{description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm">Progress</div>
                <div className="text-2xl font-bold">{progressPercentage}%</div>
                <div className="text-white/80 text-sm">{completedCount}/{protocols.length} protocols</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full bg-white/20 rounded-full h-3">
                <motion.div
                  className="bg-white h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
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
                      Next up: {nextProtocolToLearn.name}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/protocols/${nextProtocolToLearn.id}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{completedCount}</div>
              <div className="text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{protocols.length - completedCount}</div>
              <div className="text-gray-600">Remaining</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{protocols.length}</div>
              <div className="text-gray-600">Total Protocols</div>
            </CardContent>
          </Card>
        </div>

        {/* Protocols by Difficulty */}
        <div className="space-y-8">
          {beginnerProtocols.length > 0 && (
            <ProtocolSection
              title="Beginner"
              description="Start here if you're new to this area"
              protocols={beginnerProtocols}
              color="green"
            />
          )}

          {intermediateProtocols.length > 0 && (
            <ProtocolSection
              title="Intermediate"
              description="Build on your foundation knowledge"
              protocols={intermediateProtocols}
              color="yellow"
            />
          )}

          {advancedProtocols.length > 0 && (
            <ProtocolSection
              title="Advanced"
              description="Deep dive into complex concepts"
              protocols={advancedProtocols}
              color="red"
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface ProtocolSectionProps {
  title: string;
  description: string;
  protocols: Protocol[];
  color: 'green' | 'yellow' | 'red';
}

function ProtocolSection({ title, description, protocols, color }: ProtocolSectionProps) {
  const { isCompleted } = useProgress();
  
  const colorClasses = {
    green: {
      badge: 'bg-green-100 text-green-800',
      border: 'border-green-200',
      hover: 'hover:border-green-300 hover:bg-green-50'
    },
    yellow: {
      badge: 'bg-yellow-100 text-yellow-800',
      border: 'border-yellow-200',
      hover: 'hover:border-yellow-300 hover:bg-yellow-50'
    },
    red: {
      badge: 'bg-red-100 text-red-800',
      border: 'border-red-200',
      hover: 'hover:border-red-300 hover:bg-red-50'
    }
  };

  const completedCount = protocols.filter(p => isCompleted(p.id)).length;
  const progressPercentage = Math.round((completedCount / protocols.length) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color].badge}`}>
                {protocols.length} protocols
              </span>
            </div>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-lg font-semibold text-gray-900">{progressPercentage}%</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <motion.div
            className={`h-2 rounded-full ${color === 'green' ? 'bg-green-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocols.map((protocol) => (
            <Link
              key={protocol.id}
              href={`/protocols/${protocol.id}`}
              className={`p-4 border ${colorClasses[color].border} rounded-lg ${colorClasses[color].hover} transition-all duration-200 group`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 flex-1">
                  {protocol.name}
                </h4>
                {isCompleted(protocol.id) ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                ) : (
                  <Play className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 ml-2" />
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {protocol.shortDescription}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="category" category={protocol.category}>
                  {protocol.category}
                </Badge>
                {protocol.port && (
                  <span className="text-xs text-gray-500">Port {protocol.port}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
