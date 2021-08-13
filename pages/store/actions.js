
import fetcher from "../../helpers/fetcher"
import { FETCH_DATA, GET_PHOTO_URLS } from "./actionTypes";

export const getPhotoUrlsAction = (offset = 0) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_DATA
        })
        const response = await fetcher(`http://localhost:3000/api/get-gallery?limit=9&offset=${offset}`);
        return dispatch({
            type: GET_PHOTO_URLS,
            payload: response
        })
    } catch (error) {
        console.log(error)
    }
}