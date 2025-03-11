import { redirect } from "next/navigation";
import { getCurrentUser, getUserTenant, getTenantBySlug } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { domain } from "@/lib/env";

export default function TenantDashboard({
  params,
}: {
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
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl">{tenant.name} Dashboard</CardTitle>
          <CardDescription>Welcome to your tenant dashboard</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">User Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Username:</div>
                <div className="font-medium">{user.username}</div>
                <div>Email:</div>
                <div className="font-medium">{user.email}</div>
                <div>User ID:</div>
                <div className="font-medium">{user.id}</div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Tenant Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Tenant Name:</div>
                <div className="font-medium">{tenant.name}</div>
                <div>Tenant Slug:</div>
                <div className="font-medium">{tenant.slug}</div>
                <div>Tenant ID:</div>
                <div className="font-medium">{tenant.id}</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" asChild>
            <Link href="/profile">View Profile</Link>
          </Button>
          <form action="/api/logout" method="POST">
            <Button
              variant="destructive"
              type="submit"
              formAction="/api/logout"
            >
              Logout
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
