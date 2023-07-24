import React from 'react';
import { Select, FormControl, FormLabel } from "@chakra-ui/react";

interface PromptLibraryProps {
  handlePromptSelection: (prompt: string) => void;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({ handlePromptSelection }) => {
  const prompts = [
    'Write a fantasy story starting with "Once upon a time..."',
    'Describe the process of photosynthesis for a 5th grader',
    'Compose a love letter',
    'Outline practical steps to reduce global warming',
    'Create a dialogue between two characters meeting for the first time'
  ];

  return (
    <FormControl id="prompt-select">
      <FormLabel htmlFor="prompt-select">Prompt Library</FormLabel>
      <Select id="prompt-select" placeholder="Select prompt" onChange={(event) => handlePromptSelection(event.target.value)}>
        {prompts.map((prompt, i) => (
          <option key={i} value={prompt}>{prompt}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default PromptLibrary; 