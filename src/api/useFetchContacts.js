import { useState } from "react";

import api from ".";

const urlContacts = 'contacts';

function useFetchContacts() {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(true)

  const axiosFetch = async(configObj) => {
    const { method, id, payload } = configObj;

    let url = urlContacts;
    if (method === 'delete' || method === 'put' || (method === 'get' && id)) {
      url = `${urlContacts}/${id}`;
    }

    setLoading(true);

    try {
      const resp = await api[method](url, payload)
      setData(resp.data);
    } catch (error) {
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  return { data, erro, loading, axiosFetch }
}

export { useFetchContacts };
