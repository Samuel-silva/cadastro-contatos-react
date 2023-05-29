import React, { useEffect, useState } from "react";
import { Alert, Modal, Button } from 'react-bootstrap';
import { useFetchContacts } from '../api/useFetchContacts';

const txtDelete = "Tem certeza que quer apagar este contato?";
const txtErro = "Não foi possível excluir o contato, tente novamente.";

function ModalDeleteErro(props) {
  const { close, finishDelete, id, loadingList, show } = props;
  const { erro, loading, axiosFetch } = useFetchContacts();

  const [modalErro, setModalErro] = useState(false);

  let btn, content;

  function deleteContact() {
    loadingList();
    close();
    axiosFetch({
      method: 'delete',
      id,
    })
  }

  function closeModal() {
    close();
    setModalErro(false);
  }

  useEffect(() => {
    if (!loading) {
      setModalErro(erro);
      finishDelete(erro);

      if (erro) {
        loadingList();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  if (modalErro) {
    content =
      <Alert className='mb-0' variant='danger' >
        <p className="mb-0">{ txtErro }</p>
      </Alert>;

    btn =
      <Button variant="success text-white" onClick={closeModal}>
        Ok
      </Button>
  } else {
    content = <p className="mb-0">{ txtDelete }</p>;

    btn =
      <>
        <Button variant="success text-white" onClick={_ => deleteContact()}>
          Sim
        </Button>
        <Button variant="danger" onClick={_ => close()}>
          Não
        </Button>
      </>
  }

  if (show) {
    return (
      <>
        <Modal show={show} animation={false} >
          <Modal.Header />
          <Modal.Body>
            { content }
          </Modal.Body>
          <Modal.Footer>
            { btn }
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default ModalDeleteErro;
