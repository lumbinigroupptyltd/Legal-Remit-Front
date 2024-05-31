import { getErrorMessage } from "../../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { addIdDetailsProfile, addKycDetailsProfile, addMyDocumentsProfile, addPersonalDetailsProfile } from "../../../api/profile/profile-api";

{
  /*________________________POST_____________________________________*/
}
export const useKycBusinessProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["verification"],
    (formData) => kycBusinessProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("OTP send successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

{
  /*________________________POST_____________________________________*/
}
export const useMyDocumentsBusinessProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["verification"], () => myDocumentsBusinessProfile(), {
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
  /*________________________POST_____________________________________*/
}
export const usePersonalBusinessProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => personalBusinessProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
{
  /*________________________POST_____________________________________*/
}
export const useIdBusinessProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => idBusinessProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

{
  /*________________________POST_____________________________________*/
}
export const useAddDocument = ({ onSuccess, bodHead }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["getCitizenshipField"],
    async (formData) => await addMyDocumentsProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDocAll");
        toast.success("Photo added successfully");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*________________________DELETE DOC DETAIL_____________________________________*/
export const useDeleteDocField = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const kycBankDelete = useMutation(
    ["deleteDoc"],
    (row) => {
      addMyDocumentsProfile(row);
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