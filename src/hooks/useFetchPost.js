import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPost = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setData(response.data);
        console.log(response)
      } catch (error) {
        setError('Ошибка загрузки данных', error);
        console.log('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchPost;