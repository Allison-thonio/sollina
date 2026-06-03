"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import useHasSeenLoader from '@/hooks/useHasSeenLoader';

const panelVariants: Variants = {
  hidden: (custom: number) => ({
    x: custom === 0 ? '-100%' : '100%',
  }),
  visible: { 
    x: 0, 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
  },
  exit: (custom: number) => ({
    x: custom === 0 ? '-100%' : '100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }),
};

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasSeen, isReady, markSeen] = useHasSeenLoader();

  useEffect(() => {
    setMounted(true);
    if (isReady && !hasSeen) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        markSeen();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isReady, hasSeen, markSeen]);


  if (!mounted) return <div style={{ opacity: 0 }}>{children}</div>;

  return (
    <>
      {children}
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              custom={0}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={leftOverlayStyle}
            />
            <motion.div
              custom={1}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={rightOverlayStyle}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const leftOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '50vw',
  height: '100vh',
  backgroundColor: '#0a0a0a',
  zIndex: 99999,
  pointerEvents: 'none',
};

const rightOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: '50vw',
  width: '50vw',
  height: '100vh',
  backgroundColor: '#0a0a0a',
  zIndex: 99999,
  pointerEvents: 'none',
};
