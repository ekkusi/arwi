"use client";

import { Link as BaseLink, LinkProps as BaseLinkProps } from "@chakra-ui/next-js";
import { Variants, motion } from "framer-motion";
import { useMemo } from "react";
import { LanguageOption } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";
import { getPathFromRoute } from "@/utils/route";
import { MotionBox } from "../motion-chakra";

const MotionLink = motion<Omit<BaseLinkProps, "transition">>(BaseLink);

export type LinkProps = React.ComponentProps<typeof MotionLink> & {
  noTranslate?: boolean;
  hoverStyle?: "underline" | "none" | "opacity";
  underLineSize?: string | number;
};

const opacityMotion: Variants = {
  rest: {
    opacity: 1,
  },
  hover: {
    opacity: 0.7,
  },
};

const underLineMotion: Variants = {
  rest: {
    width: "0",
  },
  hover: {
    width: "100%",
  },
};

export default function Link({
  href: _href,
  children,
  noTranslate = false,
  color = "primary",
  hoverStyle = "opacity",
  underLineSize = "1px",
  fontSize,
  ...rest
}: LinkProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language as LanguageOption;

  let href = _href;
  if (!noTranslate) {
    const localizedPath = getPathFromRoute(_href.toString(), locale);

    if (!localizedPath) {
      // Show error of unfound route in development, redirect to original path in production
      if (process.env.NODE_ENV === "development")
        throw new Error(
          `No localized path found for ${_href} in ${locale}. If the link is external or you don't want it to be translated for some other reason, set noTranslate prop to true.`
        );
      else {
        href = `/${locale}${_href.toString()}`;
      }
    } else {
      href = localizedPath;
    }
  }

  const linkVariants = useMemo(() => {
    switch (hoverStyle) {
      case "opacity":
        return opacityMotion;
      default:
        return undefined;
    }
  }, [hoverStyle]);

  return (
    <MotionLink href={href} variants={linkVariants} initial="rest" whileHover="hover" position="relative" color={color} fontSize={fontSize} {...rest}>
      {children}
      {hoverStyle === "underline" && (
        <MotionBox variants={underLineMotion} position="absolute" bottom="-1" left="0" backgroundColor={color} width="100%" height={underLineSize} />
      )}
    </MotionLink>
  );
}
