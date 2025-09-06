import { Category, Difficulty } from '../types/protocol';

export const CATEGORY_COLORS: Record<Category, string> = {
  Web: "bg-sky-100 text-sky-800 border-sky-200",
  Files: "bg-amber-100 text-amber-800 border-amber-200",
  Email: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Security: "bg-rose-100 text-rose-800 border-rose-200",
  Transport: "bg-violet-100 text-violet-800 border-violet-200",
  Network: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Diagnostic: "bg-stone-100 text-stone-800 border-stone-200",
  Infrastructure: "bg-teal-100 text-teal-800 border-teal-200",
  Management: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  "Real Time": "bg-lime-100 text-lime-800 border-lime-200",
  Microservices: "bg-cyan-100 text-cyan-800 border-cyan-200",
  APIs: "bg-gray-100 text-gray-800 border-gray-200",
  Data: "bg-purple-100 text-purple-800 border-purple-200",
  Authentication: "bg-orange-100 text-orange-800 border-orange-200",
  Messaging: "bg-pink-100 text-pink-800 border-pink-200",
  Discovery: "bg-blue-100 text-blue-800 border-blue-200",
  Multimedia: "bg-red-100 text-red-800 border-red-200",
  Application: "bg-green-100 text-green-800 border-green-200",
  AI: "bg-yellow-100 text-yellow-800 border-yellow-200"
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Advanced: "bg-red-100 text-red-800 border-red-200",
};

export const CATEGORIES: Category[] = [
  "Web",
  "Files", 
  "Email",
  "Security",
  "Transport",
  "Network",
  "Diagnostic",
  "Infrastructure",
  "Management",
  "Real Time",
  "Microservices",
  "APIs",
  "Data",
  "Authentication",
  "Messaging",
  "Discovery",
  "Multimedia",
  "Application",
  "AI"
];

export const formatPort = (port: string | undefined): string => {
  if (!port) return 'N/A';
  return port.includes('/') ? port : `Port ${port}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
