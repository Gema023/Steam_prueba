export const state = () => ({
    loggedIn: false,
    username: ''
  })
  
  export const mutations = {
    login(state, username) {
      state.loggedIn = true
      state.username = username
    },
    logout(state) {
      state.loggedIn = false
      state.username = ''
    }
  }
  