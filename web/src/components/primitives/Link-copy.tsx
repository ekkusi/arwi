"use client";

import { Link as BaseLink } from "@chakra-ui/next-js";
import { Variants, motion } from "framer-motion";
import { forwardRef, useMemo } from "react";
import { LanguageOption } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";
import { RouteKey, getPathFromRoute } from "@/utils/route";
import { MotionBox } from "../motion-chakra";

type AdditionalLinkProps = {
  noTranslate?: boolean;
  hoverStyle?: "opacity" | "none";
  queryParams?: Record<string, string>;
};

export type LinkProps = Omit<React.ComponentProps<typeof BaseLink>, "ref"> & AdditionalLinkProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href: _href, children, noTranslate = false, hoverStyle = "opacity", fontSize, queryParams: _queryParams, ...rest }, ref) => {
    const { i18n } = useTranslation();
    const locale = i18n.language as LanguageOption;

    const queryParams = _queryParams ? new URLSearchParams(_queryParams) : undefined;

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
        case "none":
          return {
            _hover: {
              opacity: 1,
            },
          };
        default:
          return {};
      }
    }, [hoverStyle]);

    return (
      <BaseLink ref={ref} href={href} position="relative" fontSize={fontSize} {...hoverStyles} {...rest}>
        {children}
      </BaseLink>
    );
  }
);

export default Link;

const underLineMotion: Variants = {
  rest: {
    width: "0",
  },
  hover: {
    width: "100%",
  },
};

const MotionLink = motion<Omit<LinkProps, "transition">>(Link);

export type UnderlineLinkProps = Omit<React.ComponentProps<typeof MotionLink>, "ref"> &
  AdditionalLinkProps & {
    underLineSize?: string;
  };

export const UnderlineLink = forwardRef<HTMLAnchorElement, UnderlineLinkProps>(
  ({ children, color = "primary", underLineSize = "1px", ...rest }, ref) => {
    return (
      <MotionLink as={Link} hoverStyle="none" {...rest} initial="rest" whileHover="hover" ref={ref}>
        {children}
        <MotionBox variants={underLineMotion} position="absolute" bottom="-1" left="0" backgroundColor={color} width="100%" height={underLineSize} />
      </MotionLink>
    );
  }
);
