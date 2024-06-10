import { useQuery } from "react-query";
import { getAllCountries } from "../../api/country/country-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetAllCountries = () => {
    return useQuery(["getAllCountries"], () => getAllCountries(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };