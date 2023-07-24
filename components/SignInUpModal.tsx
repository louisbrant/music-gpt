import React, { useState, FC } from 'react';
import { AnimatePresence, motion, useTransform, useViewportScroll } from 'framer-motion';
import { Button, Input, Box, VStack, Heading, useDisclosure, Link, Icon, CircularProgress, Text } from '@chakra-ui/react';
import { CloseIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import axios from 'axios';
import validator from 'validator';
import { useInView } from 'react-intersection-observer';

const MotionButton = motion(Button);

interface SignModalProps {
    isOpenModal: Boolean;
    openModal: (open: Boolean) => void;
}

export const SignInSignUp: FC<SignModalProps> = ({ isOpenModal, openModal }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [stage, setStage] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

    const variants = {
        hidden: { opacity: 0, y: '100vh' },  // Adjusted for full viewport height
        visible: { opacity: 1, y: '0px', transition: { type: 'spring', duration: 0.5 } },
        exit: { opacity: 0, y: '100vh', transition: { type: 'spring', duration: 0.5 } }  // Added exit animation
    };

    const logoVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const buttonVariants = {
        initial: { scale: 1, boxShadow: 'none', y: 0 },
        hover: { scale: 1.05, boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', y: -2 },
        tap: { scale: 0.95 },
    };

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const { scrollY } = useViewportScroll(); // Get the current scroll position as a `MotionValue`
    const y = useTransform(scrollY, [0, 1], ['0%', '100%']); // Change the 'y' position based on the scroll position

    // Trigger open based on scroll position
    React.useEffect(() => {
        if (inView) {
            onOpen();
        }
    }, [inView, onOpen]);

    const submitUser = () => {
        setLoading(true);
        setIsEmail(validator.isEmail(userInput));
        axios.post('YourAPI', { userInput }).then((res) => {
            setLoading(false);
            if (res.data.exists) {
                setStage(1);
            } else {
                axios.post('CreateNewUserAPI', { userInput }).then(() => {
                    setStage(1);
                });
            }
        });
    };

    const submitCode = () => {
        axios.post('verificationAPI', { code }).then((res) => {
            onClose();
        });
    };

    const resendCode = () => {
        axios.post('YourAPI', { userInput });
    };

    if (!isOpenModal) {
        return (
            <>
            </>
        )
    }
    else
        return (
            <AnimatePresence>
                <motion.div
                    style={{ position: "absolute", bottom: 0, width: "100%" }}  // Added inline styles for positioning at the bottom
                    variants={variants}
                    initial="hidden"
                    animate="visible"  // Adjusted property name
                    exit="exit"  // Adjusted property name
                >
                    <Box className="bg-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full shadow-lg z-50 " p={6} w={'100%'} borderTopLeftRadius={"0.5rem"} borderTopRightRadius={"0.5rem"} display={"grid"} justifyContent={"center"} alignContent={"center"}>

                        <Box w="100%" textAlign="right" width={{ base: "100%" }} position={"absolute"} padding={"0.5rem"}>
                            <Icon as={CloseIcon} onClick={() => { openModal(false) }} cursor="pointer" />
                        </Box>
                        <VStack spacing={4} borderTopLeftRadius={"0.5rem"} borderTopRightRadius={"0.5rem"} className='max-w-[750px]'
                            width={{ base: "100%", lg: "890px" }}

                        >
                            <div className="z-20 flex-grow flex justify-center">
                                <motion.div
                                    role="button"
                                    tabIndex={0}
                                    style={{ display: 'block', cursor: 'pointer', position: "absolute", top: "-32px", zIndex: 111 }}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={logoVariants}
                                    transition={{ duration: 0.5 }}

                                >
                                    <img src="/logos/logoicon.png" className="h-16 w-auto mx-auto" alt="ML Logo" />
                                </motion.div>
                            </div>
                            <Heading color={"white"}>{stage === 0 ? 'Welcome Back!' : 'Verify Code'}</Heading>
                            {stage === 0 ? (
                                <Input placeholder="Phone number or email" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="border border-gray-300 rounded-lg" />
                            ) : (
                                <>
                                    <Input placeholder="Verification code" value={code} onChange={(e) => setCode(e.target.value)} className="border border-gray-300 rounded-lg" />
                                    <Button onClick={resendCode} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Resend Code</Button>
                                    {isEmail ? (
                                        <Link href="message://"><Icon as={EmailIcon} mr="2" /> Open Email App</Link>
                                    ) : (
                                        <Text fontSize="sm"><Icon as={ChatIcon} mr="2" /> Open Messages</Text>
                                    )}
                                </>
                            )}
                            <Box w="100%" >
                                <Button
                                    onClick={submitUser}
                                    w={"100%"}
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
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </VStack>
                    </Box>
                </motion.div>
            </AnimatePresence>
        );
}