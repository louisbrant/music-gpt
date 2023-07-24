import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

const LoadingSpinner: FC = () => {
  const spinnerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    },
  };

  const loadingMessages = ['Getting Answer...', 'Loading...', 'Retrieving...'];
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setCurrentMessage(loadingMessages[count % loadingMessages.length]);
      count += 1;
    }, 2000);
    
    return () => clearInterval(interval);
  }, [loadingMessages]);

  return (
    <div className="flex items-center justify-center pt-64 sm:pt-72 flex-col">
      <motion.div
        className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        variants={spinnerVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>
      <motion.div
        className="mt-8 text-2xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {currentMessage}
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;