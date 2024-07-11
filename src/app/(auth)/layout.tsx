import React from "react";

import { Link } from "@/components";
import {
  AUTH_SIGN_IN_PATH,
  AUTH_REGISTER_PATH,
  AUTH_FORGOT_PASSWORD_PATH,
} from "@/auth/constants";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div>
        <Link href={AUTH_SIGN_IN_PATH}>Sign In</Link>
        <Link href={AUTH_REGISTER_PATH}>Register</Link>
        <Link href={AUTH_FORGOT_PASSWORD_PATH}>Forgot Password</Link>
      </div>

      {children}
    </div>
  );
}
