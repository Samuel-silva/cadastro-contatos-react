import { useState } from "react";

import api from ".";

const urlContacts = 'contacts';
const url_json = 'json';

function useFetchContacts() {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(true)

  const axiosFetch = async(configObj) => {
    const { method, id, payload } = configObj;

    let url = `${urlContacts}.${url_json}`;
    if (method === 'delete' || method === 'put' || (method === 'get' && id)) {
      url = `${urlContacts}/${id}.${url_json}`;
    }

    setLoading(true);

    try {
      const resp = await api[method](url, payload)
      if (!id) {
        const values = Object.values(resp.data);
        const keys = Object.keys(resp.data);
        const newData = [];
        values.forEach((value, index) => {
          newData.push({...value, id: keys[index]});
        });
        setData(newData);
      } else {
        setData(resp.data);
      }
    } catch (error) {
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  return { data, erro, loading, axiosFetch }
}

export { useFetchContacts };
