import { Box, Button, FormControl, FormLabel, Textarea, Text, VStack, Container, Heading, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Text2Speech } from './Text2Speech';
import { Header } from "@/components/Header"; // Import the Header component

const ElevenTest = () => {
  const [inputText, setInputText] = useState('');
  const [content, setContent] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContent(inputText);
  };

  return (
    <Flex direction="column" minHeight="100vh"> {/* Wrap everything in the Flex component */}
      <Header openModal={function (open: Boolean): void {
        throw new Error('Function not implemented.');
      } } />
      <Container centerContent>
        <VStack spacing={8} mt={10}>
          <Box textAlign='center'>
            <Heading as='h1' size='2xl' mb={4}>
              CALM GPT
            </Heading>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl id='text-to-speech' isRequired>
              <FormLabel>Enter text</FormLabel>
              <Textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder='Type or paste your text here'
                focusBorderColor='blue.500'
                boxShadow='xl'
                borderRadius='md'
                minH='250px'
                resize='vertical'
                w='80vw' // Set the width to 80% of the viewport width
              />
            </FormControl>
            <Button colorScheme='blue' mt={4} type='submit' size='lg'>
              Generate Audio
            </Button>
          </form>
          <Box mt={8}>
            {content && <Text2Speech content={content} />}
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};

export default ElevenTest;