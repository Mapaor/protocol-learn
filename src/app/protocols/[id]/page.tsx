'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProtocolById } from '../../data/protocols';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { useFavorites, useProgress } from '../../hooks/useProtocol';
import {
  ArrowLeft,
  Star,
  CheckCircle,
  Copy,
  ExternalLink,
  Play,
  Book,
  Code,
  Terminal,
  Shield,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

interface ProtocolPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProtocolPage({ params }: ProtocolPageProps) {
  const { id } = use(params);
  const protocol = getProtocolById(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isCompleted, markAsCompleted, markAsIncomplete } = useProgress();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!protocol) {
    notFound();
  }

  const favorited = isFavorite(protocol.id);
  const completed = isCompleted(protocol.id);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleCompletion = () => {
    if (completed) {
      markAsIncomplete(protocol.id);
    } else {
      markAsCompleted(protocol.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to protocols</span>
            </Link>
          </div>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {protocol.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {protocol.shortDescription}
              </p>
              <div className="flex items-center space-x-3">
                <Badge variant="category" category={protocol.category}>
                  {protocol.category}
                </Badge>
                <Badge variant="difficulty" difficulty={protocol.difficulty}>
                  {protocol.difficulty}
                </Badge>
                {protocol.port && (
                  <Badge>Port {protocol.port}</Badge>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleFavorite(protocol.id)}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  favorited
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Star className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={toggleCompletion}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  completed
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className={`w-5 h-5 ${completed ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-semibold">Overview</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {protocol.fullDescription}
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold">Advantages</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {protocol.advantages.map((advantage: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-semibold">Disadvantages</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {protocol.disadvantages.map((disadvantage, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{disadvantage}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Use Cases */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <h2 className="text-2xl font-semibold">Common Use Cases</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {protocol.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">{useCase}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-semibold">Examples</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {protocol.examples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">{example.title}</h4>
                    </div>
                    <div className="relative">
                      <pre className="p-4 text-sm overflow-x-auto bg-gray-900 text-green-400">
                        <code>{example.code}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(example.code, `example-${index}`)}
                        className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 hover:text-white transition-colors"
                      >
                        {copiedCode === `example-${index}` ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="p-4 bg-blue-50 border-t border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Commands */}
          {protocol.commonCommands && protocol.commonCommands.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-gray-600" />
                  <h2 className="text-2xl font-semibold">Common Commands</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {protocol.commonCommands.map((cmd, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            {cmd.command}
                          </span>
                          <button
                            onClick={() => copyToClipboard(cmd.example, `cmd-${index}`)}
                            className="p-1 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {copiedCode === `cmd-${index}` ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{cmd.description}</p>
                      </div>
                      <div className="p-4 bg-gray-900">
                        <code className="text-green-400 text-sm">{cmd.example}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Considerations */}
          {protocol.securityConsiderations && protocol.securityConsiderations.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <h2 className="text-2xl font-semibold">Security Considerations</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {protocol.securityConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-red-800">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Diagrams */}
          {protocol.diagrams && protocol.diagrams.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Visual Diagrams</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  {protocol.diagrams.map((diagram, index) => (
                    <div key={index} className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={diagram.src}
                          alt={diagram.alt}
                          width={800}
                          height={400}
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="text-sm text-gray-600 italic">{diagram.caption}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-semibold">Additional Resources</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {protocol.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">
                          {resource.title}
                        </h4>
                        <Badge className="mt-2">{resource.type}</Badge>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Protocols */}
          {protocol.relatedProtocols.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Related Protocols</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {protocol.relatedProtocols.map((relatedId, index) => (
                    <Link
                      key={index}
                      href={`/protocols/${relatedId}`}
                      className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {relatedId.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
