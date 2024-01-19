import { useAppDispatch } from '../../hooks/useAppDispatch';
import { FocusEvent } from 'react';
import { Confirm } from '../Confirm/Confirm';
import Button from 'react-bootstrap/Button';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  Item,
  deleteTodo,
  editTodo,
  toggleCompleteTodo
} from '../../store/todosSlice';

interface Props {
  todo: Item;
}

export const Todo = ({ todo }: Props) => {
  const { id, task, priority, completed } = todo;
  const dispatch = useAppDispatch();
  const textRef = useRef<HTMLTableCellElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [taskText, setTaskText] = useState(task);
  const [show, setShow] = useState(false);
  let className: string;

  switch (true) {
    case completed:
      className = 'table-success';
      break;
    case priority === 'важная':
      className = 'table-warning';
      break;
    case priority === 'срочная':
      className = 'table-danger';
      break;
    default:
      className = 'table-light';
      break;
  }

  const handleChange = (e: ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      console.log(e.target.value.trim().length);
      console.log(e.target.value);
      setTaskText(e.target.value);
    }
  }

  const handleBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent;

    if (text !== task && text?.trim().length) {
      dispatch(editTodo({ id, text }));
    }
    setIsDisabled(true);

  }, [dispatch, id, task]);

  const handleClose = () => setShow(false);

  const handleDelete = () => dispatch(deleteTodo(id));

  useEffect(() => {
    if (textRef && textRef.current && !isDisabled) {
      textRef.current.focus();
    }
  }, [textRef, isDisabled]);

  return (
    <>
      <tr
        className={className}
        tabIndex={0}
      >
        <td></td>

        <td
          style={{ textDecoration: completed ? 'line-through' : 'none' }}
          suppressContentEditableWarning={true}
          contentEditable={!isDisabled}
          ref={textRef}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {taskText}
        </td>

        <td>{completed ? 'Выполнена' : 'В процессе'}</td>

        <td>
          <Button
            variant='danger'
            type='button'
            onClick={() => setShow(true)}
          >
            Удалить
          </Button>

          <Button
            variant='success'
            type='button'
            onClick={() => dispatch(toggleCompleteTodo(id))}
            style={{ minWidth: '106px' }}
          >
            {completed ? 'Отменить' : 'Завершить'}
          </Button>

          <Button
            variant='secondary'
            type='button'
            disabled={completed}
            onClick={() => setIsDisabled(false)}
          >
            Редактировать
          </Button>
        </td>
      </tr>

      <Confirm
        show={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};


