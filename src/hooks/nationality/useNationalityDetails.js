import { useQuery } from "react-query";
import { getUserNationality } from "../../api/nationality/nationality-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetUserNationality = () => {
    return useQuery(["getUserNationality"], () => getUserNationality(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };