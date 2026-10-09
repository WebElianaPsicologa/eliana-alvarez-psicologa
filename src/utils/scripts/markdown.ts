import { Marked } from "marked";

// Internal page links written in the CMS content get the trailing '/'
// (trailingSlash: 'always'). Assets, other hosts, ?query and #fragment are kept.
function withTrailingSlash(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const cut = href.search(/[?#]/);
  const pathname = cut === -1 ? href : href.slice(0, cut);
  const suffix = cut === -1 ? "" : href.slice(cut);
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);

  if (pathname.endsWith("/") || lastSegment.includes(".")) return href;
  return `${pathname}/${suffix}`;
}

export const markdown = new Marked({
  walkTokens(token) {
    if (token.type === "link") token.href = withTrailingSlash(token.href);
  },
});
