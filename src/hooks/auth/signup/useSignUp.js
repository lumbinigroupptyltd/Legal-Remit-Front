import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { addSignUp } from '../../../api/auth/signup/signup-api';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useDispatch } from 'react-redux';
import { storeUserId } from '../../../redux/actions/authAction';
  
  {
    /*________________________POST_____________________________________*/
  }
  export const useSignUp = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    return useMutation(
      ['addsignup'],
      (formData) => addSignUp(formData),
      {
        onSuccess: (data, variables, context) => {
          toast.success('Sign up successful! Verify your OTP');
          onSuccess && onSuccess(data, variables, context);
          dispatch(storeUserId(data?.data));
          queryClient.invalidateQueries('');
        },
        onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
        },
      }
    );
  };