import React, { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export const Container: FC<IProps> = ({ children, className = "" }) => {
  return (
    <div className={`container mx-auto my-0 ${className}`}>{children}</div>
  );
};
