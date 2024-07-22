import { AUTH_LOGIN_PATH } from "@/routes";

import { CardWrapper } from "@/components";
import { RegisterForm } from "@/app/(auth)/_components";

export default function RegisterPage() {
  return (
    <CardWrapper
    headerLabel="Register"
    backButtonLabel="Already have an account?"
    backButtonHref={AUTH_LOGIN_PATH}
  >
      <RegisterForm />
      </CardWrapper>
  );
}
