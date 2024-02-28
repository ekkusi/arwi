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

type IconKey = (typeof ICON_KEYS)[number];

// Define the type for the icon cache
type IconCache = Record<string, React.LazyExoticComponent<ComponentWithAs<"svg", any>>>;

// Initialize the icon cache with proper typings
const iconCache: Partial<IconCache> = {};

const lazyLoadFromChakra = (iconName: IconKey) => {
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

const REACT_ICONS_IMPORTS = {
  ai: import("react-icons/ai"),
  bi: import("react-icons/bi"),
  bs: import("react-icons/bs"),
  cg: import("react-icons/cg"),
  ci: import("react-icons/ci"),
  di: import("react-icons/di"),
  fa: import("react-icons/fa"),
  fa6: import("react-icons/fa6"),
  fc: import("react-icons/fc"),
  fi: import("react-icons/fi"),
  gi: import("react-icons/gi"),
  go: import("react-icons/go"),
  gr: import("react-icons/gr"),
  hi: import("react-icons/hi"),
  hi2: import("react-icons/hi2"),
  im: import("react-icons/im"),
  io: import("react-icons/io"),
  io5: import("react-icons/io5"),
  lia: import("react-icons/lia"),
  lib: import("react-icons/lib"),
  lu: import("react-icons/lu"),
  md: import("react-icons/md"),
  pi: import("react-icons/pi"),
  ri: import("react-icons/ri"),
  rx: import("react-icons/rx"),
  si: import("react-icons/si"),
  sl: import("react-icons/sl"),
  tb: import("react-icons/tb"),
  tfi: import("react-icons/tfi"),
  ti: import("react-icons/ti"),
  vsc: import("react-icons/vsc"),
  wi: import("react-icons/wi"),
} as const;

type ReactIconsImportKey = keyof typeof REACT_ICONS_IMPORTS;

const lazyLoadFromReactIcons = (iconName: string) => {
  if (!iconCache[iconName]) {
    iconCache[iconName] = React.lazy<any>(async () => {
      const prefix = iconName.slice(0, 2).toLowerCase();
      if (!REACT_ICONS_IMPORTS[prefix as ReactIconsImportKey]) {
        console.error(`react-icons/${prefix} module doesnt exist, check your icon name`);
        return { default: FallbackIcon };
      }
      const iconsImport = REACT_ICONS_IMPORTS[prefix as ReactIconsImportKey];
      //
      // const icons = import(importPath);
      const icons = await iconsImport;
      const IconComponent = icons[iconName as keyof typeof icons];
      if (IconComponent) {
        return { default: IconComponent };
      }
      console.error(`Icon ${iconName} not found in react-icons/${prefix}`);
      return { default: FallbackIcon };
    });
  }

  return iconCache[iconName];
};

export type LazyIconProps = BaseIconProps & {
  icon?: IconKey | string;
  fetchFromReactIcons?: boolean;
};

function LazyIcon({ icon, fetchFromReactIcons = false, ...props }: LazyIconProps) {
  const Icon = React.useMemo(() => {
    if (!icon) return FallbackIcon;
    return fetchFromReactIcons ? lazyLoadFromReactIcons(icon) : lazyLoadFromChakra(icon as IconKey);
  }, [fetchFromReactIcons, icon]);

  return (
    <Suspense fallback={<FallbackIcon {...props} />}>
      <FallbackIcon as={Icon} {...props} />
    </Suspense>
  );
}

export default LazyIcon;
