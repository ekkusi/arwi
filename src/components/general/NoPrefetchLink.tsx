import { useRouter } from "next/router";
import type { HTMLAttributeAnchorTarget } from "react";
import React from "react";

export interface MainLinkProps {
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  className?: string;
  children: React.ReactNode;
}

const NoPrefetchLink: React.FC<MainLinkProps> = React.forwardRef(
  (
    { href, target, className, children }: MainLinkProps,
    ref: React.Ref<HTMLAnchorElement> | undefined
  ) => {
    const router = useRouter();

    const handleClick = React.useCallback(
      async (e: React.SyntheticEvent) => {
        // eslint-disable-next-line
        console.log("NoPrefetchLink: handleClick, navgating to", href);

        e.preventDefault();
        return router.push(href);
      },
      [router, href]
    );

    return (
      <a
        ref={ref}
        className={className}
        target={target}
        href={href}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }
);

export default NoPrefetchLink;
