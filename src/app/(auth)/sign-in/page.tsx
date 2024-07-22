import { AUTH_REGISTER_PATH } from "@/routes";

import { CardWrapper } from "@/components";
import { LoginForm } from "@/app/(auth)/_components";

export default function LoginPage() {
  return (
    <CardWrapper
      headerLabel="Sign In"
      backButtonLabel="Don't have an account?"
      backButtonHref={AUTH_REGISTER_PATH}
    >
      <LoginForm />
    </CardWrapper>
  );
}
