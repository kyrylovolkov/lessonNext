import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        qualities: [75], // тепер треба явно перелічити дозволені якості (дефолт лише [75])
        minimumCacheTTL: 14400, // 4 години — новий дефолт замість колишніх 60 секунд
    },
    reactCompiler: true,
};

export default nextConfig;
