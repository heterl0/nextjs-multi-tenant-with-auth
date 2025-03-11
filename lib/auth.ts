import { cookies } from 'next/headers';
import { users, tenants } from './data';
import { User, Tenant } from './types';

export function login(email: string, password: string): User | null {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    const cookieStore = cookies();
    cookieStore.set('userId', user.id, { 
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return user;
  }
  
  return null;
}

export function logout() {
  const cookieStore = cookies();
  cookieStore.delete('userId');
}

export function getCurrentUser(): User | null {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  
  if (!userId) return null;
  
  return users.find((u) => u.id === userId) || null;
}

export function getTenantBySlug(slug: string): Tenant | null {
  return tenants.find((t) => t.slug === slug) || null;
}

export function getUserTenant(user: User): Tenant | null {
  return tenants.find((t) => t.id === user.tenant_id) || null;
}