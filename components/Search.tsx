import { FC, useEffect, useState, useContext } from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import SearchInput from './Search/SearchInput';
import LoadingSpinner from './Search/LoadingSpinner'; // Importing updated CustomLoadingSpinner component 
import CardContainerWrapper from './Search/CardContainerWrapper';
import Link from 'next/link';
import { useSpring, config, animated } from "react-spring";
// Importing additional modules for more animations
import { useTransition, animated as a } from 'react-spring';
import { Button } from "@chakra-ui/react";
import HomeContext from '@/components/home/home.context';
import { BACKGROUND_IMAGES, MAGIC_WORDS } from "@/utils/const";

interface SearchProps {
}

export const Search: FC<SearchProps> = ({}) => {
  const myApiKey = "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";
  const [loading, setLoading] = useState<boolean>(false);
  const [showCardContainer, setShowCardContainer] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [backgroundChangeSpeed, setBackgroundChangeSpeed] = useState<number>(4500);  
  const {
    handleSearch
  } = useContext(HomeContext);

  // Enhanced Dropdown Animation with react-spring
  const transitions = useTransition(showDropdown, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
  });

  const switchBackground = (current: string) => {
    const index = BACKGROUND_IMAGES.indexOf(current);
    return BACKGROUND_IMAGES[(index + 1) % BACKGROUND_IMAGES.length];
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const startSearch = async (query: string) => {
    setShowCardContainer(false);
    setLoading(true);
    setBackgroundChangeSpeed(2250);
    handleSearch(query);
  };

  const [bgImage, setBgImage] = useState(BACKGROUND_IMAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((current) => switchBackground(current));
    }, backgroundChangeSpeed); // Adjust this to control the time between transitions

    return () => clearInterval(interval);
  }, [backgroundChangeSpeed]);

  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: false,
    reverse: false,
    delay: 200,
    config: config.molasses, // Increase the stiffness to make transitions smoother
  });

  const buttonVariants = {
    initial: { scale: 1, boxShadow: 'none', y: 0 },
    hover: { scale: 1.05, boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', y: -2 },
    tap: { scale: 0.95 },
  };

  function openModal(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="relative w-full min-h-screen">
      <animated.div
        style={{
          ...springProps,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
        className="absolute z-0 bg-cover bg-no-repeat w-full h-full"
      ></animated.div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {loading ? (
        // Added loading messages
        <LoadingSpinner />
      ) : (
        <motion.div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center space-y-6 px-3 pt-16 sm:pt-32 relative z-100">
          <motion.div onClick={toggleDropdown}>
            <Image
              src="/logos/ml-big2.png"
              alt="Muscle Lab Logo"
              width={201}
              height={101}
            />
          </motion.div>

          {transitions((styles, item) => item ? (
            <a.div className="absolute top-full mt-2 bg-white border shadow-lg rounded py-2" style={styles}>
              <Link href="/apps/takefive" passHref>
                <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                  TakeFive
                </div>
              </Link>
            </a.div>
          ) : null)}

          {myApiKey.length === 51 ? (
            <SearchInput
              magicWords={MAGIC_WORDS}
              startSearch={startSearch}
            />
            
          ) : (
            <div className="text-center text-[#D4D4D8]">Please enter your OpenAI API key.</div>
          )}
        </motion.div>
      )}
      <CardContainerWrapper
        showCardContainer={showCardContainer}
        loading={loading}
      />
    </div>
  );
};

export default Search;