import { useQuery } from "react-query";
import { getBusinessTypeDetails } from "../../../../api/profile/business/business-type-api";

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