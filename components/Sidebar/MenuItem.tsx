import React, { useState } from "react";
import { Box, Badge, ListItem,} from "@chakra-ui/react";
import { motion } from 'framer-motion';

const MotionListItem = motion(ListItem);

interface MenuItemProps {
  children: React.ReactNode;
  icon: React.ElementType;
  badgeText?: string;
  disabled?: boolean;
  textColor: string;
  hoverBgColor: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon,
  badgeText = null,
  disabled = false,
  textColor,
  hoverBgColor,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <MotionListItem
      display="flex"
      alignItems="center"
      py="2"
      px="4"
      borderRadius="md"
      transition="all 0.2s"
      cursor="pointer"
      _hover={{ bg: disabled ? undefined : hoverBgColor }}
      role="group"
      whileHover={{ scale: disabled ? 1.0 : 1.05 }}
      whileTap={{ scale: disabled ? 1.0 : 0.95 }}
      opacity={disabled ? 0.6 : 1.0}
      textDecoration={disabled ? "line-through" : "none"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        as={icon}
        fontSize="20px"
        mr="4"
        color={textColor}
        _groupHover={{ color: "blue.500" }}
      />
      <Box
        fontSize="lg"
        fontWeight="medium"
        color={textColor}
        _groupHover={{ color: "blue.500" }}
      >
        {children}
      </Box>
      {badgeText && (
        <Badge
          ml="2"
          fontSize="0.7rem"
          fontWeight="medium"
          colorScheme={hover ? "green" : "blue"}
          borderRadius="sm"
        >
          {hover ? "Join Waitlist" : badgeText}
        </Badge>
      )}
    </MotionListItem>
  );
};