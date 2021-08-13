import { GET_PHOTO_URLS, FETCH_DATA } from "./actionTypes"

const initialState = {
  data: {
    pagination: {},
    data: [],
  },
  upload: {
    success: false,
    error: false,
    isFetching: false,
  },
  isFetching: false
}

const reducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_PHOTO_URLS: {
            return {
                ...state,
                data: payload,
                isFetching: false
            }
        }
        case FETCH_DATA: {
            return {
                ...state,
                isFetching: true
            }
        }
        default: return state
    }
}
export default reducer;