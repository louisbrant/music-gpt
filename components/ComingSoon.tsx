
import { useEffect, useState } from "react";
import { magicWords } from './Search/magicWordsComingSoon';
import SearchInput from './Search/SearchInput';
import { useSpring, config, animated } from "react-spring";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import Image from 'next/image'; // Make sure this import is at the top of your file

const BackgroundComponent: React.FC<{ backgroundChangeSpeed: number }> = ({ backgroundChangeSpeed }) => {
  const desktopBackgrounds = [
      "searchbackgrounds/space.png",
      "searchbackgrounds/boxing.png",
      "searchbackgrounds/july2.png",
      "searchbackgrounds/hooplady.png",
      "searchbackgrounds/jul3.png",
      "searchbackgrounds/champions.png",
      "searchbackgrounds/jul4.png",
      "searchbackgrounds/soccergirl.png",
      "comingsoon/baseballamerica.png",
      "searchbackgrounds/hockey.png",
      "comingsoon/flagrunning.png",
      "searchbackgrounds/worldcup.png",
      "comingsoon/shreddingamerican.png",
      "comingsoon/thelab.png",
      "searchbackgrounds/space4.png",
      "searchbackgrounds/swim.png",
      "searchbackgrounds/olympics.png",
      "searchbackgrounds/space.png",
      "searchbackgrounds/noage.png",
      "searchbackgrounds/paddle.png",
      "searchbackgrounds/runner.png",
      "searchbackgrounds/swim2.png",
      "searchbackgrounds/sprint.png",
      "searchbackgrounds/skate.png",
      "searchbackgrounds/soccer.png",
      "searchbackgrounds/olympics2.png",
      "searchbackgrounds/runner2.png",
      "searchbackgrounds/lift.png",
      "searchbackgrounds/jump.png",
      "searchbackgrounds/homerun.png",
      "searchbackgrounds/hockey2.png",
      "searchbackgrounds/hiker.png",
      "searchbackgrounds/dancer.png",
      "searchbackgrounds/cycling.png",
      "searchbackgrounds/catch.png",
    ];


const mobileBackgrounds = [
  "searchbackgrounds/space.png",
  "searchbackgrounds/boxing.png",
  "searchbackgrounds/july2.png",
  "searchbackgrounds/hooplady.png",
  "searchbackgrounds/jul3.png",
  "searchbackgrounds/champions.png",
  "searchbackgrounds/jul4.png",
  "searchbackgrounds/soccergirl.png",
  "comingsoon/baseballamerica.png",
  "searchbackgrounds/hockey.png",
  "comingsoon/flagrunning.png",
  "searchbackgrounds/worldcup.png",
  "comingsoon/shreddingamerican.png",
  "comingsoon/thelab.png",
  "searchbackgrounds/space4.png",
  "searchbackgrounds/swim.png",
  "searchbackgrounds/olympics.png",
  "searchbackgrounds/space.png",
  "searchbackgrounds/noage.png",
  "searchbackgrounds/paddle.png",
  "searchbackgrounds/runner.png",
  "searchbackgrounds/swim2.png",
  "searchbackgrounds/sprint.png",
  "searchbackgrounds/skate.png",
  "searchbackgrounds/soccer.png",
  "searchbackgrounds/olympics2.png",
  "searchbackgrounds/runner2.png",
  "searchbackgrounds/lift.png",
  "searchbackgrounds/jump.png",
  "searchbackgrounds/homerun.png",
  "searchbackgrounds/hockey2.png",
  "searchbackgrounds/hiker.png",
  "searchbackgrounds/dancer.png",
  "searchbackgrounds/cycling.png",
  "searchbackgrounds/catch.png",
  // add your other mobile-optimized image paths here...
];
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const backgrounds = windowWidth <= 768 ? mobileBackgrounds : desktopBackgrounds;

  const switchBackground = (current: string) => {
    const index = backgrounds.indexOf(current);
    return backgrounds[(index + 1) % backgrounds.length];
  };

  const [bgImage, setBgImage] = useState(backgrounds[0]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setBgImage((current) => switchBackground(current));
      }, backgroundChangeSpeed);
  
      return () => clearInterval(interval);
    }, [backgroundChangeSpeed]);
  
    const springProps = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reset: false,
      reverse: false,
      delay: 200,
      config: config.molasses,
    });
  
    return (
      <animated.div
        style={{
          ...springProps,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute z-0 bg-cover bg-no-repeat w-full h-full"
      ></animated.div>
    );
  };
  
  export const ComingSoonPage: React.FC = () => {
    const [backgroundChangeSpeed, setBackgroundChangeSpeed] = useState<number>(4500);
    const MotionBox = motion(Box);
  
    return (
      <div className="relative w-full min-h-screen pb-10 sm:pb-0">
        <BackgroundComponent backgroundChangeSpeed={backgroundChangeSpeed} />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center space-y-6 px-3 pt-32 sm:pt-64 relative z-100">
  
        <Image
          src="/logos/ml-big2.png"
          alt="Muscle Lab Logo"
          width={201}
          height={101}
        />
  
        <MotionBox
          fontSize="2xl"
          color="white"
          fontWeight="bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to the future of personalized recovery and wellness.
        </MotionBox>
  
        <MotionBox
          fontSize="lg" // Change the font size to be smaller for a subheading
          color="white"
          fontWeight="normal" // Normal weight for subheading
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          At Muscle Lab, our journey has always been driven by the simple yet profound belief that every individual deserves a customized approach to their health and wellness. Our conviction was born out of our own experiences, our passion for holistic well-being, and an understanding of the limitations in the existing wellness landscape.
          We recognized the overwhelming need for personalized recovery plans that adapt to an individual&apos;s unique circumstances, goals, and preferences. Our solution? An innovative blend of technology and professional expertise, culminating in the creation of our new services: Custom Recovery &amp; Wellness Plans, Muscle Lab One, and the AI-driven Smart Lab.
  
        </MotionBox>
  
        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="normal" // Normal weight for main text
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our motivation behind these initiatives is simple: to break the mold of one-size-fits-all wellness solutions and to empower our clients to take ownership of their health.
        </MotionBox>
  
        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="normal" // Normal weight for main text
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          We realized that wellness is not just about recovering from an ailment or achieving a particular fitness level. It&apos;s a continuous journey, an ongoing process of achieving and maintaining optimal health, physically and mentally. By leveraging technology, we were able to develop services that adapt to each person&apos;s unique circumstances, creating a truly personalized experience.
        </MotionBox>
  
        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="normal" // Normal weight for main text
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          While Muscle Lab started in Pasadena, its reach quickly extended beyond geographical boundaries. From renowned sports stars to top artists, our client base expanded to encompass the globe.
        </MotionBox>
  
        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="normal" // Normal weight for main text
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          However, we found ourselves at a juncture where our influence was vast, but our ability to serve was constrained by our physical boundaries. This realization fueled our quest to create a solution that was not tethered to a location - this gave birth to Muscle Lab One.
  
        </MotionBox>
  

        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="normal" // Normal weight for main text
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Muscle Lab One represents a new chapter for Muscle Lab, where our reach isn&apos;t restricted to a specific location. Now, we can extend our services to people across the globe, breaking the barriers of geography and making wellness accessible to all.
        </MotionBox>

        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="normal" // Normal weight for main text
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          We&apos;re excited to roll out everything we have been working on and welcome you to the future of personalized recovery and wellness.
        </MotionBox>

        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Andy & V
        </MotionBox>

        <MotionBox
          fontSize="xl"
          color="white"
          fontWeight="normal"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Co-Founders, Muscle Lab
        </MotionBox>

    </motion.div>
  </div>
);
};

export default ComingSoonPage;