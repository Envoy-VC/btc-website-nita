import Link from 'next/link';
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
            <h2 className='text-xl font-semibold text-neutral-700 sm:text-2xl'>
              {children}
            </h2>
          );
        },
        h2({ children }) {
          return (
            <h2 className='text-lg font-semibold text-neutral-700 sm:text-xl'>
              {children}
            </h2>
          );
        },
        p({ children }) {
          return (
            <p className='whitespace-pre-line break-words text-sm text-neutral-600 md:text-[1rem]'>
              {children}
            </p>
          );
        },
        li({ children }) {
          return (
            <div className='flex w-full flex-row items-start gap-2 break-words text-sm text-neutral-700 md:text-[1rem]'>
              <div className='mt-2 h-2 w-2 rounded-full bg-neutral-700' />
              <div className='w-full'>{children}</div>
            </div>
          );
        },
        a({ children, ...props }) {
          return (
            <Link href={props.href ?? ''} target='_blank'>
              <span className='text-blue-500 underline'>{children}</span>
            </Link>
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
