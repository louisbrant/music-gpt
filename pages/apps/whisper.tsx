// pages/whisper.tsx
import React from 'react';
import WhisperComponent from '../../components/Whisper/WhisperComponent';
import { useRouter } from 'next/router';

const Whisper: React.FC = () => {
  const router = useRouter()

  const handleTextReceive = (text?: string) => {
    if (text) {
      router.push(({
        pathname: '/',
        query: { text }
      }))
    }
  }

  return (
    <WhisperComponent onTextReceive={handleTextReceive} />
  )
}

export default Whisper;