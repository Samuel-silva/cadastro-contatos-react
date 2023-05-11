import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { AppContext } from '../Store';
import { Person } from 'react-bootstrap-icons';

function ModalDetails(props) {
  const { id, show, close } = props;
  const [detail, setDetail] = useState();
  const { contactsStore } = useContext(AppContext);

  function addressStreet() {
    const { address, number, complement } = detail;
    if (complement) return `${address}, ${number} - ${complement}`;
    return `${address}, ${number}`;
  };

  useEffect(() => {
    const contact = contactsStore.filter((contact) => contact.id === id);
    setDetail(contact[0]);
  }, [id, contactsStore]);

  if (show && detail?.name) {
    return (
      <>
        <Modal show={show} onHide={_ => close()} animation={false} size="lg">
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>
              <Person className="text-primary me-2"/>
              { detail.name }
            </h2>
            <p className="mb-1">{ detail.phone }</p>
            <p>{ detail.email }</p>
            <p className="pt-4 h5">Endereço</p>
            <hr className="my-1" />
            <p className="mb-1">{ addressStreet() }</p>
            <p className="mb-1">{ detail.neighborhood } - { detail.city }/{ detail.state }</p>
            <p>CEP: { detail.zipCode }</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={_ => close()}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default ModalDetails;