"use client";

import { Example01PageProvider } from "./model/Example01Context";
import * as Layer from "@/widgets/example/01/ui";

export default function Panel() {
    return (
        <Example01PageProvider>
            <Layer.WorkspaceSummary />
            <Layer.IssueBoard />
            <Layer.RecentActivity />
            <Layer.Modal />
        </Example01PageProvider>
    );
}
