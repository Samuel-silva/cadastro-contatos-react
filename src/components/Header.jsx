import { useState } from 'react';
import Container from 'react-bootstrap/Container';

function Header(props) {
	const { title } = props;
	const [ titleDefault ] = useState('Cadastro Rápido');

	return (
		<header className='header bg-primary text-white'>
			<Container className='py-xl-5 py-lg-4 py-md-3 py-sm-2'>
				<h1 className='py-5'>{ title || titleDefault }</h1>
			</Container>
		</header>
	)
}

export default Header;
