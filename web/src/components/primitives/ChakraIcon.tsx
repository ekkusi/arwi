"use client";

import { ComponentWithAs, Icon as FallbackIcon, IconProps as BaseIconProps } from "@chakra-ui/react";
import React, { Suspense } from "react";

export const ICON_KEYS = [
  "add",
  "arrow-back",
  "arrow-down",
  "arrow-forward",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-up-down",
  "at-sign",
  "attachment",
  "bell",
  "calendar",
  "chat",
  "check",
  "check-circle",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "close",
  "copy",
  "delete",
  "download",
  "drag-handle",
  "edit",
  "email",
  "external-link",
  "hamburger",
  "info",
  "info-outline",
  "link",
  "lock",
  "minus",
  "moon",
  "not-allowed",
  "phone",
  "plus-square",
  "question",
  "question-outline",
  "react",
  "repeat",
  "repeat-clock",
  "search",
  "search-2",
  "settings",
  "small-add",
  "small-close",
  "spinner",
  "star",
  "sun",
  "time",
  "triangle-down",
  "triangle-up",
  "unlock",
  "up-down",
  "view",
  "view-off",
  "warning",
  "warning-two",
] as const;

type IconKey = (typeof ICON_KEYS)[number];

// Define the type for the icon cache
type IconCache = Record<IconKey, React.LazyExoticComponent<ComponentWithAs<"svg", ChakraIconProps>>>;

// Initialize the icon cache with proper typings
const iconCache: Partial<IconCache> = {};

const lazyLoadIcon = (iconName: IconKey) => {
  if (!iconCache[iconName]) {
    iconCache[iconName] = React.lazy<ComponentWithAs<"svg", BaseIconProps>>(async () => {
      const icons = import("@chakra-ui/icons");
      const formattedName = `${iconName.replace(/(^\w|-\w)/g, (clearAndUpper) => clearAndUpper.replace(/-/, "").toUpperCase())}Icon`;
      const IconComponent = (await icons)[formattedName] as ComponentWithAs<"svg", BaseIconProps>;
      if (IconComponent) {
        return { default: IconComponent };
      }
      console.error(`Icon ${iconName} not found in @chakra-ui/icons`);
      return { default: FallbackIcon };
    });
  }

  return iconCache[iconName];
};

export type ChakraIconProps = BaseIconProps & {
  icon?: IconKey;
};

function ChakraIcon({ icon, ...props }: ChakraIconProps) {
  const LazyIcon = React.useMemo(() => {
    return icon ? lazyLoadIcon(icon) : FallbackIcon;
  }, [icon]);

  return (
    <Suspense fallback={<FallbackIcon {...props} />}>
      <FallbackIcon as={LazyIcon} {...props} />
    </Suspense>
  );
}

export default ChakraIcon;
