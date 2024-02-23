import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/router";

const variants = {
  in: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

const Transition = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence initial={true}>
      <motion.div
        key={asPath}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
