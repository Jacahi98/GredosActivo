"use client";

import { motion } from "framer-motion";

const STAR_PATH =
  "M10 1.5l2.59 5.25 5.8.84-4.2 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77-4.2-4.09 5.8-.84L10 1.5z";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className}>
      <path fill="currentColor" d={STAR_PATH} />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const fillFractions = Array.from({ length: 5 }, (_, i) => Math.max(0, Math.min(1, rating - i)));

  return (
    <div className="flex gap-0.5">
      {fillFractions.map((fraction, i) => (
        <div key={i} className="relative h-4 w-4 shrink-0">
          <StarIcon className="absolute inset-0 h-4 w-4 text-[var(--border)]" />
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: `${fraction * 100}%` }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + i * 0.12 }}
          >
            <StarIcon className="h-4 w-4 text-[var(--gorse)]" />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function GoogleReviewsBadge({
  rating,
  reviewCount,
  href,
}: {
  rating: number;
  reviewCount: number;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 flex w-fit items-center gap-5 rounded-sm border border-[var(--border)] bg-[var(--granite-raised)] px-6 py-5 shadow-[var(--shadow)] transition-colors hover:border-[var(--pine)]"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="text-4xl font-semibold leading-none text-[var(--ink)]">{rating}</span>
      <div className="flex flex-col gap-1.5">
        <StarRating rating={rating} />
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-faint)]">
          {reviewCount} reseñas en Google
        </span>
      </div>
    </motion.a>
  );
}
