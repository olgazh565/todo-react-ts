import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logoutUser } from '../../store/todosSlice';
import Button from 'react-bootstrap/Button';

export const Logout = () => {
  const { user } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  return (
    user && (
      <Button
        variant='outline-info'
        type='button'
        onClick={() => dispatch(logoutUser())}
      >
        Log out
      </Button>
    )
  );
};

