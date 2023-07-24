// Home.tsx
import { Answers } from "@/components/Search/Answer/Answers";
import { Search } from "@/components/Search";
import { SearchQuery, Source } from "@/types";
import Head from "next/head";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import endent from "endent";
import HomeContext from '../components/home/home.context';
import { HomeInitialState, initialState } from '../components/home/home.state';

import { useCreateReducer } from '@/hooks/useCreateReducer';
import { Message } from "@/types/answer";
import { isJson } from "@/utils/common";
import { SignInSignUp } from "@/components/SignInUpModal";

export default function Home() {
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const myApiKey = "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";
  const [loading, setLoading] = useState<boolean>(false);
  const [showSign, setShowSign] = useState<Boolean>(false);
  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });
  const {
    state: {
      messages
    },
    dispatch,
  } = contextValue;


  const handleSearch = async (query: string) => {
    setLoading(true);
    let updatedMessages: Message[] = [
      ...messages,
      {
        query: query,
        answer: "",
        sources: []
      }
    ];
    dispatch({field: 'messages', value: updatedMessages});
    dispatch({field: 'relatedData', value: []});
    const sources = await fetchSources(query);
    await handleStream(query, sources);
  };

  const fetchSources = async (searchQuery: string) => {
    const response = await fetch("/api/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: searchQuery })
    });

    if (!response.ok) {
      setLoading(false);
    }

    const { sources, log }: { sources: Source[], log: any } = await response.json();

    return sources;
  };

  const handleStream = async (query: string, sources: Source[]) => {
    try {
      const prompt = endent`Provide a 2-3 sentence answer to the query based on the following sources. Be original, concise, accurate, and helpful. Cite sources as [1] or [2] or [3] after each sentence (not just the very end) to back up your answer (Ex: Correct: [1], Correct: [2][3], Incorrect: [1, 2]). Remember to always answer with the best interest of Muscle Lab in mind and all the details in your system role.
      
      ${sources.map((source, idx) => `Source [${idx + 1}]:\n${source.text}`).join("\n\n")}
      `;

      const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, apiKey: myApiKey })
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      const data = response.body;

      if (!data) {
        return;
      }
      setIsSearched(true);
      let updatedMessages: Message[] = [
        ...messages,
        {
          query: query,
          answer: "",
          sources
        }
      ];
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let answerVal = "";
      let text = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        text += chunkValue;
        updatedMessages = updatedMessages.map((message, index) => {
          if (index === updatedMessages.length - 1) {
            return {
              ...message,
              answer: text,
            };
          }
          return message;
        });
        dispatch({ field: 'messages', value: updatedMessages });
      }

      updatedMessages = updatedMessages.map((message, index) => {
        if (index === updatedMessages.length - 1) {
          return {
            ...message,
            done: true
          };
        }
        return message;
      });
      dispatch({ field: 'messages', value: updatedMessages });
      getRelatedData(text);
    } catch (err) {
      console.log('error', err);
    }
  };


  const getRelatedData = async (answer: string) => {
    dispatch({field: 'isGettingRelatedData', value: true});
    const prompt = `Rules you must follow:\n- You only respond in JSON format\n- Read the following information and generate at most 3 follow-up questions the Human can ask.\n- Your response MUST be a valid JSON array of strings like this: [\"some question\", \"another question\"]\n- Each message in your response should be concise, no more than 15 words\n- You MUST write the follow-ups in English.\\n- Don't output anything other text\nThe information is:\n ${answer.replace(/ *\[[^\]]*]/g, '')}`;
    
    const response = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, apiKey: myApiKey })
    });
    
    if (!response.ok) {
      console.log('ja_e', response);
      throw new Error(response.statusText);
    }
    
    const data = response.body;

    if (!data) {
      dispatch({field: 'isGettingRelatedData', value: false});
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let text = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      text += chunkValue;
    }
    if(isJson(text))
      dispatch({field: 'relatedData', value: JSON.parse(text)});
      
    dispatch({field: 'isGettingRelatedData', value: false});
  };
  

  return (
    <HomeContext.Provider
    value={{
      ...contextValue,
      handleSearch
    }}>
      <Head>
        <title>Muscle Lab</title>
        <meta
          name="description"
          content="Muscle recovery & Wellness Lounge"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="overflow-hidden bg-[#F4F4F5] text-[#D4D4D8] h-screen">
        {isSearched ? (
          <Answers
            onReset={() => {
              setIsSearched(false);
            }}
            loading={loading}
          />
        ) : (
          <Search />
        )}
        <SignInSignUp isOpenModal={showSign} openModal={setShowSign} />
      </div>
    </HomeContext.Provider>
  );
}