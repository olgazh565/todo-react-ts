import { useAppSelector } from '../../hooks/useAppSelector';

export const Title = () => {
  const { user } = useAppSelector(state => state.todos);

  return (
    user && (
      <h3 className='mb-3 text-center'>
        {user}, приветствую в Todo App!
      </h3>
    )
  );
};
