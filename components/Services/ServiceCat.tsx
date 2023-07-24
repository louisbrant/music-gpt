import React from 'react';
import { Box, Button, Flex, Heading, Image, SimpleGrid, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Header } from "@/components/Header";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);
const MotionButton = motion(Button);

interface Service {
  title: string;
  description: string;
  imageUrl: string;
}

interface Product {
  category: string;
  title: string;
  description: string;
  levels?: string[];  // The question mark indicates this property is optional
  regions?: string[];  // The question mark indicates this property is optional
}

interface ServiceCatPageProps {
  mainService: string;
  shortDescription: string;
  heroVideoSrc: string;
  relatedVisuals: string[];
  secondaryTitle: string;
  secondarySubtitle: string;
  secondaryCTA: string;
  products: Product[];
}

function getUniqueCategories(products: Product[]): string[] {
  const uniqueCategories: string[] = [];

  products.forEach((product: Product) => {
    if (!uniqueCategories.includes(product.category)) {
      uniqueCategories.push(product.category);
    }
  });

  return uniqueCategories;
}

const ServiceCatPage: React.FC<ServiceCatPageProps> = ({
  mainService,
  shortDescription,
  heroVideoSrc,
  secondarySubtitle,
  products
}) => {
  const categories = getUniqueCategories(products);
return (
    <VStack spacing={24} align="start" bg="#ffffff" minH="100vh" pt={24}>
      <Header openModal={function (open: Boolean): void {
      throw new Error('Function not implemented.');
    } } />

      {/* Hero Section */}
      <MotionFlex w="full" position="relative" flexDirection="column" justifyContent="center" alignItems="center" h="100vh" borderRadius="xl" overflow="hidden" boxShadow="2xl">
        <Box as="video" src={heroVideoSrc} autoPlay muted loop playsInline w="full" h="full" objectFit="cover" />
        <Flex flexDirection="column" justifyContent="center" alignItems="center" p={8} w={{ base: "85%", md: "65%" }} zIndex={1} bgGradient="linear(to-b, rgba(10, 25, 41, 0.7), rgba(10, 25, 41, 0))">
          <MotionHeading as="h1" fontWeight="extrabold" fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }} color="#000000" letterSpacing="tight" mb={5}>
            {mainService}
          </MotionHeading>
          <MotionText fontWeight="medium" fontSize={{ base: "lg", md: "2xl" }} color="#000000" mt={4} letterSpacing="wider">
            {shortDescription}
          </MotionText>
          <MotionButton mt={8} colorScheme="teal" py={{ base: "2", md: "4" }} px={{ base: "4", md: "8" }} fontSize={{ base: "md", md: "xl" }}
            fontWeight="bold" shadow="lg" _hover={{ transform: "scale(1.02)", transition: "all 0.2s ease-in-out" }}>
            Book {mainService}
          </MotionButton>
        </Flex>
      </MotionFlex>

      {/* Services Section */}
      <Box w="full" py={12}>
        <MotionHeading as="h4" fontWeight="bold" fontSize="5xl" color="#000000" letterSpacing="tight">
        {mainService}
        </MotionHeading>
        <VStack spacing={16} mt={8}>
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category
            );
            return (
              <Box key={`category-${category}`}>
                <MotionHeading as="h5" fontWeight="bold" fontSize="3xl" color="#475569" letterSpacing="tight">
                  {category}
                </MotionHeading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
                  {categoryProducts.map((product, index) => (
                    <MotionFlex key={`product-${index}`} flexDirection="column" justifyContent="start" alignItems="start" p={6} borderRadius="xl" boxShadow="lg" bg="white">
                      <MotionHeading as="h6" fontWeight="semibold" fontSize="2xl" letterSpacing="tight" mb={2}>
                        {product.title}
                      </MotionHeading>
                      <MotionText fontSize="lg" color="gray.600" mb={4} letterSpacing="wider" lineHeight="tall">
                        {product.description}
                      </MotionText>
                      {product.levels && product.levels.map(level => (
                        <Text key={level}>{level}</Text>
                      ))}
                      {product.regions && product.regions.map(region => (
                        <Text key={region}>{region}</Text>
                      ))}
                      <MotionButton variant="outline" colorScheme="black" borderColor="gray.600" borderWidth="2px" fontSize="xl" fontWeight="bold" py={1} px={6} shadow="md" _hover={{ shadow: "lg", borderColor: "black" }}>
                        Book Now
                      </MotionButton>
                    </MotionFlex>
                  ))}
                </SimpleGrid>
                
              </Box>
            )
          })}
        </VStack>
         {/* Secondary Section */}
      <Box w="full" py={12} px={12} bg="#f2f2f2" borderRadius="xl" shadow="lg">
        <MotionHeading as="h2" fontWeight="bold" fontSize="5xl" color="#000000" letterSpacing="tight">
          Custom Recovery & Wellness Plans
        </MotionHeading>
        <MotionText fontWeight="medium" fontSize="2xl" color="#000000" mt={4} letterSpacing="wider" lineHeight="tall">
          {secondarySubtitle}
        </MotionText>
        <MotionButton variant="solid" bg="blue.500" mt={5} color="white" py={2} px={8} fontSize="xl" fontWeight="bold" shadow="md" _hover={{ shadow: "lg" }}>
          Join Waitlist
        </MotionButton>
      </Box>

      </Box>
    </VStack>
  );
};

export default ServiceCatPage;