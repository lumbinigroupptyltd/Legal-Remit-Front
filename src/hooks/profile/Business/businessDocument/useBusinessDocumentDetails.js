import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addBusinessDocDetails, deleteBusinessDocDetailsById, editBusinessDocDetails, getBusinessDocTypeByDocId, getBusinessDocTypeDetails } from "../../../../api/profile/business/business-doc-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetBusinessDocTypeDetails = () => {
  return useQuery(["getBusinessDocTypeDetails"], () => getBusinessDocTypeDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetBusinessDocTypeByDocId = (docTypeId) => {
  return useQuery(["getBusinessDocTypeByDocId"], () => getBusinessDocTypeByDocId(docTypeId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddBusinessDocDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addBusinessDocumentDetails"], () => addBusinessDocDetails(), {
    onSuccess: (data, variables, context) => {
      toast.success("code re-send Successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

{
  /*________________________PATCH_____________________________________*/
}
export const useEditBusinessDocDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addBusinessDocumentDetails"], () => editBusinessDocDetails(), {
    onSuccess: (data, variables, context) => {
      toast.success("code re-send Successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

{
    /*________________________DELETE DOC DETAIL_____________________________________*/
}
export const useDeleteBusinessDocDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const kycBankDelete = useMutation(
      ["deleteBusinessDocDetailsById"],
      (row) => {
        deleteBusinessDocDetailsById(row);
      },
      {
        onSuccess: (data, variables, context) => {
          onSuccess && onSuccess(data, variables, context);
          toast.success("Successfully deleted document.");
          queryClient.invalidateQueries("getDocument");        
        },
        onError: (err, _variables, _context) => {
          toast.error(`${err.response.data.message}`);
        },
      }
    );
    return {
      isSuccess: kycBankDelete.isSuccess,
      deleteKycBankMutation: kycBankDelete.mutate,
    };
  };