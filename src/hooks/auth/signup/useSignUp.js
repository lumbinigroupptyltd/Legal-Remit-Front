import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addSignUp } from '../../../api/auth/signup/signup-api';
import { getErrorMessage } from '../../../utils/getErrorMessage';
  
  {
    /*________________________POST_____________________________________*/
  }
  export const useSignUp = ({ onSuccess }) => {
    const queryClient = useQueryClient();
    return useMutation(
      ['addsignup'],
      (formData) => addSignUp(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success('Sign up successful! Verify your OTP');
          onSuccess && onSuccess(data, variables, context);
          queryClient.invalidateQueries('');
        },
        onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
        },
      }
    );
  };