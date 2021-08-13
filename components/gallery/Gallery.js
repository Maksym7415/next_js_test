import './styles/index.scss'
import { useDispatch, useSelector } from 'react-redux' 
import { getPhotoUrlsAction } from '../../store/actions';
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
                <img src={`${window.location.origin}/uploads/${url}`}/>
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
            <button disabled={`${isFetching || !+offset ? 'disabled' : ''}`} onClick={back} className='gallery__navigation-button'>
                <img src='../../images/arrow-left-line.png'/>
            </button>
            <button disabled={`${isFetching ? 'disabled' : ''}`} className='gallery__navigation-button' onClick={home}>
                <img src='../../images/home-line.png'/>
            </button>
            <button disabled={`${isFetching || +limit + +offset >= total ? 'disabled' : ''}`} onClick={next} className='gallery__navigation-button'>
                <img src='../../images/arrow-right-line.png'/>
            </button>
        </div>
    )
}

function Gallery() {
    const dispatch = useDispatch();
    const data = useSelector((reducer) => reducer.data.data);
    const pagination = useSelector((reducer) => reducer.data.pagination);
    const isFetching = useSelector((reducer) => reducer.data.isFetching)

    useEffect(() => {
        dispatch(getPhotoUrlsAction())
    }, [])

  return (
    <div className='gallery' >
        <div className='gallery__wrapper'>
            <div className='gallery__title'>
                <span>
                   {data.data.input || 'Photo Gallery'}
                </span>
            </div>
            <div className='gallery__description'>
                <span>{data.data.textarea || 'A selection of the latest photos from our restaurant and some of our favourite dishes'}</span>
            </div>
            <div className='gallery__photos'>
                {isFetching 
                ? <img className='loader' src='../../images/loader.svg'/>
                : data.files.map((item, i) => (
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
