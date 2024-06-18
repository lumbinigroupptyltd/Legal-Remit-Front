import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { axiosInstance } from '../../utils/axiosIntercepters';

const ApiCallDebounce = (endpoints) => {
  const [debouncedCalls, setDebouncedCalls] = useState([]);

  // Create debounced API call for each endpoint
  useEffect(() => {
    const calls = endpoints.map(({ endpoint, errorMessageSetter, delay = 100 }) => ({
      error: '',
      debouncedApiCall: useCallback(
        debounce(async (value) => {
          try {
            const response = await axiosInstance.post(endpoint, { value });
            const exists = response.data;
            if (exists) {
              errorMessageSetter('');
            }
          } catch (error) {
            if (error.response && error.response.status === 409) {
              errorMessageSetter(`${endpoint === '/user/existornot' ? 'Phone' : 'Email'} already exists`);
            }
          }
        }, delay),
        [endpoint, errorMessageSetter, delay] // Dependency array for useCallback
      ),
    }));
    setDebouncedCalls(calls);
  }, [endpoints]); // Dependency array for useEffect

  return debouncedCalls;
};

export default ApiCallDebounce;
