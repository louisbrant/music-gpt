import '@/styles/globals.css';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps, router }: AppProps) {
  const [waitingClick, setWaitingClick] = useState<any>(null);
  const [lastClick, setLastClick] = useState<number>(0);
  const processClick = (e: any) => {
    if(lastClick && e.timeStamp - lastClick < 250 && 
      waitingClick && window.location.pathname !== '/'){
      setLastClick(0);
      clearTimeout(waitingClick);
      setWaitingClick(null);
      router.push('/');
    }
    else{
      setLastClick(e.timeStamp);
      setWaitingClick(setTimeout(()=>{
      setWaitingClick(null);
      }, 251))
    }
  }
  
  return (
    <div onClick={processClick} className="root">
    <ChakraProvider>
      <AnimatePresence exitBeforeEnter>
        <motion.div 
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ChakraProvider>
    <Analytics />
    </div>
  );
}

export default MyApp;