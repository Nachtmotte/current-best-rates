import { ComponentProps } from "react";
import NextLink from "next/link";

export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} />;
}
