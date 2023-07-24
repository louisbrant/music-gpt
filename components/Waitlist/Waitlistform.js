import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, FormErrorMessage, useToast } from "@chakra-ui/react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);

    const response = await fetch('https://dash.MuscleLab.la/api/waitlist', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      toast({
        title: "Success.",
        description: "You have been added to the waitlist.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
      setName("");
      setPhone("");
    } else {
      toast({
        title: "Error.",
        description: "There was an error submitting your information. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" mb={5}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          type="text"
          value={name}
          isRequired
          onChange={handleNameChange}
          _hover={{ borderColor: "blue.500" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
        />
      </FormControl>

      <FormControl id="phone" mb={5}>
        <FormLabel>Phone</FormLabel>
        <Input
          placeholder="Enter your phone number"
          type="tel"
          value={phone}
          isRequired
          onChange={handlePhoneChange}
          _hover={{ borderColor: "blue.500" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
        />
      </FormControl>

      <FormControl id="email" isInvalid={!!error} mb={5}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          type="email"
          value={email}
          isRequired
          onChange={handleInputChange}
          _hover={{ borderColor: "blue.500" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="blue"
        size="lg"
        width="full"
        type="submit"
        isLoading={isLoading}
        _hover={{ bg: "blue.700", transition: "all 0.2s ease-in-out" }}
        _active={{ bg: "blue.800", transform: "scale(0.95)" }}
      >
        {isLoading ? 'Submitting...' : 'Secure Your Spot'}
      </Button>
    </form>
  );
};

export default WaitlistForm;