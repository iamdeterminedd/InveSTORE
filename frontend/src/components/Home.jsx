import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import SideNav from './SideNav';

export const Home = () => {
  return (
    <>
      <Grid
        templateAreas={`'header header' 'nav main'`}
        gridTemplateRows={'80px 1fr'}
        gridTemplateColumns={'250px 1fr'}
      >
        <GridItem pl={5} bg="white" area={'header'}>
          <Header />
        </GridItem>
        <GridItem minH="100vh" pl={2} pt={10} bg="green.500" area={'nav'}>
          <SideNav />
        </GridItem>
        <GridItem area={'main'}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};
