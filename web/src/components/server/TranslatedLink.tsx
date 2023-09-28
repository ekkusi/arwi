"use client";

import Link, { LinkProps } from "next/link";
import { LanguageOption } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";
import { getLocalizedPath } from "@/utils/route";

export type TranslatedLinkProps = React.PropsWithChildren<LinkProps> & {
  lngOverride?: LanguageOption;
};

export default function TranslatedLink({ href, children, lngOverride }: TranslatedLinkProps) {
  const { i18n } = useTranslation(lngOverride);
  const locale = i18n.language as LanguageOption;

  const localizedPath = getLocalizedPath(href.toString(), locale);

  if (!localizedPath) throw new Error(`No localized path found for ${href} in ${locale}`);

  return <Link href={localizedPath}>{children}</Link>;
}
