import { useQuery } from "react-query";
import { getUserInfoByUserId, getVerifyEmail } from "../../api/userInfo/user-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetUserInfoByUserId = (userId) => {
    return useQuery(["getUserInfoByUserId"], () => getUserInfoByUserId(userId), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };

  /*________________________Get_____________________________________*/

export const useGetVerifyEmail = () => {
  return useQuery(["getVerifyEmail"], () => getVerifyEmail(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};