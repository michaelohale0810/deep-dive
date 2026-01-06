'use client';

import React from 'react';

export default function MarkdownRenderer({ content }: { content: string }) {
  // Process the content line by line
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let isInList = false;
  let sectionIndex = 0;

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-amber-800">
            {part.replace(/\*\*/g, '')}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(
          <p key={`p-${sectionIndex++}`} className="text-amber-900 mb-4 leading-relaxed">
            {renderText(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${sectionIndex++}`} className="list-disc space-y-2 my-4 ml-6">
          {currentList.map((item, index) => {
            const bulletText = item.replace(/^[-•*]\s+/, '').trim();
            return (
              <li key={index} className="text-amber-900">
                {renderText(bulletText)}
              </li>
            );
          })}
        </ul>
      );
      currentList = [];
      isInList = false;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Empty line - flush current blocks
    if (!trimmed) {
      flushList();
      flushParagraph();
      return;
    }

    // Check if it's a heading (starts and ends with **)
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
      flushList();
      flushParagraph();
      const headingText = trimmed.replace(/\*\*/g, '');
      elements.push(
        <h3 key={`h-${sectionIndex++}`} className="text-2xl font-bold mt-8 mb-4 text-amber-800 first:mt-0">
          {headingText}
        </h3>
      );
      return;
    }

    // Check if it's a bullet point
    if (/^[-•*]\s+/.test(trimmed)) {
      flushParagraph();
      if (!isInList) {
        isInList = true;
      }
      currentList.push(trimmed);
      return;
    }

    // Regular text line
    flushList();
    currentParagraph.push(trimmed);
  });

  // Flush any remaining content
  flushList();
  flushParagraph();

  return <div className="space-y-4">{elements}</div>;
}

