"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { cubicBezier } from "motion";
import { Pause, Play } from "lucide-react";
import { useMessages } from "@/shared/i18n/useMessages";
import type { FivepixelsMessages } from "@/shared/i18n/landing/types";

type UiEditItem = FivepixelsMessages["uiEdit"]["items"][number];

const SCENE_IMAGES: Partial<Record<UiEditItem["scene"], string>> = {
    "device-preview": "/landing/ui-edit-device-preview.png",
};

const MARKER_WINDOW_SLIDER_IMAGES = [
    "/landing/ui-edit-marker-window-01.png",
    "/landing/ui-edit-marker-window-02.png",
    "/landing/ui-edit-marker-window-03.png",
    "/landing/ui-edit-marker-window-04.png",
] as const;

const FEEDBACK_COMPOSER_SLIDER_IMAGES = [
    "/landing/ui-edit-feedback-04.png",
    "/landing/ui-edit-feedback-01.png",
    "/landing/ui-edit-feedback-02.png",
    "/landing/ui-edit-feedback-03.png",
] as const;

const PANEL_SLIDER_IMAGES = [
    "/landing/ui-edit-panel-collapsed.png",
    "/landing/ui-edit-panel-expanded.png",
] as const;

const SLIDE_INTERVAL_MS = 4000;
const SLIDE_DURATION = 1.05;
const slideEase = cubicBezier(0.4, 0, 0.2, 1);

export function UiEditSection() {
    const uiEdit = useMessages().fivepixels.uiEdit;

    return (
        <section
            className="w-full bg-[var(--fp-bg)] px-[1.2rem] tablet:px-[2.4rem]"
            id="ui-edit"
        >
            <div className="mx-auto w-full max-w-[var(--size-pc)] overflow-hidden border-x border-[var(--adaptive-border)]">
                {uiEdit.items.map((item, index) => (
                    <ZigzagRow
                        key={item.scene}
                        item={item}
                        index={index}
                        isLast={index === uiEdit.items.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}

function ZigzagRow({ item, index, isLast }: { item: UiEditItem; index: number; isLast: boolean }) {
    const imageFirst = index % 2 === 1;
    const sliderImages =
        item.scene === "marker-tooltip"
            ? MARKER_WINDOW_SLIDER_IMAGES
            : item.scene === "feedback-composer"
              ? FEEDBACK_COMPOSER_SLIDER_IMAGES
              : item.scene === "panel-overview"
                ? PANEL_SLIDER_IMAGES
                : null;
    const imageSrc = SCENE_IMAGES[item.scene];

    const text = (
        <article className={`flex h-full flex-col justify-between p-[2.4rem] tablet:p-[5.2rem] ${imageFirst ? "order-1 tablet:order-2" : ""}`}>
            <div className="max-w-[42rem]">
                <span className="font-[family-name:var(--font-manrope)] text-[1.2rem] text-[var(--fp-text-description)]">{item.label}</span>
                <h3 className="mt-[1.2rem] text-[2.8rem] font-semibold leading-[1.2] text-[var(--fp-text-emphasis)] tablet:text-[3.2rem]">
                    {item.title}
                    {item.titleLine2 ? (
                        <>
                            <br />
                            {item.titleLine2}
                        </>
                    ) : null}
                </h3>
                <p className="mt-[1.6rem] text-[1.6rem] leading-[1.55] text-[var(--fp-text-description)]">{item.description}</p>
            </div>
            <span className="font-[family-name:var(--font-manrope)] text-[1.1rem] text-[var(--fp-text-description)]">{item.eyebrow}</span>
        </article>
    );

    const media = (
        <div
            className={`relative aspect-square overflow-hidden border-t border-[var(--adaptive-border)] tablet:border-t-0 ${
                imageFirst ? "order-2 tablet:order-1 tablet:border-r" : "tablet:border-l"
            }`}
        >
            {sliderImages ? (
                <SceneImageSlider
                    alt={`${item.title} example`}
                    images={sliderImages}
                    label={item.eyebrow.toLowerCase()}
                />
            ) : imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={`${item.title} example`}
                    fill
                    sizes="(max-width: 768px) calc(100vw - 2.4rem), 50vw"
                    className="object-cover object-center"
                />
            ) : null}
        </div>
    );

    return (
        <div className={`grid tablet:grid-cols-2 ${isLast ? "" : "border-b border-[var(--adaptive-border)]"}`}>
            {imageFirst ? (
                <>
                    {media}
                    {text}
                </>
            ) : (
                <>
                    {text}
                    {media}
                </>
            )}
        </div>
    );
}

function SceneImageSlider({
    images,
    alt,
    label,
}: {
    images: readonly string[];
    alt: string;
    label: string;
}) {
    const prefersReducedMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef(0);
    const widthRef = useRef(0);
    const animatingRef = useRef(false);
    const draggingRef = useRef(false);
    const x = useMotionValue(0);

    const [width, setWidth] = useState(0);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const count = images.length;
    const trackImages = count > 1 ? [...images, images[0]] : [...images];

    useEffect(() => {
        indexRef.current = index;
    }, [index]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            const nextWidth = el.clientWidth;
            widthRef.current = nextWidth;
            setWidth(nextWidth);
            x.set(-indexRef.current * nextWidth);
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, [x]);

    useEffect(() => {
        if (paused || prefersReducedMotion || count < 2 || !width) return;

        const timer = window.setInterval(() => {
            if (animatingRef.current || draggingRef.current) return;
            const current = indexRef.current;
            void moveTo(current >= count - 1 ? count : current + 1);
        }, SLIDE_INTERVAL_MS);

        return () => window.clearInterval(timer);
        // moveTo reads latest refs; width/count gate the interval
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused, prefersReducedMotion, count, width]);

    async function moveTo(target: number) {
        const slideWidth = widthRef.current;
        if (!slideWidth || count < 1 || animatingRef.current) return;

        const duration = prefersReducedMotion ? 0 : SLIDE_DURATION;

        if (target === count && count > 1) {
            animatingRef.current = true;
            await animate(x, -count * slideWidth, { duration, ease: slideEase });
            x.set(0);
            setIndex(0);
            animatingRef.current = false;
            return;
        }

        if (target === -1 && count > 1) {
            animatingRef.current = true;
            x.set(-count * slideWidth);
            await animate(x, -(count - 1) * slideWidth, { duration, ease: slideEase });
            setIndex(count - 1);
            animatingRef.current = false;
            return;
        }

        const next = ((target % count) + count) % count;
        animatingRef.current = true;
        setIndex(next);
        await animate(x, -next * slideWidth, { duration, ease: slideEase });
        animatingRef.current = false;
    }

    function snapFromDrag(offsetX: number, velocityX: number) {
        const slideWidth = widthRef.current;
        if (!slideWidth) return;

        const current = indexRef.current;
        const threshold = slideWidth * 0.18;

        if (offsetX < -threshold || velocityX < -450) {
            void moveTo(current >= count - 1 ? count : current + 1);
            return;
        }

        if (offsetX > threshold || velocityX > 450) {
            void moveTo(current <= 0 ? -1 : current - 1);
            return;
        }

        void moveTo(current);
    }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
        >
            <motion.div
                className="flex h-full cursor-grab active:cursor-grabbing"
                style={{
                    x,
                    width: width ? width * trackImages.length : "100%",
                }}
                drag={count > 1 && width > 0 ? "x" : false}
                dragElastic={0.1}
                dragMomentum={false}
                dragConstraints={
                    width
                        ? {
                              left: -count * width,
                              right: 0,
                          }
                        : undefined
                }
                onDragStart={() => {
                    draggingRef.current = true;
                }}
                onDragEnd={(_, info) => {
                    draggingRef.current = false;
                    snapFromDrag(info.offset.x, info.velocity.x);
                }}
            >
                {trackImages.map((src, slideIndex) => (
                    <div
                        key={`${src}-${slideIndex}`}
                        className="relative h-full shrink-0"
                        style={{ width: width || "100%" }}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 768px) calc(100vw - 2.4rem), 50vw"
                            className="pointer-events-none object-cover object-center select-none"
                            draggable={false}
                            priority={slideIndex === 0}
                        />
                    </div>
                ))}
            </motion.div>

            <button
                type="button"
                aria-label={paused ? `Resume ${label} slideshow` : `Pause ${label} slideshow`}
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
                className="absolute bottom-[1.2rem] right-[1.2rem] z-10 flex size-[3.6rem] items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
                {paused ? <Play className="ml-[0.15rem] size-[1.6rem]" strokeWidth={1.8} /> : <Pause className="size-[1.6rem]" strokeWidth={1.8} />}
            </button>
        </div>
    );
}
