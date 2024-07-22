import { CardWrapper } from "@/components";

import { PROPERTIES_PATH } from "@/routes";

export default function NotFound() {
  return (
    <CardWrapper
      backButtonLabel="Go Back"
      backButtonHref={PROPERTIES_PATH}
      headerLabel="404 Not Found"
    >
      <p className="text-center">Property not found</p>
    </CardWrapper>
  );
}
