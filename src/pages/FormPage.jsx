import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap';
import { withMask } from 'use-mask-input';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import { useContext, useEffect, useRef, useState } from "react";
import { useFetchContacts } from '../api/useFetchContacts';
import ModalFormFinished from "../components/ModalFormFinished";
import { AppContext } from '../Store';
import { useCep } from '../api/useCep';
import ModalErroCep from "../components/ModalErroCep";

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
  const { id } = useParams();
	const navigate = useNavigate();
  const { contactsStore } = useContext(AppContext);

  const [firstLoad, setFirstLoad] = useState(true);
  const [formValues, setFormValues] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [leaveHome, setleaveHome] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCep, setShowModalCep] = useState(false);
  const [validated, setValidated] = useState(false);

  const inputNameRef = useRef(null);

  const { data, erro, loading, axiosFetch } = useFetchContacts();
  const { data: dataCep, erro: erroCep, loading: loadingCep, fetchData } = useCep();

  const newRegister = location.pathname === '/new-register';
  const titulo = newRegister ? "Novo cadastro" : "Editar cadastro";
  const txtBtnSubmit = newRegister ? 'Cadastrar' : 'Alterar';

  const queryCep = (cep) => {
    fetchData(cep)
  }
  const getData = () => {
    axiosFetch({
      method: 'get',
      id,
    })
  }

  function closeModal(goToHome) {
    setShowModal(false);
    setShowModalCep(false);

    if (goToHome) {
      setleaveHome(true)
    } else {
      inputNameRef.current.focus();
    }
  }

  function createContact(formData) {
    axiosFetch({
      method: 'post',
      payload: formData,
    })
  }

  function getCep(number) {
    updateInput(number, 'zipCode')
    const onlyNumber = number.match(/\d+/g);
    let numberFormart = '';

    if (onlyNumber) {
      numberFormart = onlyNumber.join('');
      updateInput(numberFormart, 'zipCode')
    }

    if (numberFormart.length === 8) {
      queryCep(numberFormart);
    }
  }

  const getEdit = (formData) => {
    axiosFetch({
      method: 'put',
      id,
      payload: formData,
    })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    setFirstLoad(false);

    if (form.checkValidity() === true) {
      if (newRegister) {
        createContact(formValues)
      } else {
        getEdit(formValues)
      }
    }

    setValidated(true);
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

  function updateInput(value, key) {
    setFormValues({...formValues, [key]: value});
  }

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);

      if (!firstLoad) {
        setShowModal(true);
      }

      if (!newRegister) {
        setFormValues(data);
      }
    }
    // eslint-disable-next-line
  }, [loading, newRegister])

  useEffect(() => {
    if (leaveHome) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [leaveHome])

  useEffect(() => {
    if (!newRegister) {
      const idNumber = id;
      const contact = contactsStore.filter((contact) => contact.id === idNumber);
      if (contact.length > 0) {
        setFormValues(contact[0]);
      } else {
        getData();
      }
    }
    // eslint-disable-next-line
  }, [newRegister])

  useEffect(() => {
    if (!loadingCep && !erroCep) {
        const { logradouro: address, bairro: neighborhood, localidade: city, uf: state } = dataCep;
        setFormValues({...formValues, address, neighborhood, city, state });
    }
    if (erroCep) {
      setShowModalCep(true);
    }
    // eslint-disable-next-line
  }, [loadingCep, erroCep])

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
                  ref={inputNameRef}
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
                      ref={withMask(['(99) 9999-9999', '(99) 99999-9999'])}
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
                      ref={withMask('99999-999')}
                      value={formValues.zipCode}
                      onChange={e => getCep(e.target.value)}
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
                {isLoading ? 'Salvando…' : txtBtnSubmit}
              </Button>
            </Form>
          </Col>
        </Row>
        { modalFinished() }
        <ModalErroCep
          close={closeModal}
          show={showModalCep}
        />
			</Main>
			<Footer />
		</>
  )
}

export default FormPage;
