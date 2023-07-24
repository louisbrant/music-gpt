import { Source } from ".";
  
export interface Message {
  query: string;
  answer: string;
  sources: Source[];
  done?: boolean
}

export interface MessageAI {
  role: Role;
  content: string;
}
  
export type Role = 'assistant' | 'user' | 'system';