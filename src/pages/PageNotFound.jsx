import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

function PageNotFound(props) {
	const navigate = useNavigate();

	return (
		<>
			<Header title='404: Página não encontrada' />
			<Main>
				<h2 className="text-center py-5">A página que você estava procurando não foi encontrada.</h2>
				<div className="text-center pt-lg-4 pt-sm-2">
					<Button
						size="lg"
						squared="true"
						variant="outline-primary"
						onClick={() => navigate('/')}
					>
						Ir para página inicial
					</Button>
				</div>
			</Main>
			<Footer />
		</>
	)
}

export default PageNotFound;
