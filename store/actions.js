
import fetcher from "../helpers/fetcher"
import { FETCH_DATA, GET_PHOTO_URLS, UPLOAD_DATA } from "./actionTypes";

export const getPhotoUrlsAction = (offset = 0) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_DATA,
            name: 'data'
        })
        const response = await fetcher(`http://localhost:3000/api/get-gallery?limit=9&offset=${offset}`);
        return dispatch({
            type: GET_PHOTO_URLS,
            payload: response,
        })
    } catch (error) {
        console.log(error)
    }
}

export const uploadDataAction = ({files, values}) => async (dispatch, getState) => {
  try {
    const offset = getState().data?.pagination.offset;
    const formData = new FormData();
    formData.append('textarea', values.textarea)
    formData.append('input', values.input)
    Object.values(files).forEach(({ file }) => {
        formData.append('files', file)
    })
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      };
      dispatch({
        type: FETCH_DATA,
        name: 'upload'
    })

    const data = await fetch('http://localhost:3000/api/upload-gallery', requestOptions);
    dispatch({
      type: UPLOAD_DATA,
    })
    dispatch(getPhotoUrlsAction(offset))
  } catch (error) {
    console.error(error)
  }
}