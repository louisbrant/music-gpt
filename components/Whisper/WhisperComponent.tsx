import { useEffect, useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react'
import { useWhisper } from '@chengsokdara/use-whisper';
import { FiStopCircle, FiMic, FiCheck } from 'react-icons/fi'
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';

const MotionRecordButton = motion(Button)

interface WhisperComponentProps {
  onTextReceive: (text?: string) => void;
}

const WhisperComponent: React.FC<WhisperComponentProps> = ({ onTextReceive }) => {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    startRecording,
    stopRecording,
    pauseRecording,
  } = useWhisper({
    apiKey: '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',
    whisperConfig: {
      language: 'en',
    },
  });
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    onTextReceive(transcript.text);
  }, [transcript.text, onTextReceive]);

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const handleStop = async () => {
    await stopRecording();
    startRecording(); // Add this line to restart recording after stopping
  };

  const handlePause = async () => {
    await pauseRecording();
    setTimeout(() => startRecording(), 5000); // 5-second pause before resuming recording
  };

  const circleVariants = {
    speaking: { scale: 2.5 },
    silent: { scale: 1 },
  };

  const backgroundVariants = {
    recording: { backgroundColor: 'rgba(63, 71, 250, 1)' },
    idle: { backgroundColor: 'rgba(33, 31, 38, 1)' },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen transition-all duration-500 overflow-hidden text-white"
      variants={backgroundVariants}
      animate={recording ? 'recording' : 'idle'}
    >
      {recording ? (
        <motion.div
          className="w-52 h-52 bg-white/[0.5] rounded-full"
          variants={circleVariants}
          animate={speaking ? 'speaking' : 'silent'}
        />
      ) : null}
      <div className='flex flex-col absolute items-center'>
        {!transcribing ? (
          <MotionRecordButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            leftIcon={recording ? <FiStopCircle size={20} /> : <FiMic size={20} />}
            colorScheme={recording ? 'red' : 'blue'}
            fontSize="14px"
            fontWeight="normal"
            variant='ghost'
            _active={{ bg: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            _hover={{ bg: 'transparent' }}
            onClick={!recording ? () => startRecording() : () => stopRecording()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              color: hovered && !recording ? 'rgba(63, 71, 250, 1)' : 'rgba(255, 255, 255, 1)',
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {recording ? "Tap to stop recording" : "Tap to record"}
          </MotionRecordButton>
        ) : (
          <div className="flex flex-row items-center">
            <Spinner size='sm' />
            <div className="p-2 text-sm text-center">
              Converting to text...
            </div>
          </div>
        )}
        {!recording && transcript.text && (
          <div className="flex flex-row items-center">
            <FiCheck size={20} />
            <div className="p-2 text-sm text-center">
              {transcript.text}
            </div>
          </div>
        )}
      </div>
      <Link href="/">
        <button>
          <IconArrowLeft
            className="absolute left-2.5 top-2.5 h-7 w-7 rounded-full bg-black p-1 hover:cursor-pointer hover:bg-[#333] sm:left-3 sm:top-3 sm:h-10 sm:w-10 text-[#54c7e3]"
          />
        </button>
      </Link>
    </motion.div>
  );
};

export default WhisperComponent;