const GITHUB_PAGES_BASE_PATH = "/Hibis-website";

export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//i.test(src)) return src;

  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const basePath = configuredBasePath || (process.env.NODE_ENV === "production" ? GITHUB_PAGES_BASE_PATH : "");

  if (!basePath) return normalizedSrc;
  if (normalizedSrc === basePath || normalizedSrc.startsWith(`${basePath}/`)) return normalizedSrc;

  return `${basePath}${normalizedSrc}`;
}
