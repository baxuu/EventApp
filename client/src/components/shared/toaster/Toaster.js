import React, { useEffect } from 'react';

import styled, { keyframes, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { toasterOff } from '../../../store/actions/SharedActions';

import {
  toasterErrorColor,
  toasterSuccesColor,
  toasterErrorBackgroundColor,
  toasterSuccesBackgroundColor,
  toasterSuccesBorderColor,
} from '../../../helpers/colors';

const fadein = keyframes`
  0% {
    bottom: 0;
    opacity: 0
  }

  100%  {
    bottom: 30px;
    opacity: 1;
  }
`;
const fadeout = keyframes`
  0% {
    bottom: 30px;
    opacity: 1
  }

  100%  {
    bottom: 0;
    opacity: 0
  }
`;

export const StyledToaster = styled.div`
  visibility: ${({ isToasterVisible }) =>
    isToasterVisible ? 'visible' : 'hidden'};
  animation: ${({ isToasterVisible }) =>
    isToasterVisible
      ? css`
          ${fadein} 0.5s
        `
      : css`
          ${fadeout} 0.5s 2.5s
        `};

  min-width: 347.2px;
  margin-left: -173.6px;
  min-height: 80px;
  background-color: ${({ status }) =>
    status === 200 || status === 201
      ? `${toasterSuccesBackgroundColor}`
      : `${toasterErrorBackgroundColor}`};
  color: ${({ status }) =>
    status === 200 || status === 201
      ? `${toasterSuccesColor}`
      : `${toasterErrorColor}`};
  text-align: center;
  border-radius: 2px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  border: 1px solid
    ${({ status }) =>
      status === 200 || status === 201
        ? `${toasterSuccesBorderColor}`
        : `${toasterErrorColor}`};

  .close {
    cursor: pointer;
    font-size: 1.4rem;
  }
`;

const ToasterItem = styled.li`
  padding: 0.1rem;
`;

const ToasterList = styled.ul`
  list-style: none;
`;

const ToasterMessage = styled.div`
  padding: 0.75rem;
`;

const ToasterStatus = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid
    ${({ status }) =>
      status === 200 || status === 201
        ? `${toasterSuccesColor}`
        : `${toasterErrorColor}`};

  strong {
    margin-right: auto;
  }
`;

const Toaster = () => {
  const { isToasterVisible, message, status } = useSelector(
    ({ shared }) => shared
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(toasterOff({ message: '', status: '' }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const toasterQuit = () => {
    dispatch(toasterOff({ message: '', status: '' }));
  };
  return (
    <StyledToaster
      isToasterVisible={isToasterVisible}
      onClick={toasterQuit}
      status={status}
    >
      <ToasterStatus status={status}>
        <strong>
          {status === 200 || status === 201 ? ` Success!` : `Error!`}
        </strong>
        <i className='far fa-times-circle close' onClick={toasterQuit}></i>
      </ToasterStatus>
      <ToasterMessage>
        {typeof message === 'string' ? (
          <ToasterList>
            <ToasterItem>{message}</ToasterItem>
          </ToasterList>
        ) : (
          <ToasterList>
            {message.map((msg, id) => {
              return (
                <ToasterItem key={id}>
                  <i className='fas fa-exclamation-triangle' /> {msg}
                </ToasterItem>
              );
            })}
          </ToasterList>
        )}
      </ToasterMessage>
    </StyledToaster>
  );
};

export default Toaster;
