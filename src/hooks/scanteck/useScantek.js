import { useQuery } from "react-query";
import { getScantekDetailsByUserId } from "../../api/scantek/scantek-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetScantekDetailsByUserId = (userId) => {
    return useQuery(["getScantekDetailsByUserId"], () => getScantekDetailsByUserId(userId), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };
