import { useEffect } from 'react';
import { auth, storage } from '../../firebase';
import {ref, uploadBytes} from 'firebase/storage';
import './image.css';

export default function Image(){


    useEffect(() => { 
    }, )

    const uploadImage = (file) =>{
        const storageRef = ref(storage, 'hola') ;
        uploadBytes(storageRef, file).then(value =>{
            console.log(value);
        })

    }
    


     return (
        <div className='container-image'>
        <input type='file' onChange={e => uploadImage(e.target.files[0])}></input>
        </div>
     )
}