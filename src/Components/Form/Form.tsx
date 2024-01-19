import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addTodo } from '../../store/todosSlice';
import Button from 'react-bootstrap/Button';

export const Form = () => {
  const {user} = useAppSelector(state => state.todos);
  const taskRef = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('обычная');
  const [disabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const handleChangeTask = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      setTask(e.target.value);

      if (e.target.value.trim().length) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  };

  const handleChangePriority = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLSelectElement) {
      setPriority(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    dispatch(addTodo({task, priority}));
    setDisabled(true);
    setTask('');

    if (taskRef.current) {
      taskRef.current.focus();
    }
  };

  useEffect(() => {
    if (taskRef.current) {
      taskRef.current.focus();
    }
  }, [user, taskRef]);

  return (
    user && (
      <form
        className='d-flex align-items-center mb-3'
        onSubmit={handleSubmit}
      >
        <label className='form-group me-3 mb-0'>
          <input
            className='form-control form-input'
            type='text'
            name='task'
            aria-label='ввести задачу'
            placeholder='ввести задачу'
            ref={taskRef}
            value={task}
            onChange={handleChangeTask}
          />
        </label>

        <select
          className='form-select me-3 mb-0 w-25'
          name='priority'
          aria-label='выбери важность'
          value={priority}
          onChange={handleChangePriority}
        >
          <option disabled>Важность</option>
          <option value='обычная'>Обычная</option>
          <option value='важная'>Важная</option>
          <option value='срочная'>Срочная</option>
        </select>

        <Button
          className='me-3'
          variant='primary'
          type='submit'
          disabled={disabled}
        >
          Сохранить
        </Button>

        <Button
          variant='warning'
          type='reset'
          disabled={disabled}
          onClick={() => {
            setTask('');
            setDisabled(true);
            if (taskRef.current) {
              taskRef.current.focus();
            }        
          }}
        >
          Очистить
        </Button>

      </form>
    )
  );
};
