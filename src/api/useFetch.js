import { useEffect, useState } from "react";

import api from ".";

const urlContacts = 'contacts';

function useContcts(method, payload = null, id = 1) {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function() {
    let url = urlContacts;
    if (method === 'delete' || method === 'put') {
      url = `urlContacts/${id}`;
    }

    api[method](url, payload)
      .then(response => {
        setData(response.data);
      })
      .catch(() => {
        setErro(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [method, id, payload])

  return { data, erro, isLoading }
}

export { useContcts };
