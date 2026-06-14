import fs from 'fs';
import path from 'path';

export default async function handler(req: any, res: any) {
  const dir = process.cwd();
  try {
    const files = fs.readdirSync(dir);
    const backendExists = fs.existsSync(path.join(dir, 'backend'));
    let backendFiles = [];
    if (backendExists) {
      backendFiles = fs.readdirSync(path.join(dir, 'backend'));
    }
    
    return res.status(200).json({
      cwd: dir,
      rootFiles: files,
      backendExists,
      backendFiles
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
