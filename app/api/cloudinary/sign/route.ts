import { NextResponse } from 'next/server'
import crypto from 'crypto'

type Params = Record<string, string | number | boolean | undefined | null>

function buildSignature(params: Params, apiSecret: string) {
  const filtered: [string, string][] = Object.entries(params)
    .filter(([k, v]) => v !== undefined && v !== null && v !== '' && k !== 'file' && k !== 'signature')
    .map(([k, v]) => [k, String(v)])
  filtered.sort(([a], [b]) => a.localeCompare(b))
  const toSign = filtered.map(([k, v]) => `${k}=${v}`).join('&')
  const shasum = crypto.createHash('sha1')
  shasum.update(toSign + apiSecret)
  return shasum.digest('hex')
}

export async function POST(req: Request) {
  try {
    const { folder, public_id, eager, invalidate, overwrite, tags } = await req.json()
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary env vars not set' }, { status: 500 })
    }
    const timestamp = Math.floor(Date.now() / 1000)
    const params: Params = {
      timestamp,
      folder,
      public_id,
      eager,
      invalidate,
      overwrite,
      tags,
    }
    const signature = buildSignature(params, apiSecret)
    return NextResponse.json({ signature, timestamp, api_key: apiKey })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to sign' }, { status: 400 })
  }
}
