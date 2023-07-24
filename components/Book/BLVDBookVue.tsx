import React, { useEffect, useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

interface BLVDBookVueProps {
  isOpen: boolean;
  onClose: () => void;
}

const BLVDBookVue: React.FC<BLVDBookVueProps> = ({ isOpen, onClose }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Experience Muscle Lab</DrawerHeader>
          <DrawerBody>
            {hasMounted && (
              <iframe
                title="Booking Frame"
                src="https://book.musclelab.la/schedule"
                style={{
                  width: '100%',
                  height: '80vh',
                  border: 'none',
                }}
              />
            )}
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default BLVDBookVue;