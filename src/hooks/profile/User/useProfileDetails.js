import { getErrorMessage } from "../../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addDocument,
  addIdDetailsProfile,
  addKycDetailsProfile,
  addMyDocumentsProfile,
  addPersonalDetailsProfile,
  editIdDetailsProfile,
  editKycDetailsProfile,
  editPersonalDetailsProfile,
  getDocTypeById,
  getDocTypeDetails,
  getUserIdDetails,
  getUserKycDetails,
  getVerifyEmail,
} from "../../../api/profile/profile-api";

{
  /*________________________GET_____________________________________*/
}
export const useGetUserIdDetails = (userId) => {
  return useQuery(["getIdDetails"], () => getUserIdDetails(userId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
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
export const useGetDocTypeById = (doTypeId) => {
  return useQuery(["getDocTypeById"], () => getDocTypeById(doTypeId), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
{
  /*________________________GET_____________________________________*/
}
export const useGetUserKycDetails = (userId) => {
  return useQuery(["getKycDetails"], () => getUserKycDetails(userId), {
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
    ["addKycDetails"],
    (formData) => addKycDetailsProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("kyc details successfully");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getKycDetails");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
{
  /*________________________PATCH_____________________________________*/
}
export const useEditKycDetailsProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editKycDetails'],
    (formData) => {
      editKycDetailsProfile(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success('User edited successfully');
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries('getKycDetails');
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
  return useMutation(["addDocuments"], (formData) => addDocument(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Photo uploaded successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getDocuments");
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
    ["addPersonalDetails"],
    (formData) => addPersonalDetailsProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getPersonalDetails");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
{
  /*________________________PATCH_____________________________________*/
}
export const useEditPersonalDetailsProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editPersonalDetails'],
    (formData) => {
      editPersonalDetailsProfile(formData);
  },
    {
      onSuccess: (data, variable, context) => {
        toast.success('User edited successfully');
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries('getPersonalDetails');
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
    ["addIdDetails"],
    (formData) => addIdDetailsProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Succesfully added");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getIdDetails");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
{
  /*________________________PATCH_____________________________________*/
}
export const useEditIdDetailsProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editIdDetails'],
    (formData) => {
      editIdDetailsProfile(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success('User edited successfully');
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries('getIdDetails');
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
    ["addDocument"],
    async (formData) => await addMyDocumentsProfile(formData),
    {
      onSuccess: (data, variables, context) => {
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getDocument");
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












/*________________________DELETE DOC DETAIL_____________________________________*/

export const useGetVerifyEmail = () => {
  return useQuery(["getIdDetails"], () => getVerifyEmail(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};