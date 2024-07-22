import Link from "next/link";

import { Button } from "@/components/ui/button";

import { AUTH_LOGIN_PATH } from "@/routes";

export default function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col text-center gap-4 mb-20">
        <h1 className="text-2xl">Welcome 👋</h1>
        <div>
          <Link href={AUTH_LOGIN_PATH}>
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
