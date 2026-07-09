"use client";

import { useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";

type Section = { title: string; body: string };

// ponytail: base react-markdown handles blockquote/heading/list/bold.
// Add remark-gfm only if a section uses markdown tables or strikethrough.
const mdComponents: Components = {
  p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  h1: ({ children }) => (
    <h3 className="font-display font-bold text-[19px] text-wj-text mt-6 mb-2">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="font-display font-bold text-[18px] text-wj-text mt-6 mb-2">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="font-display font-semibold text-[16px] text-wj-text mt-5 mb-2">{children}</h4>
  ),
  ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-wj-text">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="text-wj-green underline underline-offset-2">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-wj-wood pl-4 italic text-wj-text my-4">
      {children}
    </blockquote>
  ),
};

const Markdown = ({ content }: { content: string }) => (
  <div className="font-body text-[15px] text-wj-muted leading-[1.8]">
    <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
  </div>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <polyline points="4,7 9,12 14,7" />
  </svg>
);

const AccordionSection = ({ title, body }: Section) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-wj-border last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display font-semibold text-[17px] text-wj-text">{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="pb-5">
          <Markdown content={body} />
        </div>
      )}
    </div>
  );
};

const parseSections = (metadata?: Record<string, unknown> | null): Section[] => {
  const raw = metadata?.sections;
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (s): s is Section =>
      !!s &&
      typeof s === "object" &&
      typeof (s as Record<string, unknown>).title === "string" &&
      typeof (s as Record<string, unknown>).body === "string"
  );
};

const ProductDescription = ({
  description,
  metadata,
}: {
  description?: string | null;
  metadata?: Record<string, unknown> | null;
}) => {
  const sections = parseSections(metadata);

  if (!description && sections.length === 0) {
    return (
      <p className="font-body text-[15px] text-wj-muted">Geen omschrijving beschikbaar.</p>
    );
  }

  return (
    <div>
      {description && <Markdown content={description} />}
      {sections.length > 0 && (
        <div className="border-t border-wj-border mt-8">
          {sections.map((s, i) => (
            <AccordionSection key={i} {...s} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
