"use client";

import { useFormState } from "react-dom";

import { resetPassword } from "@/auth/actions";

interface Props {
  token: string;
}

export default function ResetPasswordForm({ token }: Props) {
  const [state, formAction] = useFormState(resetPassword.bind(null, token), {
    status: "idle",
    message: "",
  });

  if (state.status === "success") {
    return <p>{state.message}</p>;
  }

  return (
    <>
      {state.status === "error" && <p>{state.message}</p>}

      <form action={formAction}>
        <label>
          New password
          <input name="password" type="password" autoComplete="new-password" />
        </label>

        <button type="submit">Reset password</button>
      </form>
    </>
  );
}
