import { useState } from 'react';
import { Header } from "@/components/Header";
import { Box, Heading, Text, Flex, Input, Button, useToast, FormControl, FormErrorMessage, useDisclosure, Collapse, Checkbox } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axios from 'axios';

const MotionBox = motion(Box);

const SelectableSubServices: React.FC<{ subservices: { title: string, description: string }[]; selected: Set<string>; toggle: (subservice: string) => void; }> = ({ subservices, selected, toggle }) => (
  <Box mt={4}>
    {subservices.map((subservice, index) => (
      <Box 
        key={index}
        mt={2}
        textAlign="center"
        pt={2} 
        borderTop="1px" 
        borderTopColor="gray.200"
      >
        <Checkbox isChecked={selected.has(subservice.title)} onChange={() => toggle(subservice.title)}>
          <Heading fontSize="xl" mb={2}>
            {subservice.title}
          </Heading>
        </Checkbox>
        <Text fontSize="sm">
          {subservice.description}
        </Text>
      </Box>
    ))}
  </Box>
)

const ServiceCard: React.FC<{ title: string; description: string; onClick: any; isSelected: boolean, subservices: { title: string, description: string }[] }> = ({
  title,
  description,
  onClick,
  isSelected,
  subservices = []
}) => {
  return (
    <MotionBox
      mb={4}
      w="300px"
      onClick={onClick}
      bg={isSelected ? 'blue.500' : 'white'}
      color={isSelected ? 'white' : 'black'}
      borderRadius="xl"
      p={6}
      boxShadow="md"
      textAlign="center"
      cursor="pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <Heading fontSize="2xl" fontWeight="bold" mb={4}>
        {title}
      </Heading>
      <Text>{description}</Text>
      <Collapse in={isSelected}>
        <SelectableSubServices subservices={subservices} selected={isSelected ? new Set([title]) : new Set()} toggle={onClick} />
      </Collapse>
    </MotionBox>
  );
};

const MobileServicesPage: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({ name: '', address: '', time: '', date: '' });
  const toast = useToast();

  const toggleService = (service: string) => {
    const newSelectedServices = new Set(selectedServices);
    if (newSelectedServices.has(service)) {
      newSelectedServices.delete(service);
    } else {
      newSelectedServices.add(service);
    }
    setSelectedServices(newSelectedServices);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const services = [
    { 
      title: 'Mobile IV Therapy', 
      description: 'Replenish your body with essential nutrients.', 
      subservices: [
        {title: 'Cocktails/Drips', description: 'Hydration Drip, ...'},
        {title: 'Vitamin Shots', description: 'Energy Shot, ...'},
        {title: 'NAD+ IV Therapy', description: 'Details of NAD+ IV Therapy'}
      ]
    },
    { title: 'Stretch Therapy', description: 'Improve flexibility and range of motion.' },
    { title: 'Compression Therapy', description: 'Enhance circulation and reduce muscle soreness.' },
    { title: 'Myofascial Release', description: 'Relieve tension and restore motion.' },
  ];

  const submitData = async () => {
    onOpen();
    try {
      const formSubmission = new FormData();
      formSubmission.append('services', Array.from(selectedServices).join(', '));
      formSubmission.append('name', formData.name);
      formSubmission.append('address', formData.address);
      formSubmission.append('time', formData.time);
      formSubmission.append('date', formData.date);

      const response = await axios.post('https://dash.MuscleLab.la/api/waitlist', formSubmission);
      toast({
        title: 'Submission Successful',
        description: 'Your request has been sent successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Submission Error',
        description: 'An error occurred while submitting your request. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Box bg="gray.100" minH="100vh" py={8}>
      <Header openModal={function (open: Boolean): void {
        throw new Error('Function not implemented.');
      } } />
      <Heading as="h1" fontSize="4xl" textAlign="center" mb={10} mt="60px">
        Mobile Services
      </Heading>
      <Flex direction="column" align="center" justify="center">
        <motion.div initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.5 } },
        }}>
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              isSelected={selectedServices.has(service.title)}
              onClick={() => toggleService(service.title)}
              subservices={service.subservices || []} 
            />
          ))}
        </motion.div>
        <FormControl isRequired mt={4}>
          <Input placeholder="Name" name="name" onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <Input placeholder="Address" name="address" onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <Input placeholder="Time" name="time" onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <Input placeholder="Date" name="date" onChange={handleInputChange} />
        </FormControl>
        <Button onClick={submitData} colorScheme="blue" mt={4} isLoading={isOpen}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default MobileServicesPage;