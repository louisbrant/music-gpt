import React from "react";
import { IconButton, Box, Link, Tooltip } from "@chakra-ui/react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

interface SocialIconProps {
  color: string;
  hoverColor: string;
}

export const SocialIcons: React.FC<SocialIconProps> = ({ color, hoverColor }) => {
  const socialLinks = [
    {
      icon: FaTwitter,
      href: "https://twitter.com/musclelabla",
      label: "Twitter",
    },
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/musclelabla",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/musclelab",
      label: "Instagram",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/channel/UChHjX1HdZVzO3Qhs3EaJTxg",
      label: "YouTube",
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/musclelabla",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      {socialLinks.map(({ icon, href, label }, index) => (
        <Tooltip key={index} label={label} hasArrow arrowSize={8}>
          <Link href={href} isExternal>
            <IconButton
              icon={<Box as={icon} fontSize="24px" color={color} />}
              variant="ghost"
              size="sm"
              _hover={{ color: hoverColor }}
              aria-label={`Visit ${label}`}
            />
          </Link>
        </Tooltip>
      ))}
    </>
  );
};