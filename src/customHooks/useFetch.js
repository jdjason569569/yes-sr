import { useEffect, useState } from "react";

export function useFetch(url) {

    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
      const data = async () =>{
        try {
            const response = await fetch(url);
            if(!response){
                throw new Error('Error al obtener las tareas');
            }
            const responseJson = await response.json();
            setData(responseJson);
        } catch (error) {
            setError(error);
        }
      }
      data();
    }, []);

    return {data, error}
}

