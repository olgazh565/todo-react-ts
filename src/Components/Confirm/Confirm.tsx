import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export const Confirm = ({ show, handleClose, handleDelete }: Props) => (
  <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header>
      <Modal.Title>Подтвердите удаление задачи</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button variant="primary" onClick={handleDelete}>
        Подтвердить
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Отменить
      </Button>
    </Modal.Footer>
  </Modal>
);

