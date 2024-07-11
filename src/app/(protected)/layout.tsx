import React from "react";

import { SignOutButton } from "@/components";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div>
        <SignOutButton />
      </div>
      <div>{children}</div>
    </div>
  );
}
