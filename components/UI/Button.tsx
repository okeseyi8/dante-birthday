import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses = "btn";
  const variantClasses =
    variant === "secondary" ? "bg-transparent border border-white" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    />
  );
};
