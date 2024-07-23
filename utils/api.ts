import axios from 'axios';

const api = axios.create({
  baseURL: 'https://realty-in-us.p.rapidapi.com',
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
  },
});

export const fetchProperties = async (params: any) => {
  const response = await api.post('/properties/v3/list', params);
  return response.data;
};

export const fetchPropertyDetails = async (id: string) => {
  const response = await api.get(`/properties/v3/detail?id=${id}`);
  return response.data;
};
