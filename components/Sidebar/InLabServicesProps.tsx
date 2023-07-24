import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaSyringe, FaBandAid, FaSnowflake, FaLeaf, FaTruck, FaBriefcaseMedical, FaBahai, FaJoint } from "react-icons/fa";
import { MenuItem } from "./MenuItem";
import { useRouter } from 'next/router';

interface InLabServicesProps {}

export const InLabServices: React.FC<InLabServicesProps> = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [joinWaitListLinkReady, setJoinWaitListLinkReady] = useState<boolean>(false);

  const serviceItems = [
    { icon: FaCalendarAlt, text: "Day Pass", href: "/services/daypass" },
    { icon: FaSyringe, text: "IV Therapy", href: "/services/ivtherapy" },
    { icon: FaBandAid, text: "Muscle Recovery", href: "/categories/muscle-recovery" },
    { icon: FaSnowflake, text: "Cryo & Heat", href: "/categories/cryo-heat" },
    { icon: FaLeaf, text: "Cryo Skin", href: "/categories/cryoskin" },
    { icon: FaTruck, text: "Mobile", href: "/mobileservices" },
    { icon: FaBriefcaseMedical, text: "Corporate Wellness", href: "#", isComingSoon: true },
    { icon: FaBahai, text: "Take Five", href: "/" },
    { icon: FaJoint, text: "Custom Recovery Plans", href: "/waitlist", isJoinWaitlist: true },
  ];

  const highlightBgColor = "#000"; // Set background color to black
  const highlightTextColor = "#54c7e3"; // Set text and icon color for special items
  const textColor = "#333"; // Dark Grey color for normal text
  const hoverBgColor = "#ddd"; // Light Grey color for hover background
  const hoverHighlightBgColor = "#fff"; // White color for hover background of special items
  const hoverHighlightTextColor = "#000"; // Black color for hover text of special items

  const router = useRouter();

  const onClickJoinWaitlist = () => {
    if(joinWaitListLinkReady) {
      router.push('/waitlist');
    }
    else {
      setJoinWaitListLinkReady(true);
    }
  }

  return (
    <List spacing={4}>
      {serviceItems.map(({ icon, text, href, isComingSoon, isJoinWaitlist }, index) => (
        <ListItem 
          key={index} 
          cursor="pointer"
          onMouseEnter={() => setHoveredItem(text)}
          onMouseLeave={() => setHoveredItem(null)}>
         <HStack spacing={1} display="flex">
           {
             isJoinWaitlist ? 
             <>
             <Link 
                onClick={() => onClickJoinWaitlist()} 
                flex={1}
                className="sidebar-link"
                >
                  <MenuItem icon={icon} textColor={textColor} hoverBgColor={hoverBgColor}>
                      {joinWaitListLinkReady ? 'Join Waitlist' : text }
                    </MenuItem>
              </Link>
             </>
             :
             <Link 
              onClick={isComingSoon ? (e) => e.preventDefault() : () => {}} 
              href={!isComingSoon ? href : '#'}
              flex={1}
              className="sidebar-link"
              >
                {/* Style the Mobile Service and Corporate items differently */}
                <MenuItem icon={icon} textColor={textColor} hoverBgColor={hoverBgColor}>
                    {isComingSoon && hoveredItem === text ? 'Coming Soon' : text }
                  </MenuItem>
            </Link>
           }
         </HStack>
        </ListItem>
      ))}
    </List>
  );
};