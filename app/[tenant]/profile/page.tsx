import { redirect } from "next/navigation";
import { getCurrentUser, getUserTenant } from "@/lib/auth";
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

export default function ProfilePage() {
  const user = getCurrentUser();

  if (!user) {
    redirect(`http://login.${domain}`);
  }

  const tenant = getUserTenant(user);

  if (!tenant) {
    redirect(`http://login.${domain}`);
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            View and manage your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Username</h3>
              <p className="text-sm">{user.username}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Email</h3>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Tenant</h3>
              <p className="text-sm">{tenant.name}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
