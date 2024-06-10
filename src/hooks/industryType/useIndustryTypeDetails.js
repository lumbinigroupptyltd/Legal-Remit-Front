import { useQuery } from "react-query";
import { getIndustryTypeDetails } from "../../api/industry/industry-type-api";

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