export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  tenant_id: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
}