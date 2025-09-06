'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import SmartSearch from '../components/ui/SmartSearch';
import FilteredProtocolsGrid from '../components/ui/FilteredProtocolsGrid';
import { PROTOCOLS } from '../data/protocols/_index';
import { Protocol } from '../types/protocol';
import { useProgress } from '../hooks/useProtocol';
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Star,
  BookOpen,
  Target,
  Filter,
  Grid,
  List
} from 'lucide-react';

export default function SearchPage() {
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>(PROTOCOLS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { getCompletionPercentage, completedLessons, isCompleted } = useProgress();

  const handleFilteredResults = (results: Protocol[]) => {
    setFilteredProtocols(results);
  };

  // Get statistics for the search overview
  const totalProtocols = PROTOCOLS.length;
  const completionPercentage = getCompletionPercentage();
  
  // Get recently completed protocols (last 5)
  const recentlyCompleted = completedLessons
    .slice(-5)
    .reverse()
    .map(id => PROTOCOLS.find(p => p.id === id))
    .filter(Boolean) as Protocol[];

  // Get beginner protocols for recommendations
  const beginnerProtocols = PROTOCOLS
    .filter(p => p.difficulty === 'Beginner' && !isCompleted(p.id))
    .slice(0, 5);

  // Get category statistics
  const categoryStats = PROTOCOLS.reduce((acc, protocol) => {
    acc[protocol.category] = (acc[protocol.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Search Protocols</h1>
              <p className="text-xl text-gray-600">
                Discover and explore protocols, APIs, and technologies
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalProtocols}</div>
              <div className="text-gray-600">Total Protocols</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{completionPercentage}%</div>
              <div className="text-gray-600">Your Progress</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Filter className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Object.keys(categoryStats).length}</div>
              <div className="text-gray-600">Categories</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{filteredProtocols.length}</div>
              <div className="text-gray-600">Search Results</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Categories */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Top Categories
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCategories.map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <Badge variant="category" category={category as Protocol['category']}>
                      {category}
                    </Badge>
                    <span className="text-sm text-gray-500">{count} protocols</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Completed */}
          {recentlyCompleted.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Recently Completed
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentlyCompleted.map((protocol) => (
                    <div key={protocol.id} className="text-sm">
                      <div className="font-medium text-gray-900">{protocol.name}</div>
                      <div className="text-gray-500">{protocol.category}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommended for You */}
          {beginnerProtocols.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Recommended for You
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {beginnerProtocols.map((protocol) => (
                    <div key={protocol.id} className="text-sm">
                      <div className="font-medium text-gray-900">{protocol.name}</div>
                      <div className="text-gray-500">{protocol.category}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Search Tips */}
          {recentlyCompleted.length === 0 && beginnerProtocols.length === 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Search className="w-5 h-5 text-gray-600" />
                  Search Tips
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Search by protocol name (e.g., &quot;HTTP&quot;)</div>
                  <div>• Filter by category (e.g., &quot;Web&quot;)</div>
                  <div>• Find by difficulty level</div>
                  <div>• Search by port number</div>
                  <div>• Use multiple filters together</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search Interface */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search & Filter</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SmartSearch onFilteredResults={handleFilteredResults} />
          </CardContent>
        </Card>

        {/* Search Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FilteredProtocolsGrid protocols={filteredProtocols} />
        </motion.div>
      </div>
    </div>
  );
}
