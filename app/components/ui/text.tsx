import React from 'react';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type SpanProps = React.HTMLAttributes<HTMLSpanElement>;
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * Display Heading: Used for massive hero sections
 */
const Display = ({ children, className = '', ...props }: HeadingProps) => (
  <h1 className={`text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight ${className}`} {...props}>
    {children}
  </h1>
);

/**
 * H1: Standard Page Titles
 */
const H1 = ({ children, className = '', ...props }: HeadingProps) => (
  <h1 className={`text-3xl font-bold text-gray-900 ${className}`} {...props}>
    {children}
  </h1>
);

/**
 * H2: Major Section Titles (e.g., "Popular Events")
 */
const H2 = ({ children, className = '', ...props }: HeadingProps) => (
  <h2 className={`text-2xl font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h2>
);

/**
 * H3: Card Titles & Modal Headers (e.g., Event Names)
 */
const H3 = ({ children, className = '', ...props }: HeadingProps) => (
  <h3 className={`text-xl font-medium text-gray-900 leading-snug ${className}`} {...props}>
    {children}
  </h3>
);

/**
 * H4: Eyebrow text, Dates, or small bold subheadings
 */
const H4 = ({ children, className = '', ...props }: HeadingProps) => (
  <h4 className={`text-lg font-medium text-primary ${className}`} {...props}>
    {children}
  </h4>
);

/**
 * P: Standard Body Text (Descriptions, articles)
 */
const P = ({ children, className = '', ...props }: ParagraphProps) => (
  <p className={`text-sm ${className}`} {...props}>
    {children}
  </p>
);

/**
 * Small: Secondary text, fine print, footer links, metadata
 */
const Small = ({ children, className = '', ...props }: ParagraphProps) => (
  <p className={`text-xs ${className}`} {...props}>
    {children}
  </p>
);

/**
 * Span: For inline text wrapping, coloring specific words, or icons
 */
const Span = ({ children, className = '', ...props }: SpanProps) => (
  <span className={`text-inherit ${className}`} {...props}>
    {children}
  </span>
);

/**
 * Label: Form input labels (Search bars, checkout inputs)
 */
const Label = ({ children, className = '', ...props }: LabelProps) => (
  <label className={`block text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wide mb-1.5 ${className}`} {...props}>
    {children}
  </label>
);

/**
 * Error: Form validation messages
 */
const Error = ({ children, className = '', ...props }: ParagraphProps) => (
  <p className={`text-xs md:text-sm text-red-600 mt-1 font-medium ${className}`} {...props}>
    {children}
  </p>
);

// Exporting as a single compound object
export const Text = {
  Display,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  small: Small,
  span: Span,
  label: Label,
  error: Error,
};