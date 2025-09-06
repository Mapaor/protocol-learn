'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SearchBar } from './components/ui/SearchBar';
import { CategoryFilter } from './components/filters/CategoryFilter';
import { useProtocolSearch, useProgress } from './hooks/useProtocol';
import { 
  BookOpen, 
  TrendingUp, 
  Star, 
  Users,
  ArrowRight,
  Play,
  Award,
  Clock
} from 'lucide-react';

const StatsCard = ({ icon: Icon, title, value, description }: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) => (
  <motion.div
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const { results, query, setQuery, category, setCategory } = useProtocolSearch();
  const { getCompletionPercentage } = useProgress();
  
  const featuredProtocols = results.slice(0, 6);
  const completionPercentage = getCompletionPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative px-6 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Master{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Network Protocols
              </span>
              <br />
              & APIs
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Interactive learning platform with hands-on examples, visual diagrams, 
              and practical exercises. From HTTP basics to advanced API architectures.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/learn"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Start Learning</span>
              </Link>
              <Link
                href="/protocols"
                className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Browse Protocols</span>
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center space-x-2 border border-blue-300 text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Advanced Search</span>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatsCard
              icon={BookOpen}
              title="Protocols"
              value="25+"
              description="Comprehensive coverage"
            />
            <StatsCard
              icon={Users}
              title="Learners"
              value="10K+"
              description="Active community"
            />
            <StatsCard
              icon={Award}
              title="Your Progress"
              value={`${completionPercentage}%`}
              description="Completion rate"
            />
            <StatsCard
              icon={Clock}
              title="Avg. Time"
              value="15 min"
              description="Per protocol"
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Search
            </h2>
            <p className="text-gray-600">
              Find the protocol or API you need to learn about
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search for HTTP, SSH, REST API, WebSocket..."
              className="w-full"
            />
          </div>

          {/* Category Filter - Horizontal Layout for Better Space Usage */}
          <div className="mb-8">
            <CategoryFilter
              selectedCategory={category}
              onCategoryChange={setCategory}
            />
          </div>

          {/* Protocol Cards - Full Width for Better Readability */}
          <div className="mb-8">
            {featuredProtocols.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No protocols found</h3>
                <p className="text-gray-600">Try adjusting your search or category filter</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category === 'All' ? 'Featured Protocols' : `${category} Protocols`}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {featuredProtocols.length} protocol{featuredProtocols.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {featuredProtocols.map((protocol, index) => (
                    <motion.div
                      key={protocol.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={`/protocols/${protocol.id}`}>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group h-full flex flex-col">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3 sm:mb-4">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-700 mb-1 sm:mb-2 leading-tight truncate">
                                {protocol.name}
                              </h4>
                              {protocol.versions && protocol.versions.length > 0 && (
                                <div className="text-xs text-gray-500 mb-2">
                                  Latest: {protocol.versions[protocol.versions.length - 1]}
                                </div>
                              )}
                            </div>
                            <div className="ml-3 sm:ml-4 flex-shrink-0">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <div className="flex-1 mb-3 sm:mb-4">
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                              {protocol.shortDescription}
                            </p>
                          </div>
                          
                          {/* Footer */}
                          <div className="space-y-3 mt-auto">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap gap-1">
                                <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  protocol.category === 'Web' ? 'bg-blue-100 text-blue-800' :
                                  protocol.category === 'Security' ? 'bg-red-100 text-red-800' :
                                  protocol.category === 'Network' ? 'bg-green-100 text-green-800' :
                                  protocol.category === 'Transport' ? 'bg-indigo-100 text-indigo-800' :
                                  protocol.category === 'APIs' ? 'bg-purple-100 text-purple-800' :
                                  protocol.category === 'Email' ? 'bg-pink-100 text-pink-800' :
                                  protocol.category === 'Files' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {protocol.category}
                                </span>
                                <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  protocol.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                  protocol.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {protocol.difficulty}
                                </span>
                              </div>
                            </div>
                            
                            {protocol.port && (
                              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-50">
                                <span>Default Port</span>
                                <span className="font-mono font-medium">{protocol.port}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/protocols"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>View all protocols</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Protocol Learn?
            </h2>
            <p className="text-gray-600">
              Everything you need to master network protocols and APIs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Learning
              </h3>
              <p className="text-gray-600">
                Learn through practical examples, code snippets, and real-world scenarios
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed progress tracking and achievements
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Content
              </h3>
              <p className="text-gray-600">
                Curated by industry experts with years of networking and API development experience
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
