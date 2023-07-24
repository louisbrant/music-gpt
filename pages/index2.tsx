// Home.tsx
import { Answers } from "@/components/Search/Answer/Answers";
import { Search } from "@/components/Search";
import Head from "next/head";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { SignInSignUp } from "@/components/SignInUpModal";

export default function Home() {
  const [answer, setAnswer] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSign, setShowSign] = useState<Boolean>(false);

  return (
    <>
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
      <Header openModal={setShowSign} />
      <div className="h-screen overflow-auto bg-[#F4F4F5] text-[#D4D4D8] pt-16">
        {answer ? (
          <Answers
            onReset={() => {}}
            loading={loading}
          />
        ) : (
          // <Search />
          <></>
        )}
        <SignInSignUp isOpenModal={showSign} openModal={setShowSign} />
      </div>
    </>
  );
}