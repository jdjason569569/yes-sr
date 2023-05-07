import { useNavigate } from 'react-router-dom';

import './single-image.css';

export default function SingleImage({image}) {

    const navigate = useNavigate();

    const goToImage = (idImage) => {
      navigate(`/home/image/${idImage}`);
    }

    return(
        <>
        <img className='image-component'  onClick={() => goToImage(image.id_images)} src={image.name} />
        </>
    )
}
