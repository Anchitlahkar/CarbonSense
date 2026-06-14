import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  return res.status(200).json({
    message: 'Basic Vercel API works',
    env: {
      has_supabase_url: !!process.env.SUPABASE_URL,
      has_gemini_key: !!process.env.GEMINI_API_KEY
    }
  });
}
