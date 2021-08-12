import { GET_PHOTO_URLS } from "./actionTypes"

const initialState = {
    photoUrls: []
}

const galleryReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_PHOTO_URLS: {
            return {
                ...state,
                photoUrls: payload
            }
        }
        default: return state
    }
}
export default galleryReducer;