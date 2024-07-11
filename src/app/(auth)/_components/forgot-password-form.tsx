"use client";

import { useFormState } from "react-dom";

import { forgotPassword } from "@/auth/actions";

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPassword, {
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
          Email
          <input name="email" type="email" autoComplete="username" />
        </label>

        <button type="submit">Send reset email</button>
      </form>
    </>
  );
}
