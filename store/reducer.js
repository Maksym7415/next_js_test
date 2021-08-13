import { GET_PHOTO_URLS, FETCH_DATA, UPLOAD_DATA } from "./actionTypes"

const initialState = {
  data: {
    pagination: {},
    data: {
      files: [],
      data: {}
    },
    isFetching: false
  },
  upload: {
    isFetching: false,
  },
  // isFetching: false
}

const reducer = (state = initialState, {type, payload, name}) => {
    switch(type) {
        case GET_PHOTO_URLS: {
            return {
                ...state,
                data: {
                  ...payload,
                  isFetching: false
                },
               
            }
        }
        case UPLOAD_DATA: {
          return {
            ...state,
            upload: {
              isFetching: false
            }
          }
        }
        case FETCH_DATA: {
            return {
                ...state,
                [name]: {
                  ...state[name],
                  isFetching: true
                }
            }
        }
        default: return state
    }
}
export default reducer;