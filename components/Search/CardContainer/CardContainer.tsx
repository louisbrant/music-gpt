import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Grid, Image, AspectRatio, Heading, Badge, Skeleton, Button, VStack, Divider, } from '@chakra-ui/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import ForYouButton from './CardContainerButton';


const MotionGrid = motion(Grid);
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionImage = motion(Image);
const MotionBadge = motion(Badge);
const MotionButton = motion(Button);

// Add staggerChildren property to the containerVariants
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

const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.15 } },
};

const expandedCardVariants = {
  expanded: { height: "auto" },
  collapsed: { height: 130 }
};

interface BadgeProps {
  title?: string;
  badgeColor: string;
  label: string;
}

interface CardProps {
  src: string;
  title: string;
  description: string;
  badges?: BadgeProps[]; // Allow for multiple badges
}

interface ClickCardProps {
  src: string;
  title: string;
  description: string;
  badges?: BadgeProps[]; // Allow for multiple badges Click
  number?: Number;
}

interface CardSelProps {
  src: string;
  title: string;
  description: string;
  number: Number;
  selectCard: Function;
  badges?: BadgeProps[]; // Allow for multiple badges Select
}

const renderBadges = (badges: BadgeProps[]) => {
  return badges.map((badge, index) => (
    <MotionBadge
      key={`badge-${index}`}
      fontSize={{ base: "0.65rem", md: "0.75rem" }} // Decreased badge font size for better hierarchy
      fontWeight="semi-bold" // Slightly lowered the weight to help main title stand out better
      colorScheme={badge.badgeColor}
      borderRadius="sm" // Changed border radius for subtler design
      marginBottom={2}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.30 }} // Shortened transition time for faster response 
    >
      {badge.label}
    </MotionBadge>
  ));
};

const Card: React.FC<CardSelProps> = ({
  src,
  title,
  description,
  number,
  selectCard,
  badges = [],
}) => {
  const controls = useAnimation();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
    selectCard(src,
      title,
      description,
      number,
      badges);
    if (expanded) {
      controls.start("collapsed");
    } else {
      controls.start("expanded");
    }
  };

  const boxShadow = expanded ? { boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)" } : {};

  return (
    <MotionBox
      onClick={handleClick}
      variants={cardVariants}
      whileHover={{ scale: 1.03, boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)" }} // Slightly less scaling and softer shadow on hover
      whileTap={{ scale: 0.97 }} // Slightly less scaling on tap to still give feedback while less jarring
      transition={{ duration: 0.20, boxShadow: { duration: 0.20 } }} // Shortened duration for crispier interaction
      borderWidth="1px"
      borderRadius="md" // Applying smaller border radius for softer look
      overflow="hidden"
      height="auto"
      position="relative"
      bgColor="rgb(28, 30, 33)"
      minWidth={{ base: "100%", md: "300px" }}
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
      animate={controls}
    >
      <Skeleton isLoaded={!expanded}>
        <AspectRatio key={title} ratio={16 / 9}>
          <MotionImage src={src} alt={title} objectFit="cover" />
        </AspectRatio>
      </Skeleton>
      <Box position="absolute" top="0" left="0" p="4">
        <Text
          as="h2"
          fontSize={{ base: "lg", md: "xl" }} // Responsive font size
          fontWeight="bold"
          lineHeight={1.2}
          color="white"
          marginBottom={2}
        >
          {title}
        </Text>
        <Text fontSize="md" color="#9d9ca1" marginBottom={2}>
          {description}
        </Text>
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bgColor="rgba(255, 255, 255, 0)"
          borderBottomWidth="3px"
          borderColor="transparent"
          transition="border-color 0.25s ease-in-out"
          _hover={{ borderColor: "rgb(28, 30, 33)" }}
        ></Box>
        {renderBadges(badges)} {/* Call renderBadges function */}
      </Box>
      {expanded && (
        <Box position="absolute" top="80%" left="50%" transform="translate(-50%, -50%)">
          <Button colorScheme="white" variant="outline">
            Book Now
          </Button>
        </Box>
      )}
    </MotionBox>
  );
};

const CardContainer: React.FC = () => {
  const cardData = [
    { src: "serviceimages/one.jpg", title: "Muscle Lab One", description: "", badges: [{ badgeColor: "blue", label: "NEW" }] },
    { src: "serviceimages/projoe.jpeg", title: "Custom Recovery Plans", description: "", badges: [{ badgeColor: "green", label: "POWERED BY GPT-4" }] },
    { src: "teaser.jpeg", title: "Smart Lab", description: "", badges: [{ badgeColor: "green", label: "Coming Soon" }] },
    { src: "serviceimages/daypass.jpg", title: "Day Pass", description: "", badges: [{ badgeColor: "green", label: "Most Popular" }] },
    { src: "serviceimages/musclerecoverytheragun.jpg", title: "Muscle Recovery", description: "" },
    { src: "serviceimages/NovaJoy.jpg", title: "Cryo & Heat", description: "" }, 
    { src: "serviceimages/cryoskin.jpg", title: "CryoSkin", description: "" }, 
    { src: "serviceimages/cryotoning.jpg", title: "Cryotoning", description: "" }, 
    { src: "serviceimages/cryoslimming.jpg", title: "Cryoslimming", description: "" }, 
    { src: "serviceimages/ivdrips.jpg", title: "IV Therapy", description: "" },
    { src: "serviceimages/vitaminshots1.jpg", title: "Vitamin Shots", description: "" },
    { src: "serviceimages/ivdrips.jpg", title: "NAD+ IV Therapy", description: "" },
    { src: "serviceimages/mobileiv1.jpg", title: "Mobile IV Therapy", description: "" },
    { src: "serviceimages/cryomachine.jpg", title: "Cryotherapy", description: "" },
    { src: "serviceimages/localcryo2.jpg", title: "Localized Cryotherapy", description: "" },
    { src: "serviceimages/cryomachine.jpg", title: "Cryo Facial", description: "" },
    { src: "serviceimages/sauna.jpg", title: "Infrared Sauna", description: "" },
    { src: "serviceimages/one.jpg", title: "Stretch Therapy", description: "" },
    { src: "serviceimages/cupping.jpg", title: "Cupping Therapy", description: "" },
    { src: "serviceimages/myofascialrelease.jpg", title: "Myofascial Release", description: "" },
    { src: "serviceimages/compressionhips.jpg", title: "Compression Therapy", description: "" },
  ];

  const [cards, setCards] = useState<CardProps[]>([]); // New state to hold cards 

  const [collapsedCard, setCollapsedCard] = useState<ClickCardProps[]>([]);

  useEffect(() => {
    // Function to get random cards from the cardData array
    function getRandomCards() {
      const tempCards = [...cardData].sort(() => 0.5 - Math.random()).slice(0, 4);

      return tempCards.map((item, i) => {
        collapsedCard.forEach((jtem, j) => {
          if (i === jtem?.number) {
            item = {
              ...item,
              ...jtem
            };
          }
        });
        return item;
      });
    }
    setCards(getRandomCards());

    // Dynamically update the cards every 10 seconds
    const interval = setInterval(() => {
      setCards(getRandomCards());
    }, 14000);
    return () => clearInterval(interval); // Cleanup function to clear the interval when the component unmounts
  }, []);

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  //Keep showing the selected card
  const selectCard = (src: string,
    title: string,
    description: string,
    number: Number,
    badges: []) => {

    let iscoll = false;
    let newcoll = collapsedCard;
    if (newcoll.length == 0) {
      newcoll.push({
        src,
        title,
        description,
        number,
        badges,
      });
      setCollapsedCard(newcoll);
    }
    else
      newcoll.map((item, i) => {
        if (item.src == src) {
          iscoll = true;
          delete newcoll[i];
        }
        if (i == newcoll.length - 1 && !iscoll) {
          newcoll.push({
            src,
            title,
            description,
            number,
            badges,
          });
          setCollapsedCard(newcoll);
        }
      })
  }

  return (
    <Flex
      direction="column"
      align="center"
      bgColor="rgba(0, 0, 0, 0.75)" // Darker background for more contrast with card elements
      fontFamily="Arial, sans-serif" // More universal font fallback
      color="white"
      minHeight="auto"
      overflowY="hidden"
      padding={{ base: "20px", md: "40px 20px" }} // Less padding to allot more space for elements
      width={{ base: "100%", lg: "890px" }} // A bit of reduction on max-width for more space on medium-sized screens
      borderRadius={{ base: "0", md: "md" }} // Softened borderRadius to match with other elements
      marginTop={{ base: "0", md: "25px" }} // Less top margin to utilize more space
    >
      <Box textAlign="left" width="100%" borderBottom="1px solid #808080">
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <MotionHeading as="h1" fontWeight="bold" mb={2} color="white" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} variants={textVariants} initial="hidden" animate="visible">
            For You
          </MotionHeading>
          <VStack spacing={1} align="stretch">
            <MotionHeading as="h1" fontWeight="bold" mb={0} color="white" fontSize={{ base: "sm", md: "md", lg: "lg" }} variants={textVariants} initial="hidden" animate="visible">MUSCLE LAB ONE</MotionHeading>
            <ForYouButton />
          </VStack>
        </Flex>
        <Divider my={1} /> {/* Add Divider component */}
        <MotionText fontSize="sm" textTransform="uppercase" color="#808080" mb={0} className="date" variants={textVariants} initial="hidden" animate="visible">
          {dateString}
        </MotionText>
      </Box>
      <MotionGrid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={{ base: "20px", md: "20px" }}
        justifyContent="center"
        alignItems="center"
        my={4}
        width="100%"
        flexWrap="wrap"
        alignContent="flex-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={ref}
      >
        <AnimatePresence exitBeforeEnter>
          {cards.map((card, index) => (
            <Card key={`card-${index}`} number={index} selectCard={selectCard} src={card.src} title={card.title} description={card.description} badges={card.badges} />
          ))}
        </AnimatePresence>
      </MotionGrid>
    </Flex>
  );
};

export default CardContainer;