import { useEffect, useState } from 'react';

/**
 * Returns true if the cinematic loader has already been shown in this session.
 * The result is stored in sessionStorage under the key 'hasSeenLoader'.
 */
export default function useHasSeenLoader(): [boolean, boolean, () => void] {
  const [hasSeen, setHasSeen] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenLoader') === 'true';
    setHasSeen(seen);
    setIsReady(true);
  }, []);

  const markSeen = () => {
    sessionStorage.setItem('hasSeenLoader', 'true');
    setHasSeen(true);
  };

  return [hasSeen, isReady, markSeen];
}

