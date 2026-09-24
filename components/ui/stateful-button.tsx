"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion, useAnimate } from "motion/react";

export interface StatefulButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  loadingNode?: React.ReactNode;
  successNode?: React.ReactNode;
}

export const Button = ({
  className,
  children,
  loadingNode,
  successNode,
  ...props
}: StatefulButtonProps) => {
  const [scope, animate] = useAnimate();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const animateLoading = async () => {
    if (!scope.current) return;
    await animate(
      ".loader",
      {
        width: "20px",
        scale: 1,
        display: "block",
      },
      {
        duration: 0.2,
      },
    );
  };

  const animateSuccess = async () => {
    if (!scope.current) return;
    await animate(
      ".loader",
      {
        width: "0px",
        scale: 0,
        display: "none",
      },
      {
        duration: 0.2,
      },
    );

    if (!scope.current) return;
    await animate(
      ".check",
      {
        width: "20px",
        scale: 1,
        display: "block",
      },
      {
        duration: 0.2,
      },
    );

    if (!scope.current) return;
    try {
      await animate(
        ".check",
        {
          width: "0px",
          scale: 0,
          display: "none",
        },
        {
          delay: 2,
          duration: 0.2,
        },
      );
    } catch {
      // Ignored if unmounted before delay ends
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (status !== "idle" || props.disabled) return;
    setStatus("loading");
    try {
      await animateLoading();
      if (props.onClick) {
        await props.onClick(event);
      }
      setStatus("success");
      await animateSuccess();
    } catch (err) {
      if (scope.current) {
        await animate(
          ".loader",
          {
            width: "0px",
            scale: 0,
            display: "none",
          },
          { duration: 0.15 },
        );
      }
      throw err;
    } finally {
      if (scope.current) {
        setStatus("idle");
      }
    }
  };

  const {
    onClick: _onClick,
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onAnimationStart: _onAnimationStart,
    onAnimationEnd: _onAnimationEnd,
    ...buttonProps
  } = props;

  return (
    <motion.button
      layout
      ref={scope}
      className={cn(
        "flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full bg-cyan-500 px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-cyan-500 dark:ring-offset-black focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed",
        className,
      )}
      {...buttonProps}
      onClick={handleClick}
    >
      <motion.div layout className="flex items-center justify-center gap-2">
        <Loader />
        <CheckIcon />
        <motion.span layout className="flex items-center gap-2">
          {status === "loading" && loadingNode
            ? loadingNode
            : status === "success" && successNode
            ? successNode
            : children}
        </motion.span>
      </motion.div>
    </motion.button>
  );
};

export const StatefulButton = Button;

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-current"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-current"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
