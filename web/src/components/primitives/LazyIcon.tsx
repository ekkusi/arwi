"use client";

import { ComponentWithAs, Icon as FallbackIcon, IconProps as BaseIconProps } from "@chakra-ui/react";
import React, { Suspense } from "react";

export const CHAKRA_ICON_KEYS = [
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

type IconKey = (typeof CHAKRA_ICON_KEYS)[number];

// Define the type for the icon cache
type IconCache = Record<string, React.LazyExoticComponent<ComponentWithAs<"svg", any>>>;

// Initialize the icon cache with proper typings
const iconCache: Partial<IconCache> = {};

const lazyLoadFromChakra = (iconName: IconKey) => {
  if (!iconCache[iconName]) {
    iconCache[iconName] = React.lazy<ComponentWithAs<"svg", BaseIconProps>>(async () => {
      const icons = import("@chakra-ui/icons");
      // Format the icon name, e.g. "arrow-up" to "ArrowUpIcon"
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

export type LazyIconProps = BaseIconProps & {
  icon?: IconKey | string;
};

function LazyIcon({ icon, ...props }: LazyIconProps) {
  const Icon = React.useMemo(() => {
    if (!icon) return FallbackIcon;
    return lazyLoadFromChakra(icon as IconKey);
  }, [icon]);

  return (
    <Suspense fallback={<FallbackIcon {...props} />}>
      <FallbackIcon as={Icon} {...props} />
    </Suspense>
  );
}

export default LazyIcon;
