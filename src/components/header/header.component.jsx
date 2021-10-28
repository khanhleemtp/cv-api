import React from 'react';
import {
  Link as ChakraLink,
  Box,
  Flex,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import Logo from './../logo/logo.component';
import { HamburgerIcon as MenuIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Collapse } from '@chakra-ui/transition';
import { useDisclosure } from '@chakra-ui/hooks';

const NavBar = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        color={['white', 'white', 'primary.500', 'primary.500']}
      />
      <MenuToggle toggle={onToggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? (
        <CloseIcon width={4} height={4} />
      ) : (
        <MenuIcon width={6} height={6} />
      )}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <ChakraLink as={Link} to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </ChakraLink>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={6}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/cv">Cv </MenuItem>
        <MenuItem to="/faetures">Features </MenuItem>
        <MenuItem to="/pricing">Pricing </MenuItem>
        <MenuItem to="/signup" isLast>
          <Button
            size="sm"
            rounded="md"
            color={['primary.500', 'primary.500', 'white', 'white']}
            bg={['white', 'white', 'primary.500', 'primary.500']}
            _hover={{
              bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
            }}
          >
            Create Account
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      // mb={8}
      py={4}
      px={[4, 8, 16, 24]}
      boxShadow="lg"
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
