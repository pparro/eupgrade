import { useEffect } from "react";

/* Sets document.title + meta description for the current page on mount and
   restores the previous values on unmount, so SPA navigation keeps the tab
   title and meta in sync with the statically-prerendered <head>. */
export function useHead(seo) {
  useEffect(() => {
    if (!seo) return;
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta ? meta.content : null;
    if (seo.title) document.title = seo.title;
    if (meta && seo.description) meta.content = seo.description;
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.content = prevDesc;
    };
  }, [seo]);
}
