import React from 'react';
import { Text } from "@chakra-ui/react";

const DiscountText = ({ show }) => {
  if (show) {
    return <Text>Your discount code is: MLVIP10</Text>;
  }
  return null;
};

export default DiscountText;