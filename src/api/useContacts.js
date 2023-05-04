import { useEffect, useState } from "react"

import api from "."

const url = '/contacts';

function useContacts(method = 'get') {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function() {
    if (method === 'post') {
      api.post(url)
        .then(response => {
          setData(response.data);
        })
        .catch(() => {
          setErro(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
    else {
      api.get(url)
        .then(response => {
          setData(response.data);
        })
        .catch(() => {
          setErro(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [method])

  return { data, erro, isLoading }
}

export { useContacts }
