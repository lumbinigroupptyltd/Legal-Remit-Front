import { getErrorMessage } from "../../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addIdDetailsProfile,
  addKycDetailsProfile,
  addMyDocumentsProfile,
  addPersonalDetailsProfile,
  getUserIdDetails,
  getUserKycDetails,
} from "../../../api/profile/profile-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetUserIdDetails = () => {
  return useQuery(["getIdDetails"], () => getUserIdDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetUserKycDetails = () => {
  return useQuery(["getKycDetails"], () => getUserKycDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useKycDetailsProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["verification"],
    (formData) => addKycDetailsProfile(formData),
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
export const useMyDocumentsProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["verification"], () => addMyDocumentsProfile(), {
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
export const usePersonalDetailsProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => addPersonalDetailsProfile(formData),
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
export const useIdDetailsProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => addIdDetailsProfile(formData),
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
