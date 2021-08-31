import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const store = new Vuex.Store({

    state: {
        username : '',
        currentRoom : '',
        adminID : '',
        canVote : false,
        currentlyPlaying : 0,
    },

    mutations: {
        
    }
});


export default store;