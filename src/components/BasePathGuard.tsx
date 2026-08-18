"use client";

import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function withBasePath(href: string) {
  if (!basePath || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === basePath || href.startsWith(`${basePath}/`)) return href;
  return `${basePath}${href}`;
}

export default function BasePathGuard() {
  useEffect(() => {
    if (!basePath) return;

    const rewriteLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href) return;
        const fixedHref = withBasePath(href);
        if (fixedHref !== href) anchor.setAttribute("href", fixedHref);
      });
    };

    rewriteLinks();

    const observer = new MutationObserver(rewriteLinks);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;

      const fixedHref = withBasePath(href);
      if (fixedHref === href) return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(fixedHref);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
