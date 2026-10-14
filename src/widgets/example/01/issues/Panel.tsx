"use client";

import * as Layer from "@/widgets/example/01/issues/ui";

export default function Panel() {
    return (
        <div className="flex flex-col gap-[2.4rem]">
            <Layer.IssuesHeading />
            <Layer.ModalActions />
            <Layer.IssueList />
            <Layer.Modal />
        </div>
    );
}
