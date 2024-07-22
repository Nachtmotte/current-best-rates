import React from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
