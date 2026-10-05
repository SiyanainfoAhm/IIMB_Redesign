import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-screen px-4 md:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}