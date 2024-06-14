import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addUserDocDetails, deleteUserDocDetailsById, editUserDocDetails, getUserAllDocuments, getUserDocumentsTypeDetails } from "../../../../api/profile/user/user-doc-api";
import { getErrorMessage } from "../../../../utils/getErrorMessage";


{
  /*________________________GET_____________________________________*/
}
export const useGetUserAllDocuments = () => {
  return useQuery(["getUserAllDocuments"], () => getUserAllDocuments(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetUserDocumentsTypeDetails = () => {
  return useQuery(["getUserDocumentsTypeDetails"], () => getUserDocumentsTypeDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
    /*________________________POST_____________________________________*/
  }
  export const useAddUserDocumentsDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(["addUserDocDetails"], (formData) => addUserDocDetails(formData), {
      onSuccess: (data, variables, context) => {
        toast.success("Photo uploaded successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDocument");
        queryClient.invalidateQueries("getUserIdDetailsById");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    });
  };


{
  /*________________________PATCH_____________________________________*/
}
export const useEditUserDocumentDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editUserDocDetails"], (formData) => editUserDocDetails(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Image updated Successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getUserIdDetailsById");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};
  
  /*________________________DELETE DOC DETAIL_____________________________________*/
  export const useDeleteUserDocumentsDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    const kycBankDelete = useMutation(
      ["deleteUserDocDetailsById"],
      (row) => deleteUserDocDetailsById(row), {
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