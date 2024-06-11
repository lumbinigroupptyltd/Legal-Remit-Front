import { useQuery } from "react-query";
import { getDocTypeById } from "../../api/documentType/document-type-api";

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
  export const useGetDocTypeById = (id) => {
    return useQuery(["getDocTypeById"], () => getDocTypeById(id), {
      enabled: !!id,
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };