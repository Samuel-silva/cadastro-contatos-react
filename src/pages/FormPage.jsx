import { useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import { useEffect, useState } from "react";
import { useFetchContacts } from '../api/useFetchContacts';
import ModalFormFinished from "../components/ModalFormFinished";

const initialForm = {
  name: '',
  email: '',
  phone: '',
  zipCode: '',
  number: '',
  address: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

function FormPage(props) {
  const location = useLocation();
	const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialForm);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [leaveHome, setleaveHome] = useState(false);

  const { erro, loading, axiosFetch } = useFetchContacts();

  const newRegister = location.pathname === '/new-register';
  const titulo = newRegister ? "Novo cadastro" : "Editar cadastro";

  function closeModal(goToHome) {
    setShowModal(false);

    if (goToHome) {
      setleaveHome(true)
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    if (form.checkValidity() === true) {
      createContact(formValues)
    }

    setValidated(true);
  };

  function updateInput(value, key) {
    setFormValues({...formValues, [key]: value});
  }

  function createContact(formData) {
    axiosFetch({
      method: 'post',
      payload: formData,
    })
  }

  function modalFinished() {
    if (showModal) {
      return (
        <ModalFormFinished
          close={closeModal}
          erro={erro}
          newRegister={newRegister}
          show={showModal}
        />
      );
    } else {
      return '';
    }
  }

  useEffect(() => {
    if (!loading && newRegister) {
      setLoading(false);
      setShowModal(true);
    }
  }, [loading, newRegister]);

  useEffect(() => {
    if (leaveHome) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [leaveHome]);

  return (
    <>
			<Header />
			<Main>
        <Breadcrumb className="pt-2">
          <Breadcrumb.Item onClick={_ => navigate('/')}>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{ titulo }</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className="pt-2">{ titulo }</h2>

        <Row className="justify-content-center pt-5">
          <Col md={8}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues.name}
                  onChange={e => updateInput(e.target.value, 'name')}
                  required
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="email"
                  value={formValues.email}
                  onChange={e => updateInput(e.target.value, 'email')}
                  required
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mt-3">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.phone}
                      onChange={e => updateInput(e.target.value, 'phone')}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mt-3">
                    <Form.Label>CEP:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.zipCode}
                      onChange={e => updateInput(e.target.value, 'zipCode')}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mt-3">
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues.address}
                  onChange={e => updateInput(e.target.value, 'address')}
                  required
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mt-3">
                    <Form.Label>Número:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.number}
                      onChange={e => updateInput(e.target.value, 'number')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mt-3">
                    <Form.Label>Complemento:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.complement}
                      onChange={e => updateInput(e.target.value, 'complement')}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mt-3">
                <Form.Label>Bairro:</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues.neighborhood}
                  onChange={e => updateInput(e.target.value, 'neighborhood')}
                  required
                />
              </Form.Group>
              <Row>
                <Col md={8}>
                  <Form.Group className="mt-3">
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.city}
                      onChange={e => updateInput(e.target.value, 'city')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mt-3">
                    <Form.Label>Estado:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formValues.state}
                      onChange={e => updateInput(e.target.value, 'state')}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                className="mt-4 text-white"
                type="submit"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando…' : 'Cadastrar'}
              </Button>
            </Form>

          </Col>
        </Row>
        { modalFinished() }
			</Main>
			<Footer />
		</>
  )
}

export default FormPage;
