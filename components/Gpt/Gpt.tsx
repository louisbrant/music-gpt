import React, { useState } from "react";
import {
Box,
Button,
Stack,
Text,
Input,
Spinner,
VStack,
Heading,
FormLabel,
Container,
useTheme,
FormControl,
useColorModeValue,
Flex,
IconButton,
Tooltip,
Icon,
} from "@chakra-ui/react";
import { AiOutlineAim, AiOutlineCopy } from "react-icons/ai";
import PromptLibrary from './PromptLibrary'; // consider to have this path adjusted
import { Header } from "../Header";


const GPTComponent = () => {
const [loading, setLoading] = useState(false);
const [content, setContent] = useState("");
const [userInput, setUserInput] = useState("");
const theme = useTheme();

const API_KEY = "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";

// Define `prompt` as a string.
const handlePromptSelection = (prompt: string) => {
    setUserInput(prompt);
  };
  
  // `event` parameter type should be `React.ChangeEvent<HTMLInputElement>`.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };
  
  // `event` parameter type should be `React.FormEvent<HTMLFormElement>`.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Add this to prevent refreshing the page


  const systemMessage = "This is a placeholder system message.";
  const userMessage = userInput;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
    }),
  };
  setLoading(true);  // Set loading to true before making the API request

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

return (
<Container centerContent bg={useColorModeValue('gray.50', 'gray.800')} minHeight="100vh" py={10} maxW="container.md">
  <Header openModal={function (open: Boolean): void {
      throw new Error("Function not implemented.");
    } } />
    <Box
      p={8}
      maxWidth="700px"
      borderWidth={1}
      borderRadius={8}
      boxShadow="2xl"
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Flex justify="center" wrap="wrap">
        <Box textAlign="center">
          <Heading mb={4} fontSize='32px' fontWeight='bold'>Prompt Runner</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize='16px'>
            We need this later
          </Text>
        </Box>
        <Icon
          as={AiOutlineAim}
          boxSize={10}
          ml={4}
          color={useColorModeValue('teal.500', 'teal.300')}
        />
      </Flex>
      

      <Box my={6} textAlign="left">

<form onSubmit={handleSubmit}>
  <FormControl isRequired>
    <FormLabel>User Message</FormLabel>
    <Input
      bg={useColorModeValue(theme.colors.gray[50], theme.colors.gray[700])}
      type="text"
      placeholder="Enter your message..."
      size="lg"
      value={userInput}
      onChange={handleInputChange}
    />
  </FormControl>

  <Box mt={4}> {/* Added Box wrapper with mt */}
    <PromptLibrary handlePromptSelection={handlePromptSelection} />
  </Box>

  <Stack isInline justifyContent="center" mt={8}> {/* Increased mt value */}
     <Button colorScheme="teal" type="submit" isLoading={loading} loadingText="Generating...">
      JUST DO IT
     </Button>
  </Stack>
</form>
</Box>

      <Box maxW="md" borderWidth={1} borderRadius={8} overflow="hidden" boxShadow="lg">
        <Box p={6} mt={2}>
          <Heading
            mt={1}
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            textAlign="center"
            fontSize="24px"
          >
            Generated Text
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="lg" mt={4}>
            {!loading && content}
          </Text>
        </Box>
      </Box>
    </Box>
  </Container>
);
};

export default GPTComponent;

