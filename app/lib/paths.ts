// Asset path helper — applies the GitHub-Pages basePath so static image URLs
// resolve correctly in both dev (root) and prod (/tracepointspb).

export const basePath =
  process.env.NODE_ENV === 'production' ? '/tracepointspb' : '';

export const asset = (path: string): string => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
};
