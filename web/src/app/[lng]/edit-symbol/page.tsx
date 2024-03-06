import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function Page() {
  const builderModelName = "symbol";
  const content = await builder
    .get(builderModelName, {
      staleCacheSeconds: process.env.NODE_ENV === "development" ? 0 : undefined,
    })
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
