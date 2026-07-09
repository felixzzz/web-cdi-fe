import React from 'react';

interface JsonLdProps {
  data: string | Record<string, unknown>;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  if (!data) return null;
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
};

export default JsonLd;