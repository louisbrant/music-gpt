import { IconPlus } from "@tabler/icons-react";
import { FC, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import SearchInput from "../SearchInput";
import HomeContext from '@/components/home/home.context';
import { throttle } from "lodash";
import { Answer } from "./Answer";

interface AnswersProps {
  onReset: () => void;
  loading: boolean;
}

export const Answers: FC<AnswersProps> = ({ onReset, loading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    state: { messages, relatedData, isGettingRelatedData },
    handleSearch
  } = useContext(HomeContext);
   
  useEffect(() => {
    throttledScrollDown();
  }, [messages, relatedData]);
  
  const scrollDown = () => {
      messagesEndRef.current?.scrollIntoView(true);
  };

  const throttledScrollDown = throttle(scrollDown, 250);

  const startSearch = async (query: string) => {
    await handleSearch(query);
  }

  return (
    <div className="flex h-screen overflow-auto">
      <div className="mb-24 pt-16 max-w-[800px] px-8 sm:px-24">
        {
          messages.map((message, index) => (
            <motion.div
              className="space-y-4 pt-2 transition-all duration-500 ease-in-out pb"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
            >
              <Answer
                message={message}
                onReset={onReset}
              />
            </motion.div>
          ))
        }
        {
          isGettingRelatedData && <div className="text-md text-blue-500 pt-2">Getting Related Questions...</div>
        }
        {
          relatedData.length > 0 &&
          <>
            <div className="text-md text-blue-500 pt-2">Related</div>
            {
              relatedData.map((followUpQuestion, index) => 
              <div key={index} className="text-black cursor-pointer border-b border-zinc-800 py-2 flex justify-between" onClick={() => handleSearch(followUpQuestion)}>
                {followUpQuestion}
                <div className="text-blue-500"><IconPlus /></div>
              </div>
              )
            }
          </>
        }
        <div className="h-[100px]" ref={messagesEndRef} />
        <div className="fixed bottom-0 max-w-[800px] w-full px-8 sm:px-24 left-0 pb-4 bg-[#F4F4F5]">
          <SearchInput
            magicWords={relatedData}
            startSearch={startSearch}
            isSearchMore={true}
          />
        </div>
      </div>
    </div>
  );
};