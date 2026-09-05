import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
