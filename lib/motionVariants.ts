import type { Variants, Transition } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] as Transition['ease'], delay } as Transition,
  }),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] as Transition['ease'] } as Transition,
  },
}
