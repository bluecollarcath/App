import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { ReactNode } from 'react';
import Quiz from './Quiz';

const remark = [remarkGfm, remarkMath];
const rehype = [rehypeKatex];

/** Renders a short markdown+math string without block wrappers (for quiz text). */
export function InlineMd({ text }: { text: string }) {
  return (
    <ReactMarkdown remarkPlugins={remark} rehypePlugins={rehype}
      components={{ p: ({ children }) => <span>{children}</span>, code: ({ children }) => <code className="rounded bg-slate-200/70 px-1 font-mono text-[0.9em]">{children}</code> }}>
      {text}
    </ReactMarkdown>
  );
}

export default function Markdown({ source }: { source: string }) {
  let quizCount = 0;
  return (
    <div className="prose-ee">
      <ReactMarkdown
        remarkPlugins={remark}
        rehypePlugins={rehype}
        components={{
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children }) => {
            const lang = /language-(\w+)/.exec(className || '')?.[1];
            const text = String(children ?? '').replace(/\n$/, '');
            if (lang === 'quiz') return <Quiz source={text} index={++quizCount} />;
            if (lang) return <pre><code>{text}</code></pre>;
            return <code>{children as ReactNode}</code>;
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
