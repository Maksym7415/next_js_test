import './styles/index.scss'
import { useDispatch, useSelector } from 'react-redux' 
import { getPhotoUrlsAction } from '../../pages/store/actions';
import { useEffect } from 'react';

function PhotoItem({ url, id }) {
    return (
        <div className='gallery__photos-item'>
            <div>
                <div className='bg-opacity'>
                   
                </div>
                <div className='eye-icon'>
                    <img src='../../images/eye.svg'/>
                </div>
                <img src={url}/>
            </div>
            
        </div>
    )
}

function GalleryNavigation( {pagination: {offset, limit, total}, isFetching} ) {

    const dispatch = useDispatch();

    const next = () => {
        if(isFetching || +limit + +offset == total) return;
        dispatch(getPhotoUrlsAction(+offset + 9));
    }

    const home = () => {
        dispatch(getPhotoUrlsAction(0));
    }

    const back = () => {
        if(isFetching || !+offset)return;
        dispatch(getPhotoUrlsAction(+offset - 9));
    }
    return (
        <div className='gallery__navigation'>
            <div onClick={back} className={`gallery__navigation-button ${isFetching || !+offset ? 'disabled' : ''}`}>
                <img src='../../images/arrow-left-line.png'/>
            </div>
            <div className={`gallery__navigation-button ${isFetching ? 'disabled' : ''}`} onClick={home}>
                <img src='../../images/home-line.png'/>
            </div>
            <div onClick={next} className={`gallery__navigation-button ${isFetching || +limit + +offset == total ? 'disabled' : ''}`}>
                <img src='../../images/arrow-right-line.png'/>
            </div>
        </div>
    )
}

function Gallery() {
    const dispatch = useDispatch();
    const data = useSelector(({ galleryReducer }) => galleryReducer.data.data);
    const pagination = useSelector(({ galleryReducer }) => galleryReducer.data.pagination);
    const isFetching = useSelector(({ galleryReducer }) => galleryReducer.isFetching)

    useEffect(() => {
        dispatch(getPhotoUrlsAction())
    }, [])

  return (
    <div className='gallery' >
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
                {isFetching 
                ? <img className='loader' src='../../images/loader.svg'/>
                : data.map((item, i) => (
                    <PhotoItem key={i} {...item}/>
                ))}
            </div>
            <GalleryNavigation 
            pagination={pagination} 
            isFetching={isFetching}
            />
        </div>
    </div>
  );
};

export default Gallery;
