import './styles/styles.scss'
import { useDispatch, useSelector } from 'react-redux' 
import { getPhotoUrlsAction } from '../../pages/store/actions';
import { useEffect } from 'react';

function PhotoItem({ url }) {
    return (
        <div className='gallery__photos-item'>
            <div>
                <div className='bg-opacity'>
                   
                </div>
                <div className='look'>
                    <img src='../../images/eye.svg'/>
                </div>
                <img src={url}/>
            </div>
            
        </div>
    )
}

function GalleryNavigation() {
    return (
        <div className='gallery__navigation'>
            <div>
            <img src='../../images/arrow-left-line.png'/>
            </div>
            <div>
            <img src='../../images/home-line.png'/>
            </div>
            <div>
            <img src='../../images/arrow-right-line.png'/>
            </div>
        </div>
    )
}

function Gallery({name, description, model, image}) {
    const dispatch = useDispatch();
    const data = useSelector(({ galleryReducer }) => galleryReducer.photoUrls);

    useEffect(() => {
        dispatch(getPhotoUrlsAction())
    }, [])

  return (
    <div className='gallery'>
        <div className='gallery__wrapper'>
            <div className='gallery__title'>
                <span>
                    Photo Gallery
                </span>
            </div>
            <div className='gallery__description'>
                <span>A selection of the latest photos from our restaurant and some of our favourite dishes</span>
            </div>
            <div className='gallery__photos'>
                {data.map((item, i) => (
                    <PhotoItem key={i} {...item}/>
                ))}
            </div>
            <GalleryNavigation/>
        </div>
    </div>
  );
};

export default Gallery
