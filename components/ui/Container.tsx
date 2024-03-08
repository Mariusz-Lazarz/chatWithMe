import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 md:px-12 py-2 pt-10 md:pt-30 container">
      {children}
    </div>
  );
}
