"use client";

import React from "react";
import { useFormState } from "react-dom";

import { signOut } from "@/auth/actions";
import SubmitButton from "./submit-button";

export default function SignOut(
  props: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>
) {
  const [_formState, formAction] = useFormState(signOut, null);

  return (
    <form action={formAction}>
      <SubmitButton {...props} type="submit">
        Sign Out
      </SubmitButton>
    </form>
  );
}
