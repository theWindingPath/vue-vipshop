import * as types from './mutation-types'

const mutations = {
    [types.SET_STORE](state, store) {
        state.store = store
    }
}

export default mutations