import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
		username: '',
		userref: '',
}
const getters = {
		getUsername: state => state.username,
		getUserref: state => state.userref,
}
const mutations = {
    username(state, value){
			state.username = value;
		},
		userref(state, value){
			state.userref = value;
		}
}
const actions = {
    setUsername ({commit}, name) {
			commit('username', name);
		},
		logOut ({commit}) {
			commit('username', '');
		},
		userRef ({commit}, postid) {
			const ref = firebase.database().ref('/'+state.username+'/'+postid);
			commit('userref',ref);
		}	
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})