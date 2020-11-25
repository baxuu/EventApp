import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { createEvent } from '../../store/actions/EventActions';
import CreateEventForm from './CreateEventForm';
import Loader from '../shared/loader/Loader';

const CreateEvent = () => {
  const { isLoading } = useSelector(({ shared }) => shared);

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(createEvent(data, history));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CreateEventForm
      isAddMode
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default CreateEvent;
