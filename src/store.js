import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: '',
        userId: '',
        login: false,
        nickname: '',
        mileage: '',
        address: '',
        role: ''
    },
    mutations: {
        login(state, {userId, accessToken}) {
            var decodeToken = jwt_decode(accessToken)
            console.log(decodeToken)

            console.log(userId)
            console.log(accessToken)
            console.log(state)
            state.accessToken = accessToken;
            state.userId = userId;
            state.login = true;
            localStorage.setItem("accessToken", accessToken)
            Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.


            Vue.prototype.$http.get(`${window.API_HOST}/users/${state.userId}`).then(function (e) {

                console.log(e)

                state.mileage = e.data.mileage
                localStorage.setItem("mileage", e.data.mileage)

                console.log(error)
                state.nickname = e.data.nickname
                state.address = e.data.address
                state.role = e.data.role

                localStorage.setItem("nickname", e.data.nickname)
                localStorage.setItem("address", e.data.address)
                localStorage.setItem("userId", userId)
                localStorage.setItem("role", e.data.role)
            }).catch(function () {



                localStorage.setItem("nickname", decodeToken.nickname)
                localStorage.setItem("mileage", 0);
                localStorage.setItem("address", decodeToken.address)

                state.mileage = 0
                state.nickname = decodeToken.nickname
                state.address = decodeToken.address



            })

        },
        logout(state) {

            state.accessToken = null;
            state.nickname = null;
            state.mileage = null;
            state.address = null;
            state.role = null;
            state.login = false;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('nickname')
            localStorage.removeItem('mileage')
            localStorage.removeItem('address')
            localStorage.removeItem('role')
            localStorage.removeItem('userId')
        }
    },
    actions: {
        login({commit}, {userId, userPw}) {

            var me = this
            var clientID = 'uengine-client'
            var clientSecret = 'uengine-secret'
            const clientCredentialBase64 = btoa(clientID + ':' + clientSecret)
            //OAuth 인증을 위한 Body 설정
            const body = `grant_type=password&username=${encodeURIComponent(userId)}&password=` + encodeURIComponent(userPw)
            // console.log(headers)
            console.log(body)

            return Vue.prototype.$http.post(`${window.API_HOST}/oauth/token`, body, {
                    headers: {
                        'Authorization': `Basic ${clientCredentialBase64}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then(function (e) {
                console.log(e)
                // console.log(e.data.access_token)
                if (e && e.data && e.data.access_token) {
                    // state.userId = userId;
                    var accessToken = e.data.access_token;
                    // localStorage.setItem("jwtToken", me.jwtToken)
                    // me.formData.isLogin = true
                    console.log(accessToken)
                    commit('login', {userId, accessToken})
                    Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${e.data.access_token}`;
                }
            })
        },
        logout({commit}) {
            commit('logout')
        },
    }


})
