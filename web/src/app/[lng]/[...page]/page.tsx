import { builder } from "@builder.io/sdk";
import { LocalizedPage } from "@/types/page";
import { redirect } from "next/navigation";
import { RenderBuilderContent } from "../../../components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: LocalizedPage & PageProps) {
  const { lng, page } = props.params;
  const urlPath = `/${page.join("/")}`;

  const pathWithoutLocale = urlPath.replace(`/${lng}`, "");

  const builderModelName = "page";
  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: pathWithoutLocale,
      },
    })
    // Convert the result to a promise
    .toPromise();

  const pageLocale = content?.data?.locale;
  if (pageLocale && pageLocale !== lng) {
    // If the page locale does not match the URL locale, redirect to the correct locale
    redirect(`/${pageLocale}/${urlPath}`);
  }
  console.log(content);

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
