import React from "react";

export default function Button({
  type = "button",
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
