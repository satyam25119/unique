import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const service = searchParams.get('service') || undefined

    const where = service ? { service } : {}

    const [data, total] = await Promise.all([
      db.contactInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.contactInquiry.count({ where }),
    ])

    return NextResponse.json({ success: true, data, total })
  } catch (error) {
    console.error('Failed to fetch inquiries:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}
