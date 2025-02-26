import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Mantém o modo estrito do React ativo
  trailingSlash: false,  // Garante que não precisa de "/" no final das URLs
  async rewrites() {
    return [
      {
        source: "/product",
        destination: "/product", // Faz "/produto" carregar o arquivo index.js dentro da pasta produto
      },
    ];
  },
};

export default nextConfig;
