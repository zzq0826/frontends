import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-url", request.url)

  if (request.nextUrl.pathname === "/" && process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    const response = NextResponse.rewrite(new URL("/portal", request.url))
    response.headers.set("x-url", request.url)
    return response
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}
