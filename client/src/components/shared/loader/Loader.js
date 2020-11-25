import React from 'react';

import styled, { keyframes } from 'styled-components';

import { appMainColor, lightTitleColor } from '../../../helpers/colors';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100%  {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 16px solid ${appMainColor};
  border-radius: 50%;
  border-top: 16px solid ${lightTitleColor};
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;
