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
