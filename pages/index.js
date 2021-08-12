// import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from '../components/main';
import DropZone from '../components/dropZone';
import Gallery from '../components/gallery';
import store from '../store';
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <div className='category'>
        <Provider store={store}>
            <MainPage>
                <DropZone />
                <Gallery />
            </MainPage>
        </Provider>
     
    </div>
  )
}

