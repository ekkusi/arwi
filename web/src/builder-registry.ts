"use client";

import { builder, Builder, withChildren } from "@builder.io/react";
import { Text } from "@chakra-ui/react";
import PageWrapper from "./components/general/PageWrapper";
import Section from "./components/general/Section";
import Link from "./components/primitives/Link";
import LinkButton from "./components/primitives/LinkButton";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const PageWrapperWithChildren = withChildren(PageWrapper);

Builder.registerComponent(PageWrapperWithChildren, {
  name: "PageWrapper",
  defaultStyles: {
    marginTop: "0",
  },
  inputs: [
    {
      name: "layout",
      type: "string",
      friendlyName: "Page width",
      defaultValue: "default",
      helperText: "Controls the wrapper width: default = with margins on the sides, full = full page width",
      enum: ["default", "full"],
    },
  ],
  image: "https://www.svgrepo.com/show/498970/page.svg",
});

Builder.registerComponent(Text, {
  name: "Custom Text",
  image: "https://www.svgrepo.com/show/532231/text-size.svg",
});

Builder.registerComponent(Text, {
  name: "Heading",
  inputs: [
    { name: "children", friendlyName: "Text", type: "string", defaultValue: "Title" },
    { name: "as", friendlyName: "Heading Type", type: "string", defaultValue: "h1", enum: ["h1", "h2", "h3"] },
  ],
  image: "https://www.svgrepo.com/show/532180/heading.svg",
});

Builder.registerComponent(LinkButton, {
  name: "Button",
  inputs: [
    { name: "children", friendlyName: "Text", type: "string", defaultValue: "Click me" },
    {
      name: "href",
      friendlyName: "Link URL",
      type: "string",
      defaultValue: "/",
      helperText: "The URL to link to. Use relative paths, e.g. /tietosuojaseloste, for internal links",
    },
    { name: "noTranslate", type: "boolean", defaultValue: true, hideFromUI: true },
  ],
  override: true,
  image: "https://www.svgrepo.com/show/375296/button-choice.svg",
});

const SectionWithChildren = withChildren(Section);

Builder.registerComponent(SectionWithChildren, {
  name: "Section",
  defaultStyles: {
    marginTop: "0",
  },
  override: true,
  inputs: [{ name: "isFullWidth", friendlyName: "Fill page width", type: "boolean", defaultValue: false }],
  image: "https://www.svgrepo.com/show/358608/web-section.svg",
});

Builder.registerComponent(Link, {
  name: "Link",
  inputs: [
    { name: "children", friendlyName: "Text", type: "string", defaultValue: "Click me" },
    {
      name: "href",
      friendlyName: "Link URL",
      type: "string",
      defaultValue: "/",
      helperText: "The URL to link to. Use relative paths, e.g. /tietosuojaseloste, for internal links",
    },
    { name: "noTranslate", type: "boolean", defaultValue: true, hideFromUI: true },
  ],
  image: "https://www.svgrepo.com/show/529680/link.svg",
});
