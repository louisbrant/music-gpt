import React from "react";
import { List, ListItem, Link } from "@chakra-ui/react";
import {
  FaSyringe,
  FaSnowflake,
  FaFireAlt,
  FaArrowsAltV,
  FaHands,
  FaHandPaper,
  FaAirFreshener,
  FaSnowman,
  FaRulerVertical,
  FaVectorSquare,
} from "react-icons/fa";
import { GiQuickSlash, GiHealthCapsule } from "react-icons/gi";
import { MenuItem } from "./MenuItem";

interface AllServicesProps {}

export const AllServices: React.FC<AllServicesProps> = () => {
  const serviceItems = [
    { icon: FaSyringe, text: "IV Therapy" },
    { icon: FaSnowflake, text: "Cryotherapy" },
    { icon: FaFireAlt, text: "Infrared Sauna" },
    { icon: FaArrowsAltV, text: "Stretch Therapy" },
    { icon: FaHands, text: "Myofascial Release" },
    { icon: GiQuickSlash, text: "Cupping Therapy" },
    { icon: FaHandPaper, text: "Theragun Massage" },
    { icon: GiHealthCapsule, text: "Compression Therapy" },
    { icon: FaSnowman, text: "Localized Cryotherapy" },
    { icon: FaAirFreshener, text: "Cryo Facial" },
    { icon: FaRulerVertical, text: "Cryoslimming" },
    { icon: FaVectorSquare, text: "Cryotoning" },
  ];

  // Inside AllServices.tsx
  
  return (
    <List ml={8} spacing={1}>
      {serviceItems.map(({ icon, text }, index) => (
        <ListItem key={index}>
          <MenuItem icon={icon} textColor="your-text-color" hoverBgColor="your-bg-color">
            {text}
          </MenuItem>
        </ListItem>
      ))}
    </List>
  );
};