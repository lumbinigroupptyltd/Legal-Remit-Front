import { useQuery } from "react-query";

{
    /*________________________GET_____________________________________*/
  }
  export const useGetDocTypeDetails = () => {
    return useQuery(["getDocTypes"], () => getDocTypeDetails(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };

  {
    /*________________________GET_____________________________________*/
  }
  export const useGetDocTypeById = (docTypeId) => {
    return useQuery(["getDocTypeById"], () => getDocTypeById(docTypeId), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };