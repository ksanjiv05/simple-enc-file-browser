import { useState, useEffect } from "react";

const useFetch = <T>(url: string,_trigger:Boolean) => {
  const [responce, setResponce] = useState<T | null>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any | null>();

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResponce(data?.data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
        setResponce(null);
      });
      return ()=>{}
  }, [url,_trigger]);

  return [responce, error, isLoading] as const
};

export default useFetch;
