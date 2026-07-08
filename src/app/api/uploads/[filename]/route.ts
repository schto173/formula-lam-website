import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { UPLOAD_DIR } from '@/lib/uploads';

export const dynamic = 'force-dynamic';

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Guard against path traversal — only allow a bare filename.
  const safe = path.basename(filename);
  if (safe !== filename) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.join(UPLOAD_DIR, safe);

  try {
    const file = await readFile(filePath);
    const ext = path.extname(safe).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
