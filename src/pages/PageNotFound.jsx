import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import Button from 'react-bootstrap/Button';
import Footer from "../components/Footer";

function PageNotFound(props) {
	const navigate = useNavigate();

	return (
		<>
			<Header title='404: Página não encontrada' />
			<Main>
				<h2 class="text-center py-5">A página que você estava procurando não foi encontrada.</h2>
				<div class="text-center pt-lg-4 pt-sm-2">
					<Button
						size="lg"
						squared
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
