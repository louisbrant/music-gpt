import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { FC } from "react";
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, IconButton } from "@chakra-ui/react";
import { IconMessageCircleQuestion } from '@tabler/icons-react';
import { IconArrowLeft } from '@tabler/icons-react';
import { IframeModal } from './IframeModal';

interface SourceProps {
  source: string;
  part: string;
  onReset: () => void;
}
const MotionButton = motion(Button);

type Data = {
    title: string;
  };

  
  function getMaxSubstring(inputString: string, maxNum: number): string {
    if (inputString.length <= maxNum) {
      return inputString; 
    }
    let substring: string = inputString.substr(0, maxNum); 
    let lastSpaceIndex: number = substring.lastIndexOf(' '); 
    if (lastSpaceIndex !== -1) {
      substring = substring.substr(0, lastSpaceIndex); 
    }
    return substring;
  }
  
  function removeWordsFromArray(words: string[], inputString: string): string {
    const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
    const result = inputString.replace(regex, '');
    return result;
  }
  
  function cleanTitle(title:string): string {
    const siteName = title.replace(/^(.*?)\s*[-:|_()\[\]]+.*/, '$1');
        
            
        const words: string[] = siteName.split(" ");
        const uniqueWords: Set<string> = new Set(words);
        const uniqueWordsArray: string[] = [];
        uniqueWords.forEach(val => {
          uniqueWordsArray.push(val);
        })
  
        for (let i: number = 0; i < uniqueWordsArray.length; i++) {
          const currentWord: string = uniqueWordsArray[i];
          for (let j: number = i + 1; j < uniqueWordsArray.length; j++) {
            const nextWord: string = uniqueWordsArray[j];
            if (nextWord.toLowerCase().includes(currentWord.toLowerCase())) {
              uniqueWordsArray.splice(j, 1);
              j--;
            }
          }
        }
      
        const newTitle = getMaxSubstring(uniqueWordsArray.join(' '), 25);
        const wordsToRemove = [
          "Facebook",
          "Twitter",
          "Instagram",
          "LinkedIn",
          "YouTube",
          "Pinterest",
          "Snapchat",
          "TikTok",
          "Reddit"
        ];
        const result = removeWordsFromArray(wordsToRemove, newTitle);
  
        return result;
  }


  

export const InnerLinks: FC<SourceProps> = ({ source, part, onReset }) => {

    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const mainUrlName = source.split("//")[1].split("/")[0].replace("www.", "")
    const mainUrlName2 = mainUrlName.split('.')[0]
    const [sourceTitle, setSourceTitle] = useState<String>(mainUrlName); 

    const Link = `api/getContent?query=${source}`;
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`/api/getURL?query=${encodeURIComponent(source)}`);
             const newData: Data = await res.json();
             if(newData.title!==''){
              setSourceTitle(cleanTitle(newData.title));
             } 
            
          } catch (error) {
            
          }
          
        };
        fetchData();
      }, [source]);

  return (
    <>
        <button
            className="hover:cursor-pointer hover:underline hover:cursor-pointer text-blue-500"
            onClick={onOpen}
        >
            {part}
        </button>
        <IframeModal Link={Link} isOpen={isOpen} onClose={onClose} onReset={onReset} sourceTitle={sourceTitle} />
    </>
  );
};