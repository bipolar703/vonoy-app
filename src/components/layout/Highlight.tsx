import React from "react";

/**
 * Highlight Component
 *
 * Renders text with a highlight color (set to #0a6dc2)
 * Used to emphasize important words in headings and text
 *
 * @param {React.ReactNode} children - The content to be highlighted
 * @returns {JSX.Element} The highlighted text
 */
interface HighlightProps {
  children: React.ReactNode;
}

const Highlight: React.FC<HighlightProps> = ({ children }) => {
  return (
    <span style={{ color: "#0a6dc2" }} className="font-bold">
      {children}
    </span>
  );
};

export default Highlight;
