import { useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../Todo/Todo';

export const Table = () => {
  const { user, todos } = useAppSelector(state => state.todos);

  return (
    user && (
      <div className='table-wrapper'>
        <table className='table table-hover table-bordered'>
          <thead>
            <tr>
              <th>№</th>
              <th>Задача</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {todos.length !== 0 && (
              todos.map(todo =>
                <Todo key={todo.id} todo={todo} />
              )
            )}
          </tbody>
        </table>
      </div>
    )
  );
};
