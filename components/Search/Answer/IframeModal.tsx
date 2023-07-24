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
  import { Button, IconButton } from "@chakra-ui/react";
  import { IconMessageCircleQuestion } from '@tabler/icons-react';
  import { IconArrowLeft, IconShare, IconReport } from '@tabler/icons-react';
  import ShareSheet from './ShareSheet';
  
  interface ModalProps {
  Link: string;
  onReset: () => void;
  isOpen : boolean;
  onClose: () => void;
  sourceTitle: String;

  }
  const MotionButton = motion(Button);
  
 
  
  export const IframeModal: FC<ModalProps> = ({ Link, onReset, isOpen, onClose, sourceTitle}) => {
    const [sheetIsOpen, setSheetIsOpen] = useState(false);

    const [mIsOpen, setMIsOpen] = useState(false);

  
    const handelShareClose = ()=>{
        setSheetIsOpen(false);
      }
    
      const handelShareOpen = ()=>{
        setSheetIsOpen(true);
      }

      const handelMClose = ()=>{
        setMIsOpen(false);
      }
    
      const handelMOpen = ()=>{
        setMIsOpen(true);
      }

      

      
  return (
    <> 
        <Modal isOpen={isOpen} onClose={onClose} size='full'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader className="h-16 bg-black w-full flex justify-between items-center px-4 text-white">{sourceTitle}</ModalHeader>
            <MotionButton
                onClick={handelMOpen}
                position="fixed"
                top={3}
                right={182}
                zIndex={10}
                backgroundColor="#000"
                color="#54c7e3"
                border="2px solid #54c7e3"
                borderRadius="8px"
                paddingY="4px"
                paddingX="8px" // adjust as needed
                fontSize="8px"
                fontWeight="bold"
                fontFamily="'Roboto', sans-serif" // Use a modern font
                textAlign="center"
                _hover={{
                    backgroundColor: "#FFFFFF", // Replace with the color you want on hover
                    color: "#000", // Replace with the color you want on hover
                    borderColor: "#54c7e3", // Change border color on hover
                }}
  
                // Framer Motion animation properties
                initial="initial"
                animate="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: 'spring', stiffness: 300, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <IconReport />
            </MotionButton>
            <MotionButton
                onClick={handelShareOpen}
                position="fixed"
                top={3}
                right={126}
                zIndex={10}
                backgroundColor="#000"
                color="#54c7e3"
                border="2px solid #54c7e3"
                borderRadius="8px"
                paddingY="4px"
                paddingX="8px" // adjust as needed
                fontSize="8px"
                fontWeight="bold"
                fontFamily="'Roboto', sans-serif" // Use a modern font
                textAlign="center"
                _hover={{
                    backgroundColor: "#FFFFFF", // Replace with the color you want on hover
                    color: "#000", // Replace with the color you want on hover
                    borderColor: "#54c7e3", // Change border color on hover
                }}
  
                // Framer Motion animation properties
                initial="initial"
                animate="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: 'spring', stiffness: 300, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <IconShare />
            </MotionButton>
            <MotionButton
                onClick={onReset}
                position="fixed"
                top={3}
                right={70}
                zIndex={10}
                backgroundColor="#000"
                color="#54c7e3"
                border="2px solid #54c7e3"
                borderRadius="8px"
                paddingY="4px"
                paddingX="8px" // adjust as needed
                fontSize="8px"
                fontWeight="bold"
                fontFamily="'Roboto', sans-serif" // Use a modern font
                textAlign="center"
                _hover={{
                    backgroundColor: "#FFFFFF", // Replace with the color you want on hover
                    color: "#000", // Replace with the color you want on hover
                    borderColor: "#54c7e3", // Change border color on hover
                }}
  
                // Framer Motion animation properties
                initial="initial"
                animate="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: 'spring', stiffness: 300, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <IconMessageCircleQuestion />
            </MotionButton>
            <MotionButton
                onClick={onClose}
                position="fixed"
                top={3}
                right={4}
                zIndex={10}
                backgroundColor="#000"
                color="#54c7e3"
                border="2px solid #54c7e3"
                borderRadius="8px"
                paddingY="4px"
                paddingX="8px" // adjust as needed
                fontSize="8px"
                fontWeight="bold"
                fontFamily="'Roboto', sans-serif" // Use a modern font
                textAlign="center"
                _hover={{
                    backgroundColor: "#FFFFFF", // Replace with the color you want on hover
                    color: "#000", // Replace with the color you want on hover
                    borderColor: "#54c7e3", // Change border color on hover
                }}
  
                // Framer Motion animation properties
                initial="initial"
                animate="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: 'spring', stiffness: 300, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <IconArrowLeft />
            </MotionButton>
            <ModalBody>
            <iframe src={Link} width="100%" className='source-iframe'></iframe>
            </ModalBody>
            </ModalContent>
        </Modal>
        <ShareSheet isOpen={sheetIsOpen} onClose={handelShareClose} />
        <Modal onClose={handelMClose} isOpen={mIsOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           New Feature Comming Soon
          </ModalBody>
          <ModalFooter>
            <Button onClick={handelMClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  };