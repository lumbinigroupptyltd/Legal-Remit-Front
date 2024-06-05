import { getErrorMessage } from "../../../utils/getErrorMessage";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { addIdDetailsProfile, addKycDetailsProfile, addMyDocumentsProfile, addPersonalDetailsProfile } from "../../../api/profile/profile-api";
import { addBusinessDirective, addBusinessShare, addPersonalBusinessExtraProfile, addPersonalBusinessProfile, editBusinessDirective, editBusinessShare, editPersonalBusinessExtraProfile, editPersonalBusinessProfile } from "../../../api/profile/business-profile-api";

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
    (formData) => addPersonalBusinessProfile(formData),
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
  /*________________________PATCH_____________________________________*/
}
export const useEditPersonalBusinessProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editPersonalDetails'],
    (formData) => {
      editPersonalBusinessProfile(formData);
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
export const usePersonalBusinessExtraProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => addPersonalBusinessExtraProfile(formData),
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
  /*________________________PATCH_____________________________________*/
}
export const useEditPersonalBusinessExtraProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editPersonalDetails'],
    (formData) => {
      editPersonalBusinessExtraProfile(formData);
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
  /*________________________PUT_____________________________________*/
}
export const useBusinessDirective = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addDirectors"],
    (formData) => addBusinessDirective(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Directors added successfully");
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
  /*________________________PATCH_____________________________________*/
}
export const useEditBusinessDirective = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => editBusinessDirective(formData),
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
  /*________________________PUT_____________________________________*/
}
export const useBusinessShare = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => addBusinessShare(formData),
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
  /*________________________PATCH_____________________________________*/
}
export const useEditBusinessShare = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => editBusinessShare(formData),
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