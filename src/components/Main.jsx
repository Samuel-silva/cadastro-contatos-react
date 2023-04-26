import Container from 'react-bootstrap/Container';

function Main(props) {
	return (
		<main>
			<Container className='py-3 py-md-5'>
				{ props.children }
			</Container>
		</main>
	)
}

export default Main;
