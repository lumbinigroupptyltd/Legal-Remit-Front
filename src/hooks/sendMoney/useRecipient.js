import { useMutation, useQuery, useQueryClient } from "react-query";
import { addRecipientBankDetails, addRecipientContactDetails, addRecipientMessageDetails, editRecipientBankDetails, editRecipientContactDetails, editRecipientMessageDetails, getRecipientBankDetails, getRecipientContactDetails, getRecipientMessageDetails } from "../../api/sendmoney/recipient-api";

/*________________________RECIPIENT_CONTACT_DETAILS_____________________________________*/

{
  /*________________________GET_____________________________________*/
}
export const useGetRecipientContactDetails = () => {
  return useQuery(["getRecipientContactDetails"], () => getRecipientContactDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddRecipientContactDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addRecipientContactDetails"],
    (formData) => addRecipientContactDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRecipientContactDetails");
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
export const useEditRecipientContactDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editRecipientContactDetails"],
    (formData) => {
      editRecipientContactDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("User edited successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getRecipientContactDetails");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};

/*________________________RECIPIENT_BANK_DETAILS_____________________________________*/

{
  /*________________________GET_____________________________________*/
}
export const useGetRecipientBankDetails = () => {
  return useQuery(["getRecipientBankDetails"], () => getRecipientBankDetails(), {
    cacheTime: 10000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

{
  /*________________________POST_____________________________________*/
}
export const useAddRecipientBankDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addRecipientBankDetails"],
    (formData) => addRecipientBankDetails(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getRecipientBankDetails");
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
export const useEditRecipientMessageDetails = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["editRecipientBankDetails"],
    (formData) => {
      editRecipientBankDetails(formData);
    },
    {
      onSuccess: (data, variable, context) => {
        toast.success("User edited successfully");
        onSuccess && onSuccess(data, variable, context);
        queryClient.invalidateQueries("getRecipientBankDetails");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};




/*________________________RECIPIENT_MESSAGE_DETAILS_____________________________________*/

{
    /*________________________GET_____________________________________*/
  }
  export const useGetRecipientMessageDetails = () => {
    return useQuery(["getRecipientMessageDetails"], () => getRecipientMessageDetails(), {
      cacheTime: 10000,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    });
  };
  
  {
    /*________________________POST_____________________________________*/
  }
  export const useAddRecipientMessageDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["addRecipientMessageDetails"],
      (formData) => addRecipientMessageDetails(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success("");
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries("getRecipientMessageDetails");
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
  export const useEditRecipientBankDetails = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ["editRecipientMessageDetails"],
      (formData) => {
        editRecipientMessageDetails(formData);
      },
      {
        onSuccess: (data, variable, context) => {
          toast.success("User edited successfully");
          onSuccess && onSuccess(data, variable, context);
          queryClient.invalidateQueries("getRecipientMessageDetails");
        },
        onError: (err, _variables, _context) => {
          toast.error(getErrorMessage(err));
        },
      }
    );
  };
  