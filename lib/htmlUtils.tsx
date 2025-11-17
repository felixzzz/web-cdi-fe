import React from 'react';

/**
 * Converts a simple HTML string (with <p> and <strong> tags) 
 * into React elements.
 * * @param html The HTML string (e.g., "<p>Hello <strong>World</strong>!</p>")
 * @returns React.ReactNode
 */
export const convertHtmlToReact = (html: string | null | undefined): React.ReactNode => {
  if (!html) return null;

  try {
    // 1. Split the string into paragraphs, removing <p> tags.
    const paragraphs = html.split(/<\/?p>/).filter(Boolean);

    return paragraphs.map((p, pIndex) => {
      
      // 2. Split each paragraph by <strong> tags, keeping the content.
      const parts = p.split(/(<strong>.*?<\/strong>)/g).filter(Boolean);

      const paragraphContent = parts.map((part, partIndex) => {
        // 3. Check if the part is a <strong> tag
        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
          // If it is, return a <strong> React element
          return (
            <strong key={partIndex}>
              {part.substring(8, part.length - 9)}
            </strong>
          );
        }
        // 4. Otherwise, return the plain text
        return part;
      });

      // 5. Return the full paragraph with its mixed content
      return <p key={pIndex}>{paragraphContent}</p>;
    });

  } catch (error) {
    console.error("Error converting HTML to React:", error, html);
    // Fallback: return the plain text, stripped of HTML
    return html.replace(/<[^>]*>?/gm, '');
  }
};
