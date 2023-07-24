import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Heading,
  Text,
  Spinner,
  useColorModeValue,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Text2Speech } from "../Text2Speech/Text2Speech";
import { Header } from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useSpring, config, animated } from "react-spring";
import CardContainer from "../Search/CardContainer/CardContainer";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

// Generate an array with image paths from takefive1.png to takefive28.png
const bgImages = Array.from({ length: 28 }, (_, i) => `/takefivebackgrounds/takefive${i + 1}.png`);
let curImageIndex = Math.floor(Math.random() * bgImages.length);

// motion variants
const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
  exit: { opacity: 0 },
};

const TakeFiveChild = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const bgInputColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.500');
  const [userFeeling, setUserFeeling] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  

  /* Rotate images every 10 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      curImageIndex = (curImageIndex + 1) % bgImages.length;
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const [loadingText, setLoadingText] = useState("Generating...");

  useEffect(() => {
    let i = 0;
    const loadingMessages = ["Generating...", "Almost there...", "Just a second..."];
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText(loadingMessages[i % loadingMessages.length]);
        i += 1;
      }, 4000); // Change message every 2 seconds
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFeeling(e.target.value);
  };

  const API_KEY = "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";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const systemMessage = "You are an AI model trained to craft a personalized and engaging 5-minute meditation script for \"Take Five\", a wellness journey from Muscle Lab. Your task is to develop a seamless meditation experience that will guide users through a peaceful and calming journey amid the stresses of their daily lives.";

    const userMessage = `Remember to ensure the script:\n\n- Flows Naturally: Utilize appropriate punctuation for establishing rhythm, emotion, and context, creating a natural, smooth flow in the narration.\n- Maintains Clarity: Spell out numbers, acronyms, and foreign words to improve pronunciation and clarity during the text-to-speech conversion.\n- Indicates Pauses: Incorporate single dashes (-) or double dashes (--) to create meaningful pauses, maintaining a meditative pace.\n- Creates a Soothing Atmosphere: Use vivid, sensory language to construct a tranquil environment that will immerse the users in the experience.\n- Provides Clear Instructions: Detail the meditation process step-by-step to guide the users effectively, ensuring they can easily follow along.\n\nYour goal is to create an immersive and calming meditation experience that helps users take a rejuvenating 5-minute break from the chaos of their day. Craft the script to be soothing, engaging, and easy to follow, ensuring every word contributes to the serenity of the moment. Remember, the more effective the script, the more impactful the meditation session will be.\n\nNow using all the guidelines above, generate a script for: ${userFeeling}`;

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage },
        ],
      }),
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
      const result = await response.json();
      const generatedText = result.choices[0].message.content;
      setContent(generatedText);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GPT API:", error);
      setLoading(false);
    }
  };

  const [bgImage, setBgImage] = useState(bgImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage(current => switchBackground(current));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const switchBackground = (current: string) => {
    const index = bgImages.indexOf(current);
    return bgImages[(index + 1) % bgImages.length];
  };

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
      <div className="relative w-full min-h-screen">
        <animated.div
          style={{
            ...springProps,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
          }}
          className="absolute z-0 bg-cover bg-no-repeat w-full h-full"
        >
          <Header openModal={function (open: Boolean): void {
          throw new Error("Function not implemented.");
        } } />
          <Container maxW='container.xl' centerContent> mt={10}
            <VStack
              spacing={8}
              my={{ base: "16", md: "20" }}
              py={8}
              px={8}
              w={['90%', '80%', '70%', '60%']}
              bg={colorMode === 'light' ? 'whiteAlpha.800' : 'gray.800'}
              boxShadow='xl'
              borderRadius='lg'
            >
              <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} textAlign="center">
                <Heading as="h1" size="2xl" mb={2}>
                  Take Five
                </Heading>
                <Text fontSize="md" fontWeight="medium">
                  Your Personalized Wellness Pause.
                </Text>
              </MotionBox>
  
              {!content && (
                <form onSubmit={handleSubmit}>
                  <FormControl id="user-feeling" isRequired>
                    <FormLabel>How do you feel today?</FormLabel>
                    <Input
                      value={userFeeling}
                      onChange={handleFeelingChange}
                      placeholder="Enter how you feel"
                      backgroundColor={bgInputColor}
                      size="lg"
                      height="16"
                      borderColor={borderColor}
                      color={textColor}
                      _placeholder={{ color: textColor }}
                      focusBorderColor="blue.500"
                      borderRadius="lg"
                    />
                  </FormControl>
                  <Flex justifyContent="center" alignItems="center">
                    <MotionButton
                      colorScheme="white"
                      mt={10}
                      type="submit"
                      size="lg"
                      isLoading={loading}
                      loadingText={loadingText}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      border='2px' // specify border width
                      borderColor='grey.500' // specify border color
                      color="grey" // Set the color of the text her
                    >
                      {!loading && "Start Meditation"}
                    </MotionButton>
                  </Flex>
                  </form>
                  )}
  
              {content && <Text2Speech content={content} />}
            </VStack>
          </Container>
        </animated.div>
      </div>
    );
  };
  export default TakeFiveChild;