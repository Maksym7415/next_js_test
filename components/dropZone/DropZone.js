import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadDataAction } from '../../store/actions';
import { getId } from '../../utils';
import './styles/index.scss';

function Preview({name, src}) {
  return (
    <div className='drop-zone__preview'>
      <img className='image' alt={name} src={src} />
    </div>
  )
}

function DropZone() {
  const dispatch = useDispatch();
  const isPhotosUploading = useSelector((reducer) => reducer.upload.isFetching);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState({});
  const [values, setValues] = useState({
    input: "",
    textarea: ""
  });
  const [dragHover, setDragHower] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const readImage = (file) => {
    // if file not an image - return. accepting just images
    if (file.type && file.type.indexOf("image") === -1) {
      return
    }

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setFiles((prev) => ({ ...prev, [getId(12)]: { file, src: event.target.result } }));
    });
    reader.readAsDataURL(file);
  };

  const handleFilesObject = (files) => {
    if (!files) return;
    const result = {};
    Object.values(files).forEach((file, i) => {
      result[i] = { file };
      readImage(file, i);
    });
  };

  const stopEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event) => {
    stopEvent(event);
    setDragHower(true);
  };

  const onDragLeave = (event) => {
    stopEvent(event);
    setDragHower(false);
  };

  const onDrop = (event) => {
    stopEvent(event);
    const file = event.dataTransfer.files;
   
    handleFilesObject(file);
    event.target.value = "";
    setDragHower(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const onFilesAdded = async (event) => {
    const file = event.target.files;

    handleFilesObject(file);
    event.target.value = "";
  };

  console.log(values)

  return (
    <div className='drop-zone'>
      <div className='drop-zone__input-container'>
        <input
          name='input'
          value={values.input}
          onChange={handleChange}
        />
      </div>
      <div className='drop-zone__input-container'>
        <textarea 
          rows={3} 
          name='textarea'
          value={values.textarea}
          onChange={handleChange}
        />
      </div>
      {
        isPhotosUploading
          ? <div className='drop-zone__preloader-cont'><img className='loader' src='../../images/loader.svg'/></div>
          : (
            <div 
              className='drop-zone__dashed-cont'
              onClick={openFileDialog}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              style={dragHover ? {borderColor: "blue"} : {}}
            >
              {
                !Object.keys(files).length
                  ? 'Drag photos here'
                  : <div className='preview-items'>
                  {Object.entries(files).map(([ key, { src, file } ]) => (
                    <Preview key={key} src={src} name={file.name} />
                  ))}
                  </div>
              }
              <input
                className='drop-zone__input-file'
                ref={fileInputRef}
                type='file'
                multiple={true}
                onChange={onFilesAdded}
                onDrop={onDrop}
              />
            </div>
          )
      }
      <button 
        className='drop-zone__delete-btn'
        onClick={() => setFiles({})}
      >
        Delete ALL photos
      </button>
      <button 
        className='drop-zone__submit-btn'
        onClick={() => {
          setFiles({})
          dispatch(uploadDataAction({files, values}))
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default DropZone
