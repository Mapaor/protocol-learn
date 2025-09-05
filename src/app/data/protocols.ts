import { Protocol } from '../types/protocol';
import { PROTOCOLS } from './protocols/_index'


export const getProtocolById = (id: string): Protocol | undefined => {
  return PROTOCOLS.find(protocol => protocol.id === id);
};

export const getProtocolsByCategory = (category: string): Protocol[] => {
  if (category === "All") return PROTOCOLS;
  return PROTOCOLS.filter(protocol => protocol.category === category);
};

export const searchProtocols = (query: string): Protocol[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return PROTOCOLS;
  
  return PROTOCOLS.filter(protocol => 
    protocol.name.toLowerCase().includes(searchTerm) ||
    protocol.shortDescription.toLowerCase().includes(searchTerm) ||
    protocol.category.toLowerCase().includes(searchTerm) ||
    protocol.useCases.some(useCase => useCase.toLowerCase().includes(searchTerm))
  );
};