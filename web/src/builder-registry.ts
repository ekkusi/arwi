"use client";

import { Builder, builder, withChildren } from "@builder.io/react";
import { Text } from "@chakra-ui/react";
import PageWrapper from "./components/general/PageWrapper";
import Section from "./components/general/Section";
import Link from "./components/primitives/Link";
import LinkButton from "./components/primitives/LinkButton";
import { withChakraOptions, withChakraProps } from "./utils/builder";
import ChakraIcon, { ICON_KEYS } from "./components/primitives/ChakraIcon";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  withChildren(withChakraProps(PageWrapper)),
  withChakraOptions({
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
  })
);

Builder.registerComponent(
  withChakraProps(Text),
  withChakraOptions({
    name: "Heading",
    defaultStyles: {
      marginTop: "0",
    },
    inputs: [
      { name: "children", friendlyName: "Text", type: "string", defaultValue: "Title" },
      { name: "as", friendlyName: "Heading Type", type: "string", defaultValue: "h1", enum: ["h1", "h2", "h3"] },
    ],
    image: "https://www.svgrepo.com/show/532180/heading.svg",
  })
);

Builder.registerComponent(
  withChakraProps(Text),
  withChakraOptions({
    name: "Custom Text",
    defaultStyles: {
      marginTop: "0",
    },
    inputs: [
      { name: "children", friendlyName: "Text", type: "string", defaultValue: "Text" },
      { name: "as", friendlyName: "Text Type", type: "string", defaultValue: "p", enum: ["p", "h1", "h2", "h3"] },
    ],
    image: "https://www.svgrepo.com/show/532231/text-size.svg",
  })
);

Builder.registerComponent(
  withChakraProps(LinkButton),
  withChakraOptions({
    name: "Button",
    defaultStyles: {
      marginTop: "0",
    },
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
  })
);

Builder.registerComponent(
  withChildren(withChakraProps(Section)),
  withChakraOptions({
    name: "Section",
    defaultStyles: {
      marginTop: "0",
    },
    noWrap: true,
    override: true,
    inputs: [{ name: "isFullWidth", friendlyName: "Fill page width", type: "boolean", defaultValue: false }],
    image: "https://www.svgrepo.com/show/358608/web-section.svg",
  })
);

Builder.registerComponent(
  withChakraProps(Link),
  withChakraOptions({
    name: "Link",
    defaultStyles: {
      marginTop: "0",
    },
    inputs: [
      { name: "children", friendlyName: "Text", type: "string", defaultValue: "Click me" },
      {
        name: "href",
        friendlyName: "Link URL",
        type: "string",
        defaultValue: "/",
        helperText: "The URL to link to. Use relative paths, e.g. /tietosuojaseloste, for internal links",
      },
      { name: "hoverStyle", type: "string", defaultValue: "opacity", enum: ["opacity", "underline", "none"] },
      { name: "noTranslate", type: "boolean", defaultValue: true, hideFromUI: true },
    ],
    image: "https://www.svgrepo.com/show/529680/link.svg",
  })
);

Builder.registerComponent(
  withChildren(withChakraProps(Link)),
  withChakraOptions({
    name: "LinkBox",
    defaultStyles: {
      marginTop: "0",
    },
    inputs: [
      {
        name: "href",
        friendlyName: "Link URL",
        type: "string",
        defaultValue: "/",
        helperText: "The URL to link to. Use relative paths, e.g. /tietosuojaseloste, for internal links",
      },
      { name: "hoverStyle", type: "string", defaultValue: "none", hideFromUI: true },
      { name: "noTranslate", type: "boolean", defaultValue: true, hideFromUI: true },
    ],
    image: "https://www.svgrepo.com/show/497236/link-square.svg",
  })
);

Builder.registerComponent(
  withChakraProps(ChakraIcon),
  withChakraOptions({
    name: "Icon",
    defaultStyles: {
      marginTop: "0",
    },
    inputs: [
      { name: "icon", friendlyName: "Icon", type: "string", enum: [...ICON_KEYS] },
      { name: "boxSize", friendlyName: "Size", type: "number", defaultValue: 10 },
    ],
    image: "https://www.svgrepo.com/show/513832/info-circle.svg",
  })
);
