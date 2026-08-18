export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//i.test(src)) return src;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;

  return `${basePath}${normalizedSrc}`;
}
