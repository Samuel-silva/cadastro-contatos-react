import './ListContacts.scss';

import { Button, ListGroup, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import { useFetchContacts } from '../api/useFetchContacts';
import NotFoundContacts from './NotFoundContacts';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Store';
import React from 'react';
import ModalDetails from './ModalDetails';
import ModalDeleteErro from './ModalDeleteErro';

const ListContacts = () => {
  const { data, erro, loading, axiosFetch } = useFetchContacts();
  const { setContactsStore } = useContext(AppContext);

  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState(0);
  const [loadingList, setLoadingList] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  let container;

  const getData = () => {
    axiosFetch({
      method: 'get',
    })
  }

  function closeModal() {
    setShowModal(false);
    setShowModalDelete(false);
  }

  function disableEnableLoading() {
    setLoadingList(_ => !loadingList);
  }

  function finishDelete(erro) {
    if (erro) {
      setShowModalDelete(true);
    } else {
      getData();
    }
  }

  function openModal(idContact) {
    setId(idContact);
    setShowModal(true);
  }

  function openModalDelete(idContact) {
    setId(idContact);
    setShowModalDelete(true);
  }

  useEffect(function() {
    setContactsStore(data);
    setContacts(data);
    setLoadingList(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, erro, loading])

  useEffect(() => {
      getData();
      // eslint-disable-next-line
  }, [])

  if (loadingList) {
    const progress = [];
    for (let i = 0; i < 5; i++) {
        progress.push(<ProgressBar key={i} className='mt-3' animated variant="secondary" now={100} />);
    }
    container = progress;
  } else if (erro || contacts.length === 0) {
    container = <NotFoundContacts erro={erro} />
  } else {
    const item = contacts?.map(contact => {
      return (
        <ListGroup.Item
          key={contact.id}
          className="d-flex justify-content-between align-items-center py-3"
        >
          <p className="mb-0">
            {contact.name}
          </p>
          <div className="pl-2 d-flex">
            <OverlayTrigger
              overlay={
                <Tooltip>
                  Visualizar
                </Tooltip>
              }
            >
              <Button
                variant="outline-success"
                onClick={_=> openModal(contact.id)}
              >
                <Icon.Eye />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip>
                  Editar
                </Tooltip>
              }
            >
              <Button
                variant="outline-primary"
                className="mx-2"
              >
                <Icon.PencilSquare />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={
                <Tooltip className='text-primary'>
                  Excluir
                </Tooltip>
              }
            >
              <Button
                variant="outline-danger"
                onClick={_=> openModalDelete(contact.id)}
              >
                <Icon.Trash />
              </Button>
            </OverlayTrigger>
          </div>
        </ListGroup.Item>
      )
    });
    container = <ListGroup>{item}</ListGroup>
  }

  return (
    <div className='mt-5'>
      {container}
      <ModalDetails
        close={closeModal}
        id={id}
        show={showModal}
      />
      <ModalDeleteErro
        close={closeModal}
        finishDelete={finishDelete}
        id={id}
        show={showModalDelete}
        loadingList={disableEnableLoading}
      />
    </div>
  );
}

export default ListContacts;
