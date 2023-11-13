"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/primitives/Link";
import { formatLocalizedPath } from "@/utils/route";

export default function LanguageSwitch() {
  const pathname = usePathname();
  return (
    <>
      <Link href={formatLocalizedPath(pathname, "fi")} noTranslate pr="1" borderRight="1px" borderColor="black">
        FI
      </Link>
      <Link href={formatLocalizedPath(pathname, "en")} noTranslate px="1" borderRight="1px" borderColor="black">
        EN
      </Link>
      <Link href={formatLocalizedPath(pathname, "se")} noTranslate pl="1">
        SW
      </Link>
    </>
  );
}
