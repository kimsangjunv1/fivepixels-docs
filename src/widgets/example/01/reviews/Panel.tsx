"use client";

import * as Layer from "@/widgets/example/01/reviews/ui";

export default function Panel() {
    return (
        <div className="flex flex-col gap-[2.4rem]">
            <Layer.ReviewsHeading />
            <Layer.ReviewActions />
            <Layer.ReviewQueue />
            <Layer.Modal />
        </div>
    );
}
