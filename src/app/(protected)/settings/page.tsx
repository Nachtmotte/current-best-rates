import { auth } from "@/auth";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <Card>
      <CardHeader>
      <div className="w-full text-center">
          <h1 className="text-xl font-semibold">User Info</h1>
        </div>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}
