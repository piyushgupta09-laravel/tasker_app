export default {
  hasErrors: (state) => {
    return !state.valid
  },
  getErrors: (state) => {
    return state.errors
  }
}
