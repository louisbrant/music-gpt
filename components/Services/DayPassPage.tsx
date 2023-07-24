import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack, Image, Flex, useColorMode, useColorModeValue, ScaleFade, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, CircularProgress, IconButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronDownIcon, InfoIcon } from '@chakra-ui/icons';
import { Header } from "@/components/Header";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionImage = motion.img;

interface DayPassOption {
  title: string;
  description: string;
  img: string;
  details: string;
}

interface DayPassPageProps {
  dayPassOptions: DayPassOption[];
}

const DayPassPage: React.FC<DayPassPageProps> = ({ dayPassOptions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<DayPassOption | null>(null);
  const bg = useColorModeValue("#f8fafc", "#171923");
  const color = useColorModeValue("black", "white");
  
  const handleBooking = (option: DayPassOption) => {
    setSelectedOption(option);
    onOpen();
  };

  return (
    <VStack spacing={8} align="start" bg={bg} minH="100vh" p={8}>
      <Header openModal={function (open: Boolean): void {
        throw new Error('Function not implemented.');
      } } />
      <AnimatePresence>
        <MotionBox w="full" py={8} px={10} bg="gray.200" borderRadius="xl" shadow="lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <MotionHeading as="h1" fontWeight="bold" fontSize="6xl" color={color} letterSpacing="tight" mb={8}>
            Book a Day Pass
          </MotionHeading>
          {dayPassOptions.map((option, index) => (
            <MotionBox key={index} drag="x" dragConstraints={{ left: -100, right: 100 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Flex key={option.title} borderRadius="xl" boxShadow="lg" bg="white" p={6} direction={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "start" }} overflow="hidden" mb={8}>
                <MotionBox flexBasis={{ base: "100%", md: "50%" }} mr={{ base: 0, md: 8 }} mb={{ base: 6, md: 0 }}>
<Image src={option.img} alt={option.title} width="100%" height="200px" objectFit="cover" borderRadius="xl" />                </MotionBox>
                <MotionBox flexBasis={{ base: "100%", md: "50%" }}>
                  <MotionHeading as="h2" fontWeight="bold" fontSize="3xl" color={color} letterSpacing="tight" mb={4}>
                    {option.title}
                  </MotionHeading>
                  <MotionText fontSize="xl" color="gray.600" mb={6}>
                    {option.description}
                  </MotionText>
                  <MotionButton onClick={() => handleBooking(option)} backgroundColor="#000" color="#54c7e3" size="lg" rightIcon={<ChevronRightIcon boxSize={6} />}>
                    Book Now
                  </MotionButton>
                </MotionBox>
              </Flex>
            </MotionBox>
          ))}
        </MotionBox>
      </AnimatePresence>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedOption?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={6}>{selectedOption?.description}</Text>
            <Text>{selectedOption?.details}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default DayPassPage;