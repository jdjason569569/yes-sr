

import { useNavigate, useParams } from 'react-router-dom';
import './detail-image.css';
import { useEffect, useState } from 'react';

export default function DetailImage() {

    const { idImage } = useParams();
    const navigate = useNavigate();
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
    }, []);

    const deleteImage =   async () =>{
      try {
        const deleteTask = await fetch(`${apiUrl}/images/${idImage}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(deleteTask){
          navigate('/home/image');
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    return(
        <div className='container-detail'>
         <img className='detail-image-component'  src={image.name} />
         <div className='btn-detail'>
         <button className='btn btn-danger btn-sm rounded btn-button' onClick={deleteImage} type="button" >Eliminar</button>
         </div>
        </div>
    )
}
