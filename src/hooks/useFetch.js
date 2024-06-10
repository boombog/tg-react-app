import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
        console.log(responseData);
      } catch (error) {
        setError('Ошибка загрузки данных: ' + error.message);
        console.log('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;