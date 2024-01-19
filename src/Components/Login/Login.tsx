import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loginUser } from '../../store/todosSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Login = () => {
  const { user } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [show, setShow] = useState(!user);

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (name.trim().length > 0) {
      dispatch(loginUser(name));
      setName('');
      setShow(false);
    }
  };

  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameRef, show]);

  useEffect(() => {
    if (!user) {
      setShow(true);
    }
  }, [user]);

  return (
    !user && (
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className='text-center'>
            Приветствую в приложении для управления задачами - ToDo
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form
            className='form'
            onSubmit={handleSubmit}
            id='login'
          >
            <label
              className='form-group mb-10 d-block'
              htmlFor='name'
            >
              Введите ваше имя
            </label>
            <input
              className='form-control modal-input'
              name='name'
              type='text'
              value={name}
              ref={nameRef}
              onChange={handleChange}
              onBlur={() => {
                if (nameRef && nameRef.current) {
                  nameRef.current.focus();
                }
              }}
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className='mr-3'
            variant="outline-primary"
            type='submit'
            form='login'
          >
            Сохранить
          </Button>
          <Button
            variant="outline-danger"
            type='button'
            onClick={() => { setName('') }}
          >
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

