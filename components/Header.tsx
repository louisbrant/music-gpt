// Header.tsx
import { Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, FC } from "react";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
const MotionButton = motion(Button);

const MotionIconButton = motion(IconButton);

interface HeaderProps {
  openModal: (open: Boolean) => void;
}

export const Header: FC<HeaderProps> = ({ openModal }) => {
// export const Header: FC<HeaderProps> = ({ }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();

  const iconButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    initial: { scale: 1, boxShadow: 'none', y: 0 },
    hover: { scale: 1.05, boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', y: -2 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <AnimatePresence>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </AnimatePresence>
      <header className="h-16 bg-black w-full fixed top-0 left-0 z-30 flex justify-between items-center">
        {/* Removed HamburgerIcon here */}
        <div className="z-20 flex-grow flex justify-left items-center">
          <Button onClick={() => setSidebarOpen(true)} variant='link'> {/* Added sidebar opening functionality here */}
            <motion.div
              role="button"
              tabIndex={0}
              style={{ display: 'block', cursor: 'pointer' }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={logoVariants}
              transition={{ duration: 0.5 }}
            >
              <img src="/logos/logoicon.png" className="h-16 w-auto mx-auto" alt="ML Logo" />
            </motion.div>
          </Button>
        </div>
      </header>
    </>
  );
};