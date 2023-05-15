import { Modal, Button } from 'react-bootstrap';

const txtNewRegister = "Contato adicionado com sucesso.<br />Deseja adicionar um novo contato?";
const txtEditContact = "Contato alterado com sucesso.<br />Deseja continuar na editando este contato?";

const erroNewRegister = "Houve um erro ao salvar o contato.<br />Deseja adicionar novamente o contato?";
const erroEditContact = "Houve um erro ao alterar o contato.<br />Deseja tentar alterar novamente o contato?";

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
            <p dangerouslySetInnerHTML={{ __html: erro ? txtErro : txtSuccess }} />
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