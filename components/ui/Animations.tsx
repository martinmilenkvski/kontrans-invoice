"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGroup({ children, className = "", staggerDelay = 0.1 }: StaggerGroupProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
}

export function FadeIn({ children, className = "", direction = "up", delay }: FadeInProps) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      ...directions[direction] 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98], // elegant ease-out
        ...(delay !== undefined && { delay }), // only apply custom delay if provided (overrides stagger)
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

interface RevealLineProps {
  className?: string;
  horizontal?: boolean;
}

export function RevealLine({ className = "", horizontal = true }: RevealLineProps) {
  const lineVariants: Variants = {
    hidden: {
      scaleX: horizontal ? 0 : 1,
      scaleY: horizontal ? 1 : 0,
      transformOrigin: horizontal ? "left" : "top",
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return <motion.div variants={lineVariants} className={className} />;
}
