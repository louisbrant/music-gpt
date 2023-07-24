import React from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
  
const ForYouButton = () => {
  return (
    <Link href="/waitlist">
      <Button
        colorScheme="blue"
        size="md"
        fontWeight="normal"
        borderRadius="4px"
        px={6}
        py={2}
        bg="transparent"
        border="1px solid white"
        color="white"
        _hover={{
          bg: "blue.500",
          color: "white",
        }}
        _active={{
          transform: "scale(0.98)",
        }}
      >
        Join Waitlist
      </Button>
    </Link>
  );
};

export default ForYouButton;