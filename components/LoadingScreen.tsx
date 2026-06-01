"use client"
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import useHasSeenLoader from '@/hooks/useHasSeenLoader';

const panelVariants: Variants = {
  hidden: (custom: number) => ({
    x: custom === 0 ? '-100%' : '100%',
    opacity: 0,
  }),
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  exit: (custom: number) => ({
    x: custom === 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.8, ease: 'easeInOut' },
  }),
};

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [hasSeen, markSeen] = useHasSeenLoader();

  useEffect(() => {
    if (!hasSeen) {
      setShow(true);
      // hide after animation and mark seen
        const timer = setTimeout(() => {
        setShow(false);
        markSeen();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeen]);

  if (!show) return <>{children}</>;

  return (
    <>
      <motion.div
        custom={0}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={overlayStyle}
      />
      <motion.div
        custom={1}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={overlayStyle}
      />
      {/* Keep children hidden until loader finishes */}
      {children}
    </>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '50vw',
  height: '100vh',
  backgroundColor: '#000',
  zIndex: 9999,
  pointerEvents: 'none',
};
