export async function GET(
  request: Request,
  { params }: { params: { propertyCode: string } }
) {
  const { propertyCode } = params;

  // Fetch or generate your data based on the id
  const data = {
    hello: "world",
    propertyCode,
  };

  return Response.json(data);
}

// This function defines which [id] values will be statically generated
export async function generateStaticParams() {
  // Return an array of objects, each containing an `id` property
  return [{ propertyCode: "1" }, { propertyCode: "2" }, { propertyCode: "3" }];
}
