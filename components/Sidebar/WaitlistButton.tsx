import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

interface WaitlistButtonProps {
  fontSize:any
}

const WaitlistButton: FC<WaitlistButtonProps> = ({ fontSize }) => { // destructuring props
  return (
    <Link href="/waitlist">
      <Button
        mt={4}
        colorScheme="blue"
        size="lg"
        fontWeight="bold"
        borderRadius="8px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        px={8}
        py={3}
        fontSize={fontSize} // add fontSize prop here
        background="linear-gradient(90deg, #54c7e3 0%, #4285f4 100%)"
        _hover={{
          background: "linear-gradient(90deg, #4285f4 0%, #54c7e3 100%)",
          textDecoration: "none",
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

export default WaitlistButton