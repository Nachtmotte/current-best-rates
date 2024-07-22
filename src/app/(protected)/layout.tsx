"use client";

import React from "react";

import { logout } from "@/actions/auth";
import { AUTH_LOGIN_PATH } from "@/routes";

import { ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  async function onClick() {
    await logout({ redirectTo: AUTH_LOGIN_PATH });
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <div>{children}</div>
      <div>
        <Button variant="outline" className="shadow-md" onClick={onClick}>
          <ExitIcon className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
