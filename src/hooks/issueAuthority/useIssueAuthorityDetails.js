import { useQuery } from "react-query";
import { getIdIssuingAuthority } from "../../api/issuingAuthority/issuing-authority-api";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetIdIssuingAuthority = () => {
    return useQuery(["getUserIssuingAuthority"], () => getIdIssuingAuthority(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };