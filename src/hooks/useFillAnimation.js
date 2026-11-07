import { useEffect, useRef } from 'react';

// Fills an element from `from` to `to` (as a scale on `axis`) over `ms`, following an
// auto-advance `state`: running plays, held pauses in place, off cancels so the element's own
// inline style shows. A new `restartKey` starts a fresh fill.
export function useFillAnimation(ref, { state, ms, from = 0, to = 1, axis = 'x', restartKey }) {
  const animationRef = useRef(null);
  const active = state !== 'off';
  const scale = axis === 'x' ? 'scaleX' : 'scaleY';

  useEffect(() => {
    animationRef.current?.cancel();
    animationRef.current = null;
    if (!active || !ref.current) return;
    animationRef.current = ref.current.animate([{ transform: `${scale}(${from})` }, { transform: `${scale}(${to})` }], {
      duration: ms,
      easing: 'linear',
      fill: 'forwards',
    });
  }, [ref, active, scale, from, to, ms, restartKey]);

  // Declared after the effect above so a fill created while held starts paused.
  useEffect(() => {
    if (state === 'held') animationRef.current?.pause();
    if (state === 'running') animationRef.current?.play();
  }, [state, restartKey]);

  useEffect(() => () => animationRef.current?.cancel(), []);
}
