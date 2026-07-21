

import { updateSession } from '@/src/app/lib/proxy'


export async function proxy(request) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/trashhub/:path*',
    '/creditorshub/:path*',
  ],
}