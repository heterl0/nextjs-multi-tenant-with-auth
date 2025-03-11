# Multi-Tenant Applications with Next.js: Subdomain with Auth


## Introduction

Multi-tenancy is a software architecture where a single instance of an application serves multiple tenants (customers or users). This README outlines how to create a multi-tenant application using Next.js with subdomain-based tenant separation.

![multi-tenant-demo](https://github.com/user-attachments/assets/ab952ab7-e37d-400c-8fb5-1d80f3fc2d3e)

## Key Features of Multi-Tenancy

- **Shared Infrastructure** 📈
- **Tenant Isolation** 🔒
- **Cost Efficiency** 💸
- **Scalability** 🚀


## Project Structure

```plaintext
.
├── app/
│   ├── [subdomain]/     # Tenant-specific subdirectory
│   │   ├── page.tsx     # Main page for the tenant
│   │   └── layout.tsx   # Layout for tenant pages
│   └── middleware.ts    # Middleware for request handling
├── public/
│   └── images/tenant1/  # Tenant-specific static assets
├── package.json         # Project configuration
└── .env                 # Environment variables
```


## Middleware Implementation

The `middleware.ts` file handles routing, authentication, and request rewriting based on subdomains:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { domain } from "@/lib/env";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  const tenantSlug = hostname.split(".")[0];

  if (hostname === domain || hostname === domain.split(":")[0]) {
    return NextResponse.redirect(new URL(`http://login.${domain}`));
  }

  if (tenantSlug === "login") {
    if (url.pathname !== "/" && url.pathname !== "/api/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  
  // In this example for easy auth I use userId as cookie auth Token
  const userId = request.cookies.get("userId")?.value;
  if (!userId && tenantSlug !== "login") {
    return NextResponse.redirect(new URL(`http://login.${domain}/`, request.url));
  }

  url.pathname = `/${tenantSlug}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```


## How It Works

1. **Subdomain Detection** 📍: Extract subdomain from the `host` header.
2. **Authentication** 🔑: Redirect unauthenticated users to the login subdomain.
3. **Route Rewriting** 🔄: Rewrite requests to serve tenant-specific pages.
4. **Cookie Management** 🍪: Set `userId` cookie upon successful authentication.

## Implementation Steps

1. **Domain Configuration** 📊: Point main domain and subdomains to the same server.
2. **Environment Variables** 📝: Define root domain in `.env` file.
3. **Local Development** 💻: Use host aliases or local DNS tools for testing.
4. **Authentication Flow** 🔒: Create login page at `login.yourdomain.com`.
5. **Tenant-Specific Pages** 📁: Build pages in the `[subdomain]` directory.

## Advantages

- **Scalability** 🚀
- **Isolation** 🔒
- **Flexibility** 🎨


## Demo

Check out the [live demo](https://login.heterl0.live/) to see the multi-tenant application in action.

Multi-tenant Demo 📹

## Disclaimer

This approach is based on personal experience and may not be the most optimal solution for all use cases. It's inspired by various sources, including [Vercel's guide on building multi-tenant apps](https://vercel.com/guides/nextjs-multi-tenant-application). For production use, consider exploring more robust authentication methods and official documentation.

## Further Reading

For more projects and contributions, visit [https://github.com/heterl0/](https://github.com/heterl0/).

## References

1. [How to Build a Multi-Tenant App with Custom Domains Using Next.js](https://vercel.com/guides/nextjs-multi-tenant-application) 📚
