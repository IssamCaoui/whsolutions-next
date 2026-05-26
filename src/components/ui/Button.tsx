// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[#4ECDC4] to-[#1B3A5C] text-white hover:shadow-lg hover:shadow-[#4ECDC4]/30 hover:scale-105",
  secondary:
    "bg-gradient-to-r from-[#FF6B6B] to-[#ee0979] text-white hover:shadow-lg hover:shadow-[#FF6B6B]/30 hover:scale-105",
  outline:
    "border-2 border-[#4ECDC4] text-[#4ECDC4] dark:text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white hover:scale-105",
  ghost:
    "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10",
  whatsapp:
    "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-105",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-sm rounded-xl gap-2",
  lg: "px-8 py-4 text-base rounded-2xl gap-2.5",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  icon,
  iconRight,
  className,
  ...props
}: ButtonProps) {
  const baseClass = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
      </Link>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
}
