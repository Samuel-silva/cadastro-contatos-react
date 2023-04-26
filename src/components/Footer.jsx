import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './Footer.scss'

const currentDate = new Date().getFullYear()

function Footer(props) {
	const [currentYear] = useState(currentDate);

	return (
		<footer className='footer w-100'>
			<Container>
				<p class="text-center small mb-0 py-1 text-white">
					© { currentYear } - Todos direitos reservados
				</p>
			</Container>
		</footer>
	)
}

export default Footer;
