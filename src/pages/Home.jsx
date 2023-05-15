import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import { PersonPlus } from 'react-bootstrap-icons';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import ListContacts from "../components/ListContacts";
import { AppContext } from '../Store';
import { useContext } from "react";

function Home(props) {
	const navigate = useNavigate();
  const { contactsStore } = useContext(AppContext);
	let containerButton;

	if (contactsStore.length > 0) {
		containerButton =
		<Button
			className="text-white mt-sm-0 mt-2 align-self-end align-self-sm-center"
			variant="success"
			onClick={() => navigate('/new-register')}
		>
			<span className="pe-3">Adicionar</span>
			<PersonPlus size={18} />
		</Button>
	}

	return (
		<>
			<Header />
			<Main>
				<div className="d-flex justify-content-sm-between flex-column flex-sm-row">
					<h2>Seus contatos cadastrados</h2>
					{ containerButton }
				</div>
				<ListContacts />
			</Main>
			<Footer />
		</>
	)
}

export default Home;
