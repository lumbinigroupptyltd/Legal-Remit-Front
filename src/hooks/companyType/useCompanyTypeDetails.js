import { useQuery } from "react-query";
import { getCompanyTypeDetails } from "../../api/company/company-type-api";

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