import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    const [data, total] = await Promise.all([
      db.newsletterSubscriber.findMany({
        orderBy: { subscribedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.newsletterSubscriber.count(),
    ])

    return NextResponse.json({ success: true, data, total })
  } catch (error) {
    console.error('Failed to fetch subscribers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
