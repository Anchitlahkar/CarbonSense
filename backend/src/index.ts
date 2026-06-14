import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Sanitization
const rawOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
// Remove ALL non-ASCII or non-printable characters, then remove quotes and commas
const sanitizedOrigin = rawOrigin
  .replace(/[^\x20-\x7E]/g, '') // Keep only printable ASCII
  .replace(/['",\n\r]/g, '')    // Remove quotes, commas, newlines
  .trim();

console.log(`[CORS_CONFIG] Resolved Origin: ${sanitizedOrigin}`);

// Simple validation to ensure it looks like a URL
if (!sanitizedOrigin.startsWith('http://') && !sanitizedOrigin.startsWith('https://')) {
  console.error(`[CORS_ERROR] Malformed origin: ${sanitizedOrigin}`);
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Invalid CORS origin in production: ${sanitizedOrigin}`);
  }
}

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: sanitizedOrigin,
  credentials: true,
}));

// Express parser
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter);

// Core health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'CarbonSense X API Engine',
  });
});

// Import route modules
import scannerRouter from './routes/scanner.js';
import coachRouter from './routes/coach.js';

// Mount routes
app.use('/api/scanner', scannerRouter);
app.use('/api/coach', coachRouter);

// Export Express app instance for serverless environments
export { app };
export default app;

// Only spin up the listen port if run directly and not in Vercel or testing
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Server] CarbonSense X server running on http://localhost:${PORT}`);
  });
}
