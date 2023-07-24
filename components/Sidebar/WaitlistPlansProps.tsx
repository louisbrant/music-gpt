import React from "react";
import { Box, Flex, Text, Badge, Link } from "@chakra-ui/react";

interface WaitlistPlansProps {}

export const WaitlistPlans: React.FC<WaitlistPlansProps> = () => {
  const plans = [
    {
      badgeColor: "green",
      label: "POWERED BY GPT-4",
      title: "Recovery & Wellness Plans",
    },
    {
      title: "Smart Lab",
    },
    {
      title: "In-Lab VIP",
    },
  ];

  return (
    <>
      {plans.map(({ badgeColor, label, title }, index) => (
        <Link key={index} href="/waitlist">
          <Flex
            alignItems="center"
            mb={4}
            justifyContent="center"
            flexDirection="column"
          >
            {label && (
              <Badge
                fontSize="0.9rem"
                fontWeight="bold"
                colorScheme={badgeColor}
                borderRadius="md"
              >
                {label}
              </Badge>
            )}
            <Text mt={1} fontSize="lg" fontWeight="semibold">
              {title}
            </Text>
          </Flex>
        </Link>
      ))}
    </>
  );
};