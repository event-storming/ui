<template >
    <v-card class="elevation-12" style="background: #E8F5E9">
        <v-toolbar
                flat
                style="background: #E8F5E9"
        >
            <v-col align="center">
            <v-toolbar-title style="color: #CF5541; background: #E8F5E9; font-size: 38px; font-style: italic; width: auto;"  > 12 Street </v-toolbar-title>
            </v-col>
        </v-toolbar>


        <v-card-text>
            <v-form>
                <v-text-field
                        label="Login"
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="userId"
                ></v-text-field>

                <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="userPw"
                ></v-text-field>
            </v-form>
        </v-card-text>

        <v-card-actions style="padding-bottom: 10px;">
            <v-btn block color="green" style="color: white" @click="login">Login</v-btn>
        </v-card-actions>
        <v-row no-gutters>
            <v-col cols="8"
                   md="5"
                   style="margin-top: 10px;">
                <v-divider></v-divider>
            </v-col>
            <v-col cols="12"
                   md="2"
                   align="center"
                   style="color: lightgrey">
                or
            </v-col>
            <v-col cols="8"
                   md="5"
                   style="margin-top: 10px;">
                <v-divider></v-divider>
            </v-col>
        </v-row>


        <v-card flat style="background: #E8F5E9">
            <v-col justify="center" align="center">
                <v-btn
                        color="#3c82f7"
                        style="width: 250px; font-size: 13px; color: white;background: #CF5541; justify-content: start; "
                        @click="snsLogin('google')">
                    <i class="fab fa-google"  style="font-size: 25px; color: white" ></i>
                    &nbsp; Login in with Google
                </v-btn>
                <div class="pa-2"></div>
                <v-btn
                        color="#4267b2"
                        style="width: 250px; font-size: 13px; color: white; justify-content: start;"
                        @click="snsLogin('facebook')">
                    <i class="fab fa-facebook-square" style="font-size: 30px"></i>
                    &nbsp; Login in with Facebook
                </v-btn>
            </v-col>
        </v-card>
    </v-card>
</template>

<script>
    import {mdbBtn} from 'mdbvue';

    export default {
        components: {
            mdbBtn
        },
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            userId: '1@uengine.org',
            userPw: '1',
            // googleSignInParams: {
            //     client_id: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
            // },
            // fbSignInParams: {
            //     scope: 'email,user_likes',
            //     return_scopes: true
            // }
        }),
        methods: {
            login: function () {
                var me = this;
                let userId = me.userId;
                let userPw = me.userPw;
                localStorage.setItem('userId', userId)
                me.$store.dispatch('login', {userId, userPw})
                    .then(function () {
                        me.$emit('success', false);
                    })
                // .catch(({message}) => this.msg = message)
            },
            snsLogin(who) {

                var me = this
                var app = me.$getComponents('App')

                if (who == 'google') {
                    app.snackbar = true;
                    app.snackbarColor = 'error'
                    app.snackbarMessage = 'Google 로그인 서비스는 준비중입니다.'
                    app.snackbarPosition = false
                } else if (who == 'facebook') {
                    app.snackbar = true;
                    app.snackbarColor = 'info'
                    app.snackbarMessage = 'FaceBook 로그인 서비스는 준비중입니다.'
                    app.snackbarPosition = false
                }

            },

        }
    }
</script>

<style>
    .login-button {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }


</style>