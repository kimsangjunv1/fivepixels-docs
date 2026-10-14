"use client";

import { FivePixelsDemo } from "@fivepixels-js/react/demo";

const demoFilter = "[filter:drop-shadow(0_1.2rem_2.4rem_rgba(0,0,0,0.35))]";

export function HeroImageSection() {
    return (
        <section
            className="relative w-full h-[calc(50svh-(8.0rem/2))] min-h-[36rem] overflow-hidden border-b border-b-[var(--adaptive-border)]"
            aria-label="fivepixels product demo"
        >
            <video
                autoPlay
                className="absolute inset-0 h-full min-h-[36rem] w-full object-cover"
                loop
                muted
                playsInline
                aria-hidden
            >
                <source
                    src="/colorflow-animation.mp4"
                    type="video/mp4"
                />
            </video>

            <div className="absolute inset-0 z-[1] mx-auto h-full w-full max-w-[var(--size-pc)]">
                <div className="relative h-full w-full">
                    <div className="absolute left-[62%] top-[-4%] z-[1] origin-top -translate-x-1/2 scale-[1.2]">
                        <FivePixelsDemo
                            scene="panel-overview"
                            appearance="light"
                            locale="en"
                            interaction="showcase"
                            className={`rounded-[1.2rem] ${demoFilter}`}
                            ariaLabel="Panel overview demo"
                        />
                    </div>

                    <div className="absolute left-[32%] top-[2%] z-[2] origin-top -translate-x-1/2 scale-[1.2]">
                        <FivePixelsDemo
                            scene="feedback-list"
                            appearance="light"
                            locale="en"
                            interaction="showcase"
                            className={`rounded-[1.2rem] ${demoFilter}`}
                            ariaLabel="Feedback list demo"
                        />
                    </div>

                    {/* <div className="absolute left-[8%] top-[42%] z-[3] origin-top scale-[1.2]">
                        <FivePixelsDemo
                            scene="feedback-composer"
                            appearance="dark"
                            locale="en"
                            interaction="showcase"
                            className={`rounded-[1.2rem] ${demoFilter}`}
                            ariaLabel="Marker window demo"
                        />
                    </div> */}

                    <div className="absolute left-[58%] top-[58%] z-[4] origin-top scale-[1.2]">
                        <FivePixelsDemo
                            scene="marker-tooltip"
                            appearance="dark"
                            locale="en"
                            interaction="showcase"
                            className={`rounded-[1.2rem] ${demoFilter}`}
                            ariaLabel="Marker tooltip demo"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
