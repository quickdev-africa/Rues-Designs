import React from 'react';

export default function ScrollArrow({ direction = 'right', visible = true }) {
  if (!visible) return null;
  return (
    <div
      className={`absolute top-1/2 z-20 ${direction === 'right' ? 'right-2' : 'left-2'} transform -translate-y-1/2 pointer-events-none`}
      style={{ opacity: 0.5 }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#E5E5E5" fillOpacity="0.7" />
        <path d={direction === 'right' ? 'M20 16L28 24L20 32' : 'M28 16L20 24L28 32'} stroke="#555" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
