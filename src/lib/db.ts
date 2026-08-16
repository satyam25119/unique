import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Database client with Turso (libsql) support.
 *
 * Modes:
 *  1. TURSO_DATABASE_URL + TURSO_AUTH_TOKEN set  → Turso cloud (production)
 *  2. Only DATABASE_URL set                       → Local SQLite (dev)
 *  3. Nothing set                                 → Falls back to local SQLite at db/custom.db
 */
function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN

  // ── Mode 1: Turso Cloud ──────────────────────────────
  if (tursoUrl) {
    console.log('🔗 Connecting to Turso:', tursoUrl.replace(/\/\/[^@]+@/, '//***@'))

    const libsql = createClient({
      url: tursoUrl,
      authToken: tursoToken,
    })

    const adapter = new PrismaLibSql(libsql)
    return new PrismaClient({ adapter, log: ['error'] })
  }

  // ── Mode 2 & 3: Local SQLite ─────────────────────────
  console.log('📦 Using local SQLite')
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
