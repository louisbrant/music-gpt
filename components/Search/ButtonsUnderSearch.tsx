import React, { useState } from 'react';
import { Box, Button } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import BLVDBookVue from '../Book/BLVDBookVue';
import { useRouter } from 'next/router';

const MotionButton = motion(Button);

interface ButtonsUnderSearchProps {
  openModal: (open: boolean) => void;
}

const ButtonsUnderSearch: React.FC<ButtonsUnderSearchProps> = ({ openModal }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();

  const buttonVariants = {
    initial: { scale: 1, boxShadow: 'none', y: 0 },
    hover: { scale: 1.05, boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', y: -2 },
    tap: { scale: 0.95 },
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenButtonClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex space-x-6 mt-4 justify-center">  
      <motion.div>
        <MotionButton
          onClick={() => { openModal(true) }}
          position="relative"
          top={0}
          right={0}
          zIndex={10}
          backgroundColor="#000"
          color="#54c7e3"
          border="2px solid #54c7e3"
          borderRadius="8px"
          paddingY="4px"
          paddingX="10px" 
          fontSize="12px"
          fontWeight="bold"
          fontFamily="'Roboto', sans-serif" 
          textAlign="center"
          _hover={{
            backgroundColor: "#FFFFFF", 
            color: "#000",
            borderColor: "#54c7e3", 
          }}
          variants={buttonVariants}
          initial="initial"
          animate="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: 'spring', stiffness: 300, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Sign In
        </MotionButton>
      </motion.div>

      <motion.div>
        <MotionButton
          onClick={handleOpenButtonClick}
          position="relative"
          top={0}
          right={4}
          zIndex={10}
          backgroundColor="#000"
          color="#54c7e3"
          border="2px solid #54c7e3"
          borderRadius="8px"
          paddingY="4px"
          paddingX="10px" // adjust as needed
          fontSize="12px"
          fontWeight="bold"
          fontFamily="'Roboto', sans-serif" // Use a modern font
          textAlign="center"
          _hover={{
            backgroundColor: "#FFFFFF", // Replace with the color you want on hover
            color: "#000", // Replace with the color you want on hover
            borderColor: "#54c7e3", // Change border color on hover
          }}
          // Framer Motion animation properties
          variants={buttonVariants}
          initial="initial"
          animate="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: 'spring', stiffness: 300, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Book Now
        </MotionButton>
        <BLVDBookVue isOpen={isOpen} onClose={handleClose} />
      </motion.div>
    </div>
  );
};

export default ButtonsUnderSearch;