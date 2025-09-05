'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
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
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <p className="text-sm text-gray-500">Filter protocols by category</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const isAll = category === 'All';
            
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAll ? (
                  <Shield className="w-5 h-5" />
                ) : (
                  getCategoryIcon(category as Category)
                )}
                <span className="font-medium">{category}</span>
                {isSelected && !isAll && (
                  <Badge variant="category" category={category as Category} className="ml-auto text-xs">
                    Active
                  </Badge>
                )}
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
