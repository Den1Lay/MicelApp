const initalState = {
  data: {},
  token: null,
  folders: [],
  loading: false,
  error: false
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        data: action.data,
        folders: action.folders,
        loading: false,
        token: action.token
      }
    case 'LOAD_DATA':
      return {
        ...state,
        loading: true
      }
    case 'ERROR_LOAD_DATA':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default reducer