import axios from 'axios';

export const fetchDonations = async () => {
  const response = await axios.get('/api/donations');
  return response.data;
};

export const createDonation = async (donationData) => {
  const response = await axios.post('/api/donations', donationData);
  return response.data;
};
