import React from 'react';
import { Image, Tooltip } from "@chakra-ui/react";

const Logo = ({ onClick, show }) => {
  return (
    <Tooltip label="Surprise!">
      <Image
        onClick={onClick}
        src="./logos/ml-big2.png"
        w="200px"
        alt="MuscleLabLogo - Click for a surprise!"
        _hover={{ cursor: 'pointer' }}
      />
    </Tooltip>
  );
};

export default Logo;