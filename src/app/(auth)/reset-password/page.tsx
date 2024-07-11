import { redirect } from "next/navigation";

import { AUTH_SIGN_IN_PATH } from "@/auth/constants";
import { ResetPasswordForm } from "../_components";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ResetPasswordPage({ searchParams: { token } }: Props) {
  if (!token || typeof token !== "string") {
    redirect(AUTH_SIGN_IN_PATH);
  }

  return (
    <div>
      <h1>Reset Password</h1>

      <ResetPasswordForm token={token} />
    </div>
  );
}
