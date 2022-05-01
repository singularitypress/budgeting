import React, { FC, ReactNode } from "react";

interface IProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: ReactNode;
}

export const Header: FC<IProps> = ({ children, variant, className = "" }) => {
  const classes = `${className}`;
  switch (variant) {
    case "h1":
      return (
        <h1 className={`${classes} font-extrabold text-6xl`}>{children}</h1>
      );
    case "h2":
      return (
        <h2 className={`${classes} font-extrabold text-5xl`}>{children}</h2>
      );
    case "h3":
      return (
        <h3 className={`${classes} font-extrabold text-4xl`}>{children}</h3>
      );
    case "h4":
      return <h4 className={`${classes} font-bold text-3xl`}>{children}</h4>;
    case "h5":
      return <h5 className={`${classes} font-bold text-2xl`}>{children}</h5>;
    case "h6":
    default:
      return <h6 className={`${classes} font-bold`}>{children}</h6>;
  }
};
