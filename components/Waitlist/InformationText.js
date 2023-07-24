import React from 'react';
import { Heading, Text } from "@chakra-ui/react";

const InformationText = ({ type, fontSize, children, ...props }) => {
  if (type === "heading") {
    return <Heading {...props}>{children}</Heading>;
  }
  return (
    <Text fontSize={fontSize} {...props}>
      {children}
    </Text>
  );
};

export default InformationText;