import { coreAxiosInstance } from './axiosIntercepters';

export const getExchangeRate = async (fromCountryId, toCountryId) => {
  const formData = {
    fromCountryId,
    toCountryId,
  };

  try {
    const response = await coreAxiosInstance.post("/exchangerate/getRateByCountry", formData);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
};
