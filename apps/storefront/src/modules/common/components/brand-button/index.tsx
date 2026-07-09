"use client";

import { ButtonHTMLAttributes } from "react";
import { clx } from "@modules/common/components/ui";

type BrandButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost" | "wood" | "dark";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  // Render as a plain span when the button lives inside a link (no nested interactive elements)
  as?: "button" | "span";
};

const sizeClasses = {
  sm: "px-[18px] py-2 text-[13px]",
  md: "px-7 py-[13px] text-[14px]",
  lg: "px-[38px] py-[17px] text-[15px]",
};

const variantClasses = {
  solid: "bg-wj-green hover:bg-wj-green-hover text-wj-white border-transparent",
  outline:
    "bg-transparent border border-wj-green text-wj-green hover:bg-wj-green-light",
  ghost: "bg-transparent border-transparent text-wj-muted hover:text-wj-text",
  wood: "bg-wj-wood hover:bg-[#B5762E] text-wj-white border-transparent",
  dark: "bg-wj-dark hover:bg-[#2A2420] text-wj-white border-transparent",
};

const BrandButton = ({
  variant = "solid",
  size = "md",
  full = false,
  as: Component = "button",
  className,
  children,
  ...props
}: BrandButtonProps) => {
  return (
    <Component
      className={clx(
        "inline-flex items-center justify-center font-body font-medium tracking-[0.04em] transition-all duration-[180ms] cursor-pointer border",
        sizeClasses[size],
        variantClasses[variant],
        full && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default BrandButton;
