import React from "react";
import { Flex, Text, Badge } from "@chakra-ui/react";

interface MuscleLabOneProps {}

export const MuscleLabOne: React.FC<MuscleLabOneProps> = () => {
  return (
    <Flex flexDirection="row" alignItems="center">
      <Text fontSize="2xl" fontWeight="extrabold">
        Muscle Lab ONE
      </Text>
      <Badge
        ml={2}
        fontSize="0.9rem"
        fontWeight="bold"
        colorScheme="blue"
        borderRadius="md"
      >
        New
      </Badge>
    </Flex>
  );
};