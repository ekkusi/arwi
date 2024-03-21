import { builder } from "@builder.io/sdk";
import { LocalizedPage } from "@/types/page";
import { redirect } from "next/navigation";
import { RenderBuilderContent } from "../../../components/builder";

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: LocalizedPage & PageProps) {
  const { lng, page } = props.params;
  const urlPath = page ? `/${page.join("/")}` : "/";

  const pathWithoutLocale = urlPath.replace(`/${lng}`, "");

  const builderModelName = "page";
  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: pathWithoutLocale,
      },
      staleCacheSeconds: process.env.NODE_ENV === "development" ? 0 : undefined,
    })
    // Convert the result to a promise
    .toPromise();

  const pageLocale = content?.data?.locale;
  if (pageLocale && pageLocale !== lng) {
    // If the page locale does not match the URL locale, redirect to the correct locale
    redirect(`/${pageLocale}/${urlPath}`);
  }

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
