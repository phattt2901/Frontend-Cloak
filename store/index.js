export const state = () => ({
  apiKey: '6435e70017e1f3fb04cb99470f43a712',
  baseURL:
    process.env.NODE_ENV == 'production'
      ? 'https://short-api.tuvanwebsite.com'
      : 'http://localhost:3200',
})

export const getters = {
  IS_ADMIN(state) {
    return state.isAdmin
  },
  IS_DEACTIVE(state) {
    return state.isDeactive
  },
  GET_DEBUG(state) {
    return state.debug
  },
  GET_CURRENT_ROLE(state) {
    return state.currentRole
  },
  GET_BASEURL(state) {
    return state.baseURL
  },
}

export const mutations = {
  SET_CURRENT_ROLE(state, payload) {
    state.currentRole = payload
  },
  SET_IS_ADMIN(state, payload) {
    state.isAdmin = payload
  },
  SET_IS_DEACTIVE(state, payload) {
    state.isDeactive = payload
  },
}

export const actions = {
  async GetDomains({ getters, state }) {
    try {
      let { data } = await await this.$axios.$get(
        getters.GET_BASEURL + `/frontend/domains?api-key=${state.apiKey}`
      )
      return data
    } catch (e) {
      return null
    }
  },
  async GetLink({ getters, state }, payload) {
    try {
      let { data } = await await this.$axios.$post(
        getters.GET_BASEURL + `/frontend/link?api-key=${state.apiKey}`,
        payload
      )
      return data[0]
    } catch (e) {
      return null;
    }
  },
}
