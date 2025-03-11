import { Metadata } from "next";
import { getCurrentUser, getUserTenant, getTenantBySlug } from "@/lib/auth";
import { redirect } from "next/navigation";
import { domain } from "@/lib/env";

export async function generateMetadata({
  params,
}: {
  params: { tenant: string };
}): Promise<Metadata> {
  const tenant = getTenantBySlug(params.tenant);

  return {
    title: tenant ? `${tenant.name} - Dashboard` : "Tenant Dashboard",
    description: `Dashboard for ${tenant?.name || "your tenant"}`,
  };
}

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const user = getCurrentUser();

  if (!user) {
    redirect(`http://login.${domain}`);
  }

  const tenant = getTenantBySlug(params.tenant);
  const userTenant = getUserTenant(user);

  // Check if user belongs to this tenant
  if (!tenant || tenant.id !== userTenant?.id) {
    redirect(`http://${userTenant?.slug}.${domain}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">{tenant.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Logged in as <span className="font-medium">{user.username}</span>
            </span>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">{children}</main>
    </div>
  );
}
