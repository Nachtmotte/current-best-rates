"use client";

import React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  submittingLabel?: string;
}

export default function SubmitButton({
  submittingLabel = "submitting...",
  disabled = false,
  children,
  ...props
}: React.PropsWithChildren<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending} {...props}>
      {pending ? submittingLabel : children}
    </Button>
  );
}
