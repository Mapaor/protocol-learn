'use client';

import { useState, useEffect } from 'react';
import { searchProtocols } from '../data/protocols';
import { Protocol } from '../types/protocol';
import { PROTOCOLS } from '../data/protocols/_index';

export const useProtocolSearch = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [results, setResults] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate search delay for better UX
    const timeoutId = setTimeout(() => {
      let filteredProtocols = searchProtocols(query);
      
      if (category !== 'All') {
        filteredProtocols = filteredProtocols.filter(
          protocol => protocol.category === category
        );
      }
      
      setResults(filteredProtocols);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query, category]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    isLoading
  };
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('protocol-favorites', []);

  const addFavorite = (protocolId: string) => {
    setFavorites(prev => [...prev, protocolId]);
  };

  const removeFavorite = (protocolId: string) => {
    setFavorites(prev => prev.filter(id => id !== protocolId));
  };

  const toggleFavorite = (protocolId: string) => {
    if (favorites.includes(protocolId)) {
      removeFavorite(protocolId);
    } else {
      addFavorite(protocolId);
    }
  };

  const isFavorite = (protocolId: string) => {
    return favorites.includes(protocolId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};

export const useProgress = () => {
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>('completed-lessons', []);

  const markAsCompleted = (protocolId: string) => {
    setCompletedLessons(prev => [...prev, protocolId]);
  };

  const markAsIncomplete = (protocolId: string) => {
    setCompletedLessons(prev => prev.filter(id => id !== protocolId));
  };

  const isCompleted = (protocolId: string) => {
    return completedLessons.includes(protocolId);
  };

  const getCompletionPercentage = () => {
    const totalProtocols = PROTOCOLS.length;
    return Math.round((completedLessons.length / totalProtocols) * 100);
  };

  return {
    completedLessons,
    markAsCompleted,
    markAsIncomplete,
    isCompleted,
    getCompletionPercentage
  };
};
