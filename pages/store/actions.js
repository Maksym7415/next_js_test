
import fetcher from "../../helpers/fetcher"
import { GET_PHOTO_URLS } from "./actionTypes";

export const getPhotoUrlsAction = () => async (dispatch) => {
    try {
        const response = await fetcher('http://localhost:3000/api/test');
        return dispatch({
            type: GET_PHOTO_URLS,
            payload: response
        })
    } catch (error) {
        console.log(error)
    }
}