import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Props {
  content: string;
}

const MarkdownRenderer = ({ content }: Props) => {
  return (
    <ReactMarkdown
      components={{
        h1({ children }) {
          return (
            <h2 className='text-xl text-neutral-700 sm:text-2xl'>{children}</h2>
          );
        },
        p({ children }) {
          return (
            <p className='whitespace-pre-line break-words text-sm text-neutral-600'>
              {children}
            </p>
          );
        },
        li({ children }) {
          // Check if the parent is an unordered list (ul)

          return (
            <div className='flex w-full flex-row items-start gap-4 break-words py-2 text-sm text-neutral-200 md:text-xl'>
              <div>
                <div className='mt-2 h-3 w-3 rounded-full bg-neutral-200' />
              </div>
              {children}
            </div>
          );
        },
        h3({ children }) {
          // Check if the parent is an unordered list (ul)

          return (
            <div className='my-2 mt-6 bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-xl font-bold text-transparent underline sm:text-2xl md:text-3xl'>
              {children}
            </div>
          );
        },
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rehypePlugins={[rehypeRaw as any]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
