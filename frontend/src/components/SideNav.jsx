import { Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { TbLogout2 } from 'react-icons/tb';
import { MdOutlineInventory } from 'react-icons/md';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthWrapper';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <>
      <NavLink to="/">
        <Button
          colorScheme="transparent"
          bg="transparent"
          color="white"
          fontSize="18px"
          mt={5}
        >
          <Flex>
            <Icon as={MdOutlineInventory} boxSize={5} mr={2} />
            Inventory
          </Flex>
        </Button>
      </NavLink>
      <Button
        colorScheme="transparent"
        bg="transparent"
        color="white"
        fontSize="18px"
        mt={5}
        onClick={logoutUser}
      >
        <Flex>
          <Icon as={TbLogout2} boxSize={5} mr={2} />
          Logout
        </Flex>
      </Button>
    </>
  );
};

export default SideNav;
