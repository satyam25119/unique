import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [totalInquiries, totalSubscribers, inquiriesByService, latestInquiry, latestSubscriber] =
      await Promise.all([
        db.contactInquiry.count(),
        db.newsletterSubscriber.count(),
        db.contactInquiry.groupBy({
          by: ['service'],
          _count: { service: true },
          orderBy: { _count: { service: 'desc' } },
        }),
        db.contactInquiry.findFirst({
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true },
        }),
        db.newsletterSubscriber.findFirst({
          orderBy: { subscribedAt: 'desc' },
          select: { subscribedAt: true },
        }),
      ])

    const inquiriesByServiceMap = inquiriesByService.reduce(
      (acc, item) => {
        acc[item.service] = item._count.service
        return acc
      },
      {} as Record<string, number>
    )

    return NextResponse.json({
      success: true,
      stats: {
        totalInquiries,
        totalSubscribers,
        inquiriesByService: inquiriesByServiceMap,
        mostRecentInquiryDate: latestInquiry?.createdAt ?? null,
        mostRecentSubscriberDate: latestSubscriber?.subscribedAt ?? null,
      },
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
