import { IconArrowRight, IconSearch, IconMicrophone } from "@tabler/icons-react";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { useRef, KeyboardEvent, FC, useCallback, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { MAGIC_WORDS, prompts } from "@/utils/const";
import { PromptList } from "./PromptList";
import { Prompt } from "@/types/prompt";
import Link from "next/link";
import ButtonsUnderSearch from "./ButtonsUnderSearch";

interface SearchInputProps {
  magicWords: string[];
  isSearchMore?: boolean;
  startSearch: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ magicWords, isSearchMore, startSearch  }) => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPromptList, setShowPromptList] = useState(false);
  const [promptInputValue, setPromptInputValue] = useState('');
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [variables, setVariables] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const promptListRef = useRef<HTMLUListElement | null>(null);

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [magicName, setMagicName] = useState(magicWords.length > 0 ? magicWords[0] : "");

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.content.toLowerCase().includes(promptInputValue.toLowerCase()),
  );

  useEffect(() => {
    const magicNameCursor = setInterval(() => {
      if(!magicWords)
        return;
      let newPlaceholderIndex = (currentPlaceholderIndex >= (magicWords.length - 1)) ? 0 : currentPlaceholderIndex + 1;
      setCurrentPlaceholderIndex(newPlaceholderIndex);
      setMagicName(magicWords[currentPlaceholderIndex]);
    }, 3000);
    return () => clearInterval(magicNameCursor);
  }, [magicWords, currentPlaceholderIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      startSearch(query || magicName);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    updatePromptListVisibility(value);
  };

  const updatePromptListVisibility = useCallback((text: string) => {
    const match = text.match(/\/\w*$/);

    if (match) {
      setShowPromptList(true);
      setPromptInputValue(match[0].slice(1));
    } else {
      setShowPromptList(false);
      setPromptInputValue('');
    }
  }, []);
  
  const handleInitModal = () => {
    const selectedPrompt = filteredPrompts[activePromptIndex];
    if (selectedPrompt) {
      const newContent = query?.replace(
        /\/\w*$/,
        selectedPrompt.content,
      );
      setQuery(newContent);
      handlePromptSelect(selectedPrompt);
    }
    setShowPromptList(false);
  };

  const handlePromptSelect = (prompt: Prompt) => {
    const parsedVariables = parseVariables(prompt.content);
    setVariables(parsedVariables);

    if (parsedVariables.length > 0) {
      setIsModalVisible(true);
    } else {
      const updatedContent = query?.replace(/\/\w*$/, prompt.content);
      setQuery(updatedContent);
      updatePromptListVisibility(prompt.content);
    }
  };

  const parseVariables = (content: string) => {
    const regex = /{{(.*?)}}/g;
    const foundVariables = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      foundVariables.push(match[1]);
    }

    return foundVariables;
  };

  
  return (
    <Box className="relative w-full">
      <IconSearch className={`${isSearchMore ? 'text-black' : 'text-[#D4D4D8]'} absolute top-3 w-10 left-1 h-6 rounded-full opacity-80 sm:left-3 sm:top-4 sm:h-8 z-20`} />
      <motion.input
        ref={inputRef}
        className={`search-input h-12 w-full rounded-full border border-zinc-600 bg-[#FFFFFF] pr-12 pl-11 focus:border-zinc-800 ${isSearchMore ? 'text-black' : 'focus:bg-[#18181C] focus:ring-zinc-800 focus:ring-2'} focus:outline-none sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg`}
        type="text"
        placeholder={magicName}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Link href="/apps/whisper" >
        <button>
          <IconMicrophone
            className="absolute right-10 top-2.5 h-7 w-7 rounded-full p-1 hover:cursor-pointer hover:bg-[#333] sm:right-16 sm:top-3 sm:h-10 sm:w-10 text-[#54c7e3]"
          />
        </button>
      </Link>
      <button>
        <IconArrowRight
          onClick={() => startSearch(query || magicName)}
          className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-black p-1 hover:cursor-pointer hover:bg-[#333] sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-[#54c7e3]"
        />
      </button>
      {showPromptList && filteredPrompts.length > 0 && (
        <div className="absolute bottom-16 w-full">
          <PromptList
            activePromptIndex={activePromptIndex}
            prompts={filteredPrompts}
            onSelect={handleInitModal}
            onMouseOver={setActivePromptIndex}
            promptListRef={promptListRef}
          />
        </div>
      )}
    </Box>
  );
};

export default SearchInput;