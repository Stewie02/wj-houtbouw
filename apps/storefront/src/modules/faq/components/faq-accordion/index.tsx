"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

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

const FaqItem = ({ question, answer }: FaqItem) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-wj-border last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-body font-medium text-[15px] text-wj-text">
          {question}
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <p className="font-body text-[14px] text-wj-muted leading-[1.75] pb-5">
          {answer}
        </p>
      )}
    </div>
  );
};

const FaqAccordion = ({ categories }: { categories: FaqCategory[] }) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
        {/* Category nav (desktop sticky) */}
        <nav className="hidden lg:flex flex-col gap-1 sticky top-24">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title}`}
              className="font-body text-[14px] text-wj-muted hover:text-wj-green transition-colors py-1"
            >
              {cat.title}
            </a>
          ))}
        </nav>

        {/* Questions */}
        <div className="flex flex-col gap-12">
          {categories.map((cat) => (
            <section key={cat.title} id={cat.title}>
              <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-4">
                {cat.title}
              </div>
              <div className="border-t border-wj-border">
                {cat.items.map((item) => (
                  <FaqItem key={item.question} {...item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
