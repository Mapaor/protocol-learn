'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { 
  HelpCircle, 
  Info, 
  Github, 
  ExternalLink,
  Code,
  BookOpen
} from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-xl text-gray-600">
                Information about this example project
              </p>
            </div>
          </div>
        </div>

        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">About This Project</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>This is an example React project</strong> demonstrating a protocol learning platform. 
                  It&apos;s built for educational and demonstration purposes only.
                </p>
                <p className="text-gray-600 mb-4">
                  This application showcases various React patterns and modern web development practices including:
                </p>
                <ul className="text-gray-600 space-y-2 mb-6">
                  <li>• Next.js 15 with App Router and Src directory</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Framer Motion for animations</li>
                  <li>• React hooks and custom hooks</li>
                  <li>• Component composition patterns</li>
                  <li>• Local storage for persistence</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> This is not a real learning platform. The protocols and content 
                    are for demonstration purposes. No actual courses or certifications are provided.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold">Technical Features</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Responsive design with mobile-first approach</li>
                  <li>• Smart search with filtering capabilities</li>
                  <li>• Progress tracking with local storage</li>
                  <li>• Interactive protocol cards</li>
                  <li>• Category-based navigation</li>
                  <li>• Animated transitions and micro-interactions</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold">Demo Content</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Sample protocol data (HTTP, HTTPS, SSH, etc.)</li>
                  <li>• Mock learning paths and progress</li>
                  <li>• Placeholder images and icons</li>
                  <li>• Simulated user interactions</li>
                  <li>• Example search and filter functionality</li>
                  <li>• Demo favorites and bookmarking</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Explore the Code</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This project is open source and available for learning and experimentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Mapaor/protocol-learn"
                  className="inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-4 h-4 pointer" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
