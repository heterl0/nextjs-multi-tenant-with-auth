import { User, Tenant } from './types';

// Default tenants
export const tenants: Tenant[] = [
  {
    id: '1',
    name: 'Tenant 1',
    slug: 'tenant1',
  },
  {
    id: '2',
    name: 'Tenant 2',
    slug: 'tenant2',
  },
];

// Default users
export const users: User[] = [
  {
    id: '1',
    username: 'user1',
    email: 'user1@tenant1.com',
    password: 'password1',
    tenant_id: '1',
  },
  {
    id: '2',
    username: 'user2',
    email: 'user2@tenant2.com',
    password: 'password2',
    tenant_id: '2',
  },
];