import Container from 'react-bootstrap/Container';

const txtDefault = 'Cadastro Rápido';

function Header(props) {
	const { title } = props;

	return (
		<header className='header bg-primary text-white'>
			<Container className='py-xl-5 py-lg-4 py-md-3 py-sm-2'>
				<h1 className='py-5'>{ title || txtDefault }</h1>
			</Container>
		</header>
	)
}

export default Header;
