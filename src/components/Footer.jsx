import Container from 'react-bootstrap/Container';

import './Footer.scss'

function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className='footer w-100'>
			<Container>
				<p className="text-center small mb-0 py-1 text-white">
					© { currentYear } - Todos direitos reservados
				</p>
			</Container>
		</footer>
	)
}

export default Footer;
