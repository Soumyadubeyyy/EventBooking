import api from './axios';

export const getEvents = async (params = { search: '', page: 1, limit: 10 }) => {
  const response = await api.get('/events', { params });
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};
