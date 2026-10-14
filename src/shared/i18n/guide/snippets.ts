export const GUIDE_SNIPPETS = {
    install: "npm install @fivepixels-js/react react react-dom",
    quickStart: `import { FivePixels } from "@fivepixels-js/react";

<FivePixels
  project={{ id: "my-app" }}
  visibility={{ devOnly: true }}
/>`,
    markElements: `<section data-report-id="hero" data-report-type="group">
  <button data-report-id="hero-cta">Get started</button>
</section>`,
} as const;

export type GuideSnippetKey = keyof typeof GUIDE_SNIPPETS;
