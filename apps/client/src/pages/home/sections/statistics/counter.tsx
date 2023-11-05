import { animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = { from: number; to: number };

export const Counter = ({ from, to }: CounterProps) => {
  const [isInView, setIsInView] = useState(false);
  const nodeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [from, to, isInView]);

  return (
    <motion.span
      ref={nodeRef}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
    />
  );
};
