function reducer(state, action) {
	switch (action.type) {
		case 'getContacts':
			return {...state, contacts: [...action.payload] }
		default:
			return state
	}
}

export {
	reducer,
}
