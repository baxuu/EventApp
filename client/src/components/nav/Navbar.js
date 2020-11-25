import React from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import BurgerNav from './BurgerNav';

import { appMainColor, eventCardFontColor } from '../../helpers/colors';

const Nav = styled.nav`
  width: 100%;
  height: 3.5rem;
  background-color: ${appMainColor};
  color: ${eventCardFontColor};
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const AppNameContainer = styled.div`
  font-size: 1.3rem;
  line-height: 3.5rem;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  color: ${eventCardFontColor};
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <Nav>
      <AppNameContainer>
        <StyledNavLink to='/events'>EventApp</StyledNavLink>
      </AppNameContainer>
      <BurgerNav />
    </Nav>
  );
};

export default Navbar;
