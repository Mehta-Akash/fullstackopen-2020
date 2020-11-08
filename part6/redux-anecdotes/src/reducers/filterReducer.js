const reducer = (state = null, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data
    default:
      return state
  }
}

export const filterAnecdotes = (content) => {
  return {
    type: 'FILTER',
    data: content,
  }
}

export default reducer
