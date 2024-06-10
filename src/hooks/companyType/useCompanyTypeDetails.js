import { useQuery } from "react-query";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetCompanyTypeDetails = () => {
    return useQuery(["getCompanyTypeDetails"], () => getCompanyTypeDetails(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };