"use client";

import { useLayoutEffect, useRef } from "react";
import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";

const CounterAnimation = ({
  from,
  to,
  animationProps,
}: {
  from: number;
  to: number;
  animationProps?: KeyframeAnimationOptions;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });
  useIsomorphicLayoutEffect(() => {
    
    if (!ref.current) return;
    if (!isInView) return;
    ref.current.textContent = String(from);
    const controls = animate(from, to, {
      duration: 1.5,
      ...animationProps,
      onUpdate: (val) => (ref.current.textContent = String(val.toFixed(0))),
    });
  }, [ref, isInView, from, to]);
  return <h3 ref={ref} className=" font-mono text-main2 font-bold  text-5xl" />;
};

export default CounterAnimation;
