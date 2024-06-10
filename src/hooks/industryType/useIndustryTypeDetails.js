import { useQuery } from "react-query";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetIndustryTypeDetails = () => {
    return useQuery(["getIndustryTypeDetails"], () => getIndustryTypeDetails(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };