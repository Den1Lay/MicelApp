const initalState = {
  data: {},
  token: null,
  folders: []
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        data: action.data,
        folders: action.folders
      }
    default:
      return state
  }
}

export default reducer