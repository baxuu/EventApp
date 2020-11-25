import React from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { appMainColor, eventCardFontColor } from '../../helpers/colors';

const View = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    background-color: ${appMainColor};
    transform: ${({ expand }) =>
      expand ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 4.5rem;
    transition: transform 0.3s ease-in-out;
  }
`;

const StyledNavLink = styled(NavLink)`
  line-height: 3.5rem;
  text-align: center;
  font-size: 1.2rem;
  color: ${eventCardFontColor};
  padding: 0 1.5rem;
  text-decoration: none;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const RightNav = ({ expand, setExpanded }) => {
  return (
    <View expand={expand}>
      <StyledNavLink to='/events' onClick={() => setExpanded(!expand)}>
        Events
      </StyledNavLink>
      <StyledNavLink to='/create-event' onClick={() => setExpanded(!expand)}>
        Create Event
      </StyledNavLink>
    </View>
  );
};

export default RightNav;
