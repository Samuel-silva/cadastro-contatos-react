import './ListContacts.scss';

import { Button, ListGroup, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import { useGet } from '../api/useGet';
import NotFoundContacts from './NotFoundContacts';
import { initialState, reducer } from '../store'
import { GetAllContacts } from '../store/actions'
import { useEffect, useReducer } from 'react';

const ListContacts = () => {
  const { data: contacts, erro, isLoading } = useGet('contacts');
  const [, dispatch] = useReducer(reducer, initialState);
  let container;

  useEffect(() => {
    GetAllContacts(dispatch, contacts)
  }, [contacts])

  if (isLoading) {
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
    </div>
  );
}

export default ListContacts;
