import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { signOut } from '../../store/auth/actions';

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/sign-in');
  };

  return handleSignOut;
};
