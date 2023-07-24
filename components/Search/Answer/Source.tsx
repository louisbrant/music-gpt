import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ButtonGroup
} from '@chakra-ui/react'
import { FC } from "react";
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, IconButton, Image, Text, Stack, Card, CardHeader, Heading, CardBody } from "@chakra-ui/react";
import { IconMessageCircleQuestion } from '@tabler/icons-react';
import { IconArrowLeft, IconShare } from '@tabler/icons-react';
import { IframeModal } from './IframeModal';

interface SourceProps {
source: string;
onReset: () => void;
index: number;
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




export const Source: FC<SourceProps> = ({ source, onReset, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();



  const mainUrlName = source.split("//")[1].split("/")[0].replace("www.", "")
  const mainUrlName2 = mainUrlName.split('.')[0];
  const imageSource = `https://api.faviconkit.com/${mainUrlName}/24`;

  const [sourceTitle, setSourceTitle] = useState<string>(mainUrlName2); 
  const [sourceTitle2, setSourceTitle2] = useState<string>(mainUrlName2); 
  const [cardWidth, setCardWidth] = useState(0);

  const Link = `api/getContent?query=${source}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/getURL?query=${encodeURIComponent(source)}`);
        const newData = await res.json();
        if (newData.title !== '') {
          setSourceTitle(cleanTitle(newData.title));
          setSourceTitle2(newData.title2);
        }
      } catch (error) {
        // Handle error
      }
    };
     
      fetchData();

     return () => {
      // Cleanup function to stop the effect when the modal is closed
      // Perform any necessary cleanup here
    };
  }, [source]);

  
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const getCardWidth = (): number => {
    if (cardRef.current) {
      return cardRef.current.offsetWidth;
    }
    return 0;
  };

return (
  <>
  <Card size="sm" ref={cardRef}>
    <CardBody>

    <Text mb={2} fontWeight="bold">
    {truncateText(sourceTitle2, getCardWidth() / 9)}
      </Text> 
    <button
            className="hover:cursor-pointer hover:underline pd-10"
            onClick={onOpen}
        >
          
           <Stack spacing={1} align="left" direction="row">
              <Image src={imageSource} alt={mainUrlName} align="left" htmlHeight={24} htmlWidth={24} /> 
              <Text>{mainUrlName}</Text> 
              <Text> · {index + 1}</Text> 
            </Stack>
        </button>
    </CardBody>
  </Card>
         
  <IframeModal Link={Link} isOpen={isOpen} onClose={onClose} onReset={onReset} sourceTitle={sourceTitle} />
  </>
);
};