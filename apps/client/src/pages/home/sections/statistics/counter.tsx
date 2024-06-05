import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = { from: number; to: number };

export const Counter = ({ from, to }: CounterProps) => {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;

    if (!isInView || !node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      },
    });

    return () => {
      controls.stop();
    };
  }, [from, to, isInView]);

  return (
    <motion.span
      ref={nodeRef}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, scale: 0.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
    />
  );
};
