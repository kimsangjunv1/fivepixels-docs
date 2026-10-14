"use client";

import * as Layer from "@/widgets/example/01/modals/ui";
import { Example01ModalsPageProvider } from "./model/Example01ModalsContext";

export default function Panel() {
    return (
        <Example01ModalsPageProvider>
            <div className="flex flex-col gap-[2.4rem]">
                <Layer.ModalsHeading />
                <Layer.ModalCases />
                <Layer.InlineModalHost />
                <Layer.Modal />
            </div>
        </Example01ModalsPageProvider>
    );
}
