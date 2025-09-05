'use client';

import React from 'react';
import { ProtocolGrid } from '../components/protocol/ProtocolCard';
import { useFavorites } from '../hooks/useProtocol';
import { PROTOCOLS } from '../data/protocols';
import { Heart, BookOpen } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteProtocols = PROTOCOLS.filter(protocol => favorites.includes(protocol.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Favorite Protocols
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Your saved protocols for quick access
          </p>
        </div>

        {favoriteProtocols.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-8">
              Start exploring protocols and add them to your favorites for quick access.
            </p>
            <a
              href="/protocols"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Protocols</span>
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {favoriteProtocols.length} protocol{favoriteProtocols.length !== 1 ? 's' : ''} in your favorites
              </p>
            </div>
            <ProtocolGrid protocols={favoriteProtocols} showDetails />
          </>
        )}
      </div>
    </div>
  );
}
