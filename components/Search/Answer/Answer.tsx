import { IconCheck, IconCopy, IconHeart } from "@tabler/icons-react";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Grid, IconButton } from '@chakra-ui/react'
import { Source } from "./Source";
import { InnerLinks } from "./InnerLinks";
import { Text2Speech } from "@/components/Text2Speech/Text2Speech";
import { Message } from "@/types/answer";
import { MUSCLELAB_URL } from "@/utils/const";
import { Header } from "@/components/Header";

const MotionGrid = motion(Grid);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    },
  },
};

interface AnswerProps {
  message: Message;
  onReset: () => void;
}

export const Answer: FC<AnswerProps> = ({ message, onReset }) => {
    const [messagedCopied, setMessageCopied] = useState(false); 
    const replaceSourcesWithLinks = (answer: string, sourceLinks: string[], onReset: () => void) => {
        const elements = answer.split(/(\[[0-9]+\])/).map((part, index) => {
        if (/\[[0-9]+\]/.test(part)) {
            const link = sourceLinks[parseInt(part.replace(/[\[\]]/g, "")) - 1];
            return (
            <InnerLinks
                key={index}
                source={link}
                part={part}
                onReset={onReset}
            />
            );
        } else {
            return part;
        }
        });
        return elements;
    };

    const copyOnClick = () => {
        if (!navigator.clipboard) return;
        let text = `${message.answer}\n\nCitiations:\n`;
        message.sources.forEach((source, index) => {
            text += `[${index+1}] ${source.url}\n`;
        });
        text +=`[${message.sources.length + 1}] ` + MUSCLELAB_URL; 
        navigator.clipboard.writeText(text).then(() => {
          setMessageCopied(true);
          setTimeout(() => {
            setMessageCopied(false);
          }, 2000);
        });
    };

    return (
        <>
        <Header openModal={function (open: Boolean): void {
                throw new Error("Function not implemented.");
            } } />
            <div className="white-space-nowrap text-2xl sm:text-4xl text-[#0A0A0A] pb-4">{message.query}</div>
            { message.answer ?
                <>
                {message.sources.length > 0 && 
                    <div className="pb-3">
                    <div className="text-lg font-semibold text-blue-500">Quick Search</div>
                    <MotionGrid
                        templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        }}
                        gap={{ base: "20px", md: "20px" }}
                        justifyContent="center"
                        alignItems="stretch"
                        my={4}
                        width="100%"
                        flexWrap="wrap"
                        alignContent="flex-start"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                    {
                            message.sources.map((source, index) => (
                            <div key={index}>
                                <Source source={source.url} onReset={onReset} index={index} />
                            </div>
                            ))
                        }
                    </MotionGrid>
                    </div>
                }
                <div className="text-lg font-semibold text-blue-500">Answer</div>
                <div className="mt-2 overflow-auto text-[#0A0A0A] min-h-[100px] leading-relaxed">
                    {
                    replaceSourcesWithLinks(message.answer, message.sources.map((source) => source.url), onReset)
                    }
                </div>
                {
                    message.done && 
                    <div className="border-b border-zinc-800 pb-2">
                        <div className="my-4">
                            <Text2Speech content={message.answer} />
                        </div>
                        <div className="answer-options flex">
                        <IconButton
                            variant='ghost'
                            colorScheme='blue'
                            aria-label='Call Sage'
                            fontSize='20px'
                            icon={<IconHeart />}
                            _hover={{ bg: "blue.500", color: "white" }}
                        />
                        <IconButton
                            variant='ghost'
                            colorScheme='blue'
                            aria-label='Call Sage'
                            fontSize='20px'
                            icon={messagedCopied ? <IconCheck /> : <IconCopy />}
                            onClick={copyOnClick}
                            _hover={{ bg: "blue.500", color: "white" }}
                        />
                        </div>
                    </div>
                }
                </>
                :
                <div className="text-md text-blue-500">Getting Answer...</div>
            }
        </>
    );
};