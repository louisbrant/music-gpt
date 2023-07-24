import { motion } from 'framer-motion';
import {
  IconLoader,
  IconPlayerPause,
  IconPlayerPlay
} from '@tabler/icons-react';

interface PlayButtonProps {
    handleClick: () => void;
    isPlaying: Boolean;
    loading: Boolean;
}

export const PlayButton = ({
    handleClick, isPlaying, loading
  }: PlayButtonProps) => {

    const buttonAnimation = {
      hover: { scale: 1.1, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" },
      tap: { scale: 0.95 },
      playColor: { backgroundColor: '#54c7e3', borderColor: '#54c7e3' },
      pauseColor: { backgroundColor: 'black', borderColor: '#54c7e3' },
      activeScale: { scale: 1.1, transition: { duration: 0.3 } },
      defaultScale: { scale: 1, transition: { duration: 0.3 } },
    };
  
  return (
    <motion.button
        onClick={handleClick}
        whileHover="hover"
        whileTap="tap"
        animate={isPlaying ? "playColor" : "pauseColor"}
        variants={buttonAnimation}
        className={`audio-btn p-2 rounded-full transition-colors duration-200 focus:outline-none shadow-md bg-black text-[#54c7e3] border-2 border-[#54c7e3]`}
    >
        {loading ? (
        <motion.svg
            className="animate-spin"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
            spin: { rotate: [0, 360], transition: { duration: 1, repeat: Infinity } },
            }}
            animate="spin"
        >
            <IconLoader />
        </motion.svg>
        ) : isPlaying ? (
        <IconPlayerPause size={24} />
        ) : (
        <IconPlayerPlay size={24} />
        )}
    </motion.button>
    );
  };