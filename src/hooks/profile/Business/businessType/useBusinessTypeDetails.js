import { useQuery } from "react-query";

{
  /*________________________GET_____________________________________*/
}
export const useGetBusinessTypeDetails = () => {
  return useQuery(["getBusinessTypeDetails"], () => getBusinessTypeDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};