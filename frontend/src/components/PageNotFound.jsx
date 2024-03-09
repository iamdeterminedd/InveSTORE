import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';

const PageNotFound = () => {
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
      bg="gray.100"
      padding="4"
    >
      <Heading size="2xl" mb="4">
        404 - Page Not Found
      </Heading>
      <Text fontSize="xl" mb="4">
        Oops! Page not found.
      </Text>
      <Text fontSize="md" mb="6">
        Sorry, the page you are looking for might have been removed, had its
        name changed, or is temporarily unavailable.
      </Text>
      <Link href="/" color="blue.500" fontWeight="bold" textDecoration="none">
        Go back to homepage
      </Link>
    </Flex>
  );
};

export default PageNotFound;
