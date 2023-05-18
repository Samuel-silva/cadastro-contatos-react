import { Modal, Button } from 'react-bootstrap';

function ModalErroCep(props) {
  const { close, show } = props;

  return (
    <>
      <Modal show={show} animation={false} >
        <Modal.Header />
        <Modal.Body>
          <p>Não foi possível encontrar o endereço, favor preencher os campos de endereço.</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success text-white" onClick={_ => close(false)}>
          Ok
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalErroCep;
