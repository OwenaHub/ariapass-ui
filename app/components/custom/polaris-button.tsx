import React, { type ButtonHTMLAttributes } from 'react';

interface PolarisButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive';
  iconOnly?: boolean;
  children: React.ReactNode;
}

export const PolarisButton: React.FC<PolarisButtonProps> = ({
  variant = 'secondary',
  iconOnly = false,
  className = '',
  children,
  ...props
}) => {
  // Base styles: softer rounded corners, smaller font, and a 2px press action
  const baseStyles =
    "relative inline-flex items-center justify-center text-sm font-medium rounded cursor-pointer select-none transition-all duration-75 active:translate-y-[2px] " +
    (iconOnly ? "p-2.5" : "px-4 py-2");

  // Complex Box Shadows breakdown:
  // 1. inset 0 1px 0 -> The top light reflection
  // 2. 0 0 0 1px -> The 1px outline/border
  // 3. 0 2px 0 0 -> The 3D bottom depth (which collapses to 0px on active)
  const variants = {
    secondary:
      "bg-gradient-to-b from-white to-[#f6f6f7] text-[#202223] " +
      "shadow-[inset_0_1px_0_white,_0_0_0_1px_#c9cccf,_0_2px_0_0_#c9cccf] " +
      "active:shadow-[inset_0_1px_0_white,_0_0_0_1px_#c9cccf,_0_0px_0_0_#c9cccf]",

    primary:
      "bg-gradient-to-b from-[#303030] to-[#1a1a1a] text-white " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_0_0_1px_#000000,_0_2px_0_0_#000000] " +
      "active:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_0_0_1px_#000000,_0_0px_0_0_#000000]",

    destructive:
      "bg-gradient-to-b from-[#e32c2b] to-[#c32423] text-white " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_0_0_1px_#a31a12,_0_2px_0_0_#a31a12] " +
      "active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_0_0_1px_#a31a12,_0_0px_0_0_#a31a12]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Example Usage ---
export default function App() {
  return (
    <div className="flex flex-col gap-4 p-12 bg-[#f4f4f5] min-h-screen">
      {/* Top Row */}
      <div className="flex items-center gap-3">
        <PolarisButton variant="secondary">Cancel</PolarisButton>
        <PolarisButton variant="destructive">Delete</PolarisButton>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center gap-3">
        <PolarisButton variant="primary">Add product</PolarisButton>
        <PolarisButton variant="secondary" iconOnly aria-label="Edit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path d="M2.695 14.763l-1.262 3.152a.5.5 0 00.65.65l3.152-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
          </svg>
        </PolarisButton>
      </div>
    </div>
  );
}