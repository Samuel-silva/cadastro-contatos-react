import * as Icon from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function NotFoundContacts(props) {
  const { erro = false } = props;
	const navigate = useNavigate();

  let title, text, btn;

  if (erro) {
    title = 'Desculpe, mas houve um erro ao buscar os dados!';
    text = 'Tente novamente mais tarde.';
    btn = ''
  } else {
    title = 'Você ainda não possui nenhum contato cadastrado.';
    text = 'Clique no botão abaixo para começar a cadastrar seus contatos.';
    btn = <Button
      className="text-white mt-sm-0 mt-2 align-self-end align-self-sm-center"
      variant="success"
      onClick={() => navigate('/new-register')}
    >
      <span className="pe-3">Adicionar</span>
      <Icon.PersonPlus size={18} />
    </Button>
  }

  return (
    <div className="text-center">
      <Icon.ExclamationCircle className="text-warning" size={80} />
      <h2 className="pt-2">{ title }</h2>
      <p>{ text }</p>
      {btn}
    </div>
  )
}

export default NotFoundContacts;
