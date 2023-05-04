function GetAllContacts(dispatch, data) {
	dispatch({ type: 'getContacts', payload: data })
}

export {
	GetAllContacts,
}