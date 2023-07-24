import React from 'react';
import { List, ListItem, ListIcon,} from "@chakra-ui/react";
import { MdCheckCircle } from 'react-icons/md';

const FeatureList = ({ fontSize, items }) => {
  return (
    <List spacing={3} fontSize={fontSize}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default FeatureList;