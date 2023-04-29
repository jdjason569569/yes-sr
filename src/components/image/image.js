import { useEffect, useState } from 'react';
import { auth, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './image.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Image() {
  const [idFirebaseUser, setIdFirebaseUser] = useState(null);
  const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageResponse, setImageResponse] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIdFirebaseUser(user.uid);
      } else {
        setIdFirebaseUser(null);
      }
    });
  }, []);

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
        console.error(error);
      }
    }
    getImageById();
  }, [idFirebaseUser, imageResponse]);

  const uploadImage = async (file) => {
    try {
      const date = new Date();
      const storageRef = ref(storage, `${idFirebaseUser.slice(0, 5)}-${date.getMilliseconds().toString()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const responseTask = await saveImageByUser(url);
      setImageResponse(responseTask);
      document.getElementById('fileInput').value = '';
      toast.success('Agregaste una imagen', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.log('error in uploadImage', error);
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
  return (
    <div className='container'>
      <ToastContainer />
      <label htmlFor="fileInput">
        <input type='file' id="fileInput" accept='image/*' label='Selecciona una imagen' onChange={e => uploadImage(e.target.files[0])}></input>
      </label>
      <div className='container-image'>
        {images.map(image => (
          <img className='image-component' key={image.id_images} src={image.name} />
        ))};

      </div>

    </div>
  )
}