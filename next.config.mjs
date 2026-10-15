/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: "/fivepixels",
                destination: "/",
                permanent: true,
            },
            {
                source: "/fivepixels/guide",
                destination: "/docs/quickstart",
                permanent: true,
            },
            {
                source: "/fivepixels/guide/backend-api",
                destination: "/docs/persistence",
                permanent: true,
            },
            {
                source: "/guide",
                destination: "/docs/quickstart",
                permanent: true,
            },
            {
                source: "/guide/backend-api",
                destination: "/docs/persistence",
                permanent: true,
            },
            ...[
                ["/guides", "/docs"],
                ["/guides/rollout", "/docs/setup"],
                ["/guides/rules", "/docs/workflow"],
                ["/guides/roles", "/docs/workflow"],
                ["/guides/dom-tagging", "/docs/dom-attributes"],
                ["/guides/self-hosting", "/docs/artemis72"],
            ].map(([source, destination]) => ({ source, destination, permanent: true })),
            {
                source: "/guides/shortcuts",
                destination: "/docs/modes",
                permanent: true,
            },
            { source: "/guides/:slug", destination: "/docs/:slug", permanent: true },
            {
                source: "/docs/modes-and-shortcuts",
                destination: "/docs/modes",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
