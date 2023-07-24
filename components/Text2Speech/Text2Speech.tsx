import textToSpeech from '@/pages/api/Text2Speech';
import { motion } from 'framer-motion';
import {
  IconDownload
} from '@tabler/icons-react';
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { PlayButton } from './PlayButton';

interface Props {
  content: string;
}

export const Text2Speech = ({
    content
  }: Props) => {
    const [audioURL, setAudioURL] = useState<string|null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number | undefined>(0);
    const [currentTime, setCurrentTime] = useState<number | undefined>(0);
    const [isDownload, setIsDownload] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null)

    const progressBarStyle = {
      width: `${((currentTime || 0) / (duration || 0.01)) * 100}%`,
      backgroundColor: 'blue',
      height: '4px',
      borderRadius: '2px',
      transition: 'width 0.3s ease',
    };

    const progressBarBackgroundAnimation = {
      hover: { backgroundColor: "#c7d4e3", transition: { duration: 0.2 } },
      default: { backgroundColor: "gray", transition: { duration: 0.2 } },
    };

    const downloadButtonAnimation = {
      hover: { scale: 1.1, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" },
      tap: { scale: 0.95 },
      pulsate: { scale: [1, 1.05], boxShadow: ["0px 0px 5px rgba(0, 0, 0, 0.3)", "0px 0px 10px rgba(0, 0, 0, 0.3)"], transition: { duration: 0.8, repeat: Infinity } },
    };

    const timeDisplayAnimation = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };

    const handleAudioFetch = async () => {
        setLoading(true);
        const data = await textToSpeech(content.replace(/ *\[[^\]]*]/g, ''));
        const blob = new Blob([data], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setLoading(false);
    };

    const handlePlayPause = () => {
      if(!audioURL) {
        handleAudioFetch();
      }
      setIsPlaying(!isPlaying);
    }

    const handleEnded = () => {
    }

    const calculateTime = (sec: number | undefined) => {
      if(sec) {
        const minutes = Math.floor(sec / 60)
        const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(sec % 60)
        const newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

        return `${newMinutes}:${newSeconds}`
      }
      return "00:00";
    }

    const handleDownload = () => {
      setIsDownload(true);
      if(!audioURL)
        handleAudioFetch();
    }

    const downloadAudio = useCallback(
      () => {
      if (audioURL)
      fetch(audioURL)
        .then((response) => {
          return response.blob()
        })
        .then((data) => {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = 'audio';
          a.click();
        });
    },
    [audioURL]
    );

    useEffect(() => {
      let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (!duration && audioRef.current?.currentTime) {
          setDuration(audioRef.current?.duration);
        }
        setCurrentTime(audioRef.current?.currentTime);
        if (audioRef.current?.currentTime === audioRef.current?.duration) {
          setIsPlaying(false);
          setCurrentTime(0);
          clearInterval(interval);
        }

      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, duration]);
  
  useEffect(() => {
    if(audioURL) {
      isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    }
  }, [audioURL, isPlaying]);
  
  useEffect(() => {
    if(audioURL && isDownload) {
        setIsDownload(false);
        downloadAudio();
    }
  }, [audioURL, isDownload, downloadAudio]);
  
  return (
    <div className="bg-gray-200 p-5 rounded-lg shadow-md w-full max-w-md">
        <div className="relative w-full mb-4">
          <motion.div className="bg-gray-300 rounded h-1 overflow-hidden" variants={progressBarBackgroundAnimation} animate="default" whileHover="hover">
            <div style={progressBarStyle} className="absolute h-full bg-blue-600"></div>
          </motion.div>
        </div>
        <div className="flex items-center justify-center">
            <PlayButton 
              handleClick = {handlePlayPause}
              isPlaying = {isPlaying}
              loading = {loading}
            />
            <motion.div className="text-xs text-gray-700 ml-2" initial="hidden" animate="visible" exit="hidden" variants={timeDisplayAnimation}>
              {currentTime ? calculateTime(currentTime) : "00:00"}
              {duration ? `/${calculateTime(duration)}` : ""}
            </motion.div>
            <div className="relative">
              <motion.button onClick={handleDownload} className="focus:outline-none ml-3 text-blue-600" variants={downloadButtonAnimation} whileHover="hover" whileTap="tap" animate={audioURL && !isDownload ? "pulsate" : ""}>
                <IconDownload size={16} />
              </motion.button>
              <motion.div className="absolute left-0 -bottom-5 opacity-0 mt-2 w-max p-1 text-xs bg-black text-white rounded z-10 whitespace-nowrap" whileHover={{ opacity: 1, y: -5, transition: { duration: 0.2 } }} initial={{ opacity: 0 }}>
                Download Audio
              </motion.div>
            </div>
          </div>
        <audio src={audioURL ? audioURL : ""} ref={audioRef} autoPlay onEnded={handleEnded} />
      </div>
    );
  };