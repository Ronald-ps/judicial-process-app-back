import { motion } from "framer-motion";

interface AnimationPageContainerProps {
  children: React.ReactNode;
}

export const AnimationPageContainer = (props: AnimationPageContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} // start from the right
      animate={{ opacity: 1, x: 0 }} // move to the center
      exit={{ opacity: 0, x: -20 }} // exit to the left
      transition={{ duration: 0.3 }}
    >
      {props.children}
    </motion.div>
  );
};
