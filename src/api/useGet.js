import { useEffect, useState } from "react";

import api from ".";

function useGet(url) {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(function() {
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
  }, [url])

  return { data, erro, isLoading }
}

export { useGet };
