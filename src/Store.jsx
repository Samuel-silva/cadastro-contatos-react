import React, { useState } from "react";

const initialState = {
  contacts: [],
}

export const AppContext =  React.createContext(initialState);

const Store = props => {
  const [state, setState] = useState(initialState);

  function updateState(key, value) {
    setState({
      ...state,
      [key]: value
    })
  }

  return (
    <AppContext.Provider value={{
      contactsStore: state.contacts,
      setContactsStore: value => updateState('contacts', value),
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default Store;
