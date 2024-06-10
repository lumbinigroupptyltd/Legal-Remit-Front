import { useQuery } from "react-query";
import { getRoles } from "../../api/role-api/role-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetRoles = () => {
    return useQuery(["getRoles"], () => getRoles(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };