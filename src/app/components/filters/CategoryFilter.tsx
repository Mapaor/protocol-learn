'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { CATEGORIES } from '../../utils/constants';
import { Category } from '../../types/protocol';
import { 
  Globe,
  FileText,
  Mail,
  Lock,
  Server,
  Wifi,
  Database,
  Shield,
  Monitor,
  Settings,
  Clock,
  Layers
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'Web':
      return <Globe className="w-5 h-5" />;
    case 'Files':
      return <FileText className="w-5 h-5" />;
    case 'Email':
      return <Mail className="w-5 h-5" />;
    case 'Security':
      return <Lock className="w-5 h-5" />;
    case 'Network':
      return <Server className="w-5 h-5" />;
    case 'Transport':
      return <Wifi className="w-5 h-5" />;
    case 'APIs':
      return <Database className="w-5 h-5" />;
    case 'Diagnostic':
      return <Monitor className="w-5 h-5" />;
    case 'Infrastructure':
      return <Shield className="w-5 h-5" />;
    case 'Management':
      return <Settings className="w-5 h-5" />;
    case 'Real Time':
      return <Clock className="w-5 h-5" />;
    case 'Microservices':
      return <Layers className="w-5 h-5" />;
    default:
      return <Server className="w-5 h-5" />;
  }
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const allCategories = ['All', ...CATEGORIES];

  return (
    <Card>
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <p className="text-sm text-gray-500">Filter protocols by category</p>
      </CardHeader>
      <CardContent>
        {/* Mobile: Show first few categories and a dropdown for more */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {allCategories.slice(0, 4).map((category) => {
              const isSelected = selectedCategory === category;
              const isAll = category === 'All';
              
              return (
                <motion.button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAll ? (
                    <Shield className="w-3 h-3" />
                  ) : (
                    <div className="w-3 h-3">
                      {getCategoryIcon(category as Category)}
                    </div>
                  )}
                  <span className="truncate">{category}</span>
                </motion.button>
              );
            })}
          </div>
          
          {/* Dropdown for remaining categories on mobile */}
          {allCategories.length > 4 && (
            <select 
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {allCategories.slice(4).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Desktop: Show all categories in a flex wrap */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const isAll = category === 'All';
            
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAll ? (
                  <Shield className="w-4 h-4" />
                ) : (
                  getCategoryIcon(category as Category)
                )}
                <span>{category}</span>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
