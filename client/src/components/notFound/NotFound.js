import React from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { appMainColor } from '../../helpers/colors';

const ErrorPage = styled.div`
  height: 300px;
  margin: 7rem auto;
  text-align: center;
`;

const RedirectTitle = styled.h4`
  color: ${appMainColor};
  text-decoration: underline;
  text-decoration-color: ${appMainColor};
`;

const ErrorTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const NotFound = () => {
  return (
    <ErrorPage>
      <ErrorTitle>404</ErrorTitle>
      <h4>The page you are looking for was not found.</h4>
      <NavLink exact to='/'>
        <RedirectTitle>Back to Home </RedirectTitle>
      </NavLink>
    </ErrorPage>
  );
};

export default NotFound;
