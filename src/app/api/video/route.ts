import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    // Look for intro.mp4 in public directory or root
    let filePath = path.join(process.cwd(), 'public', 'intro.mp4');
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'intro.mp4');
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Video file intro.mp4 not found on server.' }, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.get('range');

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      const headers = new Headers({
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize.toString(),
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=3600',
      });

      // @ts-ignore
      return new NextResponse(fileStream, {
        status: 206,
        headers,
      });
    } else {
      const fileStream = fs.createReadStream(filePath);
      const headers = new Headers({
        'Content-Length': fileSize.toString(),
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600',
      });

      // @ts-ignore
      return new NextResponse(fileStream, {
        status: 200,
        headers,
      });
    }
  } catch (error: any) {
    console.error('Video Streaming API Error:', error);
    return NextResponse.json({ error: 'Video streaming failed' }, { status: 500 });
  }
}
