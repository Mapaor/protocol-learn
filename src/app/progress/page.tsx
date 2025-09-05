'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useProgress } from '../hooks/useProtocol';
import { PROTOCOLS } from '../data/protocols';
import { Category } from '../types/protocol';
import { 
  Trophy, 
  Target, 
  Clock, 
  BookOpen, 
  CheckCircle,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';

export default function ProgressPage() {
  const { completedLessons, getCompletionPercentage } = useProgress();
  const completionPercentage = getCompletionPercentage();
  const completedProtocols = PROTOCOLS.filter(p => completedLessons.includes(p.id));
  
  const categoryProgress = PROTOCOLS.reduce((acc, protocol) => {
    if (!acc[protocol.category]) {
      acc[protocol.category] = { total: 0, completed: 0 };
    }
    acc[protocol.category].total++;
    if (completedLessons.includes(protocol.id)) {
      acc[protocol.category].completed++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-blue-600 bg-blue-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Learning Progress
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Track your journey through network protocols and APIs
          </p>
        </div>

        {/* Overall Progress */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Overall Progress</h3>
                  <p className="text-2xl font-bold text-blue-600">{completionPercentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                  <p className="text-2xl font-bold text-green-600">{completedLessons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Total Protocols</h3>
                  <p className="text-2xl font-bold text-purple-600">{PROTOCOLS.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Time Invested</h3>
                  <p className="text-2xl font-bold text-orange-600">{completedLessons.length * 15}min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
              <span className="text-sm text-gray-600">{completedLessons.length} of {PROTOCOLS.length} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-semibold">Progress by Category</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryProgress).map(([category, progress]) => {
                const percentage = Math.round((progress.completed / progress.total) * 100);
                return (
                  <div key={category} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="category" category={category as Category}>
                        {category}
                      </Badge>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getProgressColor(percentage)}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {progress.completed} of {progress.total} protocols
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Completed Protocols */}
        {completedProtocols.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-semibold">Completed Protocols</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedProtocols.map((protocol) => (
                  <motion.div
                    key={protocol.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/protocols/${protocol.id}`}
                        className="font-semibold text-gray-900 hover:text-green-700"
                      >
                        {protocol.name}
                      </Link>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{protocol.shortDescription}</p>
                    <Badge variant="category" category={protocol.category}>
                      {protocol.category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <h2 className="text-2xl font-semibold">Achievements</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 border rounded-lg ${completedLessons.length >= 1 ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${completedLessons.length >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <BookOpen className={`w-6 h-6 ${completedLessons.length >= 1 ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">First Steps</h4>
                    <p className="text-sm text-gray-600">Complete your first protocol</p>
                  </div>
                  {completedLessons.length >= 1 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${completedLessons.length >= 5 ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${completedLessons.length >= 5 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Target className={`w-6 h-6 ${completedLessons.length >= 5 ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Getting Started</h4>
                    <p className="text-sm text-gray-600">Complete 5 protocols</p>
                  </div>
                  {completedLessons.length >= 5 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${completedLessons.length >= 10 ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${completedLessons.length >= 10 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Award className={`w-6 h-6 ${completedLessons.length >= 10 ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Protocol Expert</h4>
                    <p className="text-sm text-gray-600">Complete 10 protocols</p>
                  </div>
                  {completedLessons.length >= 10 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${completionPercentage >= 100 ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${completionPercentage >= 100 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Trophy className={`w-6 h-6 ${completionPercentage >= 100 ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Master</h4>
                    <p className="text-sm text-gray-600">Complete all protocols</p>
                  </div>
                  {completionPercentage >= 100 && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
