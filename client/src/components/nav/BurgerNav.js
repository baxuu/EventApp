import React, { useState } from 'react';

import styled from 'styled-components';

import { eventCardFontColor } from '../../helpers/colors';
import RightNav from './RightNav';

const StyledBurgerMenu = styled.div`
  display: none;
  position: fixed;
  height: 2rem;
  top: 1rem;
  right: 1.5rem;
  z-index: 999;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;
const BurgerElement = styled.div`
  width: 2.5rem;
  height: 0.25rem;
  background-color: ${eventCardFontColor};
`;
const Burger = () => {
  const [expand, setExpanded] = useState(false);

  return (
    <>
      <StyledBurgerMenu open={expand} onClick={() => setExpanded(!expand)}>
        <BurgerElement />
        <BurgerElement />
        <BurgerElement />
      </StyledBurgerMenu>
      <RightNav expand={expand} setExpanded={setExpanded} />
    </>
  );
};

export default Burger;
