import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import house from '../assets/home.png';
import { AuthContext } from '../context/AuthWrapper';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <HStack p="10px" alignItems="center" justifyContent="space-between">
      <NavLink to="/">
        <Box color="gray.700">
          <Box maxW="20px" mb="-5px">
            <img src={house} />
          </Box>
          <Heading fontSize="30px">InveSTORE</Heading>
        </Box>
      </NavLink>
      <Spacer />
      {user && (
        <Box mr="100px" color="gray.700">
          <Flex>
            <Icon as={FaUserCircle} boxSize={7} mr={2} />
            <Text as="b" fontSize="20px">
              Hello, {user.username}
            </Text>
          </Flex>
        </Box>
      )}
    </HStack>
  );
};

export default Header;
