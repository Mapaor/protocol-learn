'use client';

import React, { useState } from 'react';
import { PROTOCOLS } from '../../data/protocols/_index';
import { Protocol } from '../../types/protocol';
import SmartSearch from '../../components/ui/SmartSearch';
import FilteredProtocolsGrid from '../../components/ui/FilteredProtocolsGrid';

export default function ProtocolsWithSearch() {
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>(PROTOCOLS);

  const handleFilteredResults = (results: Protocol[]) => {
    setFilteredProtocols(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Protocols
          </h1>
          <p className="text-xl text-gray-600">
            Explore and learn about network protocols, APIs, and communication standards
          </p>
        </div>

        {/* Search and Filter */}
        <SmartSearch onFilteredResults={handleFilteredResults} />

        {/* Protocol Grid */}
        <FilteredProtocolsGrid 
          protocols={filteredProtocols}
        />
      </div>
    </div>
  );
}
