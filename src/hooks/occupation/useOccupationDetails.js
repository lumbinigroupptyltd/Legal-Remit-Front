import { useQuery } from "react-query";
import { getAllOccupations } from "../../api/occupation/occupation-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetAllOccupations = () => {
  return useQuery(["getUserAllOccupations"], () => getAllOccupations(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
