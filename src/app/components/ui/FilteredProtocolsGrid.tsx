'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { useProgress } from '../../hooks/useProtocol';
import { CheckCircle, Play, ArrowRight } from 'lucide-react';
import { Protocol } from '../../types/protocol';

interface FilteredProtocolsGridProps {
  protocols: Protocol[];
  searchTerm?: string;
}

export default function FilteredProtocolsGrid({ protocols, searchTerm }: FilteredProtocolsGridProps) {
  const { isCompleted } = useProgress();

  if (protocols.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No protocols found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? `No protocols match "${searchTerm}". Try adjusting your search terms or filters.`
              : "Try adjusting your filters to see more results."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {searchTerm ? `Search Results` : 'All Protocols'}
        </h2>
        <span className="text-sm text-gray-600">
          {protocols.length} protocol{protocols.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Protocol Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {protocols.map((protocol, index) => (
          <motion.div
            key={protocol.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={`/protocols/${protocol.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 text-lg">
                      {protocol.name}
                    </h3>
                    {isCompleted(protocol.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                    ) : (
                      <Play className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {protocol.shortDescription}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="category" category={protocol.category}>
                        {protocol.category}
                      </Badge>
                      <Badge variant="difficulty" difficulty={protocol.difficulty}>
                        {protocol.difficulty}
                      </Badge>
                    </div>
                    
                    {protocol.port && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Default Port:</span>
                        <span className="font-mono text-gray-700">{protocol.port}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {isCompleted(protocol.id) ? 'Completed' : 'Not started'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
