import { Button, ListGroup } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';

function ListContacts(props) {
	return (
    <div className='mt-5'>
      <ListGroup>
        <ListGroup.Item
					className="d-flex justify-content-between align-items-center py-3"
        >
          <p class="mb-0">
						Nome
					</p>
          <div class="pl-2 d-flex">
						<Button
							variant="outline-success"
						>
							<Icon.Eye />
						</Button>
						<Button
							variant="outline-primary"
							className="mx-2"
						>
							<Icon.PencilSquare />
						</Button>
						<Button
							variant="outline-danger"
						>
							<Icon.Trash />
						</Button>
					</div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ListContacts;

