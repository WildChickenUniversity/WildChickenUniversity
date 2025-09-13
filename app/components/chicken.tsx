"use client";
import Image from "next/image";
// No longer need useTheme, useEffect, or useState for this logic
import type { FC } from "react";

interface ChickenProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeConfig = {
  small: { width: 120, height: 24.7 },
  medium: { width: 200, height: 41.1 },
  large: { width: 270, height: 55.5 },
};

const Chicken: FC<ChickenProps> = ({ size = "large", className = "" }) => {
  const { width, height } = sizeConfig[size];

  return (
    <div
      className={`relative inline-block ${className} mb-4`}
      style={{ width, height }}
    >
      <Image
        src="/images/Wild_Chicken.svg"
        alt="WCU Logo"
        width={width}
        height={height}
        priority
        className="object-contain dark:hidden"
      />
      <Image
        src="/images/Wild_Chicken_White.svg"
        alt="WCU Logo"
        width={width}
        height={height}
        priority
        className="object-contain hidden dark:block"
      />
    </div>
  );
};

export default Chicken;
