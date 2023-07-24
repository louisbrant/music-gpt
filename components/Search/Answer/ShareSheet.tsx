import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Button, Center, Heading, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import { CopyIcon, EmailIcon } from '@chakra-ui/icons';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandWhatsapp } from '@tabler/icons-react';

const shareOptions = [
  { name: 'Copy URL', icon: <CopyIcon boxSize={6} />, color: 'gray' },
  { name: 'Email', icon: <EmailIcon boxSize={6} />, color: 'teal' },
  { name: 'Facebook', icon: <IconBrandFacebook size={24} />, color: 'facebook' },
  { name: 'Instagram', icon: <IconBrandInstagram size={24} />, color: 'pink' },
  { name: 'Twitter', icon: <IconBrandTwitter size={24} />, color: 'twitter' },
  { name: 'WhatsApp', icon: <IconBrandWhatsapp size={24} />, color: 'whatsapp' },
];

const MotionModal = motion(Modal);
const MotionModalContent = motion(ModalContent);

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareSheet: React.FC<ShareSheetProps> = ({ isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray');

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionModal isOpen={isOpen} onClose={onClose} isCentered size="md" motionPreset="slideInBottom">
          <ModalOverlay />
          <MotionModalContent
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            bg={bg}
            rounded="xl"
            overflow="hidden"
            maxH={'60vh'}
            maxW={'96'}
            m={3}
          >
            <ModalCloseButton top={3} right={3} rounded={'full'} />
            <ModalBody p={5}>
              <VStack align="stretch" spacing={6}>
                <Center>
                  <Heading size="lg">Share To</Heading>
                </Center>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                  {shareOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      leftIcon={option.icon}
                      colorScheme={option.color}
                      width={{ base: '100%', sm: 'auto' }}
                    >
                      {option.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </VStack>
            </ModalBody>
          </MotionModalContent>
        </MotionModal>
      )}
    </AnimatePresence>
  );
};

export default ShareSheet;