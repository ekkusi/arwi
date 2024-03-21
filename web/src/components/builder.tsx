"use client";

import { ComponentProps } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { notFound } from "next/navigation";
import "../builder-registry";

type BuilderPageProps = ComponentProps<typeof BuilderComponent> & {
  redirectToNotFound?: boolean;
};

export function RenderBuilderContent({ content, model, redirectToNotFound = true }: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.

  if (content || isPreviewing) {
    return <BuilderComponent content={content} model={model} />;
  }
  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the error page

  return redirectToNotFound ? notFound() : null;
}
