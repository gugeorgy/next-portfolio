import React from 'react';

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

import rehypeRaw from 'rehype-raw';

import SyntaxHighlighter from 'react-syntax-highlighter';

import Text from '@/components/text';

import { getReadme } from '@/commands/api';

import styles from './Readme.module.css';

export default async function Readme() {
  const data = await getReadme();

  return (
    <div className={styles.readme}>
      <Text>Opening GitHub README...</Text>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                useInlineStyles={false}
                language={match[1]}
                className={styles.highlighter}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {data}
      </ReactMarkdown>
    </div>
  );
}
