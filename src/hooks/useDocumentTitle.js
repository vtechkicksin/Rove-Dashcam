import { useEffect } from 'react';

const SUFFIX = 'ROVE Dash Cam';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : `${SUFFIX} — America’s Most Trusted Dash Cams`;
  }, [title]);
}
