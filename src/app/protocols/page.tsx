'use client';

import React from 'react';
import { SearchBar } from '../components/ui/SearchBar';
import { ProtocolGrid } from '../components/protocol/ProtocolCard';
import { CategoryFilter } from '../components/filters/CategoryFilter';
import { useProtocolSearch } from '../hooks/useProtocol';

export default function ProtocolsPage() {
  const { results, query, setQuery, category, setCategory, isLoading } = useProtocolSearch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Protocols & APIs
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive guide to network protocols and API technologies
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search protocols, APIs, or technologies..."
            className="max-w-2xl"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilter
              selectedCategory={category}
              onCategoryChange={setCategory}
            />
          </div>
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading protocols...</p>
              </div>
            ) : (
              <ProtocolGrid protocols={results} showDetails />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
