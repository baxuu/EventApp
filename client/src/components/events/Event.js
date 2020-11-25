import React from 'react';

import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { deleteEvent } from '../../store/actions/EventActions';

import {
  appMainColor,
  eventCardFontColor,
  lightBackgroundColor,
  bordersColor,
} from '../../helpers/colors';

const Card = styled.div`
  width: 30%;
  background: ${lightBackgroundColor};
  border: 1px solid ${bordersColor};
  margin: 0 10px 50px 10px;
  transition: 0.3s;
  cursor: default;

  :hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 1000px) {
    width: 40%;
  }
  @media screen and (max-width: 650px) {
    width: 80%;
  }
  @media screen and (max-width: 360px) {
    width: 95%;
  }
`;

const CardList = styled.li`
  display: flex;
  justify-content: flex-end;
  padding: 10px 3px;
  border-bottom: 1px solid ${bordersColor};

  span {
    color: ${appMainColor};
  }

  span:nth-child(1) {
    flex: 1;
  }
  span:nth-child(2) {
    flex: 2;
    font-weight: 500;
  }
  @media screen and (max-width: 330px) {
    span {
      font-size: 0.8rem;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  background: ${appMainColor};
  color: ${eventCardFontColor};
  text-align: center;
  margin: 15px;
  text-decoration: none;
  padding: 8px 15px;
  border-color: ${bordersColor};

  :active,
  :hover {
    transform: scale(1.05);
    outline: none;
  }
  i {
    margin-right: 10px;
  }
  @media screen and (max-width: 330px) {
    button {
      padding: 2px 4px;
    }
  }
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  padding: 15px 10px;
  background: ${appMainColor};
  color: ${eventCardFontColor};
`;

const CardButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const Event = ({ event, currentPage, events }) => {
  const eventsLength = events.length;
  const dispatch = useDispatch();

  const deleteEventHandler = (id) => {
    dispatch(deleteEvent(id, currentPage, eventsLength));
  };
  const { _id, firstname, lastname, email, date } = event;

  return (
    <Card>
      <CardTitle>
        {firstname}
        {''} {lastname}
      </CardTitle>
      <CardList>
        <span>Email:</span>
        <span> {email}</span>
      </CardList>
      <CardList>
        <span>Event Date:</span>
        <span> {date}</span>
      </CardList>
      <CardButtons>
        <NavLink to={`/events/edit/${_id}`}>
          <Button>
            <i className='fas fa-edit' />
            Edit
          </Button>
        </NavLink>
        <Button type='submit' onClick={() => deleteEventHandler(_id)}>
          <i className='fas fa-trash-alt' />
          Delete
        </Button>
      </CardButtons>
    </Card>
  );
};

export default Event;
