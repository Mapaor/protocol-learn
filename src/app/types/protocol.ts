export type Category =
  | "Web"
  | "Files"
  | "Email"
  | "Security"
  | "Transport"
  | "Network"
  | "Diagnostic"
  | "Infrastructure"
  | "Management"
  | "Real Time"
  | "Microservices"
  | "APIs"
  | "Data";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Protocol = {
  id: string;
  name: string;
  category: Category;
  difficulty: Difficulty;
  shortDescription: string;
  fullDescription: string;
  port?: string;
  versions?: string[];
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  examples: {
    title: string;
    code: string;
    explanation: string;
  }[];
  diagrams?: {
    src: string;
    alt: string;
    caption: string;
  }[];
  relatedProtocols: string[];
  commonCommands?: {
    command: string;
    description: string;
    example: string;
  }[];
  resources: {
    title: string;
    url: string;
    type: "RFC" | "Documentation" | "Tutorial" | "Tool" | "Library" | "Platform" | "Specification";
  }[];
  securityConsiderations?: string[];
  modernAlternatives?: string[];
};

export type QuizQuestion = {
  id: string;
  protocolId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};
