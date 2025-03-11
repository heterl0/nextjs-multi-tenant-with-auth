# Next.js Multi-Tenant Setup with Authentication

This project demonstrates a multi-tenant Next.js setup where each tenant has its own subdomain. A shared login subdomain sets a user cookie for authentication.

## How It Works

- **Domain & Subdomain Redirects**  
  The `middleware.ts` checks the hostname to identify the tenant subdomain. If the user is not authenticated (no `userId` cookie), they are redirected to the login subdomain.

- **Cookie-Based Auth**  
  The login subdomain sets a `userId` cookie, making subsequent requests from the tenant subdomain authenticated.

- **Route Rewriting**  
  After establishing the tenant, the path is rewritten in the middleware to serve tenant-specific pages under `/<tenant_slug>` routes internally.

## Getting Started

1. **Setting Up Domain**  
   - Point the main domain and all subdomains to the same Next.js app.

2. **Middleware Configuration**  
   - The `middleware.ts` negotiates redirects for login or subdomain routes.  
   - Update the `domain` in `@/lib/env` with your actual domain.

3. **Login Flow**  
   - Accessing `login.yourdomain.com` provides a login form that, upon success, sets the `userId` cookie and redirects to `<tenant>.yourdomain.com`.

4. **Local Development**  
   - Use host aliases (e.g., `127.0.0.1 login.localhost`, etc.) or a local DNS manager tool to replicate subdomains.

## Detailed Explanation
1. **Domain & DNS**  
   Ensure the main domain and all subdomains (e.g., login.yourdomain.com, tenant1.yourdomain.com) point to the same Next.js server.
2. **Environment Configuration**  
   In `@/lib/env`, define `domain` to match your root domain. This ensures the middleware logic correctly identifies the subdomain.
3. **Middleware Logic**  
   - The `middleware.ts` checks `host` to derive the tenantSlug.  
   - If user has no `userId` cookie, redirect to login subdomain.  
   - If accessing the login subdomain, allow login flow to set the `userId` cookie and redirect to the correct tenant.
4. **Local Development**  
   Use host aliases or a local DNS tool for subdomains so you can test tenant logic locally (e.g., `login.localhost`, `tenant1.localhost`, etc.).

For deeper details, review:
- `middleware.ts` for path rewriting and cookie checks
- `package.json` for scripts and dependencies
- `next.config.js` for build and image settings

