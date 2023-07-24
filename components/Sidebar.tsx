import {
  Box,
  Badge,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  List,
  ListItem,
  useColorModeValue,
  Collapse,
  HStack,
  Flex,
  Text,
  Center,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  FaAngleUp,
  FaAngleDown,
  FaThList,
  FaFlask,
} from "react-icons/fa";
import { motion } from "framer-motion";
import WaitlistButton from './Sidebar/WaitlistButton';
import { SocialIcons } from './Sidebar/SocialIcons'; 
import { WaitlistPlans } from './Sidebar/WaitlistPlansProps'; 
import { MuscleLabOne } from './Sidebar/MuscleLabOne'; 
import { AllServices } from './Sidebar/AllServices'; 
import { InLabServices } from './Sidebar/InLabServicesProps'; 
import { MenuItem } from './Sidebar/MenuItem';
import { useRouter } from 'next/router';

declare let blvd: any;

const MotionListItem = motion(ListItem);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const socialIconColor = useColorModeValue("blue.800", "blue.500");
  const [showServices, setShowServices] = useState(false);
  const router = useRouter();

  const handleLogoClick = () => {
    if(window.location.pathname === '/') {
      onClose();
    }
    else {
      router.push('/');
    }
  }
  

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={bgColor} boxShadow="2xl">
        <DrawerCloseButton
          size="lg"
          borderRadius="full"
          _focus={{ boxShadow: "outline" }}
        />
        <DrawerHeader borderBottomWidth="2px" borderBottomColor="gray.200">
          <Flex direction="column" align="center" justify="center">
            <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }} onClick={handleLogoClick}>
              <Image
                src="/logos/logo.png"
                alt="Muscle Lab logo"
                boxSize={{ base: "150px", md: "200px" }}
                objectFit="contain"
                loading="lazy"
              />
            </motion.div>
          </Flex>
        </DrawerHeader>
          <DrawerBody>
            <Box boxShadow="lg" p="6" rounded="md" bg="gray.100" my={5}>
              
              <InLabServices />
            </Box>
        
            <Spacer mt={4} />
        
            <Center py={4}>
              <MuscleLabOne />
            </Center>
          <Box bg="gray.50" p={6} borderRadius="lg" textAlign="center">
            <WaitlistPlans />
            <Flex
              flexDirection="column"
              alignItems="center"
              mt={2}
              mb={4}
            >
              <Badge
                mt={1}
                fontSize="0.9rem"
                fontWeight="bold"
                colorScheme="orange"
                borderRadius="md"
              >
                Coming Soon
              </Badge>
              <Text
                fontSize="2xl"
                fontWeight="extrabold"
                color="blue.600"
              >
                MUSCLE LAB CLASSES
              </Text>
            </Flex>
            <Center>
            <WaitlistButton fontSize={{base: "md", lg: "xl"}} />
            </Center>
          </Box>
        </DrawerBody>
        <DrawerFooter
          mt={4}
          borderTopWidth="1px"
          py={4}
          display="flex"
          justifyContent="space-between"
        >
          <SocialIcons color={socialIconColor} hoverColor={textColor} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};