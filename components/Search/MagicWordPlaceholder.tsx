import { useEffect, useState, useRef, FC } from "react";

interface MagicWordPlaceholderProps {
  magicWords: string[];
}

const MagicWordPlaceholder: FC<MagicWordPlaceholderProps> = ({ magicWords }) => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [magicName, setMagicName] = useState(magicWords[currentPlaceholderIndex]);

  useEffect(() => {
    const magicNameCursor = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % magicWords.length);
      setMagicName(magicWords[currentPlaceholderIndex]);
    }, 3000);
    return () => clearInterval(magicNameCursor);
  }, [magicWords, currentPlaceholderIndex]);

  return null;
};

export default MagicWordPlaceholder;