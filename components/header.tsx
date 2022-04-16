import React, { FC, ReactNode } from "react";

interface IProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: ReactNode;
}

export const Header: FC<IProps> = ({ children, variant, className }) => {
  const classes = `${className}`;
  return <h1>{children}</h1>;
};
