import React, { Fragment, useEffect, useState, useRef, useCallback, useMemo, forwardRef, Children, } from "react";
import "./Marquee.scss";
const Marquee = forwardRef(function Marquee({ style = {}, className = "", autoFill = false, play = true, pauseOnHover = false, pauseOnClick = false, direction = "left", speed = 50, delay = 0, loop = 0, gradient = false, gradientColor = "white", gradientWidth = 200, onFinish, onCycleComplete, onMount, children, }, ref) {
    // React Hooks
    const [containerWidth, setContainerWidth] = useState(0);
    const [marqueeWidth, setMarqueeWidth] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const rootRef = useRef(null);
    const containerRef = ref || rootRef;
    const marqueeRef = useRef(null);
    // Calculate width of container and marquee and set multiplier
    const calculateWidth = useCallback(() => {
        if (marqueeRef.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const marqueeRect = marqueeRef.current.getBoundingClientRect();
            let containerWidth = containerRect.width;
            let marqueeWidth = marqueeRect.width;
            // Swap width and height if direction is up or down
            if (direction === "up" || direction === "down") {
                containerWidth = containerRect.height;
                marqueeWidth = marqueeRect.height;
            }
            if (autoFill && containerWidth && marqueeWidth) {
                setMultiplier(marqueeWidth < containerWidth
                    ? Math.ceil(containerWidth / marqueeWidth)
                    : 1);
            }
            else {
                setMultiplier(1);
            }
            setContainerWidth(containerWidth);
            setMarqueeWidth(marqueeWidth);
        }
    }, [autoFill, containerRef, direction]);
    // Calculate width and multiplier on mount and on window resize
    useEffect(() => {
        if (!isMounted)
            return;
        calculateWidth();
        if (marqueeRef.current && containerRef.current) {
            const resizeObserver = new ResizeObserver(() => calculateWidth());
            resizeObserver.observe(containerRef.current);
            resizeObserver.observe(marqueeRef.current);
            return () => {
                if (!resizeObserver)
                    return;
                resizeObserver.disconnect();
            };
        }
    }, [calculateWidth, containerRef, isMounted]);
    // Recalculate width when children change
    useEffect(() => {
        calculateWidth();
    }, [calculateWidth, children]);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    // Runs the onMount callback, if it is a function, when Marquee is mounted.
    useEffect(() => {
        if (typeof onMount === "function") {
            onMount();
        }
    }, []);
    // Animation duration
    const duration = useMemo(() => {
        if (autoFill) {
            return (marqueeWidth * multiplier) / speed;
        }
        else {
            return marqueeWidth < containerWidth
                ? containerWidth / speed
                : marqueeWidth / speed;
        }
    }, [autoFill, containerWidth, marqueeWidth, multiplier, speed]);
    const containerStyle = useMemo(() => (Object.assign(Object.assign({}, style), { ["--pause-on-hover"]: !play || pauseOnHover ? "paused" : "running", ["--pause-on-click"]: !play || (pauseOnHover && !pauseOnClick) || pauseOnClick
            ? "paused"
            : "running", ["--width"]: direction === "up" || direction === "down" ? `100vh` : "100%", ["--transform"]: direction === "up"
            ? "rotate(-90deg)"
            : direction === "down"
                ? "rotate(90deg)"
                : "none" })), [style, play, pauseOnHover, pauseOnClick, direction]);
    const gradientStyle = useMemo(() => ({
        ["--gradient-color"]: gradientColor,
        ["--gradient-width"]: typeof gradientWidth === "number"
            ? `${gradientWidth}px`
            : gradientWidth,
    }), [gradientColor, gradientWidth]);
    const marqueeStyle = useMemo(() => ({
        ["--play"]: play ? "running" : "paused",
        ["--direction"]: direction === "left" ? "normal" : "reverse",
        ["--duration"]: `${duration}s`,
        ["--delay"]: `${delay}s`,
        ["--iteration-count"]: !!loop ? `${loop}` : "infinite",
        ["--min-width"]: autoFill ? `auto` : "100%",
    }), [play, direction, duration, delay, loop, autoFill]);
    const childStyle = useMemo(() => ({
        ["--transform"]: direction === "up"
            ? "rotate(90deg)"
            : direction === "down"
                ? "rotate(-90deg)"
                : "none",
    }), [direction]);
    // Render {multiplier} number of children
    const multiplyChildren = useCallback((multiplier) => {
        return [
            ...Array(Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 0),
        ].map((_, i) => (React.createElement(Fragment, { key: i }, Children.map(children, (child) => {
            return (React.createElement("div", { style: childStyle, className: "rfm-child" }, child));
        }))));
    }, [childStyle, children]);
    return !isMounted ? null : (React.createElement("div", { ref: containerRef, style: containerStyle, className: "rfm-marquee-container " + className },
        gradient && React.createElement("div", { style: gradientStyle, className: "rfm-overlay" }),
        React.createElement("div", { className: "rfm-marquee", style: marqueeStyle, onAnimationIteration: onCycleComplete, onAnimationEnd: onFinish },
            React.createElement("div", { className: "rfm-initial-child-container", ref: marqueeRef }, Children.map(children, (child) => {
                return (React.createElement("div", { style: childStyle, className: "rfm-child" }, child));
            })),
            multiplyChildren(multiplier - 1)),
        React.createElement("div", { className: "rfm-marquee", style: marqueeStyle }, multiplyChildren(multiplier))));
});
export default Marquee;
//# sourceMappingURL=Marquee.js.map