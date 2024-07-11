"use client";

import { useFormState } from "react-dom";

import { register } from "@/auth/actions";

export default function RegisterForm() {
  const [state, formAction] = useFormState(register, {
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

        <label>
          Password
          <input name="password" type="password" autoComplete="new-password" />
        </label>

        <button type="submit">Register</button>
      </form>
    </>
  );
}
