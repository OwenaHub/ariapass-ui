import React from 'react';

const h1 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>
);

const p = ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-base text-gray-700 ${className}`}>{children}</p>
);

export const Text = {
  h1,
  p,
};