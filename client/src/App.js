import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import EditEvent from './components/events/EditEvent';
import CreateEvent from './components/events/CreateEvent';
import Toaster from './components/shared/toaster/Toaster';
import NotFound from './components/notFound/NotFound';
import Events from './components/events/EventsList';
import Navbar from './components/nav/Navbar';

import { appMainColor } from './helpers/colors';

const StyledContainer = styled.section`
  width: 100%;
  height: 3.5rem;
  background-color: ${appMainColor};
`;

export const StyledResponsiveContainer = styled.section`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 768px) {
    width: 750px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const App = () => {
  const { isToasterVisible, message, status } = useSelector(
    ({ shared }) => shared
  );

  const showToaster = isToasterVisible ? (
    <Toaster message={message} status={status} />
  ) : null;

  return (
    <Router>
      <StyledContainer>
        <StyledResponsiveContainer>
          {showToaster}
          <Navbar />
          <Switch>
            <Redirect exact from='/' to='/events' />
            <Route component={Events} path='/events' exact />
            <Route component={CreateEvent} path='/create-event' />
            <Route component={EditEvent} path='/events/edit/:id' />
            <Route component={NotFound} path='/404' />
            <Redirect to='/404' />
          </Switch>
        </StyledResponsiveContainer>
      </StyledContainer>
    </Router>
  );
};

export default App;
