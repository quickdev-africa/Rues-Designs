import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getZoneByZip } from '@/lib/zoneLookup';

const ZipSchema = z.object({
  zip: z.string().min(3).max(10)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { zip } = ZipSchema.parse(body);
    const zoneInfo = await getZoneByZip(zip);
    if (!zoneInfo) {
      return NextResponse.json({ error: 'Zone not found' }, { status: 404 });
    }
    return NextResponse.json(zoneInfo);
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Invalid request' }, { status: 400 });
  }
}
