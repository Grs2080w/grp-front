import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "10000mb",
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "gab2080-server-ps.s3.us-east-2.amazonaws.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "img.logo.dev",
				pathname: "/**",
			},
		],
		minimumCacheTTL: 0,
	},
	allowedDevOrigins: ["*"],
}

export default nextConfig
