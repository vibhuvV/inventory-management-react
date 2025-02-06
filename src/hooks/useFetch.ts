import { useEffect, useState } from "react";

// We can extend this hook if we want to manage requests other than GET
const useFetch = <T = unknown>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("API responded with status code: " + res.status);
      })
      .then(setData)
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
