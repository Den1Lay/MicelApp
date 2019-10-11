const initalState = {
  data: {},
  token: null,
  path: ['disk:', 'TestFolder', 'InsaFold', 'AndAnotherFold']
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}

export default reducer