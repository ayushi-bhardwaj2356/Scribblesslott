import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · Scribblesslott`
      : "Scribblesslott · Where Art Heals One's Soul";
  }, [title]);
}
