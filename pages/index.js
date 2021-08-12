import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from '../components/main';
import DropZone from '../components/dropZone';
import Gallery from '../components/gallery'

export default function Home() {
  return (
    <div className='category'>
     <MainPage>
       <DropZone />
       <Gallery />
      </MainPage>
    </div>
  )
}

