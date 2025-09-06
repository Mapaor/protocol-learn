'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useProgress } from '../hooks/useProtocol';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  Target,
  TrendingUp,
  Clock,
  Info,
  Edit,
  Camera
} from 'lucide-react';

export default function ProfilePage() {
  const { getCompletionPercentage, completedLessons } = useProgress();
  const completionPercentage = getCompletionPercentage();

  // Demo user data
  const userData = {
    name: 'Demo User',
    email: 'demo@example.com',
    joinDate: 'January 2024',
    avatar: null,
    bio: 'Learning network protocols and APIs through interactive examples.',
    stats: {
      protocolsCompleted: completedLessons.length,
      totalProtocols: 25,
      streakDays: 7,
      hoursLearned: 15
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
              <p className="text-xl text-gray-600">
                Your demo learning profile
              </p>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-900">Demo Profile</h3>
                <p className="text-sm text-amber-700 mt-1">
                  This is a demonstration profile. In a real application, this would show actual user data and progress.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{userData.name}</h2>
                  <p className="text-gray-600 mb-4">{userData.bio}</p>
                  <button className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Contact Info</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">{userData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Joined {userData.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats and Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Learning Stats</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{userData.stats.protocolsCompleted}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{completionPercentage}%</div>
                      <div className="text-sm text-gray-600">Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{userData.stats.streakDays}</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{userData.stats.hoursLearned}</div>
                      <div className="text-sm text-gray-600">Hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Learning Progress</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Overall Progress</span>
                        <span>{completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Category Progress Examples */}
                    {[
                      { name: 'Web Protocols', progress: 75, color: 'bg-blue-500' },
                      { name: 'Security', progress: 50, color: 'bg-red-500' },
                      { name: 'Network', progress: 60, color: 'bg-green-500' },
                      { name: 'APIs', progress: 40, color: 'bg-purple-500' }
                    ].map((category) => (
                      <div key={category.name}>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>{category.name}</span>
                          <span>{category.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${category.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${category.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Achievements</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'First Steps', description: 'Completed your first protocol', earned: true },
                      { title: 'Web Expert', description: 'Master all web protocols', earned: false },
                      { title: 'Security Focused', description: 'Complete 5 security protocols', earned: true },
                      { title: 'API Master', description: 'Learn all API protocols', earned: false }
                    ].map((achievement, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          achievement.earned 
                            ? 'bg-yellow-50 border-yellow-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Award className={`w-6 h-6 ${
                            achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                          }`} />
                          <div>
                            <h4 className={`font-medium ${
                              achievement.earned ? 'text-yellow-900' : 'text-gray-500'
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className={`text-sm ${
                              achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
