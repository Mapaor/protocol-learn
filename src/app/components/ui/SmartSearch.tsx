'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { PROTOCOLS } from '../../data/protocols/_index';
import { Protocol } from '../../types/protocol';

interface SmartSearchProps {
  onFilteredResults?: (protocols: Protocol[]) => void;
  initialProtocols?: Protocol[]; // Allow filtering within a specific set
}

export default function SmartSearch({ onFilteredResults, initialProtocols }: SmartSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Use either the provided protocols or all protocols
  const sourceProtocols = initialProtocols || PROTOCOLS;
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sourceProtocols.forEach(protocol => {
      tags.add(protocol.category);
      tags.add(protocol.difficulty);
      if (protocol.port) tags.add(`Port ${protocol.port}`);
    });
    return Array.from(tags).sort();
  }, [sourceProtocols]);

  const filteredProtocols = useMemo(() => {
    return sourceProtocols.filter(protocol => {
      const matchesSearch = searchTerm === '' || 
        protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.fullDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => 
                           protocol.category === tag || 
                           protocol.difficulty === tag ||
                           (protocol.port && `Port ${protocol.port}` === tag)
                         );
      
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags, sourceProtocols]);

  // Use useEffect to call the callback after rendering
  useEffect(() => {
    onFilteredResults?.(filteredProtocols);
  }, [filteredProtocols, onFilteredResults]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const getTagStyle = (tag: string) => {
    if (tag.includes('Beginner')) return 'bg-green-100 text-green-800 hover:bg-green-200';
    if (tag.includes('Intermediate')) return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    if (tag.includes('Advanced')) return 'bg-red-100 text-red-800 hover:bg-red-200';
    if (tag.includes('Port')) return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search protocols, descriptions, or features..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {selectedTags.length > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {selectedTags.length}
            </span>
          )}
        </button>

        <div className="flex items-center space-x-4">
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear all filters
            </button>
          )}
          <p className="text-sm text-gray-600">
            {filteredProtocols.length} protocol{filteredProtocols.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Tag Filters */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : ''
                } ${getTagStyle(tag)}`}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="inline w-3 h-3 ml-1" />
                )}
              </button>
            ))}
          </div>
          
          {selectedTags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-1">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="hover:bg-blue-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
