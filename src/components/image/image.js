import { useEffect, useState } from 'react';
import { auth, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './image.css';
import { ToastContainer, toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import ReactLoading from 'react-loading';
import SingleImage from './single-image/single-image';


export default function Image() {
  const [idFirebaseUser, setIdFirebaseUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageResponse, setImageResponse] = useState(null);
  const apiUrl = process.env.REACT_APP_API;


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIdFirebaseUser(user.uid);
      } else {
        setIdFirebaseUser(null);
      }
    });
  }, [apiUrl]);

  useEffect(() => {
    const getImageById = async () => {
      try {
        setIsLoading(true);
        const idUser = await getUserById();
        const responseImageByUser = await fetch(`${apiUrl}/images/${idUser}`);
        const responseImageByUserJson = await responseImageByUser.json();
        setImages(responseImageByUserJson);
        setIsLoading(false);
      } catch (error) {
        //console.error(error);
      }
    }
    getImageById();
  }, [idFirebaseUser, imageResponse]);

  const uploadImage = async (file) => {
    try {
      setIsLoading(true);
      const resizedImage = await resizeFile(file);
      const date = new Date();
      const storageRef = ref(storage, `${idFirebaseUser.slice(0, 5)}-${date.getMilliseconds().toString()}`);
      await uploadBytes(storageRef, resizedImage);
      const url = await getDownloadURL(storageRef);
      const responseTask = await saveImageByUser(url);
      setImageResponse(responseTask);
      setIsLoading(false);
      document.getElementById('fileInput').value = '';
      toast.success('Agregaste una imagen', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      //console.log('error in uploadImage', error);
      toast.error('Error al agregar una imagen', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
    }
  }

  /**
   * Allow return an user by firebase code
   */
  const getUserById = async () => {
    const respGetUserById = await fetch(`${apiUrl}/user/${idFirebaseUser}`);
    const { id_users } = await respGetUserById.json();
    return id_users;
  }
  /**
   * Allow save task by user
   */
  const saveImageByUser = async (url) => {
    const idUser = await getUserById();
    const image = {
      id_users: idUser,
      name: url
    }
    const responseAddImage = await fetch(`${apiUrl}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(image)
    });
    return await responseAddImage.json();
  }
  

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500, // Ancho máximo
      500, // Altura máxima
      'JPEG', // Formato de imagen
      20, // Calidad de compresión
      0, // Rotación (0 = sin rotación)
      (uri) => {
        resolve(uri);
      },
      'file' // Tipo de salida (base64, blob, file)
    );
  });
  return (
    <div className='container-img'>
      <ToastContainer />
        <input className="btn btn-secondary btn-sm btn-style-image" type='file' id="fileInput" 
        accept='image/*' 
        onChange={e => uploadImage(e.target.files[0])}></input>
        {isLoading && 
        <div className="loading-container">
          <ReactLoading type={'bubbles'} color={'red'} height={'15%'} width={'15%'} />
        </div>} 
        <div className='container-image'>
        {!isLoading &&  images.map(image => (
           <SingleImage key={image.id_images} image={image}/>
        ))}
      </div>
    </div>
  )
}