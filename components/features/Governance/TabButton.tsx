import React from "react";
import { clsx } from "clsx"; 

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  const activeGradient =
    "linear-gradient(360deg, rgba(71, 193, 234, 0.32), rgba(0, 0, 0, 0))";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={clsx(
        "group",
        "relative overflow-hidden",
        "px-6 py-4",
        "text-white text-base",
        "font-medium",
        "transition-colors duration-200",
        "flex-1",
        "whitespace-nowrap",
        "bg-transparent"
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{label}</span>

      <span
        aria-hidden="true"
        className={clsx(
          "absolute inset-0 z-0",
          "transform transition-transform duration-300 ease-out origin-center",
          isActive ? "scale-x-100" : "scale-x-0",
          "group-hover:scale-x-100"
        )}
        style={{ backgroundImage: activeGradient }}
      />

      <span
        aria-hidden="true"
        className={clsx(
          "absolute bottom-0 left-0 right-0 h-[3px] bg-[#47C1EA] z-10",
          "transform transition-transform duration-300 ease-out origin-center",
          isActive ? "scale-x-100" : "scale-x-0",
          "group-hover:scale-x-100"
        )}
      ></span>
    </button>
  );
};
