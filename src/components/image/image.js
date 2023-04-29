import { useEffect, useState } from 'react';
import { auth, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './image.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Image() {
  const [idFirebaseUser, setIdFirebaseUser] = useState(null);
  const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIdFirebaseUser(user.uid);
      } else {
        setIdFirebaseUser(null);
      }
    });
  }, []);

  const uploadImage = async (file) => {
    const date = new Date();
    const name = `${idFirebaseUser.slice(0, 5)}-${date.getMilliseconds().toString()}`
    const storageRef = ref(storage, name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const responseTask = await saveImageByUser(url);
    toast.success('Agregaste una imagen', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
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
      id_users : idUser,
      name : url
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
    <div className='container-image'>
      <ToastContainer />
      <input type='file' onChange={e => uploadImage(e.target.files[0])}></input>
    </div>
  )
}