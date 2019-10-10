const initalState = {
  data: [],
  token: null
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        data: [...state.data, action.data]
      }
    default:
      return state
  }
}

export default reducer