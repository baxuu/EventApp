import React from 'react';

import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import {
  appMainColor,
  errorFontColor,
  errorBackgroundColor,
  bordersColor,
  lightBackgroundColor,
} from '../../helpers/colors';

const Form = styled.form`
  max-width: 600px;
  background-color: ${appMainColor};
  color: #fff;
  list-style-type: none;
  padding: 1rem;
  border-radius: 3px;
  margin: 8rem auto;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: flex-end;
  padding: 0.4em 0.7em;

  label {
    padding: 0.6em 1em 0.6em 0;
    flex: 1;
  }
  input {
    flex: 2;
    padding: 0.5em;
  }
  > div {
    flex: 1;
    padding: 0.6em 1em 0.6em 0;
  }
  > p {
    justify-content: flex-end;
    width: 66%;
    padding: 0.2em 0.5em;
    text-align: center;
    color: ${errorFontColor};
    background-color: ${errorBackgroundColor};
    border: 1px solid ${errorFontColor};
  }
  p::before {
    display: inline;
    content: '⚠ ';
  }
`;

const StyledButton = styled.button`
  background: ${lightBackgroundColor};
  color: ${appMainColor};
  text-align: center;
  margin: 15px;
  text-decoration: none;
  padding: 8px 15px;
  border-color: ${bordersColor};
  cursor: pointer;

  & div {
    font-size: 1.1rem;
  }
  i {
    margin-right: 10px;
  }

  :hover,
  :active {
    transform: scale(1.05);
    outline: none;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const createEventForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  isAddMode,
}) => {
  const errorMessage = (name) => {
    return (
      <ErrorMessage errors={errors} name={name} as='p'>
        {({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p role='alert' key={type}>
              {message}
            </p>
          ))
        }
      </ErrorMessage>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>{isAddMode ? 'Add Event' : 'Edit Event'}</Title>
      <ListItem>
        <label htmlFor='firstname'>First name</label>
        <input
          name='firstname'
          type='text'
          ref={register({
            required: 'First name is required.',
            minLength: {
              value: 4,
              message: 'First name should be at least 4 chars long!',
            },
          })}
        />
      </ListItem>
      <ListItem>{errorMessage('firstname')}</ListItem>
      <ListItem>
        <label htmlFor='lastname'>Last name</label>
        <input
          name='lastname'
          type='text'
          ref={register({
            required: 'Last name is required.',
            minLength: {
              value: 4,
              message: 'Last name should be at least 4 chars long!',
            },
          })}
        />
      </ListItem>
      <ListItem>{errorMessage('lastname')}</ListItem>
      <ListItem>
        <label htmlFor='email'>Email Address</label>
        <input
          name='email'
          type='email'
          ref={register({
            required: 'Email adress is required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
      </ListItem>
      <ListItem>{errorMessage('email')}</ListItem>
      <ListItem>
        <label htmlFor='date'>Event date</label>
        <input
          name='date'
          type='date'
          ref={register({ required: 'Event date is required.' })}
        />
      </ListItem>
      <ListItem>
        <ErrorMessage errors={errors} name='date' as='p' />
      </ListItem>
      <ListItem>
        <StyledButton type='submit'>
          <div>
            <i className='fas fa-calendar-plus'></i>{' '}
            {isAddMode ? 'Create' : 'Edit '}
          </div>
        </StyledButton>
      </ListItem>
    </Form>
  );
};

export default createEventForm;
