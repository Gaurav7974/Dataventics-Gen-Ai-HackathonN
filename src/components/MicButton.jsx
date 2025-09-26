import React, { useEffect, useRef } from 'react';

export default function MicButton({ listening, onToggle, ariaLabel }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    function onKey(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle();
      }
    }
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [onToggle]);

  return (
    <div
      ref={btnRef}
      role="button"
      tabIndex={0}
      className={`mic-outer ${listening ? 'listening' : ''}`}
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-pressed={listening}
    >
      <div className="mic-inner" aria-hidden>
        <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" fill="#000" />
          <path d="M19 11v1a7 7 0 0 1-14 0v-1" fill="#000" opacity="0.6" />
          <path d="M12 19v3" fill="#000" opacity="0.7" />
        </svg>
      </div>

      {listening && <div className="pulse-ring" aria-hidden />}
    </div>
  );
}
