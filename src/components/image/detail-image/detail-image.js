

import { useParams } from 'react-router-dom';
import './detail-image.css';
import { useEffect, useState } from 'react';

export default function DetailImage() {

    const { idImage } = useParams();
    const [image, setImage] = useState([]);
    const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API);

    useEffect(() => {
        const getImageById = async () => {
            try {
              const responseImageById = await fetch(`${apiUrl}/images/detail/${idImage}`);
              const responseImageByIdJson = await responseImageById.json();
              console.log(responseImageByIdJson);
              setImage(responseImageByIdJson[0]);
            } catch (error) {
              console.error(error);
            }
          }
          getImageById();
    }, [])
    return(
        <div className='container-detail'>
         <img className='detail-image-component'  src={image.name} />
        </div>
    )
}
