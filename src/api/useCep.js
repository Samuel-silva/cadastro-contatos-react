import { useState } from "react";

import axios from 'axios';

const baseURL = "https://viacep.com.br/ws/"

function useCep() {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async (cep) => {
    setLoading(true);
    try {
      const resp = await axios.get(`${baseURL}${cep}/json/`)
      if (resp.data?.erro) {
        setErro(true);
      } else {
        setData(resp.data);
      }
    } catch {
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  return { data, erro, loading, fetchData }
}

export { useCep };
