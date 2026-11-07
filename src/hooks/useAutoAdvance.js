import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// 'play' | 'paused' | null (never chosen). Only the Pause/Play button saves a choice.
function loadChoice(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === 'play' || saved === 'paused' ? saved : null;
  } catch {
    return null;
  }
}

function saveChoice(storageKey, choice) {
  try {
    localStorage.setItem(storageKey, choice);
  } catch {
    // Storage can be unavailable (private mode); the choice still holds for this visit.
  }
}

// Whether a carousel would start advancing on load; for picking a sensible first item.
export function startsAdvancing(storageKey) {
  const choice = loadChoice(storageKey);
  return choice === 'play' || (choice === null && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

// Shared auto-advance behaviour for the homepage carousels (hero pills, feature tabs):
// - advances every `ms` by calling `onAdvance`; `position` is the current item, and a new position gets full time;
// - Pause/Play is saved under `storageKey` and survives future visits;
// - devices that ask for reduced motion don't start until the visitor presses Play;
// - `holdProps` freeze it while hovered or focused, and it resumes with the time that was left;
// - `stopForUser()` ends it for this visit once the shopper picks something themselves;
// - `ready` lets a section wait (e.g. until scrolled into view) before the first advance.
// `state` ('running' | 'held' | 'off') and `cycle` drive the progress fill.
export function useAutoAdvance({ position, onAdvance, ms, storageKey, ready = true }) {
  const prefersReducedMotion = useReducedMotion();
  const [choice, setChoice] = useState(() => loadChoice(storageKey));
  const [pickedByUser, setPickedByUser] = useState(false);
  const [held, setHeld] = useState(false);
  // Bumped on Play so the progress fill restarts together with a fresh countdown.
  const [cycle, setCycle] = useState(0);
  const remainingRef = useRef(ms);
  const advanceRef = useRef(onAdvance);

  useEffect(() => {
    advanceRef.current = onAdvance;
  });

  const on = !pickedByUser && (choice === 'play' || (choice === null && !prefersReducedMotion));
  const running = on && ready && !held;

  // A new item always gets the full time. Declared before the timer so it runs first.
  useEffect(() => {
    remainingRef.current = ms;
  }, [position, ms]);

  useEffect(() => {
    if (!running) return undefined;
    const startedAt = performance.now();
    const timer = setTimeout(() => advanceRef.current(), remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt));
    };
  }, [running, position, cycle]);

  const toggle = () => {
    const next = on ? 'paused' : 'play';
    if (next === 'play') {
      remainingRef.current = ms;
      setCycle((c) => c + 1);
    }
    setChoice(next);
    setPickedByUser(false);
    saveChoice(storageKey, next);
  };

  return {
    on,
    state: running ? 'running' : on ? 'held' : 'off',
    cycle,
    toggle,
    stopForUser: () => setPickedByUser(true),
    holdProps: {
      onMouseEnter: () => setHeld(true),
      onMouseLeave: () => setHeld(false),
      onFocus: () => setHeld(true),
      onBlur: () => setHeld(false),
    },
  };
}
