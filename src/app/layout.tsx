import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/app/JsonLd";
import { GlobalErrorBoundary } from "@/app/providers/GlobalErrorBoundary";
import { GlobalErrorListener } from "@/app/providers/GlobalErrorListener";
import { LenisProvider } from "@/app/providers/LenisProvider";
import { createPageMetadata } from "@/shared/lib/seo";
import { Footer } from "@/widgets/layout/Footer";
import { Header } from "@/widgets/layout/Header";
import { SiteBanner } from "@/widgets/layout/SiteBanner";

import "@fontsource-variable/inter/wght.css";
import "@/shared/styles/scss/globals.css";
import "@/shared/styles/scss/index.scss";

const manrope = localFont({
    src: [
        { path: "../../public/fonts/manrope/woff2/Manrope-ExtraLight.woff2", weight: "200", style: "normal" },
        { path: "../../public/fonts/manrope/woff2/Manrope-Light.woff2", weight: "300", style: "normal" },
        { path: "../../public/fonts/manrope/woff2/Manrope-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/manrope/woff2/Manrope-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../public/fonts/manrope/woff2/Manrope-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../../public/fonts/manrope/woff2/Manrope-Bold.woff2", weight: "700", style: "normal" },
        { path: "../../public/fonts/manrope/woff2/Manrope-ExtraBold.woff2", weight: "800", style: "normal" },
    ],
    variable: "--font-manrope",
    display: "swap",
});

const themeScript = `
    (function () {
        try {
            var storedTheme = localStorage.getItem("fivepixels-theme:v1");
            var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            document.documentElement.dataset.theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : systemTheme;
        } catch (error) {
            document.documentElement.dataset.theme = "light";
        }
    })();
`;

export const metadata: Metadata = {
    ...createPageMetadata(),
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/favicon.ico",
            },
        ],
        apple: "/apple-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={manrope.variable}
            suppressHydrationWarning
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{ __html: themeScript }}
                    id="fivepixels-theme"
                />
                <JsonLd />
            </head>
            <body className="bg-[var(--fp-bg)] font-[family-name:var(--font-inter)] text-[var(--fp-text-emphasis)] antialiased">
                <LenisProvider>
                    <GlobalErrorBoundary>
                        <GlobalErrorListener>
                            <SiteBanner />
                            <Header />
                            {children}
                            <Footer />
                        </GlobalErrorListener>
                    </GlobalErrorBoundary>
                </LenisProvider>
                {process.env.NODE_ENV === "production" && <Analytics />}
            </body>
        </html>
    );
}
