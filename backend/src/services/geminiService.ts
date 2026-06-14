/**
 * @module TerraAiLayer
 * 
 * TERRA (Tactical Ecological Response & Reduction Advisor) is the AI orchestration 
 * layer of CarbonSense. It leverages Google Gemini 1.5 Flash to process unstructured 
 * activity data (receipts) and provide cognitive behavioral coaching.
 * 
 * **Core Responsibilities:**
 * - Receipt Intelligence: Extracting carbon markers from scanned documents.
 * - Cognitive Coaching: Generating evidence-based reduction advice (Coach TERRA).
 * - Multi-Engine Orchestration: Synthesizing data from DNA, Planet Twin, and Optimization engines.
 */

import { GeminiModelProvider, providerRegistry } from '@carbonsense/ai-orchestration';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiKey = process.env.GEMINI_API_KEY || 'mock-api-key-for-development';
export const geminiProvider = new GeminiModelProvider(apiKey);

// Register Gemini as default model provider in our Provider Registry
providerRegistry.register(geminiProvider, true);

export const isApiKeyConfigured = (): boolean => {
  const key = process.env.GEMINI_API_KEY;
  return !!(key && key.trim() !== '' && key !== 'mock-api-key-for-development' && key !== '[GCP_API_KEY]');
};

export default geminiProvider;
