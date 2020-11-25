import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { fetchEvent, editEvent } from '../../store/actions/EventActions';
import CreateEventForm from './CreateEventForm';
import Loader from '../shared/loader/Loader';

const EditEvent = ({ match }) => {
  const { event } = useSelector(({ event }) => event);
  const { isLoading } = useSelector(({ shared }) => shared);

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      event,
    },
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const eventId = match.params.id;

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    reset(event);
  }, [reset, event]);

  const onSubmit = (data) => {
    dispatch(editEvent(eventId, data, history));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CreateEventForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default EditEvent;
