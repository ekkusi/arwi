"use client";

import { Link as BaseLink, LinkProps as BaseLinkProps } from "@chakra-ui/next-js";
import { Variants, motion } from "framer-motion";
import { forwardRef, useMemo } from "react";
import { LanguageOption } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";
import { RouteKey, getPathFromRoute } from "@/utils/route";
import { MotionBox } from "../motion-chakra";

const MotionLink = motion<Omit<BaseLinkProps, "transition">>(BaseLink);

export type LinkProps = Omit<React.ComponentProps<typeof MotionLink>, "ref"> & {
  noTranslate?: boolean;
  hoverStyle?: "underline" | "none" | "opacity";
  queryParams?: Record<string, string>;
  underLineSize?: string | number;
  underLineColor?: string;
};

const underLineMotion: Variants = {
  rest: {
    width: "0",
  },
  hover: {
    width: "100%",
  },
};

export default forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href: _href,
      children,
      noTranslate = false,
      color = "primary",
      hoverStyle = "opacity",
      underLineSize = "1px",
      underLineColor: _underLineColor,
      fontSize,
      queryParams: _queryParams,
      ...rest
    },
    ref
  ) => {
    const { i18n } = useTranslation();
    const locale = i18n.language as LanguageOption;

    const queryParams = _queryParams ? new URLSearchParams(_queryParams) : undefined;
    const underLineColor = _underLineColor || color;

    let href = _href;
    if (!noTranslate) {
      const localizedPath = getPathFromRoute(_href.toString() as RouteKey, locale);

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
    href = queryParams ? `${href}?${new URLSearchParams(queryParams)}` : href;

    const hoverStyles = useMemo(() => {
      switch (hoverStyle) {
        case "opacity":
          return undefined;
        // In underline or none, override the default opacity hover style
        default:
          return {
            _hover: {
              opacity: 1,
            },
          };
      }
    }, [hoverStyle]);

    return (
      <MotionLink
        ref={ref}
        href={href}
        initial="rest"
        whileHover="hover"
        position="relative"
        color={color}
        fontSize={fontSize}
        {...hoverStyles}
        {...rest}
      >
        {children}
        {hoverStyle === "underline" && (
          <MotionBox
            variants={underLineMotion}
            position="absolute"
            bottom="-1"
            left=" 0"
            backgroundColor={underLineColor}
            width="100%"
            height={underLineSize}
          />
        )}
      </MotionLink>
    );
  }
);
