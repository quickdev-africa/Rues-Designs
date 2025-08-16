import { LucideProps } from 'lucide-react';

export function CustomPartyIcon(props: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15l4-8 4 8" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}
