import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Heading,
  Flex,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import DiscountText from "./Waitlist/DiscountText.js";
import Logo from "./Waitlist/Logo.js";
import FeatureList from "./Waitlist/FeatureList.js";
import InformationText from "./Waitlist/InformationText.js";
import WaitlistForm from "./Waitlist/Waitlistform.js";

const WaitlistSignUpPage = () => {
  const toast = useToast();
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const [show, setShow] = useState(false);

  return (
    <Box position="relative" overflow="hidden" minH="100vh">
      <Header />
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      >
        <source src="./servicevideos/hero-video.mp4" type="video/mp4" />
      </video>
      <Box bg="rgba(0,0,0,0.5)" w="100%" minH="100vh" p={10}>
        <VStack
          align="start"
          spacing={8}
          py={10}
          px={{ base: 4, md: 10 }}
          color="white"
          h="100%"
          justify="space-between"
          overflowY="scroll"
        >
          <Box>
            <Logo onClick={() => setShow(true)} />
          </Box>
          <DiscountText show={show} />
          <Box maxW="xl">
            {/* Below Introduction and Information text */}
            <InformationText as="h1" size={headingSize} mb={5} type="heading">
              {
                "Welcome to Muscle Lab One: Home of AI-powered Custom Recovery Plans"
              }
            </InformationText>
            <InformationText fontSize={fontSize}>
              {
                "We&apos;re excited to introduce our advanced AI-driven recovery plans, tailored specifically for you, surpassing industry standards to bring you a wellness experience like no other."
              }
            </InformationText>

            {/* Below 'GPT-4 Powered Personalized Recovery & Wellness Plan' and text */}
            <InformationText
              as="h2"
              size={headingSize}
              mt={10}
              mb={5}
              type="heading"
            >
              {"GPT-4 Powered Personalized Recovery & Wellness Plans"}
            </InformationText>
            <InformationText fontSize={fontSize}>
              {
                "Combining professional expertise with cutting-edge GPT-4 AI, we&apos;ve developed dynamic recovery plans that evolve with your unique needs, lifestyle, and wellness goals. Unleash the potential of personalized wellness like never before."
              }
            </InformationText>

            {/* Later text */}
            <InformationText fontSize={fontSize} mt={10} mb={5}>
              {
                "From managing chronic pain to enhancing athletic performance, or simply achieving holistic well-being, our plans enrich your journey with therapies like Cryotherapy, Infrared, IV Therapy, Cupping, Stretch Therapy, & much more…"
              }
            </InformationText>

            <InformationText fontSize={fontSize}>
              {
                "With your Muscle Lab One Membership, you secure more than just access to bespoke recovery plans. You join a community dedicated to health, creativity, and growth. Gain exclusive access to our Digital Wellness Suite “Smart Lab”, rewards programs, discounts, and continuous support."
              }
            </InformationText>

            {/* Old text replaced with new features */}
            <InformationText
              as="h3"
              size={headingSize}
              mt={10}
              mb={4}
              type="heading"
            >
              {"Recovery & Wellness Lounge: Exclusive In-Lab Features"}
            </InformationText>
            <FeatureList
              fontSize={fontSize}
              items={[
                "Unlimited Compression Lounge Access",
                "Wellness Concierge: A personalized wellness concierge service to assist with appointment scheduling, plan management, and wellness queries.",
                "Weekly Wellness Reports: Detailed wellness reports every week outlining progress, treatment effectiveness, and future recommendations.",
                "Exclusive Discounts: Members receive 20% off on retail products and a 10% discount on all services along with two free select treatments each month.",
                "Rewards Program: Earn points with the Frequent Recovery Program, redeemable for treatments.",
                "Priority Booking, Guest Privileges, VIP invites to member-exclusive social events.",
                "Muscle Lab Classes (Coming Soon): Offering a diverse range of classes such as Yoga, Mobility and Flexibility, Strength and Conditioning, Recovery Techniques, Mind-Body Balance, and High-Intensity Interval Training (HIIT)",
                "Muscle Lab After Hours (Coming Soon): Experience the luxury of wellness on your own terms with extended hours exclusively available to Muscle Lab One members.",
              ]}
            />

            <InformationText
              as="h3"
              size={headingSize}
              mt={10}
              mb={4}
              type="heading"
            >
              {"Smart Lab: Your Digital Wellness Companion"}
            </InformationText>
            <FeatureList
              fontSize={fontSize}
              items={[
                "LABASSISTANT: Your personal AI-powered journal available 24/7, offering health and wellness support, answering your queries, and providing tailored recommendations based on your shared thoughts and experiences.",
                "SMART RECOVERY: AI-generated and professionally approved custom recovery, wellness, nutrition, mental, and at-home plans, and more, considering your unique goals and physical condition based on your individual inputs and ML History.",
                "MINDGUIDE: Embark on a personalized mental wellness journey that recommends mindfulness activities, meditation practices, and cognitive exercises specifically curated based on your individual inputs and preferences.",
                "LIFELINE: Experience the convenience of AI-driven wellness and lifestyle recommendations, offering a diverse range of product suggestions meticulously tailored to enhance your unique recovery program and lifestyle.",
                "MEALMASTER: Relish in a customized nutrition and meal plan, expertly tailored to your health data, recovery goals, and dietary preferences. Our AI takes into account your unique inputs, facilitating a seamless transition towards a healthier lifestyle with curated meal plans and shopping lists.",
                "VIRTUCOACH: Access personalized workouts and wellness advice anytime, anywhere, all tailored to your specific needs and informed by your unique inputs.",
              ]}
            />
            <Flex direction="column" w="100%" maxW="xl" mt={10} mb={10}>
              <Heading as="h2" size={headingSize} mb={5}>
                Be Part of the Future of Personalized Wellness: Secure Your Spot
                Today
              </Heading>
              <InformationText fontSize={fontSize} mb={5}>
                {
                  "Join our waitlist and embark on a wellness journey that breaks geographical boundaries and molds the future of personalized recovery. It's more than wellness; it's your unique wellness journey tailored by GPT technology."
                }
              </InformationText>
              <WaitlistForm />
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default WaitlistSignUpPage;
