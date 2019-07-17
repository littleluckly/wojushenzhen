import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        count: 0,
        homepageList: []
    },
    mutations: {
        increment: state => {
            state.count += 1
        },
        decrement: state => {
            state.count -= 1
        },
        homepageList: (state, payload) => {
            state.homepageList = payload
        }
    },
    actions: {
        fetchHomepageList({ commit }, params) {
            const db = wx.cloud.database({ env: "wojushenzhen-cpm5n" })
            db.collection("rent").get({
                success: function (res) {
                    console.log("res", res)
                    commit("homepageList", res.data)
                }
            })
        }
    }
})
