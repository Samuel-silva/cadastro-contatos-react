import { Alert, Modal, Button } from 'react-bootstrap';

const txtNewRegister = <p>Contato adicionado com sucesso.<br />Deseja adicionar um novo contato?</p>;
const txtEditContact = <p>Contato alterado com sucesso.<br />Deseja continuar na editando este contato?</p>;

const erroNewRegister = <p>Houve um erro ao salvar o contato.<br />Deseja adicionar novamente o contato?</p>;
const erroEditContact = <p>Houve um erro ao alterar o contato.<br />Deseja tentar alterar novamente o contato?</p>

function ModalFormFinished(props) {
  const { close, erro, newRegister, show } = props;

  const txtErro = newRegister ? erroNewRegister : erroEditContact;
  const txtSuccess = newRegister ? txtNewRegister : txtEditContact;

  if (show) {
    return (
      <>
        <Modal show={show} onHide={_ => close(false)} animation={false} size="lg">
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert className='mb-0' variant={erro ? 'danger' : 'success'}>
              { erro ? txtErro : txtSuccess }
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="text-white" onClick={_ => close(false)}>
              Sim
            </Button>
            <Button variant="success" className="text-white" onClick={_ => close(true)}>
              Não, ir para tela inicial
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default ModalFormFinished;