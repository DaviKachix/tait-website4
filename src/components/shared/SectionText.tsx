import React from "react";

export default function SectionText({
  children,
  className = "",
  size = "md",
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
}) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
  };

  return (
    <p
      className={`
        ${sizeStyles[size]}
        leading-relaxed
        ${highlight ? "text-gray-900 font-medium" : "text-gray-700"}
        ${className}
      `}
    >
      {children}
    </p>
  );
}