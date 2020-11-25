import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { fetchEvents } from '../../store/actions/EventActions';
import Loader from '../shared/loader/Loader';
import Event from './Event';

import {
  appMainColor,
  eventCardFontColor,
  lightTitleColor,
} from '../../helpers/colors';

const CardContainer = styled.section`
  width: 90%;
  margin: 50px auto;

  .pagination {
    margin: 15px auto;
    display: flex;
    list-style: none;
    outline: none;
    justify-content: center;
  }
  .pagination > .active > a {
    background-color: ${appMainColor};
    border-color: ${appMainColor};
    color: ${eventCardFontColor};
  }

  .page-link {
    color: ${appMainColor};
    border: 1px solid ${appMainColor};
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const TitleIsEmpty = styled.h2`
  text-align: center;
  color: ${appMainColor};

  a {
    color: ${lightTitleColor};
  }
  @media screen and (max-width: 650px) {
    font-size: 1rem;
  }
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;

  :after {
    content: '';
    flex: 0 1 30%;
  }

  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  color: ${appMainColor};
  text-align: center;
  font-size: 40px;
  margin-bottom: 50px;

  @media screen and (max-width: 650px) {
    padding: 20px;
    font-size: 20px;
  }
`;

const Events = () => {
  const { events, currentPage, totalPages } = useSelector(({ event }) => event);
  const { isLoading } = useSelector(({ shared }) => shared);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  const totalItems = totalPages * events.length;

  const handlePageClick = (page) => {
    dispatch(fetchEvents(page));
  };

  const isEmpty = !events.length && (
    <TitleIsEmpty>
      You don't have any events! Click to create one:{' '}
      <NavLink exact to='/create-event'>
        click
      </NavLink>
    </TitleIsEmpty>
  );

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <CardContainer>
        <Title>Events</Title>
        <RowContainer>
          {events.map((event) => (
            <Event
              key={event._id}
              event={event}
              currentPage={currentPage}
              events={events}
            />
          ))}
        </RowContainer>
        {isEmpty}
        {totalPages > 1 && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={events.length}
            totalItemsCount={totalItems}
            pageRangeDisplayed={totalPages}
            onChange={handlePageClick}
            itemClass='page-item'
            linkClass='page-link'
            firstPageText='First'
            lastPageText='Last'
          />
        )}
      </CardContainer>
    </>
  );
};

export default Events;
